import React from "react";
import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import EnumElementType from "../../../EnumElementType";

export const TypeDropdown = ({ update, element, ...props }) => {
	const Options = Object.keys(EnumElementType).sort();

	const getDropdownPosition = () => {
		if(window.innerWidth < 640) {
			return "left-0";
		}
		return "right-0";
	};

	return (
		<Menu as="div" className="relative inline-block text-left" { ...props }>
			<Menu.Button className="flex flex-row items-center justify-between w-full p-2 m-2 overflow-x-auto border border-solid rounded shadow cursor-pointer text-neutral-500 border-neutral-200 bg-neutral-100 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200">
				<span className="font-bold">{ element.type }</span>
				<BsChevronDown className="ml-2" />
			</Menu.Button>

			<Menu.Items className={ `absolute z-10 w-56 mt-2 origin-top-${ getDropdownPosition() } bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none` }>
				{ Options.map(key => (
					<Menu.Item key={ key }>
						{ ({ active }) => (
							<div
								className={ `${ active ? "bg-sky-50 text-sky-500 font-bold" : "text-neutral-500" } py-2 px-4 group flex rounded items-center w-full cursor-pointer ` + (element.type === EnumElementType[ key ] ? "font-bold" : "") }
								onClick={ () => update("changeElementType", element.id, EnumElementType[ key ]) }
							>
								{ key.toLowerCase() }
							</div>
						) }
					</Menu.Item>
				)) }
			</Menu.Items>
		</Menu>
	);
};

export default TypeDropdown;