import { BsStar, BsCircle, BsSquare } from "react-icons/bs";

function Rating({ update, element }) {
	const { max, min, step, icon: stateIcon } = element.state;

	const renderIcon = () => {
		switch(stateIcon) {
			case "circle":
				return BsCircle;
			case "square":
				return BsSquare;
			default:
				return BsStar;
		}
	};

	const renderPreview = () => {
		const stars = [];

		for(let i = min; i <= max; i++) {
			let Comp = renderIcon();

			stars.push(
				<Comp key={ i } size={ "3rem" } />
			);
		}

		return stars;
	};

	return (
		<div className="flex flex-col items-center justify-between gap-2 flex-gap">
			<div className="flex flex-row items-center justify-between w-full gap-2">
				<div className="w-full p-2">
					<div className="flex flex-1">Min</div>
					<input type="number" max={ max } step={ step } value={ min } onChange={ e => update("mergeElementState", element.id, { min: +e.target.value }) } className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200" />
				</div>
				<div className="w-full p-2">
					<div className="flex flex-1">Max</div>
					<input type="number" min={ min } step={ step } value={ max } onChange={ e => update("mergeElementState", element.id, { max: +e.target.value }) } className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200" />
				</div>
			</div>
			<div className="flex flex-row items-center justify-between w-full gap-2">
				<div className="w-full p-2">
					<div className="flex flex-1">Icon</div>
					<select value={ stateIcon } onChange={ e => update("mergeElementState", element.id, { icon: e.target.value }) } className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200">
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