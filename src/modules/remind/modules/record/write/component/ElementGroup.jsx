import { Fragment } from "react";
import Element from "./Element";

export function ElementGroup({ update, element, config = {}, map, ...props }) {
	if(!element) {
		return null;
	}

	return (
		<div className="flex flex-col w-full" { ...props }>
			{ element.state.elements.map((el) => (
				<Fragment key={ el.id }>
					<Element update={ update } element={ el } config={ config } map={ map } className="flex-grow" />
				</Fragment>
			)) }
		</div>
	);
};

export default ElementGroup;