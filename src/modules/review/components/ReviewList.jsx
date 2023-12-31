import Review from "../../review/components/Review";

import ReviewJS from "../../review/lib/Review";

export function ReviewList({ data, update }) {
	const dispatch = ({ type, data }, review) => {
		let next = ReviewJS.Reducers[ type ](review, data);

		update({
			type: "updateReview",
			data: {
				id: review.$id,
				value: next,
			}
		});
	};

	return (
		<div className="flex flex-col gap-y-1">
			{
				data.reviews.map((review, i) => (
					<Review
						key={ i }
						data={ review }
						update={ (msg) => dispatch(msg, review) }
					/>
				))
			}
		</div>
	);
};

export default ReviewList;