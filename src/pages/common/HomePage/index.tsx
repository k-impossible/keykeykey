import { useEffect } from "react";
import CategoryList from "./category-list/category-list";
import useUserStore from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HomePage = () => {
	const { isLoggedIn, isSeller, displayName } = useUserStore(state => state);
	const navigate = useNavigate();

	useEffect(() => {
		// console.log(isLoggedIn, isSeller);
		// if (isLoggedIn) {
		// 	if (isSeller) navigate("/product-manage");
		// 	else navigate("/");
		// 	toast.success(displayName + "님 반갑습니다.");
		// }
	}, [isLoggedIn]);
	return (
		<div className="lg:container py-24">
			<CategoryList />
		</div>
	);
};

export default HomePage;
