import useAuthCheck from "@/hooks/useAuthCheck";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
	role: string;
};
const PrivateRoute = ({ role }: Props) => {
	return useAuthCheck(role) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
