import React, { useState } from "react";
import { BsTrash, BsClipboard, BsInfoCircle } from "react-icons/bs";

import TypeDropdown from "./TypeDropdown";
import AsDropdown from "./AsDropdown";
import RecordTableModal from "../../../../components/RecordTableModal";

export function toComponent(element, map = {}) {
	const { TypeComponentMap, AsComponentMap } = map;

	let as = AsComponentMap?.[ element.type ]?.[ element.as ];
	if(as) {
		return as;
	}

	let type = TypeComponentMap?.[ element.type ];
	if(type) {
		return type;
	}

	if(typeof map.default === "function") {
		return map.default(element);
	}

	return Element;
};

export function Element({ update, element, config, map, ...props }) {
	const [ isEditing, setIsEditing ] = useState(false);
	const [ labelText, setLabelText ] = useState(element?.meta?.label || element.id);
	const [ originalLabelText, setOriginalLabelText ] = useState(element?.meta?.label || element.id);
	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const handleClick = () => {
		setOriginalLabelText(labelText);
		setIsEditing(true);
	};

	const handleChange = (e) => {
		setLabelText(e.target.value);
	};

	const handleUpdate = (newLabel) => {
		if(newLabel !== originalLabelText && newLabel !== element.id) {
			update("setLabel", element.id, newLabel.trim());
		}
	};

	const handleKeyDown = (e) => {
		if(e.key === "Escape") {
			setLabelText(originalLabelText);
			setIsEditing(false);
		} else if(e.key === "Enter") {
			handleUpdate(labelText);
			setIsEditing(false);
		}
	};

	const handleBlur = () => {
		handleUpdate(labelText);
		setIsEditing(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const Component = toComponent(element, map);

	return (
		<div className="flex flex-col flex-grow m-2 ml-0 border border-solid rounded shadow select-none basis-1 border-neutral-200" { ...props }>
			<div className="flex flex-row items-center justify-between w-full gap-x-2">
				<div className="flex flex-row w-1/4 px-2 gap-x-2">
					<TypeDropdown update={ update } element={ element } className="w-1/2" />
					<AsDropdown update={ update } element={ element } className="w-1/2" />
				</div>

				<div className="flex w-3/4 p-2 rounded hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500">
					{ isEditing ? (
						<input type="text" value={ labelText } onChange={ handleChange } onBlur={ handleBlur } onKeyDown={ handleKeyDown } className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200" autoFocus />
					) : (
						<span className="flex-1 w-full font-mono cursor-pointer" onClick={ handleClick }>
							{ labelText }
						</span>
					) }
				</div>

				<div className="flex flex-row items-center justify-end w-1/4 gap-2 p-2">
					<div
						className="flex flex-row items-center justify-center gap-2 p-2 border border-solid rounded shadow-md cursor-pointer select-none text-neutral-400 bg-neutral-100 border-neutral-200 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
						onClick={ (e) => {
							console.table(element);
							openModal(); // Open the modal with the element data
						} }
					>
						<BsInfoCircle size={ "1.5rem" } />
					</div>
					<div
						className="flex flex-row items-center justify-center gap-2 p-2 border border-solid rounded shadow-md cursor-pointer select-none text-neutral-400 bg-neutral-100 border-neutral-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-500 active:bg-emerald-700 active:border-emerald-50 active:text-emerald-50"
						onClick={ (e) => update("duplicateChild", element.id) }
					>
						<BsClipboard size={ "1.5rem" } />
					</div>
					<div
						className="flex flex-row items-center justify-center gap-2 p-2 border border-solid rounded shadow-md cursor-pointer select-none text-neutral-400 bg-neutral-100 border-neutral-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 active:bg-rose-700 active:border-rose-50 active:text-rose-50"
						onClick={ (e) => update("removeElement", element.id) }
					>
						<BsTrash size={ "1.5rem" } />
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full p-2">
				{
					Component !== Element && <Component update={ update } element={ element } config={ config } map={ map } />
				}
			</div>

			{/* Modal */ }
			<RecordTableModal isOpen={ isModalOpen } closeModal={ closeModal } data={ element } />
		</div>
	);
};

export default Element;