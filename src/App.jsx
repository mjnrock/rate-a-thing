import { Routes, Route } from "react-router-dom";

import Default from "./routes/Default";
import Ratings from "./routes/Ratings";
import Review from "./routes/Review";

export function App() {
	return (
		<Routes>
			<Route path="/" element={ <Default /> } />
			<Route path="/ratings" element={ <Review /> } />
		</Routes>
	);
};

export default App;