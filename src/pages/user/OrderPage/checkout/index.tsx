import {
	loadPaymentWidget,
	PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useCartStore from "@/store/useCartStore";
import useUserStore from "@/store/useUserStore";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "ZCMdF_T2nV3cfwU-pFJWM";

const CheckoutPage = () => {
	const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
	const { myCart } = useCartStore();
	const { email, displayName } = useUserStore();
	useEffect(() => {
		(async () => {
			const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

			paymentWidget.renderPaymentMethods("#payment-widget", myCart.totalPrice);

			paymentWidgetRef.current = paymentWidget;
		})();
	}, []);

	return (
		<div className="w-full">
			<div id="payment-widget" />
			<div className="flex flex-col justify-end items-end w-full border-t pt-4">
				<div>총 주문 상품: {myCart.totalAmount}개</div>
				<div className="font-bold text-xl my-6">
					결제 금액 : {myCart.totalPrice.toLocaleString()}원
				</div>
			</div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button className="w-full font-bold text-lg py-8">결제하기</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>결제 진행 안내</AlertDialogTitle>
						<AlertDialogDescription>
							주문내역을 잘 확인하셨나요? '확인'버튼을 누르시면 결제가
							진행됩니다.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<AlertDialogAction
							className="bg-sky-600"
							onClick={async () => {
								const paymentWidget = paymentWidgetRef.current;

								try {
									await paymentWidget?.requestPayment({
										orderId: nanoid(),
										orderName:
											1 < myCart.products.length
												? myCart.products[0].productName +
													" 외 " +
													String(myCart.products.length - 1) +
													"건"
												: myCart.products[0].productName,
										customerName: displayName,
										customerEmail: email,
										successUrl: `${window.location.origin}/order/success`,
										failUrl: `${window.location.origin}/order/fail`,
									});
								} catch (err) {
									console.log(err);
								}
							}}
						>
							확인
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
export default CheckoutPage;
