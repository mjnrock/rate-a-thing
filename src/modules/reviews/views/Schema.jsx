export function Schema({ data, update }) {
	const { reviewsState } = data;
	const { reviewsDispatch } = update;

	console.log(reviewsState);

	return (
		<div>
			Query
		</div>
	);
};

export default Schema;