import Chord from "@lespantsfancy/chord";
import { EnumRatingType } from "./Rating";

export const Reducers = ({ } = {}) => ({
	merge: (state, next = {}) => ({ ...state, ...next }),
	setChildren: (state, children) => ({ ...state, children }),
	addChild: (state, child) => ({ ...state, children: [ ...state.children, child ] }),
	removeChild: (state, child) => ({ ...state, children: state.children.filter(c => c !== child) }),
	swapChildren: (state, childA, childB) => {
		let children = state.children.slice();

		let indexA = children.indexOf(childA);
		let indexB = children.indexOf(childB);

		if(indexA > -1 && indexB > -1) {
			children[ indexA ] = childB;
			children[ indexB ] = childA;
		}

		return {
			...state,
			children,
		};
	},
});

export const Group = ({ $type = EnumRatingType.GROUP, children = [], ...rest } = {}) => Chord.Node.Identity.Next({
	$type,
	children,
	...rest,
});

export default {
	Reducers,
	State: Group,
};