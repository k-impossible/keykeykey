import { brandData } from "@/lib/productData";
import CategoryItem from "./item/category-item";
import mainBG from "@/assets/main-bg.webp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";
import { FaCode, FaPlus, FaEquals, FaRegFaceSmile } from "react-icons/fa6";

const HomePage = () => {
	return (
		<div className="w-full pt-1">
			<div
				className="category-bg"
				style={{
					height: "auto",
					backgroundImage: `url(${mainBG})`,
				}}
			>
				<div className="bg-black bg-opacity-80 h-full flex justify-center items-center flex-col gap-12 backdrop-blur-[3px]  py-8">
					<p className=" text-lg text-neutral-200 text-center leading-loose">
						키키키(KEY KEY KEY)는 <br />
						개발자들이 선호하는 키보드 브랜드의 제품을 취급하는 <br />
						키보드 전문 스토어 입니다.
						<br />
						키키키와 함께 행복한 코딩하세요.
						<br />
					</p>
					<div className="flex gap-4 justify-between items-center">
						<img
							src={logo}
							className="w-[50px] bg-neutral-100 p-1 rounded-sm"
						/>
						<FaPlus size={20} className="text-neutral-100" />
						<div className="bg-neutral-100 rounded-sm p-2">
							<FaCode size={30} className="text-zinc-900" />
						</div>
						<FaEquals size={20} className="text-neutral-100" />
						<div className="bg-neutral-100 rounded-sm p-2">
							<FaRegFaceSmile size={30} className="text-zinc-900" />
						</div>
					</div>
				</div>
			</div>
			<div className="lg:container py-24 m-auto">
				<div className="flex flex-col gap-20">
					{brandData.map(brand => (
						<div key={brand.id}>
							<img
								src={brand.logoPath}
								alt=""
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
		</div>
	);
};

export default HomePage;
