import { Element } from "../Element";

export function Section({ map, element, onUpdate, ...rest }) {
	const children = element.value;

	return (
		<div
			// className="flex flex-col w-full p-4 bg-white border-l-2 rounded gap-y-10 border-l-indigo-300"
			className="flex flex-col w-full p-4 bg-neutral-50 border rounded shadow-md gap-y-10 border-neutral-100"
			{ ...rest }
		>
			{ children.map((child, i) => {
				return (
					<Element
						key={ i }
						element={ child }
						map={ map }
						onUpdate={ onUpdate }
					/>
				);
			}) }
		</div>
	);
};

export default Section;