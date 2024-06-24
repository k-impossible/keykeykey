import { useEffect } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import useAddCollection from "@/hooks/useAddCollection";
import useUserStore from "@/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
	const navigate = useNavigate();
	const { setUserState } = useUserStore();
	const { isLoggedIn, displayName } = useUserStore((state) => state);
	const { toast } = useToast();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
			toast({
				title: displayName + "님 반갑습니다.",
				duration: 3000,
			});
		}
	}, [isLoggedIn]);

	const handleSignUp = async (
		email: string,
		password: string,
		nickname?: string
	) => {
		let successChk = true;
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
			successChk = false;
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
					msg = "회원가입 실패";
					break;
			}
			toast({
				title: "회원가입 실패",
				description: msg,
				variant: "destructive",
				duration: 2000,
			});
		}

		return successChk;
	};

	return <UserAuthForm title="회원가입" getDataForm={handleSignUp} />;
};

export default SignUp;
