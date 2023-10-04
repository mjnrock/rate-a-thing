import Rating from "../../lib/Rating";
import Markdown from "../../lib/Markdown";

export const test = [
	Markdown.State({
		type: Markdown.EnumTextType.LABEL,
		content: `**Westview Winery**`,
	}),
	Rating.State({
		$type: Rating.EnumRatingType.DISCRETE_RANGE,
		options: [ 1, 2, 3, 4, 5 ],
		current: 3,
		label: `Cider`,
	}),
	Rating.State({
		$type: Rating.EnumRatingType.DISCRETE_RANGE,
		options: [ 1, 2, 3, 4, 5 ],
		current: 3,
		label: `Donuts`,
	}),
	Rating.State({
		$type: Rating.EnumRatingType.DISCRETE_RANGE,
		options: [ 1, 2, 3, 4, 5 ],
		current: 3,
		label: `Activities`,
	}),
	Markdown.State({
		type: Markdown.EnumTextType.COMMENT,
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget nisl. Nulla euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget nisl.`,
	}),
];