export const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

export function HorizontalSelect({ current, options = [], onSelect }) {
	return (
		<div className="flex flex-row items-center justify-start w-full p-2 bg-gray-200 border-b rounded-md gap-x-1">
			{ options.map((option) => (
				<button
					key={ option }
					className={ classNames(
						"px-4 py-2 rounded-md text-sm font-medium leading-5 focus:ring-0 focus:outline-none",
						current === option
							? "bg-white text-gray-800 shadow"
							: "text-gray-600 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
					) }
					onClick={ () => onSelect(option) }
				>
					{ option }
				</button>
			)) }
		</div>
	);
};

export default HorizontalSelect;