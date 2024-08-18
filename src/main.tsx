import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { LoadingFull } from "./components/loading/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import FallbackRender from "./pages/common/ErrorPage/fallback.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ErrorBoundary FallbackComponent={FallbackRender}>
		<Suspense fallback={<LoadingFull />}>
			<QueryClientProvider client={queryClient}>
				<HelmetProvider>
					<App />
					<Toaster position="bottom-center" richColors />
				</HelmetProvider>
			</QueryClientProvider>
		</Suspense>
	</ErrorBoundary>
);
