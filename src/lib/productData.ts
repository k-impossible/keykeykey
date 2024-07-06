import logiTechLogo from "../assets/brand/logitech.png";
import razerLogo from "../assets/brand/razer.png";
import corsairLogo from "../assets/brand/corsair.png";
import keyChronLogo from "../assets/brand/keychron.jpeg";
import leoPoldLogo from "../assets/brand/leopold.png";

export const brandData = [
	{
		id: 0,
		name: "Keychron",
		korName: "키크론",
		imagePath: logiTechLogo,
	},
	{ id: 1, name: "RealForce", korName: "리얼포스", imagePath: razerLogo },
	{
		id: 2,
		name: "HappyHacking",
		korName: "해피해킹",
		imagePath: corsairLogo,
	},
	{
		id: 3,
		name: "Logitech",
		korName: "로지텍",
		imagePath: keyChronLogo,
	},
	{
		id: 4,
		name: "Leopold",
		korName: "레오폴드",
		imagePath: leoPoldLogo,
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
