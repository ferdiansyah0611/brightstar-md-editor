import { makeElement } from "../constant";

export default function makeFooter() {
	const encoder = new TextEncoder();

	let footer = makeElement("footer");
	let div1 = makeElement("div");
	let div2 = makeElement("div");
	let char = makeElement("p");
	let info = makeElement("p");
	let line = makeElement("p");

	const effect = (value = this.textarea.el.value) => {
		char.innerText = value.length + " Word";
		line.innerText = [...value.matchAll(/\n/g)].length + 1 + " Line";
	};
	info.innerText = "Markdown";
	footer.classList.add("mdeditor-footer");
	effect();

	this.textarea.el.addEventListener("keyup", (e) => {
		let value = e.target.value;
		effect(value);
	});
	div1.appendChild(info);
	div2.appendChild(char);
	div2.appendChild(line);
	footer.appendChild(div1);
	footer.appendChild(div2);

	this.footer = footer;
	this.footer.effect = effect;
	this.element.appendChild(footer);
	return footer;
}
