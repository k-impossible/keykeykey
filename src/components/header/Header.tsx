import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import logoImg from "@/assets/logo.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import {
	FaArrowRightFromBracket,
	FaArrowRightToBracket,
	FaBagShopping,
} from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";

import { buttonVariants } from "../ui/button";
import { toast } from "sonner";
import { Sheet } from "../ui/sheet";
import { useCartSheetStore } from "@/store/useSheetStore";
import useCartStore from "@/store/useCartStore";
import CartSheet from "../cart/CartSheet";

const Header = () => {
	const { initUserState, isSeller, isLoggedIn } = useUserStore();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { isCartSheetOpened, setCartSheetState } = useCartSheetStore();
	const { removeMyCart, myCart } = useCartStore();

	const handleLogOut = async () => {
		await signOut(auth);
		initUserState();
		removeMyCart();
		toast.info("로그아웃 되었습니다.");
	};

	const handleActionToast = () => {
		if (isLoggedIn) {
			if (pathname === "/order") {
				toast.error("주문 중에는 장바구니를 확인할 수 없습니다.");
			} else {
				setCartSheetState(true);
			}
		} else {
			toast.info("로그인 후 이용하실 수 있습니다.", {
				action: {
					label: "로그인",
					onClick: () => navigate("/login"),
				},
			});
		}
	};

	return (
		<div className="lg:container py-8 flex justify-between items-center m-auto">
			<div className="w-20">
				<Link to="/">
					<img src={logoImg} alt="logo" />
				</Link>
			</div>
			<div className="flex justify-between items-center gap-7">
				{isSeller ? (
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
					</div>
				) : (
					<div className="flex justify-between items-center gap-7">
						<div className="cart-btn-wrap">
							<FaBagShopping
								onClick={handleActionToast}
								size={30}
								className="cursor-pointer"
							/>
							{isLoggedIn && (
								<span
									className={`cart-cnt ${0 < myCart.totalAmount && "cart-cnt-active"}`}
								>
									{myCart.totalAmount}
								</span>
							)}
						</div>
						<FaClipboardList
							size={30}
							onClick={() => {
								if (isLoggedIn) navigate("/orders");
								else handleActionToast();
							}}
							className="cursor-pointer"
						/>
					</div>
				)}
				{isLoggedIn ? (
					<FaArrowRightFromBracket
						onClick={handleLogOut}
						size={30}
						title="로그아웃"
						className="cursor-pointer"
					/>
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
			<Sheet open={isCartSheetOpened} onOpenChange={setCartSheetState}>
				<CartSheet />
			</Sheet>
		</div>
	);
};

export default Header;
