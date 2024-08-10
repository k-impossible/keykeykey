import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className="w-full">
			<Loader2 className="animate-spin m-auto my-5" size={50} />
		</div>
	);
};

export const SkeletonCard = () => {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[125px] w-[250px] rounded-xl bg-zinc-400" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px] bg-zinc-400" />
				<Skeleton className="h-4 w-[200px] bg-zinc-400" />
			</div>
		</div>
	);
};

export default Loading;
