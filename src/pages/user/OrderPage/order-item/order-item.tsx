import { brandData } from "@/lib/productData";

type CartItemProps = {
	item: CartItem;
};

const OrderItem = ({ item }: CartItemProps) => {
	return (
		<div className="flex justify-between items-center border-b py-5 w-full">
			<div className="w-[250px]">
				<img src={item.productImage} alt="cartItem" />
			</div>
			<div className="text-right ">
				<h1 className="text-sm">{brandData[item.brandId].korName}</h1>
				<h1 className="mb-3">{item.productName}</h1>
				<p>{item.productAmount}개</p>
				<p>{item.productTotalPrice.toLocaleString()}원</p>
			</div>
		</div>
	);
};

export default OrderItem;
