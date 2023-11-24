import { BsChevronRight, BsChevronUp } from "react-icons/bs";

import { EnumElementType, EnumFormElementType } from "../../../EnumElementType";
import ElementGroup from "./ElementGroup";
import Element from "./Element";

import Elements from "./elements/package";

export const ElementComponentMap = {
	[ EnumElementType.GROUP ]: (element) => {
		if(element.as === EnumFormElementType[ EnumElementType.GROUP ].FORM) {
			return ElementForm;
		}

		return ElementGroup;
	},
	[ EnumElementType.INPUT ]: (element) => {
		if(element.as === EnumFormElementType[ EnumElementType.INPUT ].RATING) {
			return Elements.Input.Rating;
		}

		return Element;
	},
	default: (element) => Element,
};

export function ElementForm({ update, element, config = {}, ...props }) {
	return (
		<>
			<div className="flex flex-row items-center justify-between w-full gap-2 p-2 mb-2 border border-b border-solid shadow-md select-none bg-neutral-50 border-neutral-200 border-b-neutral-100 ">
				{
					element.state.elements.some(el => el.type === EnumElementType.GROUP) ? (
						<button
							className="flex flex-row items-center p-2 border-2 border-solid rounded cursor-pointer border-neutral-200 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 text-neutral-400 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
							onClick={ e => {
								update("toggleConfigSetting", "isCollapsed");
							} }
						>
							{ config.isCollapsed ? <BsChevronRight size={ "1.25rem" } /> : <BsChevronUp size={ "1.25rem" } /> }
						</button>
					) : <div className="flex p-2">&nbsp;</div>
				}
			</div>

			<ElementGroup
				update={ update }
				element={ element }
				config={ config }
				map={ ElementComponentMap }
				{ ...props }
			/>
		</>
	);
};

export default ElementForm;