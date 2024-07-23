import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="w-full">
			<Loader2 className="animate-spin m-auto my-5" size={50} />
		</div>
	);
};

export default Loading;
