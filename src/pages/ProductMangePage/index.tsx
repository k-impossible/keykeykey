import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductMangePage = () => {
	const { isSeller } = useUserStore((state) => state);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isSeller) navigate("/");
	}, [isSeller]);

	return (
		<div>
			ProductMangePage <br /> {isSeller}
		</div>
	);
};

export default ProductMangePage;
