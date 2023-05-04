export function insertCursor(text, cursor, value) {
	return text.slice(0, cursor) + value + text.slice(cursor);
}
export function getLinesCursor(text, cursor) {
	let index = 0;
	if (text.indexOf("\n") === -1) {
		index = 0;
		return {
			index,
			text,
		};
	}
	for (let i = cursor - 1; i >= 0; i--) {
		if (text[i] === "\n") {
			index = i + 1;
			break;
		}
	}
	return {
		index,
		text: text.slice(index, cursor),
	};
}

export function getSelectionCursor(el){
	let { selectionStart: start, selectionEnd: end } = el;
	return {
		start,
		end,
		get valueSelection(){
			return el.value.slice(this.start, this.end)
		}
	}
};