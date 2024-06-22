import { useState } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
const SignIn = () => {
	const navigate = useNavigate();
	const [firebaseError, setFirebaseError] = useState("");

	const handleLogin = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("user ", userCredential);
			navigate("/");
		} catch (error) {
			return (
				error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.")
			);
		}
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
