import { Link, useSearchParams } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";
import { useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const FailPage = () => {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		// 재고 복구
	}, []);
	return (
		<div className="lg:container py-10">
			<Card className="max-w-[700px] mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">결제 실패</CardTitle>
					<CardDescription className="text-red-600">
						<FaRegTimesCircle size={60} className="mx-auto my-6" />
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col w-full justify-end items-center border-b">
					<div>{`실패 사유: ${searchParams.get("message")}`}</div>
					<div>
						<Link to="/order" title="주문하기 페이지로 이동">
							<Button variant={"outline"} className="my-5 mr-3">
								다시 주문하기
							</Button>
						</Link>
						<Link to="/" title="메인페이지로 이동">
							<Button variant={"outline"}>메인 페이지로</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default FailPage;
