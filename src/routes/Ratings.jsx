import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import { BsEmojiSmile, BsStar, BsStarFill } from "react-icons/bs";
import { IconRating } from "../modules/rat/components/IconRating";

const $$ratings = Array(5).fill().map((_, index) => ({
	$id: uuid(),
	current: index + 1,
	options: [ 1, 2, 3, 4, 5 ],
	label: Math.random(),
}));

export function Ratings() {
	const [ ratings, setRatings ] = useState($$ratings);

	const onHover = (index, option) => console.log(option);
	const onSelect = (index, option) => {
		let nextRatings = [ ...ratings ];

		nextRatings[ index ] = {
			...nextRatings[ index ],
			current: option,
		};
		setRatings(nextRatings);
	};

	return (
		<div className="flex flex-col gap-y-1">
			{
				ratings.map((rating, i) => (
					<div
						key={ rating.$id }
						className="flex flex-row"
					>
						<div className="text-2xl flex-1">{ rating.label }</div>
						<IconRating
							className="flex flex-1 gap-1"
							rating={ rating }
							icon={
								i % 2 === 0
									? <BsStar size={ 36 } />
									: <BsEmojiSmile size={ 36 } />
							}
							onHover={ (...args) => onHover(i, ...args) }
							onSelect={ (...args) => onSelect(i, ...args) }
						/>
					</div>
				))
			}
		</div>
	);
};

export default Ratings;