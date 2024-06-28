import { useEffect } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import useAddCollection from "@/hooks/useAddCollection";
import useUserStore from "@/store/useUserStore";
import { toast } from "sonner";
import { Collection } from "@/enum/Collection";

const SignUp = () => {
	const navigate = useNavigate();
	const { setUserState } = useUserStore();
	const { isLoggedIn, displayName } = useUserStore(state => state);

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
			toast.success(displayName + "님 반갑습니다.");
		}
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

			await useAddCollection(Collection.USER, newUser);

			const user: UserState = {
				id: userCredential.user.uid,
				email,
				displayName: nickname!,
				isLoggedIn: true,
				isSeller: false,
			};

			setUserState(user);
		} catch (error: any) {
			let msg = "";
			switch (error.code) {
				case "auth/invalid-email":
					msg = "이메일을 올바르게 입력해주세요.";
					break;
				case "auth/weak-password":
					msg = "비밀번호가 너무 쉬워요.";
					break;
				case "auth/email-already-in-use":
					msg = "이미 등록된 이메일 입니다.";
					break;
				default:
					msg = "입력 사항을 다시 확인해주세요.";
					break;
			}
			toast.error("회원가입 실패", {
				description: msg,
			});
		}
	};

	return <UserAuthForm title="회원가입" getDataForm={handleSignUp} />;
};

export default SignUp;
