import { v4 as uuid } from "uuid";
import { useRef, useEffect, useState } from "react";

import EnumElementType from "../lib/EnumElementType";
import EnumElementSubType from "../lib/EnumElementSubType";
import ReviewJSX from "../components/editor/elements/group/Review";
import SectionJSX from "../components/editor/elements/group/Section";
import HeadingJSX from "../components/editor/elements/markdown/Heading";
import ContentJSX from "../components/editor/elements/markdown/Content";

import { Utility, Helpers } from "../main";

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

export function Record({ data, update }) {
	const { reviewsState } = data;
	const { reviewsDispatch } = update;

	const [ record, setRecord ] = useState(Utility.instantiate(reviewsState.schema));
	const [ recordData, setRecordData ] = useState({
		$id: uuid(),
	});
	const recordDataRef = useRef(recordData);

	const onUpdate = (id, value) => {
		setRecordData(prev => {
			const next = {
				...prev,
				[ id ]: value,
			};

			recordDataRef.current = next;

			return next;
		});
	};

	return (
		<div>
			<div
				className="border border-gray-400 border-solid rounded-md"
				onClick={ e => reviewsDispatch({
					type: "addRecord",
					data: recordDataRef.current,
				}) }
			>
				Save
			</div>
			<ReviewJSX
				element={ record }
				map={ JSXMap }
				onUpdate={ onUpdate }
			/>
		</div>
	);
};

export default Record;