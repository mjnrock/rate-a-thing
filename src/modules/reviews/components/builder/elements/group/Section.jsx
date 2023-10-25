import { Fragment } from "react";
import { Element } from "../Element";

export function Section({ map, element, onUpdate, ...rest }) {
	const children = element.value;

	return (
		<Fragment { ...rest }>
			<div className="mt-4 text-xl">{ element?.name }</div>
			{ children.map((child, i) => {
				return (
					<Element
						key={ child.$id }
						element={ child }
						map={ map }
						onUpdate={ onUpdate }
					/>
				);
			}) }
		</Fragment>
	);
};

export default Section;