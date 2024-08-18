import useUpdateCollection from "@/hooks/useUpdateCollection";
import { Collection } from "@/enum/Collection";
import { Order } from "@/interfaces/Order.interface";

export const orderStatusRender = (status: number) => {
	switch (status) {
		case 0:
			return "주문완료";
		case 1:
			return "배송준비중";
		case 2:
			return "배송중";
		case 3:
			return "주문취소";
		default:
			break;
	}
};

export const orderStatusChange = async (order: Order, status: number) => {
	try {
		const orderObj: Order = {
			...order,
			status,
			updatedAt: Date.now(),
		};
		// eslint-disable-next-line react-hooks/rules-of-hooks
		await useUpdateCollection(
			Collection.ORDER,
			order.docId as string,
			orderObj
		);
	} catch (error: any) {
		throw new Error(error);
	}
};
