import MetaTag from "@/MetaTag";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
	const { pathname } = useLocation();
	const imgSrc = `${import.meta.env.PUBLIC_URL}/logo-jpg.jpg`;
	return (
		<div>
			<MetaTag
				title={"Error"}
				description={"에러페이지 입니다."}
				imgSrc={imgSrc}
				url={pathname}
			/>
			<h1>page not found</h1>;
		</div>
	);
};

export default ErrorPage;
