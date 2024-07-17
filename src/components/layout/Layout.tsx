import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Nav from "../nav/Nav";
const Layout = () => {
	return (
		<div>
			<Header />
			<div
				className="w-full h-full flex flex-col justify-start items-center"
				style={{ minHeight: "calc(100vh - 214px)" }}
			>
				<Nav />
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
