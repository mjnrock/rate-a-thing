import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const renderTableRows = (data, visited) => {
	return Object.entries(data).map(([ key, value ]) => {
		if(typeof value === "object" && value !== null) {
			if(visited.has(value)) {
				return <tr key={ key }><td className="p-2 font-bold">{ key }</td><td className="p-2 font-mono">[Circular Reference]</td></tr>;
			}
			visited.add(value);
			return (
				<tr key={ key }>
					<td className="p-2 font-bold">{ key }</td>
					<td className="p-2">
						<table className="w-full text-sm border-collapse table-auto bg-gray-50">
							<tbody>{ renderTableRows(value, visited) }</tbody>
						</table>
					</td>
				</tr>
			);
		}
		return (
			<tr
				key={ key }
				onClick={ e => navigator.clipboard.writeText((value)?.toString()) }
				className="cursor-copy hover:bg-gray-50 hover:text-blue-500 active:bg-gray-100 active:text-blue-700"
			>
				<td className="p-2 font-bold">{ key }</td>
				<td className="p-2 font-mono">{ (value)?.toString() }</td>
			</tr>
		);
	});
};

const RecordTableModal = ({ isOpen, closeModal, data }) => {
	const visited = new WeakSet();

	return (
		<Transition appear show={ isOpen } as={ Fragment }>
			<Dialog as="div" className="relative z-10" onClose={ closeModal }>
				<Transition.Child
					as={ Fragment }
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-full p-4 text-center">
						<Transition.Child
							as={ Fragment }
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-center text-gray-900">
									Data Overview
								</Dialog.Title>

								<div className="mt-2">
									<table className="w-full text-sm text-left text-gray-700 border border-collapse border-gray-200 rounded table-auto">
										<tbody className="rounded">{ renderTableRows(data, visited) }</tbody>
									</table>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={ closeModal }>
										Close
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default RecordTableModal;