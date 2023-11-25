import React from "react";
import { BsStar, BsCircle, BsSquare, BsCircleFill, BsSquareFill, BsStarFill } from "react-icons/bs";
import { GridForm } from "../../../../../components/GridForm";
import { RatingSchema } from "../../../../../models/input/Rating";


function Rating({ update, element }) {
	const { max, min, step, icon: stateIcon } = element.state;

	const renderIcon = (icon) => {
		switch(icon ?? stateIcon) {
			case "circle":
				return BsCircle;
			case "circle-fill":
				return BsCircleFill;
			case "square":
				return BsSquare;
			case "square-fill":
				return BsSquareFill;
			case "star-fill":
				return BsStarFill;
			default:
				return BsStar;
		}
	};

	const renderPreview = () => {
		const stars = [];

		for(let i = min; i <= max; i++) {
			let Comp = renderIcon(i <= element.state.value ? stateIcon + "-fill" : stateIcon);

			stars.push(
				<Comp
					className={ `cursor-pointer hover:text-amber-300 active:text-amber-400 ` + (i <= element.state.value ? "text-neutral-500" : "text-neutral-300") }
					onClick={ e => update("setElementValue", element.id, Math.min(Math.max(i, min), max)) }
					key={ i }
					size={ "3rem" }
				/>
			);
		}

		return stars;
	};

	const handleRatingUpdate = (key, value) => {
		if(key === "value") {
			update("setElementValue", element.id, value);
		} else {
			const newValue = key === "min"
				? Math.max(value, element.state.value)
				: Math.min(value, element.state.value);
			update("mergeElementState", element.id, { [ key ]: value, value: newValue });
		}
	};

	return (
		<div className="flex flex-col items-center justify-between gap-2">
			<GridForm
				schema={ RatingSchema }
				state={ element.state }
				update={ handleRatingUpdate }
				columns={ 2 }
			>
				<div className="flex flex-row items-center justify-center w-full gap-2 p-2 overflow-x-auto">
					{ renderPreview() }
				</div>
			</GridForm>
		</div>
	);
}

export default Rating;