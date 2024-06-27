import { buttonVariants } from "../ui/button";
import { FaSquareGithub } from "react-icons/fa6";

const Footer = () => {
	return (
		<div className="bg-zinc-900 text-white py-3 text-center">
			<a
				href="https://github.com/k-impossible/keykeykey"
				target="_blank"
				className={buttonVariants({
					variant: "link",
					className: "text-white",
				})}
			>
				<FaSquareGithub size={30} />
			</a>
		</div>
	);
};

export default Footer;
