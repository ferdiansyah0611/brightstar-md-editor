import { makeElement } from "../constant";

export default function makePreview() {
	let root = this.element.querySelector(".preview > div:nth-child(2)");
	let result = this.toHTML();
	if (!root) {
		let div1 = makeElement("div");
		let div2 = makeElement("div");
		let close = makeElement("a");
		close.innerHTML = '<i class="fa-solid fa-close"></i>';
		close.classList.add("close-preview");
		close.addEventListener(
			"click",
			() => {
				let root = this.element.querySelector(".preview");
				if (root) {
					root.remove();
					this.$state.set("onPreview", false);
				}
			},
			{ once: true }
		);

		root = makeElement("div");
		root.classList.add("preview");

		div1.appendChild(close);
		root.appendChild(div1);
		root.appendChild(div2);

		div2.innerHTML = result;
		this.textarea.el.parentNode.appendChild(root);
	} else {
		root.innerHTML = result;
	}

	root.querySelectorAll("pre code").forEach((el) => {
		hljs.highlightElement(el);
	});
	this.$state.set("onPreview", true);
}
