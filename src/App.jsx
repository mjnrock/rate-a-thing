import { Routes, Route } from "react-router-dom";

import Default from "./routes/Default";
import Review_0_1_0 from "./routes/Review-0.1.0";
import Review_0_2_0 from "./routes/Review-0.2.0";
import Review_0_3_0 from "./routes/Review-0.3.0";

export function App() {
	return (
		<Routes>
			<Route path="/" element={ <Default /> } />
			<Route path="/review-0.1.0" element={ <Review_0_1_0 /> } />
			<Route path="/review-0.2.0" element={ <Review_0_2_0 /> } />
			<Route path="/review-0.3.0" element={ <Review_0_3_0 /> } />
		</Routes>
	);
};

export default App;