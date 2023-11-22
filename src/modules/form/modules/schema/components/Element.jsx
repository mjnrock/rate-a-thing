import React, { useState, useEffect } from "react";
import { BsList, BsTrash } from "react-icons/bs";

import EnumElementType from "../../../EnumElementType";
import TypeBar from "./TypeBar";
import TypeDropdown from "./TypeDropdown";

export function Element({ update, element, ...props }) {
	const [ isEditing, setIsEditing ] = useState(false);
	const [ labelText, setLabelText ] = useState(element?.meta?.label || element.id);
	const [ originalLabelText, setOriginalLabelText ] = useState(element?.meta?.label || element.id);

	const handleClick = () => {
		setOriginalLabelText(labelText); // Store the original value before editing
		setIsEditing(true);
	};

	const handleChange = (e) => {
		setLabelText(e.target.value);
	};

	const handleUpdate = (newLabel) => {
		if(newLabel !== originalLabelText && newLabel !== element.id) {
			update("setLabel", element.id, newLabel);
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

	return (
		<div className="flex flex-col flex-grow p-2 m-2 border border-solid rounded shadow cursor-pointer select-none basis-1 border-neutral-200" { ...props }>
			<div className="flex flex-row items-center justify-between w-full gap-x-2">
				<BsList
					className="p-2 rounded cursor-grab text-neutral-400 hover:text-neutral-600 active:text-neutral-800"
					size={ "3rem" }
				/>

				<TypeDropdown
					update={ update }
					element={ element }
				/>

				<div className="flex w-full p-2 rounded hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500">
					{
						isEditing ? (
							<input
								type="text"
								value={ labelText }
								onChange={ handleChange }
								onBlur={ handleBlur }
								onKeyDown={ handleKeyDown }
								className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md cursor-pointer select-none text-neutral-600 border-neutral-200"
								autoFocus
							/>
						) : (
							<span className="flex-1 w-full font-mono" onClick={ handleClick }>
								{ labelText }
							</span>
						)
					}
				</div>

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