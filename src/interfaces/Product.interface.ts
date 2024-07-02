interface Product {
	id?: string;
	brandId: number;
	name: string;
	description: string;
	price: number;
	amount: number;
	tagIds: number[];
	images: string[];
	createdAt: string;
	updatedAt: string;
}
