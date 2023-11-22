import React from "react";
import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import EnumElementType from "../../../EnumElementType";

export const TypeDropdown = ({ update, element, ...props }) => {
	// Function to determine if the dropdown should open to the left or right
	const getDropdownPosition = () => {
		if(window.innerWidth < 640) { // You can adjust this threshold as needed
			return "left-0";
		}
		return "right-0";
	};

	return (
		<Menu as="div" className="relative inline-block text-left" {...props}>
			<Menu.Button className="flex flex-row items-center justify-start p-2 m-2 overflow-x-auto border border-solid rounded shadow cursor-pointer text-neutral-500 border-neutral-200 bg-neutral-100 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200">
				<span className="font-bold">{ element.type }</span>
				<BsChevronDown className="ml-2" />
			</Menu.Button>

			<Menu.Items className={ `absolute z-10 w-56 mt-2 origin-top-${ getDropdownPosition() } bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none` }>
				{ Object.keys(EnumElementType).map(key => (
					<Menu.Item key={ key }>
						{ ({ active }) => (
							<div
								className={ `${ active ? "bg-sky-50 text-sky-500" : "text-neutral-500" } group flex rounded-md items-center w-full p-2 cursor-pointer` }
								onClick={ () => update("changeElementType", element.id, EnumElementType[ key ]) }
							>
								{ key }
							</div>
						) }
					</Menu.Item>
				)) }
			</Menu.Items>
		</Menu>
	);
};

export default TypeDropdown;