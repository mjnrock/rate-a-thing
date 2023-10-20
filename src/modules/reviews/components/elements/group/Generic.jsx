import { Fragment } from "react";

export function Generic({ map, element, onUpdate, ...rest }) {
	const children = element.value;

	return (
		<Fragment { ...rest }>
			{ children.map((child, i) => map[ child.$type ][ child.$subtype ]({ key: child.$id, element: child, map, onUpdate })) }
		</Fragment>
	);
};

export default Generic;