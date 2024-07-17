import { FaSquareGithub } from "react-icons/fa6";
import logo from "@/assets/logo.webp";
import { FaCode, FaPlus, FaEquals, FaRegFaceSmile } from "react-icons/fa6";
const Footer = () => {
	return (
		<div className="bg-zinc-900 text-white py-3 text-center flex justify-between px-10">
			<div className="flex gap-2 justify-between items-center">
				<img
					src={logo}
					className="w-[40px] bg-neutral-100 p-1 rounded-sm"
					alt="logo"
				/>
				<FaPlus size={15} className="text-neutral-100" />
				<div className="bg-neutral-100 rounded-sm p-2">
					<FaCode size={20} className="text-zinc-900" />
				</div>
				<FaEquals size={15} className="text-neutral-100" />
				<div className="bg-neutral-100 rounded-sm p-2">
					<FaRegFaceSmile size={20} className="text-zinc-900" />
				</div>
			</div>
			<a
				href="https://github.com/k-impossible/keykeykey"
				target="_blank"
				title="github로 이동"
			>
				<FaSquareGithub size={40} className="text-neutral-100" />
			</a>
		</div>
	);
};

export default Footer;
