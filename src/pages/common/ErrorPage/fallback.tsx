import { Button } from "@/components/ui/button";
import { FallbackProps } from "react-error-boundary";
import { Link } from "react-router-dom";

const FallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div className="flex justify-center items-center flex-col py-10 gap-5">
			{error.message}
			<Button onClick={resetErrorBoundary}>재시도</Button>
			<Link to="/" className="text-sky-600 underline">
				메인페이지로 이동
			</Link>
		</div>
	);
};

export default FallbackRender;
