import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import useAddCollection from "@/hooks/useAddCollection";
import useUserStore from "@/store/useUserStore";

const SignUp = () => {
	const navigate = useNavigate();
	const { setUserState } = useUserStore();
	const [firebaseError, setFirebaseError] = useState("");
	const { isLoggedIn } = useUserStore((state) => state);

	useEffect(() => {
		if (isLoggedIn) navigate("/");
	}, [isLoggedIn]);

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
			const newUser: UserSignUp = {
				id: userCredential.user.uid,
				email,
				displayName: nickname!,
			};

			await useAddCollection("users", newUser);

			const user: UserState = {
				id: userCredential.user.uid,
				email,
				displayName: nickname!,
				isLoggedIn: true,
				isSeller: false,
			};

			setUserState(user);
		} catch (error: any) {
			error && setFirebaseError("입력 정보를 다시 확인해주세요.");
		}
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
