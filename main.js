import "./style/main.sass";
import BrightstarMdEditor from "./src";

if (import.meta.env.PROD) {
  window.BrightstarMdEditor = BrightstarMdEditor
}
else {
  document.addEventListener("DOMContentLoaded", () => {
    console.time("Load BrightstarMdEditor");
    let editor = new BrightstarMdEditor({
      element: document.getElementById("app"),
      placeholder: "Write Markdown In Here",
      option: {
        autoSave: {
          id: "main_editor",
        },
      },
    });
    editor.text("# hello world\n## hello world");
    editor.setMode(true);
    editor.mount();
    console.timeEnd("Load BrightstarMdEditor");
  });
}
