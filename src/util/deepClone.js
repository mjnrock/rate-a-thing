export function deepClone(obj, hashMap = new WeakMap()) {
	// If obj is null or not an object, return it as is.
	if(obj === null || typeof obj !== "object") {
		return obj;
	}

	// If we've already visited this object, return the clone.
	if(hashMap.has(obj)) {
		return hashMap.get(obj);
	}

	// Create a new object/array to store the clone.
	const clone = Array.isArray(obj) ? [] : {};

	// Save this object and its clone to the hash map.
	hashMap.set(obj, clone);

	// Iterate over the keys/values in the object.
	for(const [ key, value ] of Object.entries(obj)) {
		// Clone each value and add it to the new object.
		clone[ key ] = deepClone(value, hashMap);
	}

	return clone;
};

export default deepClone;