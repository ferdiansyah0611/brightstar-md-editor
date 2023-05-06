import { insertCursor, getLinesCursor, getSelectionCursor } from "../cursor";
import { insertIndex } from '../insert';

export default function italic() {
	const action = () => {
		let { start, end, valueSelection } = getSelectionCursor(this.textarea.el);
		let insert = "";
		if (start !== end) {
			insert = insertIndex(this.textarea.el.value, start, valueSelection, "*" + valueSelection + "*")
			start += 1
			end = start + valueSelection.length
		} else {
			insert = insertCursor(this.textarea.el.value, start, "*TEXT*");
			start += 1
			end = start + 4
		}
		this.textarea.el.value = insert;
		this.textarea.el.setSelectionRange(start, end);
		this.historyUpdateDefault();
	}
	const onMount = () => {
		// keyup
		const callback = (e) => {
			let cursor = this.textarea.el.selectionStart;
			if (e.ctrlKey && e.key === "i") {
				action();
			}
		}
		document.body.addEventListener("keyup", callback);
		return () => {
			document.body.removeEventListener("keyup", callback);
		};
	}
	return {
		onMount,
		action,
		icon: "fa-solid fa-italic",
		name: "italic",
		shortcut: "ctrl+i"
	};
}
