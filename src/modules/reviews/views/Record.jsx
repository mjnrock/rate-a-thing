import { v4 as uuid } from "uuid";
import { useRef } from "react";

import EnumElementType from "../lib/EnumElementType";
import EnumElementSubType from "../lib/EnumElementSubType";
import ReviewJSX from "../components/editor/elements/group/Review";
import SectionJSX from "../components/editor/elements/group/Section";
import HeadingJSX from "../components/editor/elements/markdown/Heading";
import ContentJSX from "../components/editor/elements/markdown/Content";

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

//FIXME: In present state, this is managing multiple review records, not just one
// As such, the file IO is importing the { reviews: [...] } object from state

export function Record({ data, update }) {
	const fileInputRef = useRef(null);

	const { reviewsState } = data;
	const { reviewsDispatch } = update;

	const onUpdate = (id, value) => {
		reviewsDispatch({
			type: "updateElementValue",
			data: {
				id,
				value,
			},
		});
	};


	const openFileInput = () => {
		fileInputRef.current.click();
	};
	const saveToFile = () => {
		const blob = new Blob([ JSON.stringify(reviewsState) ], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.href = url;
		link.download = `${ uuid() }.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const loadFromFile = (e) => {
		const file = e.target.files[ 0 ];
		const reader = new FileReader();

		reader.onload = (event) => {
			const data = JSON.parse(event.target.result);
			reviewsDispatch({
				type: 'set',
				data,
			});
		};

		reader.readAsText(file);
	};

	const records = [];
	for(const id in reviewsState.records) {
		records.push(reviewsState.records[ id ]);
	}

	return (
		<>
			<div className="flex flex-row gap-2 m-2 ">
				<button
					className="p-2 border border-solid rounded border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 hover:border-neutral-900"
					onClick={ saveToFile }
				>
					Save
				</button>
				<button
					className="p-2 border border-solid rounded border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 hover:border-neutral-900"
					onClick={ openFileInput }
				>
					Load
				</button>
			</div>
			<input
				type="file"
				ref={ fileInputRef }
				accept=".json"
				onChange={ loadFromFile }
				style={ { display: 'none' } }
			/>
		</>
	);
};

export default Record;