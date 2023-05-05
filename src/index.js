import { makeElement } from "./constant";
import History from "./History";

import makePreview from "./proto/makePreview";
import makeToolbar from "./proto/makeToolbar";
import makeSearch from "./proto/makeSearch";
import makeTextArea from "./proto/makeTextArea";
import makeIcon from "./proto/makeIcon";
import makeFooter from "./proto/makeFooter";

import heading from "../utils/syntax/heading";
import bold from "../utils/syntax/bold";
import italic from "../utils/syntax/italic";
import blockquote from "../utils/syntax/blockquote";
import orderedList from "../utils/syntax/orderedList";
import unorderedList from "../utils/syntax/unorderedList";
import taskList from "../utils/syntax/taskList";
import code from "../utils/syntax/code";
import horizontal from "../utils/syntax/horizontal";
import link from "../utils/syntax/link";
import image from "../utils/syntax/image";
import strikethrough from "../utils/syntax/strikethrough";
import table from "../utils/syntax/table";

class BrightstarMdEditor {
	constructor({ element, placeholder, option }) {
		if (!option.disallow) {
			option.disallow = {};
		}

		this.$state = {
			onDisable: false,
			onPreview: false,
			set: (key, value) => {
				this.$state[key] = value;
				if (key === "onPreview") {
					let name = "preview-active";
					value ? this.element.classList.add(name) : this.element.classList.remove(name);
				}
				if (key === "onDisable") {
					let name = "mdeditor-disabled";
					if (value) {
						this.element.classList.add(name);
						this.textarea.el.setAttribute("disabled", "");
					} else {
						this.element.classList.remove(name);
						this.textarea.el.removeAttribute("disabled");
					}
				}
				return true;
			},
		};
		this.detachAction = [];
		this.menu = [];
		this.pluginsOption = {};
		this.history = new History();
		this.element = element;
		this.option = option || {};
		this.plugins = [
			heading,
			bold,
			italic,
			blockquote,
			orderedList,
			unorderedList,
			taskList,
			code,
			horizontal,
			link,
			image,
			strikethrough,
			table,
		];
		this._placeholder = placeholder;
		this._process();
	}
	// process editor
	_process() {
		this._createDefaultParse();
		this._createHighlight();
		this._createIcon();
		this._createTextArea();
		this.history.setNode(this.textarea.el);
	}
	// make a textarea
	_createTextArea() {
		let autoSave = this.option.autoSave;
		const callback = (e) => {
			this.history.update(e.target.value);
			if (autoSave && autoSave.id) {
				window.localStorage.setItem(autoSave.id, e.target.value);
			}
		};
		this.makeTextArea();
		this.historyUpdateDefault();
		this.textarea.el.addEventListener("change", callback);
		this.detachAction.push(() => this.textarea.el.removeEventListener("change", callback));
	}
	// plugins
	_createPlugins() {
		let historyAction = [
			{
				icon: "fa-solid fa-undo",
				name: "undo",
				action: () => {
					this.history.undo();

					let value = this.textarea.el.value;
					if (this.$state.onPreview) this.makePreview();
					if (this.footer) this.footer.effect(value);
				},
			},
			{
				icon: "fa-solid fa-redo",
				name: "redo",
				action: () => {
					this.history.redo();

					let value = this.textarea.el.value;
					if (this.$state.onPreview) this.makePreview();
					if (this.footer) this.footer.effect(value);
				},
			},
		];
		this.plugins = [...historyAction, ...this.plugins].map((plugin) => {
			if (typeof plugin === "function") {
				plugin = plugin.bind(this)();
			}
			if (this.pluginsOption[name]) {
				plugin = Object.assign(plugin, this.pluginsOption[name]);
			}
			return plugin;
		});
	}
	// default parse markdown
	_createDefaultParse() {
		if (!this.option.parse) {
			const CDN = "https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js";
			const script = makeElement("script");
			script.setAttribute("src", CDN);
			document.body.appendChild(script);
		}
		return;
	}
	// default highlight
	_createHighlight() {
		if (!this.option.disallow.highlight) {
			if (this.highlight) {
				this.highlight.link.remove();
			} else {
				const script = makeElement("script");
				script.setAttribute(
					"src",
					"//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"
				);
				document.body.appendChild(script);

				this.highlight = { script };
			}

			let linkURL = "https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/styles/github.css";
			if (this.getMode()) {
				linkURL = "https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/styles/github-dark.css";
			}
			const link = makeElement("link");
			link.setAttribute("rel", "stylesheet");
			link.setAttribute("href", linkURL);
			document.head.appendChild(link);

			this.highlight.link = link;
		}
	}
	// default icon
	_createIcon() {
		if (!this.option.disallow.icon) {
			const link = makeElement("link");
			link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
			link.setAttribute("rel", "stylesheet");
			document.head.appendChild(link);
		}
	}
	historyUpdateDefault() {
		let value = this.textarea.el.value;
		this.history.update(value);
		if (this.$state.onPreview) this.makePreview();
		if (this.footer) this.footer.effect(value);
	}
	// plugins register
	use(instance) {
		this.plugins.push(instance);
	}
	// get/set text
	text(value) {
		if (value && typeof value === "string") {
			this.textarea.el.value = value;
			return true;
		}
		return this.textarea.el.value;
	}
	// return html code
	toHTML() {
		if (!this.option.parse) {
			let converter = new showdown.Converter();
			converter.setOption("tables", true);
			converter.setOption("strikethrough", true);
			converter.setOption("tasklists", true);

			let html = converter.makeHtml(this.textarea.el.value);
			return html;
		}
		return this.option.parse(this.textarea.el.value);
	}
	// set mode light/dark
	setMode(isDark) {
		if (isDark) {
			this.element.classList.add("mdeditor-dark");
			return this._createHighlight();
		}
		this.element.classList.remove("mdeditor-dark");
		return this._createHighlight();
	}
	getMode() {
		return this.element.classList.contains("mdeditor-dark");
	}
	// setPlugin
	setPlugin(object) {
		this.pluginsOption = object;
	}
	// addMenu
	addMenu(text, icon, action) {
		this.menu.push({ text, icon, action });
	}
	// run editor
	mount() {
		let autoSave = this.option.autoSave;

		this._createPlugins();
		this.makeToolbar();
		this.element.classList.add("mdeditor");
		this.element.editor = this;
		this.element.appendChild(this.textarea.root);
		this.element.insertBefore(this.toolbar.root, this.element.firstChild);

		if (autoSave && autoSave.id) {
			let value = window.localStorage.getItem(autoSave.id);
			if (value) {
				this.textarea.el.value = value;
				this.historyUpdateDefault();
			}
		}
		// show textarea
		this.textarea.el.classList.add("mount");
		this.plugins.forEach((plugins) => {
			if (!plugins.hasOwnProperty("onMount")) return;
			let detach = plugins.onMount();
			this.detachAction.push(detach);
		});
		this.makeFooter();
	}
	// detach editor
	detach() {
		this.detachAction.forEach((item) => {
			if (typeof item !== "function") return;
			item();
		});
		this.element.remove();
		// clear
		this.detachAction = [];
	}
	// disable/enable editor
	setDisable(isDisable = false) {
		this.$state.set("onDisable", isDisable);
	}
}

BrightstarMdEditor.prototype.makePreview = makePreview;
BrightstarMdEditor.prototype.makeToolbar = makeToolbar;
BrightstarMdEditor.prototype.makeSearch = makeSearch;
BrightstarMdEditor.prototype.makeTextArea = makeTextArea;
BrightstarMdEditor.prototype.makeIcon = makeIcon;
BrightstarMdEditor.prototype.makeFooter = makeFooter;

export default BrightstarMdEditor;
