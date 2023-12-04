import { BsStar, BsCircle, BsSquare } from "react-icons/bs";
import { writeHelper } from "../../../util/helper";

export function Range({ update, element, maps, icon, isPlayful = true }) {
	let { state: { value, max, min, step, icon: stateIcon }, dataDispatcher } = writeHelper({ update, element, maps });

	let Icon = icon ?? BsStar;
	if(stateIcon === "star") {
		Icon = BsStar;
	} else if(stateIcon === "circle") {
		Icon = BsCircle;
	} else if(stateIcon === "square") {
		Icon = BsSquare;
	}

	const renderStars = () => {
		let stars = [];
		for(let i = 1; i <= max; i += step) {
			const rotationDegree = Math.floor(Math.random() * 360);

			stars.push(
				<Icon
					key={ i }
					className={ `cursor-pointer text-4xl ${ i <= value ? "text-yellow-500 hover:text-yellow-600" : "text-gray-300 hover:text-gray-400" }` }
					style={ isPlayful && { transform: `rotate(${ rotationDegree }deg)` } }
					size={ "3rem" }
					onClick={ e => dataDispatcher({
						...element.state,
						value: i,
					}, true) }
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

export default Range;