import { EnumElementType, EnumElementSubType } from "../../EnumElementType";

import Element from "../../models/Element";
import Group from "../../models/group/Group";
import Form from "../../models/group/Form";
import Text from "../../models/text/Text";
import NumberModel from "../../models/number/Number";
import BooleanModel from "../../models/boolean/Boolean";
import ArrayModel from "../../models/array/Array";
import ObjectModel from "../../models/object/Object";
import Input from "../../models/input/Input";
import Markdown from "../../models/input/Markdown";
import Rating from "../../models/input/Rating";

export const Helpers = {
	TypeToModel: (type) => {
		let subType;
		if(Array.isArray(type)) {
			type = type[ 0 ];
			subType = type[ 1 ];
		}

		if(type === EnumElementType.ELEMENT) {
			return Element;
		} else if(type === EnumElementType.GROUP) {
			if(subType === EnumElementSubType[ EnumElementType.GROUP ].FORM) {
				return Form;
			} else {
				return Group;
			}
		} else if(type === EnumElementType.TEXT) {
			return Text;
		} else if(type === EnumElementType.NUMBER) {
			return NumberModel;
		} else if(type === EnumElementType.BOOLEAN) {
			return BooleanModel;
		} else if(type === EnumElementType.OBJECT) {
			return ObjectModel;
		} else if(type === EnumElementType.ARRAY) {
			return ArrayModel;
		} else if(type === EnumElementType.INPUT) {
			if(subType === EnumElementSubType[ EnumElementType.INPUT ].MARKDOWN) {
				return Markdown;
			} else if(subType === EnumElementSubType[ EnumElementType.INPUT ].RATING) {
				return Rating;
			} else {
				return Input;
			}
		} else {
			throw new Error(`Unknown type: ${ type }`);
		}
	},
};

export const State = ({ form = {}, ...rest } = {}) => {
	return {
		form: Form.State(form),
		...rest,
	};
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),

	addFormElement: (state, type, stateArgs = {}) => {
		let next = { ...state.form };

		let model = Helpers.TypeToModel(type);
		let element = model.State(stateArgs);

		next = Form.Reducers.addElement(next, element);

		return {
			...state,
			form: next,
		};
	},
	/* sub-reducer, route to Form */
	form: (state, action, ...args) => {
		const next = { ...state.form };

		return {
			...state,
			form: Form.Reducers[ action ](next, ...args),
		};
	},
});
export const Effects = () => ({});

export default {
	State,
	Reducers: Reducers(),
	Effects: Effects(),
	Helpers,
};