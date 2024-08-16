import { Link, useLocation } from "react-router-dom";
import SignIn from "./sign-in/SignIn";
import MetaTag from "@/MetaTag";
const LoginPage = () => {
	const { pathname } = useLocation();
	const imgSrc = `${import.meta.env.PUBLIC_URL}/logo-jpg.jpg`;
	return (
		<div>
			<MetaTag
				title={"로그인"}
				description={"로그인 페이지입니다."}
				imgSrc={imgSrc}
				url={pathname}
			/>
			<h1 className="text-5xl font-bold mb-14">Login</h1>
			<SignIn />
			<p className="my-5 text-center">
				계정이 없습니까?&nbsp;&nbsp;
				<Link
					to="/sign-up"
					className="text-sky-600"
					title="회원가입 페이지로 이동"
				>
					가입하기
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
