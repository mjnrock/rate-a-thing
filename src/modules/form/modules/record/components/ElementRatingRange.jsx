import React, { useState } from "react";
import { BsStar, BsCircle, BsSquare } from "react-icons/bs";

function ElementRatingRange({ update, element, icon }) {
	const { value, max, min, step, icon: stateIcon } = element.state;
	const [ hoverValue, setHoverValue ] = useState(null);

	let Icon = icon ?? BsStar;
	if(stateIcon === "star") {
		Icon = BsStar;
	} else if(stateIcon === "circle") {
		Icon = BsCircle;
	} else if(stateIcon === "square") {
		Icon = BsSquare;
	}

	const changeRating = (newValue) => {
		if(newValue >= min && newValue <= max) {
			update("setElementValue", element.id, newValue);
		}
	};

	const renderStars = () => {
		let stars = [];
		for(let i = 1; i <= max; i += step) {
			stars.push(
				<Icon
					key={ i }
					className={ `cursor-pointer text-4xl ${ i <= (hoverValue || value) ? "text-yellow-500" : "text-gray-300" }` }
					onMouseEnter={ () => setHoverValue(i) }
					onMouseLeave={ () => setHoverValue(null) }
					onClick={ () => changeRating(i) }
					size={ "3rem" }
				/>
			);
		}
		return stars;
	};

	return (
		<div className="flex flex-row items-center justify-center w-full h-full gap-2">
			{ renderStars() }
		</div>
	);
}

export default ElementRatingRange;