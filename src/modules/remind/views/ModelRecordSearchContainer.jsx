import { Tab } from "@headlessui/react";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
};

export function ModelRecordSearchContainer({ schemaContent, writeContent, searchContent }) {
	return (
		<Tab.Group>
			<Tab.List className="flex p-1 space-x-2 border-b border-solid shadow border-b-neutral-100 bg-neutral-300">
				{
					[ "Model", "Record", "Search" ].map((label, i) => (
						<Tab
							key={ i }
							className={ ({ selected }) => classNames(
								"w-full rounded py-2.5 text-sm font-medium leading-5 text-neutral-100",
								"focus:outline-none",
								selected
									? "bg-white text-neutral-700 shadow"
									: "hover:bg-white/20 hover:text-neutral-500"
							) }
						>
							{ label }
						</Tab>
					))
				}
			</Tab.List>

			<Tab.Panels className="p-2">
				<Tab.Panel className="bg-white rounded">
					{ schemaContent() }
				</Tab.Panel>
				<Tab.Panel className="bg-white rounded">
					{ writeContent() }
				</Tab.Panel>
				<Tab.Panel className="bg-white rounded">
					{ searchContent() }
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	);
};

export default ModelRecordSearchContainer;