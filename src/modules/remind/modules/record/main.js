export const Helpers = {};

export const State = ({ data = {}, ...rest } = {}) => {
	return {
		data,
		...rest,
	};
};


//TODO: The basic idea of data is implemented here, but it's not implemented fully over the entire record module.
//NOTE: t's basically only present in this file -- nothing else has been updated to use it.


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