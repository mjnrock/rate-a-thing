export const Helpers = {};

export const State = ({ data = {}, ...rest } = {}) => {
	return {
		data,
		...rest,
	};
};


//TODO: The basic idea of data is implemented here, but it's not implemented fully over the entire record module.
/* NOTE: t's basically only present in this file -- nothing else has been updated to use it.
 * Since the data object has no entries (it would be normally populated through the Record > Edit page),
 * an easy start would be to add Save/Load functionality to the Model page.  As such, the data object
 * could easily be populated with known UUID:value pairs.  Plus, kills two birds.
 */


export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
	setData: (state, next) => ({ ...state, data: next }),
	mergeData: (state, id, key, value) => {
		if(typeof key === "object") {
			// assume it's a merge object
			return {
				...state,
				data: {
					...state.data,
					[ id ]: {
						...state.data[ id ],
						...key,
					},
				},
			};
		}

		const data = state.data[ id ] || {};
		return {
			...state,
			data: {
				...state.data,
				[ id ]: {
					...data,
					[ key ]: value,
				},
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