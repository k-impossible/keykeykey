import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";

const HomePage = () => {
	const user = useUserStore((state) => state.id);
	useEffect(() => {
		console.log(user);
	}, [user]);
	return (
		<div className="container">
			HomePage <br />
			{user}
		</div>
	);
};

export default HomePage;
