import EnumElementType from "../../lib/EnumElementType";
import EnumElementSubType from "../../lib/EnumElementSubType";
import Element from "../../lib/Element";

export const State = (members, { name, ...rest } = {}) => ({
	...Element.State(members, {
		type: EnumElementType.Group,
		subtype: EnumElementSubType.Group.Generic,
		name,
		...rest,
	}),
});

export const Reducers = () => ({
	...Element.Reducers,
	setChildren: (state, value) => ({ ...state, value }),
	addChild: (state, child) => ({ ...state, value: [ ...state.value, child ] }),
	removeChild: (state, child) => ({ ...state, value: state.value.filter(c => c !== child) }),
	swapChildren: (state, childA, childB) => {
		let value = state.value.slice();

		let indexA = value.indexOf(childA);
		let indexB = value.indexOf(childB);

		if(indexA > -1 && indexB > -1) {
			value[ indexA ] = childB;
			value[ indexB ] = childA;
		}

		return {
			...state,
			value,
		};
	},
});

export default {
	State,
	Reducers: Reducers(),
};