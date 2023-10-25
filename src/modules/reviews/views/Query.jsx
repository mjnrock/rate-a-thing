import EnumElementType from "../lib/EnumElementType";
import EnumElementSubType from "../lib/EnumElementSubType";
import ReviewJSX from "../components/finder/elements/group/Review";
import SectionJSX from "../components/finder/elements/group/Section";
import HeadingJSX from "../components/finder/elements/markdown/Heading";
import ContentJSX from "../components/finder/elements/markdown/Content";

export const JSXMap = {
	[ EnumElementType.Group ]: {
		[ EnumElementSubType.Group.Review ]: ReviewJSX,
		[ EnumElementSubType.Group.Section ]: SectionJSX,
	},
	[ EnumElementType.Markdown ]: {
		[ EnumElementSubType.Markdown.Heading ]: HeadingJSX,
		[ EnumElementSubType.Markdown.Content ]: ContentJSX,
	},
};

export function Query({ data, update }) {
	const { reviewsState } = data;
	const { reviewsDispatch } = update;

	const records = Object.values(reviewsState.records);
	const active = reviewsState.records[ reviewsState.active[ 0 ] ];

	console.log(reviewsState);
	console.log(active);

	return (
		<div>
			<input
				type="text"
				className="w-full px-3 py-2 mt-1 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
				placeholder="Search"
			/>
			{
				records.map((record) => (
					<ReviewJSX
						key={ record.$id }
						element={ record }
						map={ JSXMap }
						onUpdate={ console.log }
					/>
				))
			}
		</div>
	);
};

export default Query;