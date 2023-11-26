//TODO: Create a { [UUID]: value, ... } object for the active state; map back via `schemaState.components.elements[ UUID ]`
// Write - Write back to that UUID:value state object
// Read - Read the info from the `schemaState.components.elements[ UUID ]` object, but override the `value` from the UUID:value state object

export const Helpers = {};

export const State = ({ active = {}, ...rest } = {}) => {
	return {
		active,
		...rest,
	};
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
	setActive: (state, active) => ({ ...state, active }),
});
export const Effects = () => ({});

export default {
	State,
	Reducers: Reducers(),
	Effects: Effects(),
	Helpers,
};