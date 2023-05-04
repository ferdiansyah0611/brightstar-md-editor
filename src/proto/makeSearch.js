import { makeElement } from "../constant";

export default function makeSearch() {
	if (this.element.querySelector(".mdeditor-search")) return;
	let rootBtn = makeElement("div");
	let searchEl = makeElement("div");
	searchEl.classList.add("mdeditor-search");
	// input
	let inputSearch = makeElement("input");
	inputSearch.setAttribute("placeholder", "search or search:replace-text");
	searchEl.appendChild(inputSearch);

	let eventCache = [];

	const resetList = () => {
		let list = this.element.querySelector(".list-result");
		if (!list) return;
		list.remove();
		eventCache.forEach((item) => item());
		eventCache = [];
	};
	const getValueInput = () => inputSearch.value.split(":");
	const getSearchInput = (input) => [...this.textarea.el.value.matchAll(new RegExp(input, "g"))];
	// find
	let btnSearch = makeElement("button");
	btnSearch.innerHTML = "Find";
	btnSearch.classList.add("find");
	btnSearch.addEventListener("click", (e) => {
		let [input, replace] = getValueInput();
		if (!input) return;
		resetList();
		let find = getSearchInput(input);
		// empty result
		if (!find.length) return;
		let list = makeElement("div");
		list.classList.add("list-result");
		find.forEach((item, i) => {
			let el = makeElement("div");
			let p = makeElement("p");
			// focus
			let buttonFocus = makeElement("button");
			const callbackFocus = () => {
				let end = item.index + item[0].length;
				let lineHeight = parseInt(window.getComputedStyle(this.textarea.el).lineHeight)

				let text = this.textarea.el.value;
				let width = this.textarea.el.clientWidth;
				let line = 0;
				let size = 0;
				for (let i = 0; i < text.length; i++) {
					if (i === item.index) {
						break
					}
					if (text[i] === '\n') {
						line += 1;
						size = 0;
					}
					if (size >= width) {
						line += 1;
						size = 0;
					}
					else{
						size += 5
					}
				}
				this.textarea.el.focus();
				this.textarea.el.setSelectionRange(item.index, end);
				this.textarea.el.scrollTo(0, line === 0 ? 0: line * lineHeight);
			};
			const removeEventFocus = () => buttonFocus.removeEventListener("click", callbackFocus);
			buttonFocus.innerText = "Focus";
			// replace
			let buttonReplace = makeElement("button");
			buttonReplace.innerText = "Replace";
			buttonReplace.classList.add("replace");
			buttonReplace.addEventListener("click", () => {
				if (!replace) return;
				let value =
					this.textarea.el.value.slice(0, item.index) +
					this.textarea.el.value.slice(item.index).replace(item[0], replace);
				this.textarea.el.value = value;
				el.remove();
				removeEventFocus();
				find.splice(i, i);
				// remove list-result on empty result
				if (find.length === 1) {
					list.remove();
				}
			});

			buttonFocus.addEventListener("click", callbackFocus);
			eventCache.push(() => removeEventFocus());
			p.innerText = `${i + 1}. ${item[0]}`;
			el.appendChild(p);
			el.appendChild(buttonFocus);
			el.appendChild(buttonReplace);
			list.appendChild(el);
		});
		this.element.insertBefore(list, this.element.children[2]);
	});
	// replace all
	let btnSearchReplace = makeElement("button");
	btnSearchReplace.innerHTML = "Replace All";
	btnSearchReplace.classList.add("replace");
	btnSearchReplace.addEventListener("click", () => {
		let [input, replace] = getValueInput();
		if (!replace) return;
		this.textarea.el.value = this.textarea.el.value.replaceAll(input, replace);
	});
	// close
	let btnClose = makeElement("button");
	btnClose.innerHTML = "Close";
	btnClose.classList.add("close");
	btnClose.addEventListener(
		"click",
		(e) => {
			searchEl.remove();
			resetList();
		},
		{ once: true }
	);
	rootBtn.appendChild(btnSearch);
	rootBtn.appendChild(btnSearchReplace);
	rootBtn.appendChild(btnClose);
	searchEl.appendChild(rootBtn);
	return searchEl;
}