import "./App.css";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });

    auth.currentUser;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      querySnapshot.forEach((doc) => {
        console.log(doc);
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };

    fetchData();
  }, []);

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signUp = async (event: any) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signIn user", userCredential);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("signIn error", errorCode, errorMessage);
    }
  };

  const signIn = async (event: any) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("login user", userCredential);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("login error", errorCode, errorMessage);
    }
  };
  const logOut = async (event: any) => {
    event.preventDefault();
    await signOut(auth);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      <form>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>
        <Button variant="outline" className="mr-2" onClick={signUp}>
          회원가입
        </Button>
        <Button variant="outline" className="mr-2" onClick={signIn}>
          로그인
        </Button>
        <Button variant="outline" className="mr-2" onClick={logOut}>
          로그아웃
        </Button>
      </form>
      <Alert className="mt-10">
        <AlertTitle>안녕하세요 수강생 여러분 반갑습니다.</AlertTitle>
        <AlertDescription>
          항해99 취업 리부트 프로그램에 오신걸 환영합니다.
        </AlertDescription>
      </Alert>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="mt-5">
            버튼을 눌러주세요.
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>프로젝트 셋팅을 완료하셨습니다.</AlertDialogTitle>
            <AlertDialogDescription>
              이제 1주차 기능 구현 과제들을 구현해주세요. 화이팅입니다!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction>완료</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default App;
