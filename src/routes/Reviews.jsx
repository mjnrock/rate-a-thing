import Chord from "@lespantsfancy/chord";

import ModReviews from "../modules/reviews/main";

import Review from "../modules/reviews/elements/group/Review";
import Section from "../modules/reviews/elements/group/Section";
import Heading from "../modules/reviews/elements/markdown/Heading";
import Content from "../modules/reviews/elements/markdown/Content";

import React from "react";
import { Tab } from "@headlessui/react";

import { Schema as SchemaView } from "../modules/reviews/views/Schema";
import { Record as RecordView } from "../modules/reviews/views/Record";
import { Query as QueryView } from "../modules/reviews/views/Query";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
};

//STUB: This is just a temporary way to create some records
const records = Object.fromEntries([
	Review.State([
		Section.State([
			Heading.State("Heading 1"),
			Content.State("This _is_ some **Content**"),
		]),
	], {
		name: "Review 1",
	}),
	Review.State([
		Section.State([
			Heading.State("Heading 2"),
			Content.State("This _is_ also **Content**"),
		]),
	], {
		name: "Review 2",
	}),
].map((record) => [ record.$id, record ]));

const Nodes = Chord.Node.Node.CreateMany({
	reviews: {
		state: ModReviews.State({ records }),
		reducers: ModReviews.Reducers,
	},
});

export function Reviews() {
	const { state: reviewsState, dispatch: reviewsDispatch } = Chord.Node.React.useNode(Nodes.reviews);

	return (
		<div className="flex flex-col items-center justify-start w-full h-full m-2 bg-gray-50">
			<Tab.Group>
				<Tab.List className="flex p-2 space-x-2 bg-gray-200 border-b rounded-xl">
					{ [ "Build", "Use", "Find" ].map((category) => (
						<Tab
							key={ category }
							className={ ({ selected }) =>
								classNames(
									"px-4 py-2 rounded-md text-sm font-medium leading-5 focus:ring-0 focus:outline-none",
									selected
										? "bg-white text-gray-800 shadow"
										: "text-gray-600 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
								)
							}
						>
							{ category }
						</Tab>
					)) }
				</Tab.List>

				<Tab.Panels className="w-full px-2 mt-4 bg-white rounded-md shadow-sm">
					<Tab.Panel className="p-4">
						<SchemaView
							data={ { reviewsState } }
							update={ { reviewsDispatch } }
						/>
					</Tab.Panel>
					<Tab.Panel className="p-4">
						<RecordView
							data={ { reviewsState } }
							update={ { reviewsDispatch } }
						/>
					</Tab.Panel>
					<Tab.Panel className="p-4">
						<QueryView
							data={ { reviewsState } }
							update={ { reviewsDispatch } }
						/>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default Reviews;