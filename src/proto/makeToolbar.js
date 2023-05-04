import { makeElement } from "../constant";

export default function makeToolbar() {
	let container = makeElement("div");
	let el = makeElement("div");

	el.classList.add("toolbar");
	container.classList.add("toolbar-container");
	// plugin
	this.plugins.forEach((plugins) => {
		if (plugins.hasOwnProperty("hidden") && plugins.hidden) return;
		let link = this.makeIcon(plugins);
		el.appendChild(link);
	});

	// help
	let root = makeElement("div");
	let menu = this.makeIcon({
		name: "menu",
		icon: "fa-solid fa-bars",
		action() {},
	});
	let callback = (e) => {
		if (this.$state.onDisable) return;
		if (menu.classList.contains("active") || !e) {
			return menu.classList.remove("active");
		}
		menu.classList.add("active");
		setTimeout(() => {
			document.body.addEventListener(
				"click",
				() => {
					callback();
				},
				{
					once: true,
				}
			);
		}, 500);
	};
	menu.addEventListener("click", callback);
	root.classList.add("toolbar-help");
	root.appendChild(menu);
	container.appendChild(el);
	container.appendChild(root);
	// dropdown
	let dropdown = makeElement("div");
	dropdown.classList.add("mdeditor-dropdown");
	// make option dropdown
	const makeOptDropdown = (action, text, icon) => {
		let el = makeElement("a");
		el.addEventListener("click", action);
		el.innerHTML = `<i class="${icon}"></i> <span>${text}</span>`;
		this.detachAction.push(() => el.removeEventListener("click", action));
		return el;
	};
	let link = [
		wrapLink(
			() => {
				this.makePreview();
			},
			"Preview",
			"fa-solid fa-eye"
		),
		wrapLink(
			() => {
				let searchEl = this.makeSearch();
				if (!searchEl) return;
				this.element.insertBefore(searchEl, this.element.querySelector(".textarea-container"));
			},
			"Find",
			"fa-solid fa-magnifying-glass"
		),
		wrapLink(
			() => {
				if (this.element.classList.contains("mdeditor-dark")) {
					return this.setMode();
				}
				this.setMode(true);
			},
			"Mode",
			"fa-solid fa-circle-half-stroke"
		),
		wrapLink(
			() => {
				window.open("https://www.markdownguide.org/cheat-sheet");
			},
			"Help",
			"fa-solid fa-circle-info"
		),
	];
	this.menu = [...this.menu, ...link];
	this.menu.forEach((item, i) => {
		dropdown.appendChild(makeOptDropdown(item.action, item.text, item.icon));
	});
	this.detachAction.push(() => help.removeEventListener("click", callback));
	this.toolbar = {
		root: container,
	};

	root.appendChild(dropdown);
}
function wrapLink(action, text, icon) {
	return { action, text, icon };
}
