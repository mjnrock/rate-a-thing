import React, { Fragment } from "react";
import { BsEmojiSmile, BsStar } from "react-icons/bs";
import { IconRating } from "./IconRating";
import { EditableMarkdown } from "./EditableMarkdown";

import Rating from "../lib/Rating";

export function Review({ data, update }) {
	const { ratings } = data;

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
						onSelect={ (option) => update({
							type: "setRatingValue",
							data: {
								id: rating.$id,
								value: option,
							},
						}) }
					/>
				</>
			);
		} else if(rating.$type === Rating.EnumRatingType.MARKDOWN) {
			jsx = (
				<EditableMarkdown
					content={ rating.content }
					index={ i }
					onUpdate={ (i, value) => update({
						type: "setRatingValue",
						data: {
							id: rating.$id,
							value: value,
						},
					}) }
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

export default Review;