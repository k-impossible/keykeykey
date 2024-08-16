import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<HelmetProvider>
			<App />
		</HelmetProvider>
		<Toaster position="bottom-center" richColors />
	</QueryClientProvider>
);
