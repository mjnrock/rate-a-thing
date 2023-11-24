import { BsStar, BsCircle, BsSquare, BsCircleFill, BsSquareFill, BsStarFill } from "react-icons/bs";

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

	return (
		<div className="flex flex-col items-center justify-between gap-2 flex-gap">
			<div className="flex flex-row items-center justify-between w-full gap-2">
				<div className="w-full p-2">
					<div className="flex flex-1">Min</div>
					<input
						type="number"
						max={ max }
						step={ step }
						value={ min }
						onChange={ e => update("mergeElementState", element.id, { min: +e.target.value, value: Math.max(+e.target.value, element.state.value) }) }
						className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200"
					/>
				</div>
				<div className="w-full p-2">
					<div className="flex flex-1">Max</div>
					<input
						type="number"
						min={ min }
						step={ step }
						value={ max }
						onChange={ e => update("mergeElementState", element.id, { max: +e.target.value, value: Math.min(+e.target.value, element.state.value) }) }
						className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200"
					/>
				</div>
			</div>
			<div className="flex flex-row items-center justify-between w-full gap-2">
				<div className="w-full p-2">
					<div className="flex flex-1">Icon</div>
					<select
						value={ stateIcon }
						onChange={ e => update("mergeElementState", element.id, { icon: e.target.value }) }
						className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200"
					>
						<option value="star">Star</option>
						<option value="circle">Circle</option>
						<option value="square">Square</option>
					</select>
				</div>
				<div className="flex flex-row items-center justify-center w-full h-full gap-2 p-2 overflow-x-auto align-middle text-neutral-400">
					{ renderPreview() }
				</div>
			</div>
		</div>
	);
}

export default Rating;