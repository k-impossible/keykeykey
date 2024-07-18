import SignUp from "./sign-up/SignUp";
import { Link } from "react-router-dom";
const SignUpPage = () => {
	return (
		<div>
			<h1 className="text-5xl font-bold mb-14">Sign Up</h1>
			<SignUp />
			<p className="my-5 text-center">
				계정이 있습니까?&nbsp;&nbsp;
				<Link to="/login" className="text-sky-600" title="로그인 페이지로 이동">
					로그인하기
				</Link>
			</p>
		</div>
	);
};

export default SignUpPage;
