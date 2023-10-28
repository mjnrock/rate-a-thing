import React, { Fragment, useEffect, useState } from "react";
import { BsEmojiSmile, BsStar } from "react-icons/bs";
import { IconRating } from "../modules/review-0.1.0/components/IconRating";
import { EditableMarkdown } from "../modules/review-0.1.0/components/EditableMarkdown";

import $$ratings from "../modules/review-0.1.0/data/reviews/test.schema";
import Rating from "../modules/review-0.1.0/lib/Rating";

//TODO: Confer FK Studio on flux paradigm, implement here
//FIXME: Nothing persists, because there is no meaningful state management yet

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

	const handleContentUpdate = (index, newContent) => {
		let nextRatings = [ ...ratings ];
		nextRatings[ index ] = {
			...nextRatings[ index ],
			content: newContent,
		};
		setRatings(nextRatings);
	};

	useEffect(() => {
		// console.log(JSON.stringify(ratings, null, 2));
	}, [ ratings ]);

	const getJSX = (rating, i) => {
		let jsx = null;

		if(rating.$type === Rating.EnumRatingType.DISCRETE_RANGE) {
			jsx = (
				<>
					<div className="text-2xl flex-1">{ rating.label }</div>
					<IconRating
						className="flex flex-1 gap-1 cursor-pointer"
						rating={ rating }
						icon={
							i % 2 === 0
								? <BsStar size={ 36 } />
								: <BsEmojiSmile size={ 36 } />
						}
						onHover={ (...args) => onHover(i, ...args) }
						onSelect={ (...args) => onSelect(i, ...args) }
					/>
				</>
			);
		} else if(rating.$type === Rating.EnumRatingType.MARKDOWN) {
			jsx = (
				<EditableMarkdown
					content={ rating.content }
					index={ i }
					onUpdate={ handleContentUpdate }
				/>
			);
		} else if(rating.$type === Rating.EnumRatingType.GROUP) {
			jsx = (
				<div className="flex flex-col gap-y-1">
					{
						rating.children.map((rating, i) => (
							<div
								key={ i }
								className="flex flex-row"
							>
								{ getJSX(rating, i) }
							</div>
						))
					}
				</div>
			);
		} else if(Array.isArray(rating)) {
			jsx = (
				<div className="flex flex-col gap-y-1">
					{
						rating.map((rating, i) => (
							<div
								key={ i }
								className="flex flex-row"
							>
								{ getJSX(rating, i) }
							</div>
						))
					}
				</div>
			);
		}

		return jsx;
	};

	return (
		<div className="flex flex-col gap-y-1">
			{
				ratings.map((rating, i) => (
					<Fragment key={ i }>{ getJSX(rating, i) }</Fragment>
				))
			}
		</div>
	);
}

export default Ratings;