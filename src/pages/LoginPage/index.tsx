import { Link } from "react-router-dom";
import SignIn from "./sign-in/SignIn";

const LoginPage = () => {
	return (
		<div className="w-full h-screen flex flex-col justify-start items-center">
			<h1>로그인</h1>
			<SignIn />
			<p>
				계정이 없습니까? <Link to="/sign-up">가입하기</Link>
			</p>
		</div>
	);
};

export default LoginPage;
