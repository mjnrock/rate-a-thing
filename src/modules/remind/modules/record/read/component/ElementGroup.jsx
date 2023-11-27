import { Fragment } from "react";
import Element from "./Element";

export function ElementGroup({ update, element, config = {}, maps, ...props }) {
	return (
		<div className="flex flex-col w-full" { ...props }>
			{ element.state.elements.map((el) => (
				<Fragment key={ el.id }>
					<Element update={ update } element={ el } config={ config } maps={ maps } className="flex-grow" />
				</Fragment>
			)) }
		</div>
	);
};

export default ElementGroup;