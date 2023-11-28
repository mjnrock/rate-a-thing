import { BsStar, BsCircle, BsSquare } from "react-icons/bs";

export function Range({ update, element, maps, icon, isPlayful = true }) {
	const { recordDispatch } = update;
	const { data: dataMap } = maps;
	const { max, min, step, icon: stateIcon } = element.state;
	let { value } = element.state;

	if(dataMap[ element.id ]) {
		value = dataMap[ element.id ];
	}

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
					onClick={ e => recordDispatch("mergeData", element.id, i) }
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