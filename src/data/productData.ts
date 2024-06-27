import logiTechLogo from "../assets/brand/logitech.png";
import razerLogo from "../assets/brand/razer.png";
import corsairLogo from "../assets/brand/corsair.png";
import keyChronLogo from "../assets/brand/keychron.jpeg";
import leoPoldLogo from "../assets/brand/leopold.png";

export const brandData = [
	{
		id: 0,
		name: "LOGITECH",
		korName: "로지텍",
		imagePath: logiTechLogo,
	},
	{ id: 1, name: "RAZER", korName: "레이저", imagePath: razerLogo },
	{
		id: 2,
		name: "CORSAIR",
		korName: "커세어",
		imagePath: corsairLogo,
	},
	{
		id: 3,
		name: "KEYCHRON",
		korName: "키크론",
		imagePath: keyChronLogo,
	},
	{
		id: 4,
		name: "LEOPOLD",
		korName: "레오폴드",
		imagePath: leoPoldLogo,
	},
];

export const tagData = [
	{ id: 0, name: "유선" },
	{ id: 1, name: "무선" },
	{ id: 2, name: "텐키리스" },
	{ id: 3, name: "RGB" },
];

export const optionData = [
	{ id: 0, name: "청축" },
	{ id: 1, name: "적축" },
	{ id: 2, name: "갈축" },
	{ id: 3, name: "흑축" },
];
