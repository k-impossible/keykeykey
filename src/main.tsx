import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import FallbackRender from "./pages/common/ErrorPage/fallback.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ErrorBoundary FallbackComponent={FallbackRender}>
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<App />
				<Toaster position="bottom-center" richColors />
			</HelmetProvider>
		</QueryClientProvider>
	</ErrorBoundary>
);
