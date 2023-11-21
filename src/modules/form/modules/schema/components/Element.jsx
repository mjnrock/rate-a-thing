import EnumElementType from "../../../EnumElementType";
import TypeBar from "./TypeBar";

export function Element({ update, element }) {
	return (
		<>
			<span className="font-bold">{ element.type }</span>
			&nbsp;
			<span className="font-mono">{ element.id }</span>
			{
				element.type === EnumElementType.GROUP && (
					<>
						<div className="flex flex-col">
							{
								element.state.elements.map((e, i) => {
									return (
										<div
											key={ `form-element-${ i }` }
											className="flex flex-row p-2 m-2 border border-solid rounded shadow cursor-pointer select-none border-neutral-200 hover:bg-sky-100 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
											onClick={ e => {

											} }
										>
											<Element
												update={ update }
												element={ e }
											/>
										</div>
									)
								})
							}
							<TypeBar
								update={ update }
								element={ element }
							/>
						</div>
					</>
				)
			}
		</>
	);
};

export default Element;