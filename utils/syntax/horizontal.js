import { insertCursor, getSelectionCursor } from "../cursor";

export default function horizontal() {
	const action = () => {
		let { start } = getSelectionCursor(this.textarea.el);
		let insert = insertCursor(this.textarea.el.value, start, "---\n");
		this.textarea.el.value = insert;
		this.historyUpdateDefault();
	}
	return {
		action,
		icon: 'fa-solid fa-grip-lines',
		name: "horizontal"
	};
}
