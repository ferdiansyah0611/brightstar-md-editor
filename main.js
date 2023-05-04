import "./style/main.sass";
import MdEditor from "./src";

document.addEventListener("DOMContentLoaded", () => {
  console.time("Load MdEditor");
  let editor = new MdEditor({
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
  console.timeEnd("Load MdEditor");
});