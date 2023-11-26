import React from "react";

export function Heading({ update, element }) {
	const { value, size } = element.state;

	const hToTw = {
		h1: "text-4xl",
		h2: "text-3xl",
		h3: "text-2xl",
		h4: "text-xl",
		h5: "text-lg",
		h6: "text-base",
	};

	return (
		<div className="flex flex-row items-center justify-center w-full h-full gap-2">
			{ React.createElement(size, { className: hToTw[ size ] }, value) }
		</div>
	);
}

export default Heading;