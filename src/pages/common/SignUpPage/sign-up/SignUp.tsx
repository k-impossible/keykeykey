import { useEffect } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import useAddCollection from "@/hooks/useAddCollection";
import useUserStore from "@/store/useUserStore";
import { toast } from "sonner";
import { Collection } from "@/enum/Collection";
import useCartStore from "@/store/useCartStore";
import useLoadingStore from "@/store/useLoadingStore";

const SignUp = () => {
	const navigate = useNavigate();
	const { setUserState } = useUserStore();
	const { setMyCart } = useCartStore();
	const { isLoggedIn, displayName } = useUserStore(state => state);
	const { setLoadingState } = useLoadingStore();
	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
			toast.success(displayName + "님 반갑습니다.");
		}
	}, [displayName, isLoggedIn, navigate]);

	const handleSignUp = async (
		email: string,
		password: string,
		nickname?: string
	) => {
		try {
			setLoadingState(true);
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

			// eslint-disable-next-line react-hooks/rules-of-hooks
			await useAddCollection(Collection.USER, newUser);

			const user: UserState = {
				id: userCredential.user.uid,
				email,
				displayName: nickname!,
				isLoggedIn: true,
				isSeller: false,
			};

			setUserState(user);
			setMyCart(userCredential.user.uid);
			setLoadingState(false);
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
			setLoadingState(false);
		}
	};

	return <UserAuthForm title="회원가입" getDataForm={handleSignUp} />;
};

export default SignUp;
