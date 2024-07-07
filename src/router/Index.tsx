import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/common/HomePage";
import LoginPage from "@/pages/common/LoginPage";
import ProductMangePage from "@/pages/admin/ProductMangePage";
import SignUpPage from "@/pages/common/SignUpPage";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import OrderManagePage from "@/pages/admin/OrderMangePage";
import ErrorPage from "@/pages/common/ErrorPage";
import ProductListPage from "@/pages/common/ProductListPage";
import ProductDetailPage from "@/pages/common/ProductDetailPage";
import OrderListPage from "@/pages/user/OrderListPage";
import OrderPage from "@/pages/user/OrderPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			{/* common */}
			<Route index element={<HomePage />} />
			<Route path="*" element={<ErrorPage />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="sign-up" element={<SignUpPage />} />
			<Route path="products/:id" element={<ProductListPage />} />
			<Route path="product/:category/:id" element={<ProductDetailPage />} />
			{/* only user */}
			<Route element={<PrivateRoute role="user" />}>
				<Route path="order" element={<OrderPage />} />
				<Route path="orders" element={<OrderListPage />} />
			</Route>
			{/* only admin */}
			<Route element={<PrivateRoute role="admin" />}>
				<Route path="product-manage" element={<ProductMangePage />} />
				<Route path="order-manage" element={<OrderManagePage />} />
			</Route>
		</Route>
	)
);

const Index = () => {
	return <RouterProvider router={router} />;
};

export default Index;
