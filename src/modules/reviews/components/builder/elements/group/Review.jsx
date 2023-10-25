import { Fragment } from "react";

export function Review({ map, element, onUpdate, dispatch, ...rest }) {
	const children = element.value;

	return (
		<Fragment { ...rest }>
			<div className="mt-4 text-xl">{ element?.name }</div>
			<div
				// className="flex flex-col w-full gap-2 p-4 bg-white border-l-2 rounded border-l-violet-300"
				className="flex flex-col w-full gap-2 p-4 bg-white border rounded shadow-lg border-neutral-100"
			>
				{ children.map((child, i) => {
					return map[ child.$type ][ child.$subtype ]({ key: i, element: child, map, onUpdate, dispatch });
				}) }
			</div>
		</Fragment>
	);
};

export default Review;