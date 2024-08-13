import { Suspense } from "react";
import Index from "./router/Index";
import { LoadingFull } from "./components/loading/Loading";

const App = () => {
	return (
		<div className="bg-slate-100 mx-auto mt-5 rounded-t-3xl">
			<Suspense fallback={<LoadingFull />}>
				<Index />
			</Suspense>
		</div>
	);
};

export default App;
