import { insertCursor, getLinesCursor, getSelectionCursor } from "../cursor";

export default function strikethrough() {
	const action = () => {
		let { start, end, valueSelection } = getSelectionCursor(this.textarea.el);
		let insert = "";
		if (start !== end) {
			let value = this.textarea.el.value.replace(valueSelection, "");
			insert = insertCursor(value, start, "~~ " + valueSelection + " ~~");
			start += valueSelection.length + 3;
		} else {
			insert = insertCursor(this.textarea.el.value, start, "~~ TEXT ~~");
			start += 7;
		}
		this.textarea.el.value = insert;
		this.textarea.el.setSelectionRange(start, start);
		this.historyUpdateDefault();
	}
	return {
		action,
		icon: "fa-solid fa-strikethrough",
	};
}
