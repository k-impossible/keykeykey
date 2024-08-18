import MetaTag from "@/MetaTag";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.webp";
const ErrorPage = () => {
	const { pathname } = useLocation();
	const imgSrc = "https://www.keykeykey.store/logo-jpg.jpg";
	return (
		<div className="min-h-full flex justify-center items-center flex-col py-10">
			<MetaTag
				title={"Error"}
				description={"404 에러페이지 입니다."}
				imgSrc={imgSrc}
				url={pathname}
			/>
			<h1 className="text-8xl font-bold">404</h1>
			<img src={logo} alt="logo" className="w-40 my-10" />
			<h1 className="text-xl font-bold">페이지를 찾을 수 없습니다.</h1>
			<Link to="/" className="text-sky-600 underline">
				메인페이지로 이동
			</Link>
		</div>
	);
};

export default ErrorPage;
