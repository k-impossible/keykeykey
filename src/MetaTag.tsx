import { Helmet } from "react-helmet-async";

export type MetaTagPropsType = {
	title: string;
	description: string;
	imgSrc: string;
	url: string;
};

const MetaTag = (props: MetaTagPropsType) => {
	return (
		<Helmet>
			<title>{props.title} - 키키키</title>
			<meta name="description" content={props.description} />

			<meta property="og:type" content="website" />
			<meta property="og:title" content={props.title + " - 키키키"} />
			<meta
				property="og:site_name"
				content="키키키 - 개발자 키보드 전문 스토어"
			/>
			<meta property="og:description" content={props.description} />
			<meta property="og:image" content={props.imgSrc} />
			<meta
				property="og:url"
				content={"https://www.keykeykey.store" + props.url}
			/>

			<meta name="twitter:title" content={props.title + " - 키키키"} />
			<meta name="twitter:description" content={props.description} />
			<meta name="twitter:image" content={props.imgSrc} />
		</Helmet>
	);
};

export default MetaTag;
