import { auth } from "@/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthCheck = async (role: string) => {
	const [authChk, setAuthChk] = useState(false);

	// onAuthStateChanged(auth, (user) => {
	// 	console.log(user);
	// 	if (role === "seller") {
	// 		if (user?.uid === import.meta.env.VITE_SELLER_ID) setAuthChk(true);
	// 	} else if (role === "user") {
	// 	}
	// });

	// console.log(test(role));

	const getTest = await test(role);
	// console.log(getTest);
	setAuthChk(getTest);
	// console.log(getTest);
	return authChk;

	// return new Promise((resolve, reject):Promise<void> => {
	// 	onAuthStateChanged(auth, (user) => {
	// 		console.log(user);
	// 		if (role === "seller") {
	// 			if (user?.uid === import.meta.env.VITE_SELLER_ID) resolve(true);
	// 		} else if (role === "user") {
	// 		}
	// 	});
	// }).then((data) => data);
};

export const test = (role: string) => {
	const prom = new Promise<boolean>((resolve, reject) => {
		onAuthStateChanged(auth, (user) => {
			if (user === null) {
				console.log(user);
				resolve(false);
			}
			if (role === "seller") {
				if (user?.uid === import.meta.env.VITE_SELLER_ID) resolve(true);
			} else if (role === "user") {
			}
		});
	}).then((data) => data);

	return prom;
};

export const useLogOut = async () => await signOut(auth);
