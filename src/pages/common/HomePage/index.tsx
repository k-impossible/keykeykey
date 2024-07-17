import { brandData } from "@/lib/productData";
import CategoryItem from "./item/category-item";

const HomePage = () => {
	return (
		<div className="lg:container py-24 m-auto">
			<div className="flex flex-col gap-20">
				{brandData.map(brand => (
					<div key={brand.id}>
						<img
							src={brand.logoPath}
							alt="brand-logo"
							style={{
								width: brand.id === 1 ? "100px" : "150px",
								marginBottom: "1rem",
								backgroundColor: brand.id === 2 ? "black" : "",
								padding: brand.id === 2 ? "0.25rem" : "",
							}}
						/>

						<CategoryItem brand={brand} />
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
