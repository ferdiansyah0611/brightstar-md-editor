import { makeElement } from "../constant";

export default function makeIcon(plugins) {
	let root = makeElement("a");
	let icons = makeElement("i");
	let callback = (e) => {
		if (this.$state.onDisable) return;
		return plugins.action(e)
	}
	icons.setAttribute("class", plugins.icon);
	root.setAttribute("title", plugins.name);
	root.addEventListener("click", callback);
	root.appendChild(icons);
	this.detachAction.push(() => root.removeEventListener("click", callback));
	return root;
}