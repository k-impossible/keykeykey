import SignUp from "./sign-up/SignUp";
import { Link } from "react-router-dom";
const SignUpPage = () => {
	return (
		<div className="w-full h-screen flex flex-col justify-start items-center">
			<h1>회원가입</h1>
			<SignUp />
			<p>
				계정이 있습니까? <Link to="/login">로그인하기</Link>
			</p>
		</div>
	);
};

export default SignUpPage;
