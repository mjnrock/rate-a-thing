import Rating from "../../lib/Rating";
import Markdown from "../../lib/Markdown";

export const Builder = (entries) => entries.map(entry => {
	const { $type, ...rest } = entry;

	switch($type) {
		case Rating.EnumRatingType.DISCRETE_RANGE:
		case Rating.EnumRatingType.CONTINUOUS_RANGE:
			return Rating.State({ $type, ...rest });
		case Rating.EnumRatingType.MARKDOWN:
			return Markdown.State({ $type, ...rest });
		default:
			return entry;
	}
});

export const test = [
	{
		$type: Rating.EnumRatingType.MARKDOWN,
		$subtype: Markdown.EnumTextType.LABEL,
		content: `**Westview Winery**`,
	},
	{
		$type: Rating.EnumRatingType.DISCRETE_RANGE,
		options: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		current: 3,
		label: `Cider`,
	},
	{
		$type: Rating.EnumRatingType.DISCRETE_RANGE,
		options: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		current: 3,
		label: `Donuts`,
	},
	{
		$type: Rating.EnumRatingType.DISCRETE_RANGE,
		options: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		current: 3,
		label: `Activities`,
	},
	{
		$type: Rating.EnumRatingType.MARKDOWN,
		$subtype: Markdown.EnumTextType.COMMENT,
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget nisl. Nulla euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget nisl.`,
	},
];

export default Builder(test);