import EnumElementType from "../../EnumElementType";

import Element from "../../models/Element";
import Form from "../../models/Form";
import Group from "../../models/Group";
import Input from "../../models/Input";
import Markdown from "../../models/Markdown";
import Rating from "../../models/Rating";

export const Helpers = {
	TypeToModel: (type) => {
		if(type === EnumElementType.ELEMENT) {
			return Element;
		} else if(type === EnumElementType.FORM) {
			return Form;
		} else if(type === EnumElementType.GROUP) {
			return Group;
		} else if(type === EnumElementType.INPUT) {
			return Input;
		} else if(type === EnumElementType.MARKDOWN) {
			return Markdown;
		} else if(type === EnumElementType.RATING) {
			return Rating;
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