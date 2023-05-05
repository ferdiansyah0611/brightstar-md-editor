import { insertCursor, getLinesCursor, getSelectionCursor } from "../cursor";

const SAMPLE = '| Syntax | Description |\n| ----------- | ----------- |\n| Header | Title |\n| Paragraph | Text |\n'

export default function table() {
	const action = () => {
		let { start, valueSelection } = getSelectionCursor(this.textarea.el);
		let insert = insertCursor(this.textarea.el.value, start, SAMPLE);
		this.textarea.el.value = insert;
		this.textarea.el.setSelectionRange(start, start + SAMPLE.length);
		this.historyUpdateDefault();
	}
	return {
		action,
		icon: "fa-solid fa-table",
		name: "table"
	};
}
