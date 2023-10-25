export const Element = ({ map, element, onUpdate, ...rest }) => {
	return (
		<div
			className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded shadow"
			{ ...rest }
		>
			{ map[ element.$type ][ element.$subtype ]({ key: element.$id, element, map, onUpdate }) }
		</div>
	);
};

export default Element;