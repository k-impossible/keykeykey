import { Link } from "react-router-dom";
import SignIn from "./sign-in/SignIn";

const LoginPage = () => {
	return (
		<div>
			<h1 className="text-5xl font-bold mb-14">Login</h1>
			<SignIn />
			<p className="my-5 text-center">
				계정이 없습니까?&nbsp;&nbsp;
				<Link to="/sign-up" className="text-sky-600">
					가입하기
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
