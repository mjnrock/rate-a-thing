import React from "react";
import { Tab } from "@headlessui/react";

import { Schema as SchemaView } from "../modules/views/Schema";
import { Record as RecordView } from "../modules/views/Record";
import { Query as QueryView } from "../modules/views/Query";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export function Default() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
			<Tab.Group>
				<Tab.List className="flex p-2 space-x-4 bg-gray-200 border-b rounded-xl">
					{ [ "Schema", "Record", "Query" ].map((category) => (
						<Tab
							key={ category }
							className={ ({ selected }) =>
								classNames(
									"px-4 py-2 rounded-md text-sm font-medium leading-5 focus:ring-0 focus:outline-none",
									selected
										? "bg-white text-gray-800 shadow"
										: "text-gray-600 hover:bg-white hover:text-gray-800 focus:outline-none"
								)
							}
						>
							{ category }
						</Tab>
					)) }
				</Tab.List>
				<Tab.Panels className="w-full px-2 mt-4 bg-white rounded-md shadow-sm">
					<Tab.Panel className="p-4">
						<SchemaView />
					</Tab.Panel>
					<Tab.Panel className="p-4">
						<RecordView />
					</Tab.Panel>
					<Tab.Panel className="p-4">
						<QueryView />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export default Default;
