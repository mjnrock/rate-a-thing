import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IconRating } from "../modules/rat/components/IconRating";

export function Ratings() {
	const [ rating, setRating ] = useState({
		current: 3,
		options: [ 1, 2, 3, 4, 5 ],
	});

	return (
		<>
			<IconRating
				rating={ rating }
				icon={ <BsEmojiSmile /> }
				onHover={ (option) => console.log(option) }
				onSelect={ (option) => {
					const next = {
						...rating,
						current: option,
					};

					console.log(next);
					setRating(next);
				} }
			/>
		</>
	);
};

export default Ratings;