import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserStore from "@/store/useUserStore";
const SignIn = () => {
	const navigate = useNavigate();
	const [firebaseError, setFirebaseError] = useState("");
	const { setUserState } = useUserStore();
	const { isLoggedIn, isSeller } = useUserStore((state) => state);

	useEffect(() => {
		if (isLoggedIn) {
			if (isSeller) navigate("/product-manage");
			else navigate("/");
		}
	}, [isLoggedIn]);

	const handleLogin = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			await getUserQuery(userCredential.user.uid);
		} catch (error) {
			error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.");
		}
	};

	const getUserQuery = async (uid: string) => {
		try {
			const col = collection(db, "users");
			const q = query(col, where("id", "==", uid));
			const result = await getDocs(q);
			const { id, email, displayName } = result.docs[0].data();

			const user: UserState = {
				id,
				email,
				displayName,
				isLoggedIn: true,
				isSeller: id === import.meta.env.VITE_SELLER_ID ? true : false,
			};
			setUserState(user);
		} catch (error) {}
	};

	return (
		<UserAuthForm
			title="로그인"
			getDataForm={handleLogin}
			firebaseError={firebaseError}
		/>
	);
};

export default SignIn;
