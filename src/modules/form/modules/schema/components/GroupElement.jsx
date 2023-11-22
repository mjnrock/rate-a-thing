import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
									{ (provided) => (
										<div ref={ provided.innerRef } { ...provided.draggableProps } { ...provided.dragHandleProps }>
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
				startCollapsed={ startCollapsed}
			/>
		</div>
	);
}

export default GroupElement;