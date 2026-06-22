"use client";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from '@/components/ui/button';
import { 
  Type, Hash, AlignLeft, Calendar, ChevronDown, CheckSquare, 
  Upload, Star, Mail, ListTodo, CircleDot, Lock, Link2, 
  GripVertical, FileText, Download, Save, Eye, Sparkles, Trash2
} from 'lucide-react'
import { toast } from 'sonner'

const ICON_MAP = {
  "Text": Type,
  "Number": Hash,
  "TextArea": AlignLeft,
  "Date": Calendar,
  "Select": ChevronDown,
  "Checkbox": CheckSquare,
  "File Upload": Upload,
  "Rating": Star,
  "Email": Mail,
  "Multiple Choice": ListTodo,
  "Radio Button": CircleDot,
  "Password": Lock,
  "URL Input": Link2
};

const FormField = ({ type, onDelete }) => {
  const Icon = ICON_MAP[type] || FileText;

  return (
    <div className="group/field relative bg-[#111827] border border-slate-800 p-5 rounded-2xl w-full shadow-sm hover:border-indigo-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-3.5">
        <label className="text-slate-300 text-sm font-semibold flex items-center gap-2">
          <Icon className="h-4 w-4 text-indigo-400" />
          {type} Field
        </label>
        {onDelete && (
          <button 
            onClick={onDelete}
            className="text-slate-500 hover:text-rose-450 p-1 hover:bg-rose-500/10 rounded-lg transition-colors opacity-0 group-hover/field:opacity-100 duration-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {type === "Text" && (
        <input type="text" placeholder={`Enter ${type}`} className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm" />
      )}
      {type === "Number" && (
        <input type="number" placeholder={`Enter ${type}`} className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm" />
      )}
      {type === "TextArea" && (
        <textarea placeholder={`Enter ${type}`} className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm h-20 resize-none"></textarea>
      )}
      {type === "Date" && (
        <input type="date" className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm" />
      )}
      {type === "Select" && (
        <div className="relative">
          <select className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-450 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm appearance-none">
            <option>Select an option</option>
          </select>
          <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-slate-500 pointer-events-none" />
        </div>
      )}
      {type === "Checkbox" && (
        <label className="flex items-center gap-3 text-slate-300 text-sm cursor-pointer select-none">
          <input type="checkbox" className="accent-indigo-500 h-4.5 w-4.5 rounded border-slate-800 bg-[#0B1020]" />
          <span>Checkbox Label Option</span>
        </label>
      )}
      {type === "File Upload" && (
        <div className="w-full bg-[#0B1020] border border-dashed border-slate-800 rounded-xl p-6 text-center hover:border-indigo-500/40 transition-colors cursor-pointer">
          <Upload className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
          <span className="text-xs text-slate-400">Click or drag files to upload</span>
        </div>
      )}
      {type === "Rating" && (
        <div className="flex gap-1.5 py-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-amber-500 text-xl cursor-pointer hover:scale-110 transition-transform">★</span>
          ))}
        </div>
      )}
      {type === "Email" && (
        <input type="email" placeholder="Enter Email" className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm" />
      )}
      {type === "Multiple Choice" && (
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-slate-300 text-sm cursor-pointer select-none">
            <input type="checkbox" className="accent-indigo-500 h-4.5 w-4.5 rounded border-slate-850 bg-[#0B1020]" />
            Option 1
          </label>
          <label className="flex items-center gap-3 text-slate-300 text-sm cursor-pointer select-none">
            <input type="checkbox" className="accent-indigo-500 h-4.5 w-4.5 rounded border-slate-855 bg-[#0B1020]" />
            Option 2
          </label>
        </div>
      )}
      {type === "Radio Button" && (
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-slate-300 text-sm cursor-pointer select-none">
            <input type="radio" name="radio-option" className="accent-indigo-500 h-4.5 w-4.5" />
            Option A
          </label>
          <label className="flex items-center gap-3 text-slate-300 text-sm cursor-pointer select-none">
            <input type="radio" name="radio-option" className="accent-indigo-500 h-4.5 w-4.5" />
            Option B
          </label>
        </div>
      )}
      {type === "Password" && (
        <input type="password" placeholder="Enter Password" className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm" />
      )}
      {type === "URL Input" && (
        <input type="url" placeholder="Enter URL" className="w-full bg-[#0B1020] border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 outline-none text-sm" />
      )}
    </div>
  );
};

const DraggableElement = ({ id, type }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  const Icon = ICON_MAP[type] || FileText;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-[#111827] border border-slate-800/80 hover:border-indigo-500/30 p-3 text-slate-300 hover:text-white flex items-center gap-2.5 rounded-xl cursor-grab transition-all duration-200 select-none hover:scale-[1.02] hover:bg-slate-800/20 active:cursor-grabbing group shadow-sm"
    >
      <GripVertical className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
      <Icon className="h-4 w-4 text-indigo-400 shrink-0" />
      <span className="text-xs font-semibold">{type}</span>
    </div>
  );
};

