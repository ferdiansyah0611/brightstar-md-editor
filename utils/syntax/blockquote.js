import { insertCursor, getSelectionCursor } from "../cursor";

export default function blockquote() {
	const action = () => {
		let { start, end } = getSelectionCursor(this.textarea.el);
		start += 2;
		this.textarea.el.value = insertCursor(this.textarea.el.value, start - 2, "> TEXT");
		this.textarea.el.setSelectionRange(start, start + 4)
		this.textarea.el.focus()
		this.historyUpdateDefault();
	}
	return {
		action,
		icon: 'fa-solid fa-quote-left'
	};
}
