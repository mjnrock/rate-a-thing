import { useState, useEffect } from "react";
import { Helpers, Utility } from "../main";

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

	const [ records, setRecords ] = useState([]);

	useEffect(() => {
		const next = Object.values(reviewsState.records).map((data) => Utility.reconstitute(reviewsState.schema, data));

		setRecords(next);
	}, [ reviewsState.records ]);

	return (
		<div>
			<input
				type="text"
				className="w-full px-3 py-2 mt-1 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
				placeholder="Search"
			/>
			<div className="flex flex-col w-full">
				{
					records.map((record) => (
						<div
							key={ record.$_rid }
							className="flex flex-col w-full px-4 py-2 mb-2 bg-white border border-gray-100 rounded-md hover:shadow-md hover:bg-gray-50 hover:border-gray-300 hover:cursor-pointer"
							onClick={ e => reviewsDispatch({
								type: "selectRecord",
								data: record.$_rid,
							}) }
						>
							<ReviewJSX
								element={ record }
								map={ JSXMap }
								onUpdate={ console.log }
							/>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default Query;