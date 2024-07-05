import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const NavData = [
	{
		id: 0,
		name: "HOME",
		path: "/",
	},
	{
		id: 1,
		name: "ALL",
		path: "/products/all",
	},
	{
		id: 2,
		name: "LOGITECH",
		path: "/products/logitech",
	},
	{ id: 3, name: "RAZER", path: "/products/razer" },
	{
		id: 4,
		name: "CORSAIR",
		path: "/products/corsair",
	},
	{
		id: 5,
		name: "KEYCHRON",
		path: "/products/keychron",
	},
	{
		id: 6,
		name: "LEOPOLD",
		path: "/products/leopold",
	},
];

const Nav = () => {
	const { pathname } = useLocation();
	return (
		<nav className="w-full border-b border-b-zinc-800">
			<div className=" w-fit mx-auto">
				{NavData.map(nav => (
					<Link to={nav.path} key={nav.id}>
						<Button
							className={`navBtn ${pathname === nav.path ? "activeNavBtn" : ""}`}
						>
							{nav.name}
						</Button>
					</Link>
				))}
			</div>
		</nav>
	);
};

export default Nav;
