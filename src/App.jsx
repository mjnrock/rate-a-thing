import { Routes, Route } from "react-router-dom";

import Default from "./routes/Default";
import Ratings from "./routes/Ratings";

export function App() {
	return (
		<Routes>
			<Route path="/" element={ <Default /> } />
			<Route path="/ratings" element={ <Ratings /> } />
		</Routes>
	);
};

export default App;