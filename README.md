# Brightstar MD Editor

This is an elegant editor for Markdown, a lightweight markup language that allows you to write formatted text using plain text syntax. Markdown is often used to create documentation, readme files, and blog posts.

[DEMO](https://ferdiansyah0611.github.io/brightstar-md-editor)

## Usage

To use the Brightstar MD Editor, create a new instance of the BrightstarMdEditor class and pass in an element to mount it to and a placeholder text to display in the editor:

```javascript
let option = {};
let editor = new BrightstarMdEditor({
  element: document.getElementById("app"),
  placeholder: "Write Markdown In Here",
  option
});
editor.mount();
```

## Installation

**Using CDN**

To use the editor with the CDN, add the following code to your HTML file:

```html
<!-- Add this CSS to the head of your HTML file -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/brightstar-md-editor@latest/dist/assets/index.css" />

<!-- Add this JavaScript to the end of the body of your HTML file -->
<script src="https://cdn.jsdelivr.net/npm/brightstar-md-editor@latest/dist/assets/index.js"></script>
```

**Using NPM**

To install the editor with NPM, run the following command:

```bash
npm i brightstar-md-editor
```

After installing, you can import the editor into your project like this:

```javascript
import BrightstarMdEditor from 'brightstar-md-editor';

// Create a new instance of the editor
const editor = new BrightstarMdEditor();
```

### Option

The Brightstar MD Editor supports the following options:

**autoSave**

Enables auto-save and restore functionality. Pass an object with an id property to enable auto-save using the browser's localStorage:

```javascript
option.autoSave = { id: "main_editor" };
```

**disallow**

If your site already has fontawesome and highlight.js, you can disable them to prevent library collisions.

```javascript
option.disallow = { icon: true, highlight: true };
```

**parse**

If you already have a markdown parse, you can use the parse without having to use the default (showdown.js).

```javascript
option.parse = (text) => myMarkdownParse(text)
```

### Property

The Brightstar MD Editor has the following properties:

**text(value?)**

Gets or sets the text content of the editor. Pass a value to set the editor content:

```javascript
editor.text("# lorem ipsum")
```

**setMode(bool?)**

Sets the editor mode to light or dark. Pass true to enable dark mode:

```javascript
editor.setMode(true)
```

**getMode(bool?)**

Gets the current editor mode. Returns true if the editor is in dark mode:

```javascript
editor.getMode()
```

**setPlugin(object)**

Assigns plugin values to the editor. Pass an object with plugin values to assign them to the editor:

```javascript
editor.setPlugin({
  bold: { hidden: true },
});
```

**addMenu(text, iconClassName, callback)**

Adds a menu item to the editor. Pass the menu text, an icon class name, and a callback function to be called when the menu item is clicked:

```javascript
editor.addMenu("Save As", "fa-solid fa-floppy-disk", () => {
  console.log("clicked");
});
```

**mount()**

Mounts the editor to the specified element:

```javascript
editor.mount()
```

**detach()**

Removes the editor, including event listeners and nodes:

```javascript
editor.detach()
```

**setDisable(isDisable?)**

Disables or enables the editor. Pass true to disable the editor:

```javascript
editor.setDisable(true)
```

**use(plugin)**

Injects a plugin into the editor. Pass a function that returns an object with an action function to be called when the plugin is clicked, and an onMount function to be called when the plugin is mounted:

```javascript
editor.use(myPlugin);

function myPlugin() {
  // icon toolbar
  const icon = "fa-solid fa-floppy-disk";
  // action for click in toolbar
  const action = () => {
    console.log("clicked");
  };
  // mount editor
  const onMount = () => {
    console.log("mount");
    return () => {
      console.log("detach");
    };
  };

  return { action, onMount };
}
```

## Shortcut

Brightstar MD Editor has the following shortcuts:

| Key | Function |
| ----------- | ----------- |
| ctrl + shift + H | heading |
| ctrl + b | bold |
| ctrl + shift + L | code |
| ctrl + i | italic |

## Customize Theme

Change the following properties to change the theme:

```css
:root {
  --bg-primary: #f3f3f3;
  --bg-primary-hover: #ffffff;
  --text-primary: #000000;
  --border-primary: #d9d9d9;
  --bg-toolbar: #f1f1f1;
  --color-toolbar-disable: #767676;
  --bg-selection: #00afcb;
  --font-family: system-ui;
  --bg-dropdown: #f1f1f1;
  --shadow-color: rgb(155 155 155 / 55%);
  --bg-table: #ffffff;
}

.mdeditor-dark {
  --bg-primary: #242424;
  --bg-primary-hover: #565656;
  --text-primary: #ffffff;
  --border-primary: #767676;
  --bg-toolbar: #363636;
  --color-toolbar-disable: #cfcfcf;
  --bg-selection: #4c4c4c;
  --bg-dropdown: #181818;
  --shadow-color: rgb(0 0 0 / 66%);
  --bg-table: rgb(13 17 23);
  color-scheme: dark;
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
