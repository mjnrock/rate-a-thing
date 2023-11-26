import Element from "./Element";

export function ElementGroup({ update, element, config = {}, map, ...props }) {
	return (
		<div className="flex flex-col w-full" { ...props }>
			{ element.state.elements.map((el) => (
				<Element update={ update } element={ el } config={ config } map={ map } className="flex-grow" />
			)) }
		</div>
	);
};

export default ElementGroup;
