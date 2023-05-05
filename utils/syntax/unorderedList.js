import { insertCursor, getSelectionCursor } from "../cursor";

export default function unorderedList() {
	const action = () => {
		let { start } = getSelectionCursor(this.textarea.el);
		let insert = insertCursor(this.textarea.el.value, start, "- ");
		start += 4;
		this.textarea.el.value = insert;
		this.textarea.el.setSelectionRange(start, start);
		this.historyUpdateDefault();
	}
	const onMount = () => {
		const callback = (e) => {
			if (e.key !== "Enter") return;
			let { start } = getSelectionCursor(this.textarea.el);
			// get last line
			let lastLines = this.textarea.el.value.slice(0, start).split("\n").at(-2);
			if (!lastLines.startsWith("- ") || lastLines.startsWith("- [")) return;
			action();
		}
		this.textarea.addEvent("keyup", callback);
	}
	return {
		action,
		onMount,
		icon: "fa-solid fa-list-ul",
		name: "unordered list"
	};
}
