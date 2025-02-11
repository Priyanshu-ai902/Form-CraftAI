"use client";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

// Form field components
const FormField = ({ type }) => {
  return (
    <div className="bg-card p-4 rounded-lg w-full border border-border">
      <label className="text-foreground text-sm mb-1 block">{type} Field</label>
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
        <label className="flex items-center gap-2 text-foreground">
          <input type="checkbox" className="accent-primary" /> Checkbox Label
        </label>
      )}
    </div>
  );
};

// Draggable Form Elements
const DraggableElement = ({ id, type }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-secondary p-4 text-foreground flex items-center justify-center rounded-lg cursor-grab border border-border w-40"
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
  ];

  const [formFields, setFormFields] = useState([]);
  const { setNodeRef } = useDroppable({
    id: "drop-area",
  });

  const handleDrop = (event) => {
    const { active } = event;
    const type = elements.find((el) => el.id === active.id)?.type;
    if (type) {
      setFormFields([...formFields, { id: Date.now(), type }]);
    }
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="flex gap-6 p-6 bg-background min-h-screen">
        {/* Left Side: Form Elements */}
        <div className="w-1/4 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-foreground mb-4">Form elements</h2>
          <div className="grid grid-cols-2 gap-4">
            {elements.map((el) => (
              <DraggableElement key={el.id} id={el.id} type={el.type} />
            ))}
          </div>
        </div>

        {/* Right Side: Drop Area */}
        <div
          ref={setNodeRef}
          className="w-3/4 p-6 bg-card rounded-lg border border-border min-h-[400px]"
        >
          {formFields.length === 0 ? (
            <p className="text-muted-foreground">Drag and drop fields here...</p>
          ) : (
            formFields.map((field) => (
              <FormField key={field.id} type={field.type} />
            ))
          )}
        </div>
      </div>
    </DndContext>
  );
}
