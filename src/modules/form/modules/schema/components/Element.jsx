import { BsTrash } from "react-icons/bs";
import EnumElementType from "../../../EnumElementType";
import TypeBar from "./TypeBar";

export function Element({ update, element, ...props }) {
	return (
		<div className="flex flex-col flex-grow p-2 m-2 border border-solid rounded shadow cursor-pointer select-none basis-1 border-neutral-200" { ...props }>
			<div className="flex flex-row items-center w-full">
				<span className="flex flex-1 font-bold">{ element.type }</span>
				<span className="flex flex-1 font-mono">{ element.id }</span>
				<div
					className="flex flex-row items-center justify-center p-2 m-2 border border-solid rounded shadow-md cursor-pointer select-none text-neutral-600 bg-neutral-100 border-neutral-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 active:bg-rose-700 active:border-rose-50 active:text-rose-50"
					onClick={ e => {
						update("removeElement", element.id);
					} }
				>
					<BsTrash />
				</div>
			</div>
			{
				element.type === EnumElementType.GROUP && (
					<div className="flex flex-col w-full">
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
						/>
					</div>
				)
			}
		</div>
	);
};

export default Element;