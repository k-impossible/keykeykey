import { test, useAuthCheck } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
	role: string;
};
const PrivateRoute = ({ role }: Props): React.ReactElement => {
	const [flag, setFlag] = useState(false);
	// useEffect(async () => {
	// 	// setTimeout(() => {}, 500);
	// 	// setFlag(state => );
	// 	// console.log(flag);
	// }, []);
	// setTimeout(() => {
	// }, 500);
	// try {
	// } catch (error) {
	// 	console.log(error);
	// }

	// useEffect(() => {
	// 	async function getT() {
	// 		try {
	// 			const qwe = await useAuthCheck(role);
	// 			setFlag(qwe);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	getT();
	// }, []);

	// useEffectAsync(async () => {
	// 	try {
	// 		const qwe = await useAuthCheck(role);
	// 		setFlag(qwe);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// });

	const [callCnt, setCallCnt] = useState(1);
	const [falseCnt, setFalseCnt] = useState(0);
	const [final, setFinal] = useState(false);

	useEffect(() => {
		if (!flag) {
			console.log("effect");
			setFalseCnt(falseCnt + 1);
		}
	}, [flag]);
	async function getT() {
		const qwe = await test(role);
		// setFlag(qwe);
		// setFalseCnt((state) => ..state + 1);
		setFlag(qwe);
		// if (qwe) {
		// 	setFlag(qwe);
		// 	setFalseCnt(falseCnt + 1);
		// }
	}

	getT();
	console.log("flag", flag);
	console.log("falseCnt", falseCnt);

	if (callCnt < 1) {
		console.log("callCnt", callCnt);
		console.log(flag);
		return flag ? <Outlet /> : <Navigate to="/" />;
	}
	return <Outlet />;
	// return useAuthCheck(role) ? <Outlet /> : <Navigate to="/" />;
};

function useEffectAsync(effect: any) {
	useEffect(() => {
		return effect();
	}, []);
}

export default PrivateRoute;
