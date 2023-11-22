import React, { useState, useEffect } from "react";
import { BsChevronRight, BsChevronUp, BsDash, BsEye, BsEyeSlash, BsPlus } from "react-icons/bs";

import GroupElement from "./GroupElement";
import Element from "./Element";
import EnumElementType from "../../../EnumElementType";

export function Form({ update, element, config = {}, ...props }) {
	return (
		<>
			<div className="flex flex-row items-center justify-between w-full gap-2 p-2 mb-2 border border-solid shadow-md select-none bg-neutral-50 border-neutral-200">
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

			<GroupElement
				update={ update }
				element={ element }
				config={ config }
				{ ...props }
			>
				{ (props) => <Element { ...props } /> }
			</GroupElement>
		</>
	);
};

export default Form;