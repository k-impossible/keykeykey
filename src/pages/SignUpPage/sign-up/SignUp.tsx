import { useState } from "react";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
	const navigate = useNavigate();
	const [firebaseError, setFirebaseError] = useState("");

	const handleSignUp = async (
		email: string,
		password: string,
		nickname?: string
	) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			addCollectionUser(userCredential.user.uid, email, password, nickname!);
		} catch (error: any) {
			error && setFirebaseError("입력 정보를 다시 확인해주세요.");
		}
	};

	const addCollectionUser = async (
		id: string,
		email: string,
		password: string,
		displayName: string
	) => {
		try {
			const newUser: User = {
				id,
				email,
				password,
				displayName,
			};
			const collectionRef = collection(db, "users");
			await addDoc(collectionRef, newUser);
			navigate("/");
		} catch (error) {}
	};

	return (
		<UserAuthForm
			title="회원가입"
			getDataForm={handleSignUp}
			firebaseError={firebaseError}
		/>
	);
};

export default SignUp;
