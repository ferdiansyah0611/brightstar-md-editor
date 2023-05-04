import { insertCursor, getSelectionCursor } from "../cursor";

export default function link() {
	const action = () => {
		let { start } = getSelectionCursor(this.textarea.el);
		let insert = insertCursor(this.textarea.el.value, start, "[title](https://link.com)\n");
		this.textarea.el.value = insert;
		this.historyUpdateDefault();
	}
	return {
		action,
		icon: 'fa-solid fa-link'
	};
}
