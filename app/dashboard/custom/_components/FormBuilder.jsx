"use client";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const FormField = ({ type }) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg w-full border border-gray-600">
      <label className="text-white text-sm mb-1 block">{type} Field</label>
      {type === "Text" && <input type="text" placeholder={`Enter ${type}`} className="input-style" />}
      {type === "Number" && <input type="number" placeholder={`Enter ${type}`} className="input-style" />}
      {type === "TextArea" && <textarea placeholder={`Enter ${type}`} className="input-style h-20"></textarea>}
      {type === "Date" && <input type="date" className="input-style" />}
      {type === "Select" && (
        <select className="input-style">
          <option>Select an option</option>
        </select>
      )}
      {type === "Checkbox" && (
        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" className="accent-primary" /> Checkbox Label
        </label>
      )}
      {type === "File Upload" && <input type="file" className="input-style" />}
      {type === "Rating" && (
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500 cursor-pointer">★</span>
          ))}
        </div>
      )}
      {type === "Email" && <input type="email" placeholder="Enter Email" className="input-style" />}
      {type === "Multiple Choice" && (
        <div>
          <label className="flex gap-2"><input type="checkbox" /> Option 1</label>
          <label className="flex gap-2"><input type="checkbox" /> Option 2</label>
        </div>
      )}
      {type === "Radio Button" && (
        <div>
          <label className="flex gap-2"><input type="radio" name="radio" /> Option A</label>
          <label className="flex gap-2"><input type="radio" name="radio" /> Option B</label>
        </div>
      )}
      {type === "Password" && <input type="password" placeholder="Enter Password" className="input-style" />}
      {type === "URL Input" && <input type="url" placeholder="Enter URL" className="input-style" />}
    </div>
  );
};

const DraggableElement = ({ id, type }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-slate-600 p-4 text-white flex items-center justify-center rounded-lg cursor-grab border border-gray-500 w-40"
    >
      {type}
    </div>
  );
};

export default function FormBuilder() {
  const elements = [
    { id: "text", type: "Text" },
    { id: "number", type: "Number" },
    { id: "textarea", type: "TextArea" },
    { id: "date", type: "Date" },
    { id: "select", type: "Select" },
    { id: "checkbox", type: "Checkbox" },
    { id: "file-upload", type: "File Upload" },
    { id: "rating", type: "Rating" },
    { id: "email", type: "Email" },
    { id: "multiple-choice", type: "Multiple Choice" },
    { id: "radio", type: "Radio Button" },
    { id: "password", type: "Password" },
    { id: "url", type: "URL Input" },
  ];

  const [formFields, setFormFields] = useState([{ id: "form-name", type: "Form Name" }]); // Form Name is default
  const { setNodeRef } = useDroppable({ id: "drop-area" });

  const handleDrop = (event) => {
    const { active } = event;
    const type = elements.find((el) => el.id === active.id)?.type;
    if (type) {
      setFormFields([...formFields, { id: Date.now(), type }]);
    }
  };

  const handleDownload = () => {
    const formContainer = document.getElementById("drop-area");
  
    // Get all stylesheets from the document
    let styles = "";
    Array.from(document.styleSheets).forEach((sheet) => {
      try {
        Array.from(sheet.cssRules || sheet.rules).forEach((rule) => {
          styles += rule.cssText + "\n";
        });
      } catch (e) {
        console.warn("Could not read CSS rules from a stylesheet", e);
      }
    });
  
    const fullHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Downloaded Form</title>
      <style>
        ${styles} /* 🛠 Includes all CSS from your project */
      </style>
    </head>
    <body>
      <div id="drop-area">
        ${formContainer.innerHTML}
      </div>
    </body>
    </html>`;
  
    // Create a downloadable file
    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "custom-form.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  





  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="flex gap-8 p-7 bg-slate-950 h-screen">
        <div className="w-1/4 bg-slate-950 rounded-lg border border-gray-300">
          <h2 className="text-white mb-4 pt-6 p-3 text-2xl">Form Elements</h2>
          <div className="grid grid-cols-2 gap-3">
            {elements.map((el) => (
              <DraggableElement key={el.id} id={el.id} type={el.type} />
            ))}
          </div>
        </div>

        {/* Form Drop Area */}
        <div id="drop-area" ref={setNodeRef} className="w-3/4 p-6 bg-zinc-950 rounded-lg border border-gray-600 min-h-[400px] space-y-4 h-screen overflow-auto">
          {formFields.length === 0 ? (
            <p className="text-white">Drag and drop fields here...</p>
          ) : (
            formFields.map((field) =>
              field.type === "Form Name" ? (
                <div key={field.id} className="p-4 rounded-lg bg-zinc-950 flex items-center gap-2 w-1/2 justify-center mx-auto">
                  <span className="text-4xl text-white p-2 bg-black rounded-full">📄</span>
                  <input type="text" placeholder="Form Name" className="input-style text-2xl font-bold text-white rounded-md px-4 py-2 w-full" />
                </div>
              ) : (
                <FormField key={field.id} type={field.type} />
              )
            )
          )}

          {/* Download Button */}
          {formFields.length > 1 && (
            <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Download Form
            </button>

          )}
        </div>
      </div>
    </DndContext>
  );
}
