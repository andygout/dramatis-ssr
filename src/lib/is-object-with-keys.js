export default function (value) {
	return Object(value) === value &&
	!Array.isArray(value) &&
	Object.keys(value).length > 0;
}
