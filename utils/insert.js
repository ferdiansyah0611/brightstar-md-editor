
export const insertIndex = (text, start, find, value) => {
	return text.slice(0, start) + text.slice(start).replace(find, value);
};