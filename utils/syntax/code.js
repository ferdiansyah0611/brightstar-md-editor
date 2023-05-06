import { insertCursor, getLinesCursor, getSelectionCursor } from "../cursor";
import { insertIndex } from '../insert';

export default function code() {
	const action = () => {
		let { start, end, valueSelection } = getSelectionCursor(this.textarea.el);
		let insert = "";
		if (start !== end) {
			insert = insertIndex(this.textarea.el.value, start, valueSelection, "```languange\n" + valueSelection + "\n```")
			start += 13;
			end = start + valueSelection.length;
		} else {
			insert = insertCursor(this.textarea.el.value, start, "```languange\nconsole.log(true)\n```");
			start += 3;
			end += 12
		}
		this.textarea.el.value = insert;
		this.textarea.el.setSelectionRange(start, end);
		this.historyUpdateDefault();
	}
	const onMount = () => {
		// keyup
		const callback = (e) => {
			let cursor = this.textarea.el.selectionStart;
			if (e.ctrlKey && e.shiftKey && e.key === "L") {
				action()
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
		icon: "fa-solid fa-code",
		name: "code",
		shortcut: "ctrl+shift+L"
	};
}
