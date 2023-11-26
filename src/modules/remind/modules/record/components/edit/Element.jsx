export function toComponent(element, map = {}) {
	if(element.type in map) {
		return map[ element.type ](element);
	} else if(typeof map.default === "function") {
		return map.default(element);
	}

	return Element;
};

export function Element({ update, element, config, map, ...props }) {
	const Component = toComponent(element, map);

	return (
		<div className="flex flex-col flex-grow m-2 ml-0 border border-solid rounded shadow select-none basis-1 border-neutral-200" { ...props }>
			<div className="flex flex-row items-center justify-between w-full gap-x-2">
				<div className="flex w-3/4 p-2 rounded hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500">
					<span className="flex-1 w-full font-mono cursor-pointer">
						{ element?.meta?.label || element.id }
					</span>
				</div>
			</div>
			<div className="flex flex-col w-full p-2">
				{
					Component !== Element && <Component update={ update } element={ element } config={ config } map={ map } />
				}
			</div>
		</div>
	);
};

export default Element;