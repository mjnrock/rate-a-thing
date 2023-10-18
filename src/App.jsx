import { Routes, Route } from "react-router-dom";

import Default from "./routes/Default";
import Ratings from "./routes/Ratings";
import Review from "./routes/Review";
import Reviews from "./routes/Reviews";

export function App() {
	return (
		<Routes>
			<Route path="/" element={ <Default /> } />
			<Route path="/ratings" element={ <Review /> } />
			<Route path="/reviews" element={ <Reviews /> } />
		</Routes>
	);
};

export default App;