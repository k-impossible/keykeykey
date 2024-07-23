import { useEffect } from "react";
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAuthForm from "@/components/form/UserAuthForm";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserStore from "@/store/useUserStore";
import { toast } from "sonner";
import { Collection } from "@/enum/Collection";
import useCartStore from "@/store/useCartStore";
import useLoadingStore from "@/store/useLoadingStore";

const SignIn = () => {
	const navigate = useNavigate();
	const { setUserState } = useUserStore();
	const { setMyCart } = useCartStore();
	const { isLoggedIn, isSeller, displayName } = useUserStore(state => state);
	const { setLoadingState } = useLoadingStore();
	useEffect(() => {
		if (isLoggedIn) {
			if (isSeller) navigate("/product-manage");
			else navigate("/");
			toast.success(displayName + "님 반갑습니다.");
		}
	}, [displayName, isLoggedIn, isSeller, navigate]);

	const handleLogin = async (email: string, password: string) => {
		try {
			setLoadingState(true);
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			await getUserQuery(userCredential.user.uid);
			setLoadingState(false);
		} catch (error: any) {
			toast.error("로그인 실패", {
				description: "이메일 또는 비밀번호가 잘못되었습니다.",
			});
			setLoadingState(false);
		}
	};

	const getUserQuery = async (uid: string) => {
		try {
			const col = collection(db, Collection.USER);
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
			setMyCart(id);
		} catch (error) {
			console.log(error);
		}
	};

	return <UserAuthForm title="로그인" getDataForm={handleLogin} />;
};

export default SignIn;
