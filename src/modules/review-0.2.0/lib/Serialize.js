import { EnumElementType } from "./EnumType";

export const deserialize = (json, map) => {
	if(Array.isArray(json)) {
		return json.map(x => deserialize(x, map));
	}

	const obj = typeof json === "object" ? json : JSON.parse(json);
	const { $type, $subtype, ...rest } = obj;
	let { value } = obj;

	if($type === EnumElementType.Group) {
		value = value.map(x => deserialize(x, map));
	}

	const Namespace = map[ $type ][ $subtype ];
	return Namespace.State(value, {
		type: $type,
		subtype: $subtype,
		...rest,
	});
};
export const serialize = (element) => {
	if(Array.isArray(element)) {
		return element.map(x => serialize(x));
	}

	return JSON.stringify(element);
};
export const toJson = (element) => {
	if(Array.isArray(element)) {
		return JSON.stringify(serialize(element));
	}

	return serialize(element);
};
export const fromJson = (json, map) => {
	const obj = JSON.parse(json);

	return deserialize(obj, map);
};

export default {
	deserialize,
	fromJson,
	serialize,
	toJson,
};



// const FluxMap = {
// 	[ EnumElementType.Group ]: {
// 		[ EnumElementSubType.Group.Review ]: Review,
// 		[ EnumElementSubType.Group.Section ]: Section,
// 	},
// 	[ EnumElementType.Markdown ]: {
// 		[ EnumElementSubType.Markdown.Heading ]: Heading,
// 		[ EnumElementSubType.Markdown.Content ]: Content,
// 	},
// };


// const reviews = [
// 	Review.State([
// 		Section.State([
// 			Heading.State("Heading 1"),
// 			Content.State("This _is_ some **Content**"),
// 		]),
// 	]),
// 	Review.State([
// 		Section.State([
// 			Heading.State("Heading 2"),
// 			Content.State("This _is_ also **Content**"),
// 		]),
// 	]),
// ];

// console.log(reviews)
// const json = Serialize.serialize(reviews);
// console.log(json);
// console.log(Serialize.deserialize(json, FluxMap));