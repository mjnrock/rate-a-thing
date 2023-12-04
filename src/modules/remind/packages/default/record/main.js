export const Helpers = {};

export const State = ({ data = {}, ...rest } = {}) => {
	return {
		/* A { [ element.id ] : element.state, ... } data object that represents "state deltas" for each Element, relative to a Schema */
		data,
		...rest,
	};
};


//TODO: The basic idea of data is implemented here, but it's not implemented fully over the entire record module.
/* NOTE: it's basically only present in this file -- nothing else has been updated to use it.
 * Since the data object has no entries (it would be normally populated through the Record > Edit page),
 * an easy start would be to add Save/Load functionality to the Model page.  As such, the data object
 * could easily be populated with known UUID:value pairs.  Plus, kills two birds.
 */


export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
	setData: (state, next) => ({ ...state, data: next }),
	mergeData: (state, id, value) => {
		return {
			...state,
			data: {
				...state.data,
				[ id ]: value,
			},
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