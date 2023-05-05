import { insertCursor, getSelectionCursor } from "../cursor";

export default function image() {
	const action = () => {
		let { start } = getSelectionCursor(this.textarea.el);
		let insert = insertCursor(this.textarea.el.value, start, "![alt](image.jpg)\n");
		this.textarea.el.value = insert;
		this.historyUpdateDefault();
	}
	return {
		action,
		icon: 'fa-solid fa-image',
		name: "image"
	};
}
