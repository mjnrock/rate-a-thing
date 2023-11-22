import GroupElement from "./GroupElement";
import Element from "./Element";
import TypeBar from "./TypeBar";

export function Form({ update, element, ...props }) {
	return (
		<GroupElement update={ update } element={ element } startCollapsed={ false } { ...props }>
			{ (props) => <Element { ...props } /> }
		</GroupElement>
	);
};

export default Form;