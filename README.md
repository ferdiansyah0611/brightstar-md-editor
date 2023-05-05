# Brightstar MD Editor

This is an elegant editor for Markdown, a lightweight markup language that allows you to write formatted text using plain text syntax. Markdown is often used to create documentation, readme files, and blog posts.

## Usage

To use the Brightstar MD Editor, create a new instance of the MdEditor class and pass in an element to mount it to and a placeholder text to display in the editor:

```javascript
let editor = new MdEditor({
  element: document.getElementById("app"),
  placeholder: "Write Markdown In Here",
});
editor.mount();
```

### Option

The Brightstar MD Editor supports the following options:

**autoSave**

Enables auto-save and restore functionality. Pass an object with an id property to enable auto-save using the browser's localStorage:

```javascript
let option = {
  autoSave: { id: "main_editor" },
};
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
