import React, { useEffect } from 'react';
import { FormEditor, FormPlayground } from "@bpmn-io/form-js";
import './App.css';
import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import "@bpmn-io/form-js/dist/assets/form-js-playground.css";
import schema from "./empty.json";
import PropertiesPanelExtension from './propertiesPanel'
import RangeExtension from './components/Range'

export const JSONToFile = (obj, filename) => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
};


function App() {

  const init = async () => {
    let el = document.querySelector("#form");
    if (el !== null) {
      const form = new FormEditor({
        container: document.querySelector("#form"),
        // schema: schema,
        data: {},

        // load rendering extension
        additionalModules: [
          RangeExtension,
          PropertiesPanelExtension
        ],

        // load properties panel extension
        // editorAdditionalModules: [PropertiesPanelExtension],
      });
      await form.importSchema(schema);
      // console.log("form properties", form);
      const btn = document.getElementById("download-button");

      btn?.addEventListener("click", () => {
        const schema = form.getSchema();
        JSONToFile(schema, "customSchema");
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <div id="form"></div>
      {/* <button id="download-button">Download schema</button> */}
    </div>
  );
}

export default App;