export default function FormBuilder() {
  const sections = {
    "Basic Fields": [
      { id: "text", type: "Text" },
      { id: "number", type: "Number" },
      { id: "textarea", type: "TextArea" },
      { id: "email", type: "Email" },
      { id: "password", type: "Password" },
      { id: "date", type: "Date" }
    ],
    "Choice Fields": [
      { id: "select", type: "Select" },
      { id: "checkbox", type: "Checkbox" },
      { id: "multiple-choice", type: "Multiple Choice" },
      { id: "radio", type: "Radio Button" }
    ],
    "Advanced Fields": [
      { id: "file-upload", type: "File Upload" },
      { id: "rating", type: "Rating" },
      { id: "url", type: "URL Input" }
    ]
  };

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
      toast.success(`${type} field added to canvas`);
    }
  };

  const handleDeleteField = (idToDelete) => {
    setFormFields(formFields.filter(f => f.id !== idToDelete));
    toast.success("Field removed from canvas");
  };

  const handleDownload = () => {
    const formContainer = document.getElementById("drop-area");
    if (!formContainer) return;
  
    // Get all stylesheets from the document
    let styles = "";
    Array.from(document.styleSheets).forEach((sheet) => {
      try {
        Array.from(sheet.cssRules || sheet.rules).forEach((rule) => {
          styles += rule.cssText + "\n";
        });
      } catch (e) {
        console.log("")
      }
    });
  
    const fullHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Downloaded Form</title>
      <style>
        ${styles}
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
    toast.success("Form HTML downloaded successfully!");
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      {/* Sticky Top Action Bar */}
      <div className="sticky top-0 z-10 bg-[#0B1020]/90 backdrop-blur-md border-b border-slate-800/80 py-4 px-1 flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-white text-xl font-bold tracking-tight flex items-center gap-1.5">
            Builder Canvas <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => toast.info("Live form preview loaded")}
            className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-slate-300 border border-slate-800 rounded-xl px-4 py-2 text-xs font-semibold font-medium transition-all"
          >
            <Eye className="h-4 w-4" /> Preview
          </Button>
          <Button 
            onClick={() => toast.success("Draft saved successfully!")}
            className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-slate-305 border border-slate-800 rounded-xl px-4 py-2 text-xs font-semibold font-medium transition-all"
          >
            <Save className="h-4 w-4" /> Save Draft
          </Button>
          <Button 
            onClick={handleDownload}
            disabled={formFields.length <= 1}
            className={`flex items-center gap-2 font-semibold px-5 py-2 text-xs rounded-xl shadow-lg transition-all ${
              formFields.length <= 1
                ? 'bg-slate-805/40 text-slate-500 border border-slate-800 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/15'
            }`}
          >
            <Download className="h-4 w-4" /> Download HTML
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] pb-16">
        {/* Left Panel: Form Elements grouped */}
        <div className="w-full lg:w-80 shrink-0 bg-[#0F172A] border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-6 h-fit sticky top-24">
          <div>
            <h2 className="text-white text-md font-bold mb-1">Form Elements</h2>
            <p className="text-xs text-slate-400">Drag items to the canvas workspace</p>
          </div>
          
          <div className="space-y-5">
            {Object.entries(sections).map(([sectionTitle, items]) => (
              <div key={sectionTitle} className="space-y-2.5">
                <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  {sectionTitle}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {items.map((el) => (
                    <DraggableElement key={el.id} id={el.id} type={el.type} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Workspace canvas */}
        <div 
          id="drop-area" 
          ref={setNodeRef} 
          className="flex-1 bg-[#111827]/30 border border-slate-800 border-dashed rounded-2xl min-h-[600px] p-6 lg:p-10 space-y-5 transition-all duration-300 hover:border-slate-800/80 hover:bg-[#111827]/40 overflow-y-auto"
        >
          {formFields.length === 0 ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-5">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Build your form</h3>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Drag fields from the elements list on the left and drop them here.
              </p>
            </div>
          ) : (
            formFields.map((field, idx) =>
              field.type === "Form Name" ? (
                <div key={field.id} className="p-5 rounded-2xl bg-[#111827] border border-slate-800/80 flex items-center gap-3 w-full max-w-xl mx-auto shadow-sm">
                  <span className="text-2xl text-white p-2.5 bg-[#0B1020] border border-slate-800 rounded-xl">📄</span>
                  <input type="text" placeholder="Untitled Drag Form" className="bg-transparent text-xl font-bold text-white placeholder-slate-600 focus:outline-none w-full border-b border-transparent focus:border-slate-800 pb-1" />
                </div>
              ) : (
                <div key={field.id} className="max-w-xl mx-auto">
                  <FormField type={field.type} onDelete={() => handleDeleteField(field.id)} />
                </div>
              )
            )
          )}
          
          {/* Visual Drop Guideline empty space prompt */}
          {formFields.length === 1 && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800/50 rounded-xl bg-[#0B1020]/20">
              <div className="w-12 h-12 bg-slate-800/60 text-slate-400 border border-slate-800 rounded-xl flex items-center justify-center mb-4">
                <GripVertical className="h-5 w-5" />
              </div>
              <h4 className="text-slate-300 text-sm font-semibold mb-1">Canvas is empty</h4>
              <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                Start dragging elements from the left panel onto this drop zone.
              </p>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}
