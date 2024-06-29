import ProductManageList from "./list/proudct-list";
import ProductSheet from "./sheet/product-sheet";

const ProductMangePage = () => {
	return (
		<div className="container">
			<div className="flex justify-end">
				<ProductSheet type={"create"} />
			</div>
			<main>
				<ProductManageList />
			</main>
		</div>
	);
};

export default ProductMangePage;
