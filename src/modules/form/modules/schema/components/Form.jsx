import EnumElementType from "../../../EnumElementType";
import TypeBar from "./TypeBar";

export function Form({ element }) {
	return (
		<>
			<div className="flex flex-row">
				{
					element.elements.map((e, i) => {
						return (
							<div
								key={ `form-element-${ i }` }
								className="flex flex-row p-2 m-2 border border-solid rounded shadow cursor-pointer select-none border-neutral-200 hover:bg-sky-100 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
								onClick={ e => {

								} }
							>
								<Element element={ e } />
							</div>
						)
					})
				}
			</div>
		</>
	);
};

export default Form;