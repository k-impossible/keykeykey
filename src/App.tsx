import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductMangePage from "./pages/ProductMangePage";
import PrivateRoute from "./shared/PrivateRoute";

const App = () => {
	return (
		<div className="bg-slate-100 mx-auto mt-3 rounded-t-2xl w-full h-full">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="login" element={<LoginPage />} />
						<Route path="sign-up" element={<SignUpPage />} />
						<Route element={<PrivateRoute role="seller" />}>
							<Route path="product-manage" element={<ProductMangePage />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
