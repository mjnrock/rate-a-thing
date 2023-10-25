import { Fragment } from "react";

export function Review({ map, element, onUpdate, ...rest }) {
	const children = element.value;

	return (
		<Fragment { ...rest }>
			<div className="mt-4 text-xl">{ element?.name }</div>
			{ children.map((child, i) => {
				return (
					<div
						key={ child.$id }
						className="flex flex-col w-full gap-2 p-4 bg-white border border-gray-100 rounded shadow"
					>
						{ map[ child.$type ][ child.$subtype ]({ key: child.$id, element: child, map, onUpdate }) }
					</div>
				);
			}) }
		</Fragment>
	);
};

export default Review;