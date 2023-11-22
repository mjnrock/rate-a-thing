import { Element } from "./Element";
import { TypeBar } from "./TypeBar";

export function Form({ update, element, ...props }) {
	return (
		<div className="flex flex-col" { ...props }>
			{
				element.state.elements.map((el, i) => {
					return (
						<Element
							key={ el.id }
							update={ update }
							element={ el }
						/>
					)
				})
			}
			<TypeBar
				update={ update }
				element={ element }
				startCollapsed={ false }
			/>
		</div>
	);
};

export default Form;