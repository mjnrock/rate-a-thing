import Chord from "@lespantsfancy/chord";

import HorizontalSelect from "../components/HorizontalSelect";
import ModReviews, { Utility } from "../modules/review-0.2.0/main";

import Review from "../modules/review-0.2.0/elements/group/Review";
import Section from "../modules/review-0.2.0/elements/group/Section";
import Heading from "../modules/review-0.2.0/elements/markdown/Heading";
import Content from "../modules/review-0.2.0/elements/markdown/Content";

import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

import { Schema as SchemaView } from "../modules/review-0.2.0/views/Schema";
import { Record as RecordView } from "../modules/review-0.2.0/views/Record";
import { Query as QueryView } from "../modules/review-0.2.0/views/Query";


//STUB - Use a random template for now
import TestReview from "../data/reviews/5e40531f-3598-4a04-b726-6067fdf3475f.json";
const schema = Utility.createTemplate(TestReview.reviews[ 0 ]);


function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
};

const Nodes = Chord.Node.Node.CreateMany({
	reviews: {
		state: ModReviews.State({ schema }),
		reducers: ModReviews.Reducers,
	},
});

export function Reviews() {
	const { state: reviewsState, dispatch: reviewsDispatch } = Chord.Node.React.useNode(Nodes.reviews);

	//STUB: Debugging keybind (ref for closure)
	const reviewsStateRef = React.useRef();
	reviewsStateRef.current = reviewsState;
	useEffect(() => {
		const fn = (e) => {
			if(e.code === "Backquote") {
				e.preventDefault();
				e.stopPropagation();

				console.warn(reviewsStateRef.current);
			}
		};

		window.addEventListener("keypress", fn);

		return () => {
			window.removeEventListener("keypress", fn);
		};
	}, []);


	const [ test, setTest ] = useState("Schema");

	return (
		<div className="flex flex-col items-center justify-start w-full h-full m-2 bg-gray-50">
			<Tab.Group>
				<Tab.List className="flex p-2 space-x-2 bg-gray-200 border-b rounded-xl">
					{/* { [ "Schema", "Record", "Search" ].map((category) => ( */ }
					{ [ "Record", "Schema", "Search" ].map((category) => (
						// { [ "Record", "Search" ].map((category) => (
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
						<RecordView
							data={ { reviewsState } }
							update={ { reviewsDispatch } }
						/>
					</Tab.Panel>
					<Tab.Panel className="p-4">
						<SchemaView
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