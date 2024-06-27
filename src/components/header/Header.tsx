import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import logoImg from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import {
	FaArrowRightFromBracket,
	FaArrowRightToBracket,
	FaCartShopping,
} from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";

import { buttonVariants } from "../ui/button";
import { toast } from "sonner";

const Header = () => {
	const { initUserState, isSeller, isLoggedIn } = useUserStore();
	const { pathname } = useLocation();

	const handleLogOut = async () => {
		await signOut(auth);
		initUserState();
		toast("로그아웃 되었습니다.");
	};

	return (
		<div className="lg:container py-8 flex justify-between items-center">
			<div className="w-20">
				<Link to="/">
					<img src={logoImg} alt="logo" />
				</Link>
			</div>
			<div>
				{isLoggedIn ? (
					isSeller ? (
						<div className="flex justify-between items-center gap-7">
							<Link
								to="/product-manage"
								className={buttonVariants({
									variant: pathname === "/product-manage" ? "default" : "link",
								})}
							>
								상품관리
							</Link>
							<Link
								to="/order-manage"
								className={buttonVariants({
									variant: pathname === "/order-manage" ? "default" : "link",
								})}
							>
								주문내역
							</Link>
							<FaArrowRightFromBracket
								onClick={handleLogOut}
								size={30}
								title="로그아웃"
								className="cursor-pointer"
							/>
						</div>
					) : (
						<div className="flex justify-between items-center gap-7">
							<FaCartShopping size={30} className="cursor-pointer" />
							<FaClipboardList size={30} className="cursor-pointer" />
							<FaArrowRightFromBracket
								onClick={handleLogOut}
								size={30}
								title="로그아웃"
								className="cursor-pointer"
							/>
						</div>
					)
				) : (
					<Link to="/login">
						<FaArrowRightToBracket
							size={30}
							title="로그인"
							className="cursor-pointer"
						/>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
