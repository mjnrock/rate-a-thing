import React, { useState } from "react";

export function IconRating({
	rating,
	icon = null,
	onHover = () => { },
	onSelect = () => { },
	...props
}) {
	const { current, options } = rating;
	const [ hoverIndex, setHoverIndex ] = useState(-1);

	const getIconClass = (index, isFilled, isHovered) => {
		if(!options[ index ]) {
			return "text-gray-300"; // Disabled
		} else if(isFilled && !isHovered) {
			return "text-yellow-300"; // Active, no hover
		} else if(isFilled && isHovered) {
			return "text-yellow-400"; // Active, hover
		} else if(!isFilled && !isHovered) {
			return "text-gray-300"; // Not active, no hover
		} else if(!isFilled && isHovered) {
			return "text-yellow-400"; // Not active, hover
		}
	};

	const renderIcon = (isFilled, isHovered, index) => {
		const className = getIconClass(index, isFilled, isHovered);

		if(icon) {
			return React.cloneElement(icon, { className });
		}

		return (
			<div className={ className }>
				{/* Default to a star icon */ }
				★
			</div>
		);
	};

	return (
		<div className="flex" { ...props }>
			{ options.map((option, index) => {
				const isFilled = hoverIndex !== -1 ? index <= hoverIndex : index < current;
				const isHovered = index <= hoverIndex;

				return (
					<span
						key={ index }
						onMouseEnter={ () => {
							setHoverIndex(index);
							onHover(option);
						} }
						onMouseLeave={ () => setHoverIndex(-1) }
						onClick={ () => onSelect(option) }
					>
						{ renderIcon(isFilled, isHovered, index) }
					</span>
				);
			}) }
		</div>
	);
}

export default IconRating;