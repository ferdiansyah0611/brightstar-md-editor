import { makeElement } from "../constant";

export default function makeTextArea() {
	let root = makeElement("div");
	let textarea = makeElement("textarea");
	let result = {
		root,
		el: textarea,
		addEvent: (name, callback, option) => {
			textarea.addEventListener(name, callback, option);
			this.detachAction.push(() => textarea.removeEventListener(name, callback, option));
		},
	};
	if (this._placeholder) {
		result.el.setAttribute("placeholder", this._placeholder);
	}

	textarea.addEventListener("keyup", (e) => {
		if (this.$state.onPreview) this.makePreview();
	});

	root.classList.add("textarea-container");
	root.appendChild(result.el);

	this.textarea = result;
}
