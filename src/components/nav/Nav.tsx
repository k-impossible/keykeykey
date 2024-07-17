import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const NavData = [
	{
		id: 1,
		name: "ALL",
		path: "/products/all",
	},

	{
		id: 2,
		name: "Logitech",
		path: "/products/logitech",
	},
	{
		id: 3,
		name: "HappyHacking",
		path: "/products/happyhacking",
	},
	{ id: 4, name: "RealForce", path: "/products/realforce" },
	{
		id: 5,
		name: "Leopold",
		path: "/products/leopold",
	},
	{
		id: 6,
		name: "Keychron",
		path: "/products/keychron",
	},
];

const Nav = () => {
	const { pathname } = useLocation();

	if (
		(pathname === "/" || pathname.includes("/product")) &&
		pathname !== "/product-manage"
	) {
		return (
			<nav className="w-full border-b border-b-zinc-800">
				<div className=" w-fit mx-auto">
					<Link to="/">
						<Button
							className={`navBtn ${pathname === "/" ? "activeNavBtn" : ""}`}
						>
							HOME
						</Button>
					</Link>
					{NavData.map(nav => (
						<Link to={nav.path} key={nav.id}>
							<Button
								className={`navBtn ${pathname.includes(nav.name.toLowerCase()) ? "activeNavBtn" : ""}`}
							>
								{nav.name}
							</Button>
						</Link>
					))}
				</div>
			</nav>
		);
	} else {
		return null;
	}
};

export default Nav;
