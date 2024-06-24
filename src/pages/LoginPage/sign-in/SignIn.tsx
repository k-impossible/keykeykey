import { useEffect } from "react";
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserStore from "@/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
const SignIn = () => {
	const navigate = useNavigate();
	const { setUserState } = useUserStore();
	const { isLoggedIn, isSeller, displayName } = useUserStore((state) => state);
	const { toast } = useToast();
	useEffect(() => {
		if (isLoggedIn) {
			if (isSeller) navigate("/product-manage");
			else navigate("/");

			toast({
				title: displayName + "님 반갑습니다",
				duration: 3000,
			});
		}
	}, [isLoggedIn]);

	const handleLogin = async (email: string, password: string) => {
		let successChk = true;

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			await getUserQuery(userCredential.user.uid);
		} catch (error: any) {
			successChk = false;

			toast({
				title: "로그인 실패",
				description: "이메일 또는 비밀번호가 잘못되었습니다.",
				variant: "destructive",
				duration: 2000,
			});
		}

		return successChk;
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

	return <UserAuthForm title="로그인" getDataForm={handleLogin} />;
};

export default SignIn;
