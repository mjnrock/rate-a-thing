import { deepClone } from "../../util/deepClone.js";
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
	createDataMap: (element, { $id, $schema } = {}) => {
		const map = {
			$id,
			$schema,
		};

		// if the element is NOT a group, add the value to the map
		if(element.$type !== EnumElementType.Group) {
			map[ element.$id ] = element.value;
		} else {
			// otherwise, add the values of the children
			for(const child of element.value) {
				Object.assign(map, Helpers.createDataMap(child));
			}
		}

		return map;
	},
	assignDataMap: (element, map) => {
		// if the element is NOT a group, assign the value from the map
		if(element.$type !== EnumElementType.Group) {
			element.value = map[ element.$id ];
		} else {
			// otherwise, assign the values of the children
			for(const child of element.value) {
				Helpers.assignDataMap(child, map);
			}
		}

		return element;
	},
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
	updateSchemaValue: (state, { id, value } = {}) => {
		const next = { ...state };
		const element = Helpers.findElementById(next.schema, id);

		if(element) {
			element.value = value;

			return next;
		}

		return next;
	},
	setRecord: (state, recordData) => {
		const next = { ...state };

		next.records[ recordData.$id ] = {
			$schema: state.schema.$id,
			...recordData
		};

		return next;
	},
	selectRecord: (state, rid) => {
		const next = { ...state };

		next.active = rid;

		console.log(next)

		return next;
	},

	setConfig: (state, next) => ({
		...state,
		config: next,
	}),
	mergeConfig: (state, next) => ({
		...state,
		config: {
			...state.config,
			...next,
		},
	}),
	toggleAutoSave: (state, value) => ({
		...state,
		config: {
			...state.config,
			autoSave: value ?? !state.config.autoSave,
		},
	}),
	toggleSchemaLock: (state, value) => ({
		...state,
		config: {
			...state.config,
			isSchemaLocked: value ?? !state.config.isSchemaLocked,
		},
	}),
	toggleRecordLock: (state, value) => ({
		...state,
		config: {
			...state.config,
			isRecordLocked: value ?? !state.config.isRecordLocked,
		},
	}),
});

export const Utility = {
	createTemplate: record => {
		const clone = deepClone(record);

		return clone;
	},
	instantiate: (template) => {
		const clone = deepClone(template);

		return clone;
	},
	reconstitute: (template, data) => {
		const clone = Utility.instantiate(template);
		const record = Helpers.assignDataMap(clone, data);

		record.$_rid = data.$id;

		return record;
	},
};

export const State = ({ schema = {}, records = {}, ...rest } = {}) => {
	return {
		schema,
		records: {
			"64c63687-1e9b-4596-a327-d6d70fe7e912": {
				$schema: "f430fecd-fab5-4810-ad19-2568c6557515",
				$id: "64c63687-1e9b-4596-a327-d6d70fe7e912",
				"eea0db48-2c2b-4ff3-a3f4-0ea9e830542b": "Heading 1a1223",
				"49f505e8-e554-4e54-800a-5d9088339475": "This _is_ some **Contentss**e12e  "
			},
		},
		active: null,
		config: {
			autoSave: true,
			isSchemaLocked: false,	// true = view, false = edit
			isRecordLocked: false,	// true = view, false = edit
		},
		...rest,
	};
};

export default {
	Reducers: Reducers(),
	State,
};