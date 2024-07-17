import keyChronBG from "../assets/brand/keychron-bg.webp";
import logiTechBG from "../assets/brand/logitech-bg.webp";
import happyBG from "../assets/brand/happy-bg.webp";
import realBG from "../assets/brand/realforce-bg.webp";
import leoPoldBG from "../assets/brand/leopold-bg.webp";
import keyChronLogo from "@/assets/brand/keychron-logo.png";
import logitechLogo from "@/assets/brand/logitech-logo.svg";
import happyLogo from "@/assets/brand/happy-logo.png";
import realLogo from "@/assets/brand/realforce-logo.svg";
import leopoldLogo from "@/assets/brand/leopold-logo.png";
export const brandData = [
	{
		id: 0,
		name: "Logitech",
		korName: "로지텍",
		imagePath: logiTechBG,
		logoPath: logitechLogo,
	},
	{
		id: 1,
		name: "HappyHacking",
		korName: "해피해킹",
		imagePath: happyBG,
		logoPath: happyLogo,
	},
	{
		id: 2,
		name: "RealForce",
		korName: "리얼포스",
		imagePath: realBG,
		logoPath: realLogo,
	},
	{
		id: 3,
		name: "Leopold",
		korName: "레오폴드",
		imagePath: leoPoldBG,
		logoPath: leopoldLogo,
	},
	{
		id: 4,
		name: "Keychron",
		korName: "키크론",
		imagePath: keyChronBG,
		logoPath: keyChronLogo,
	},
];

export const tagData = [
	{ id: 0, name: "블루투스" },
	{ id: 1, name: "Mac 호환" },
	{ id: 2, name: "인체공학" },
	{ id: 3, name: "저소음" },
];

export const optionData = [
	{ id: 0, name: "청축" },
	{ id: 1, name: "적축" },
	{ id: 2, name: "갈축" },
	{ id: 3, name: "흑축" },
];
