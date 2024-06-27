import useUserStore from "@/store/useUserStore";

const useAuthCheck = (role: string): boolean => {
	const { isLoggedIn, id } = useUserStore((state) => state);

	if (!isLoggedIn) return isLoggedIn;

	if (role === "user" && id !== import.meta.env.VITE_SELLER_ID)
		return isLoggedIn;
	else if (role === "admin" && id === import.meta.env.VITE_SELLER_ID)
		return isLoggedIn;
	else return false;
};

export default useAuthCheck;
