import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";

const Layout = lazy(() => import("@/components/layout/Layout"));
const HomePage = lazy(() => import("@/pages/common/HomePage"));
const LoginPage = lazy(() => import("@/pages/common/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/common/SignUpPage"));
const ErrorPage = lazy(() => import("@/pages/common/ErrorPage"));
const ProductListPage = lazy(() => import("@/pages/common/ProductListPage"));
const ProductDetailPage = lazy(
	() => import("@/pages/common/ProductDetailPage")
);
const ProductMangePage = lazy(() => import("@/pages/admin/ProductMangePage"));
const OrderManagePage = lazy(() => import("@/pages/admin/OrderMangePage"));
const OrderListPage = lazy(() => import("@/pages/user/OrderListPage"));
const OrderPage = lazy(() => import("@/pages/user/OrderPage"));
const SuccessPage = lazy(
	() => import("@/pages/user/OrderPage/checkout/SuccessPage")
);
const FailPage = lazy(() => import("@/pages/user/OrderPage/checkout/FailPage"));

// import Layout from "@/components/layout/Layout";
// import HomePage from "@/pages/common/HomePage";
// import LoginPage from "@/pages/common/LoginPage";
// import ProductMangePage from "@/pages/admin/ProductMangePage";
// import OrderManagePage from "@/pages/admin/OrderMangePage";
// import SignUpPage from "@/pages/common/SignUpPage";
// import ErrorPage from "@/pages/common/ErrorPage";
// import ProductListPage from "@/pages/common/ProductListPage";
// import ProductDetailPage from "@/pages/common/ProductDetailPage";
// import OrderListPage from "@/pages/user/OrderListPage";
// import OrderPage from "@/pages/user/OrderPage";
// import SuccessPage from "@/pages/user/OrderPage/checkout/SuccessPage";
// import FailPage from "@/pages/user/OrderPage/checkout/FailPage";

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
				<Route path="order/success" element={<SuccessPage />} />
				<Route path="order/fail" element={<FailPage />} />
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
