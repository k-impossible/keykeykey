import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="w-full">
			<Loader2 className="animate-spin m-auto my-5" size={50} />
		</div>
	);
};
export const LoadingFull = () => {
	return (
		<div className="w-full h-dvh flex justify-center items-center bg-slate-100">
			<Loader2 className="animate-spin m-auto my-5" size={70} />
		</div>
	);
};

export default Loading;
