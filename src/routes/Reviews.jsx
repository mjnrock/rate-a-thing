import { useRef } from "react";
import { v4 as uuid } from "uuid";
import Chord from "@lespantsfancy/chord";

import ModReviews from "../modules/reviews/main";

import Review from "../modules/reviews/elements/group/Review";
import Section from "../modules/reviews/elements/group/Section";
import Heading from "../modules/reviews/elements/markdown/Heading";
import Content from "../modules/reviews/elements/markdown/Content";

import EnumElementSubType from "../modules/reviews/lib/EnumElementSubType";
import ReviewJSX from "../modules/reviews/components/elements/group/Review";
import SectionJSX from "../modules/reviews/components/elements/group/Section";
import HeadingJSX from "../modules/reviews/components/elements/markdown/Heading";
import ContentJSX from "../modules/reviews/components/elements/markdown/Content";
import EnumElementType from "../modules/reviews/lib/EnumElementType";

import Serialize from "../modules/reviews/lib/Serialize";

const JSXMap = {
	[ EnumElementType.Group ]: {
		[ EnumElementSubType.Group.Review ]: ReviewJSX,
		[ EnumElementSubType.Group.Section ]: SectionJSX,
	},
	[ EnumElementType.Markdown ]: {
		[ EnumElementSubType.Markdown.Heading ]: HeadingJSX,
		[ EnumElementSubType.Markdown.Content ]: ContentJSX,
	},
};
const FluxMap = {
	[ EnumElementType.Group ]: {
		[ EnumElementSubType.Group.Review ]: Review,
		[ EnumElementSubType.Group.Section ]: Section,
	},
	[ EnumElementType.Markdown ]: {
		[ EnumElementSubType.Markdown.Heading ]: Heading,
		[ EnumElementSubType.Markdown.Content ]: Content,
	},
};


const reviews = [
	Review.State([
		Section.State([
			Heading.State("Heading 1"),
			Content.State("This _is_ some **Content**"),
		]),
	]),
	Review.State([
		Section.State([
			Heading.State("Heading 2"),
			Content.State("This _is_ also **Content**"),
		]),
	]),
];

console.log(reviews)
const json = Serialize.serialize(reviews);
console.log(json);
console.log(Serialize.deserialize(json, FluxMap));

const Nodes = Chord.Node.Node.CreateMany({
	reviews: {
		state: ModReviews.State({ reviews }),
		reducers: ModReviews.Reducers,
	},
});

export function RouteReviews() {
	const fileInputRef = useRef(null);
	const { state: reviewsState, dispatch: reviewsDispatch } = Chord.Node.React.useNode(Nodes.reviews);

	const onUpdate = (id, value) => {
		reviewsDispatch({
			type: 'updateElementValue',
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
			<div className="p-2">
				<input
					type="file"
					ref={ fileInputRef }
					accept=".json"
					onChange={ loadFromFile }
					style={ { display: 'none' } }
				/>
				{
					reviewsState.reviews.map((review, i) => {
						return (
							<ReviewJSX
								key={ i }
								map={ JSXMap }
								element={ review }
								onUpdate={ onUpdate }
							/>
						);
					})
				}
			</div>
		</>
	);
};

export default RouteReviews;