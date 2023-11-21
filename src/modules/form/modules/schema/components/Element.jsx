import EnumElementType from "../../../EnumElementType";
import TypeBar from "./TypeBar";

export function Element({ update, element, ...props }) {
	return (
		<div className="flex flex-col items-start flex-grow basis-1" { ...props }>
			<span className="font-bold basis-1">{ element.type }</span>
			&nbsp;
			<span className="font-mono basis-1">{ element.id }</span>
			{
				element.type === EnumElementType.GROUP && (
					<div className="flex flex-col w-full">
						{
							element.state.elements.map((e, i) => {
								return (
									<div
										key={ e.id }
										className="flex flex-row flex-grow p-2 m-2 border border-solid rounded shadow cursor-pointer select-none basis-1 border-neutral-200 hover:bg-sky-100 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
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
				)
			}
		</div>
	);
};

export default Element;