export function toComponent(element, map = {}) {
	const { TypeComponentMap, AsComponentMap } = map;

	let as = AsComponentMap?.[ element.type ]?.[ element.as ];
	if(as) {
		return as;
	}

	let type = TypeComponentMap?.[ element.type ];
	if(type) {
		return type;
	}

	if(typeof map.default === "function") {
		return map.default(element);
	}

	return Element;
};

export function Element({ update, element, config, maps, ...props }) {
	const Component = toComponent(element, maps);

	return (
		<div className="grid w-full grid-cols-6 gap-2 m-2 ml-0 border border-solid rounded shadow select-none border-neutral-200" { ...props }>
			{/* Label Section - occupies 1 column */ }
			<div className="flex items-center justify-center col-span-1 p-2">
				{ element?.meta?.label || element.id }
			</div>

			{/* Component Section - occupies 5 columns */ }
			<div className="flex items-center justify-center col-span-5 p-2">
				{ Component !== Element && <Component update={ update } element={ element } config={ config } maps={ maps } /> }
			</div>
		</div>
	);
};

export default Element;