import { v4 as uuid } from "uuid";
import { useRef, useEffect, useState } from "react";

import EnumElementType from "../lib/EnumElementType";
import EnumElementSubType from "../lib/EnumElementSubType";
import ReviewJSX from "../components/editor/elements/group/Review";
import SectionJSX from "../components/editor/elements/group/Section";
import HeadingJSX from "../components/editor/elements/markdown/Heading";
import ContentJSX from "../components/editor/elements/markdown/Content";

import { Utility, Helpers } from "../main";

import { HorizontalSelect } from "../../../components/HorizontalSelect";

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

	const recordDataRef = useRef({
		record: Utility.instantiate(reviewsState.schema),
		data: {
			$id: uuid(),
		},
	});

	//FIXME: Figure out how to handle this, as the "New" wasn't working as intended

	if(reviewsState.active) {
		recordDataRef.current.data = { ...reviewsState.records[ reviewsState.active ] };
		recordDataRef.current.record = Utility.reconstitute(reviewsState.schema, recordDataRef.current.data);
	}

	const onUpdate = (id, value) => {
		const next = {
			...recordDataRef.current.data,
			[ id ]: value,
		};

		recordDataRef.current.data = next;
	};

	const onNewRecord = e => {
		recordDataRef.current.data = { $id: uuid() };
		recordDataRef.current.record = Utility.instantiate(reviewsState.schema);

		reviewsDispatch({
			type: "selectRecord",
			data: null,
		});
	};
	const onSaveRecord = e => {
		reviewsDispatch({
			type: "setRecord",
			data: recordDataRef.current.data,
		});
	};

	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-row w-full gap-2">
				<div
					className="px-4 py-2 mb-2 bg-white border border-gray-200 rounded-md hover:shadow-md hover:bg-gray-50 hover:border-gray-300 hover:cursor-pointer"
					onClick={ onNewRecord }
				>
					New
				</div>
				<div
					className="px-4 py-2 mb-2 bg-white border border-gray-200 rounded-md hover:shadow-md hover:bg-gray-50 hover:border-gray-300 hover:cursor-pointer"
					onClick={ onSaveRecord }
				>
					Save
				</div>
			</div>
			<ReviewJSX
				element={ recordDataRef.current.record }
				map={ JSXMap }
				onUpdate={ onUpdate }
			/>
		</div>
	);
};

export default Record;