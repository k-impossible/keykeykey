import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
type SwiperProps = {
	images: string[];
	auto: boolean;
	nav: boolean;
	pag: boolean;
};
const SwiperItem = ({ images, auto, nav, pag }: SwiperProps) => {
	return (
		<Swiper
			modules={[Autoplay, Navigation, Pagination]}
			autoplay={
				auto && {
					delay: 4500,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}
			}
			navigation={nav}
			pagination={
				pag && {
					type: "progressbar",
				}
			}
			loop={true}
		>
			{images &&
				Array.from(images).map((img, idx) => (
					<SwiperSlide key={idx}>
						<img src={img} alt={`slideImg-${idx}`} />
					</SwiperSlide>
				))}
		</Swiper>
	);
};

export default SwiperItem;
