import { EnumElementType } from "./lib/EnumElementType";

export const Helpers = {
	findElementById: (group, id) => {
		for(const element of group.value) {
			if(element.$id === id) {
				return element;
			}

			if(element.$type === EnumElementType.Group) {
				const found = Helpers.findElementById(element, id);

				if(found) {
					return found;
				}
			}
		}

		return null;
	},
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
	updateElementValue: (state, { id, value } = {}) => {
		for(const review of state.reviews) {
			const element = Helpers.findElementById(review, id);

			if(element) {
				element.value = value;

				return state;
			}
		}

		return state;
	},
});

export const State = ({ reviews = [], ...rest } = {}) => ({
	reviews,
	...rest,
});

export default {
	Reducers: Reducers(),
	State,
};