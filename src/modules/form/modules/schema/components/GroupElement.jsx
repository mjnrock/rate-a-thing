import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsList } from "react-icons/bs"; // Import BsList

import TypeBar from "./TypeBar";

export function GroupElement({ update, element, children, startCollapsed, ...props }) {
	const onDragEnd = (result) => {
		if(!result.destination) return;
		if(result.destination.index === result.source.index) return;

		update("moveChildToIndex", element.id, element.state.elements[ result.source.index ].id, result.destination.index);
	};

	return (
		<div className="flex flex-col w-full" { ...props }>
			<DragDropContext onDragEnd={ onDragEnd }>
				<Droppable droppableId={ element.id }>
					{ (provided) => (
						<div { ...provided.droppableProps } ref={ provided.innerRef }>
							{ element.state.elements.map((el, index) => (
								<Draggable key={ el.id } draggableId={ el.id } index={ index }>
									{ (provided, snapshot) => (
										<div ref={ provided.innerRef } { ...provided.draggableProps } className="flex flex-row items-start">
											<span { ...provided.dragHandleProps } className="flex p-2 m-2 mr-3 border border-solid rounded border-neutral-200 text-neutral-300 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-300 hover:text-neutral-500 active:bg-neutral-700 active:border-neutral-50 active:text-neutral-50">
												<BsList size={ "2rem" } />
											</span>
											{ children({ update, element: el }) }
										</div>
									) }
								</Draggable>
							)) }
							{ provided.placeholder }
						</div>
					) }
				</Droppable>
			</DragDropContext>
			<TypeBar
				update={ update }
				element={ element }
				startCollapsed={ startCollapsed }
			/>
		</div>
	);
}

export default GroupElement;
