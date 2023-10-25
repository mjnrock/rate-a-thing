import { deepClone } from "../../util/deepClone.js";
import Review from "./elements/group/Review.js";
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
		/* The UUID of the active review */
		let [ activeId ] = state.active;
		/* The actual state-data object of the review */
		const record = state.records[ activeId ];
		/* The particular element we're updating */
		const element = Helpers.findElementById(record, id);

		if(element) {
			element.value = value;

			return state;
		}

		return state;
	},
});

export const Utility = {
	createTemplate: record => {
		const clone = deepClone(record);

		// create a recursive function that remove the $id property from each element
		const removeId = element => {
			delete element.$id;

			if(element.$type === EnumElementType.Group) {
				for(const child of element.value) {
					removeId(child);
				}
			}
		};

		// remove the $id property from the root element
		removeId(clone);

		return clone;
	}
}

export const State = ({ records = {}, ...rest } = {}) => {
	/* Arbitrarily select the first record as the active one */
	let [ active ] = Object.values(records);

	return {
		schema: Utility.createTemplate(active),			// The current review schema filter (i.e. find records with this schema)
		records,			// Cached records for the current schema
		active: [			// The active review(s) for editing, represented as an array of UUIDs (array for future multi-edit support)
			active.$id,
		],
		...rest,
	};
};

export default {
	Reducers: Reducers(),
	State,
};