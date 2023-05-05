import { insertCursor, getSelectionCursor } from "../cursor";

export default function orderedList() {
	const action = () => {
		let { start } = getSelectionCursor(this.textarea.el)
		let insert = insertCursor(this.textarea.el.value, start, "1. TEXT\n2. TEXT");
		start += 2;
		this.textarea.el.value = insert;
		this.textarea.el.setSelectionRange(start, start + 4);
		this.historyUpdateDefault();
	}
	const onMount = () => {
		const callback = (e) => {
			if (e.key !== "Enter") return;
			let { start } = getSelectionCursor(this.textarea.el)
			// get last line
			let lastLines = this.textarea.el.value.slice(0, start).split("\n").at(-2);
			let match = lastLines.match(/^[0-9]+\./);
			if (!match) return;
			let numeric = parseInt(match[0]) + 1;
			let value = numeric + ". ";
			let insert = insertCursor(this.textarea.el.value, start, value);
			this.textarea.el.value = insert;
			this.textarea.el.setSelectionRange(start + value.length, start + value.length);
			this.historyUpdateDefault();
		}
		this.textarea.addEvent('keyup', callback)
	}
	return {
		action,
		onMount,
		icon: "fa-solid fa-list-ol",
		name: "ordered list"
	};
}
