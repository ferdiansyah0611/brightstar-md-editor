import { insertCursor, getLinesCursor, getSelectionCursor } from "../cursor";
import { insertIndex } from "../insert";

export default function heading() {
	const action = () => {
		let { start, end, valueSelection } = getSelectionCursor(this.textarea.el);
		let value = this.textarea.el.value;
		let text = value.slice(0, start);
		let lines = text.split("\n").at(-1);
		let headingLen = [...lines.matchAll("#")].length;
		let insert;
		if (headingLen === 6) {
			insert =
				text.slice(0, start - lines.length) + "# " + value.slice(start - lines.length).replace("###### ", "");
			start -= 5;
		} else {
			insert =
				text.slice(0, start - lines.length) + "#" + (headingLen ? "" : " ") + value.slice(start - lines.length);
			if (headingLen === 0) {
				start += 1;
			}
			start += 1;
		}
		this.textarea.el.value = insert;
		this.textarea.el.setSelectionRange(start, start);
		this.historyUpdateDefault();
	};
	const onMount = () => {
		// keyup
		const callback = (e) => {
			if (e.ctrlKey && e.shiftKey && e.key === "H") {
				action();
			}
		};
		document.body.addEventListener("keyup", callback);
		return () => {
			document.body.removeEventListener("keyup", callback);
		};
	};
	return {
		onMount,
		action,
		icon: "fa-solid fa-heading",
		name: "heading"
	};
}
