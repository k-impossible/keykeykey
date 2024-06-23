import { auth } from "@/firebase";
import { useLogOut } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import React from "react";
import logoImg from "@/assets/logo.png";
import { Link } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
const Header = () => {
	const { initUserState } = useUserStore();

	const handleLogOut = async () => {
		await signOut(auth);
		initUserState();
	};

	return (
		<div className="lg:container py-8 flex justify-between items-center">
			<div className="w-20">
				<Link to="/">
					<img src={logoImg} alt="logo" />
				</Link>
			</div>
			<div>
				<Link to="/login">login</Link>
				<button onClick={handleLogOut}>logout</button>
			</div>
		</div>
	);
};

export default Header;
