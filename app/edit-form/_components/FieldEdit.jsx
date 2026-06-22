import { Edit2, Trash2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function FieldEdit({ defaultValue, onUpdate, deleteField }) {
  const [label, setLabel] = useState(defaultValue.fieldLabel);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);

  useEffect(() => {
    setLabel(defaultValue.fieldLabel);
    setPlaceholder(defaultValue.placeholder);
  }, [defaultValue]);

  return (
    <div className='flex gap-2.5 items-center'>
      {/* Edit Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button 
            type="button" 
            className='p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/40 text-slate-300 hover:text-white rounded-xl transition-all duration-200 shadow-sm active:scale-95'
            title="Edit Field Label"
          >
            <Edit2 className='h-4 w-4' />
          </button>
        </PopoverTrigger>
        <PopoverContent className="bg-[#111827] border border-slate-800 text-white rounded-2xl p-5 shadow-2xl space-y-4 max-w-sm">
          <div>
            <h3 className="font-bold text-sm text-slate-200">Edit Field Properties</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Customize the visual labels and placeholders.</p>
          </div>
          <div className="space-y-3.5">
            <div>
              <label className='text-xs font-semibold text-slate-400 mb-1.5 block'>Label Name</label>
              <Input 
                type="text" 
                value={label} 
                onChange={(e) => setLabel(e.target.value)} 
                className="bg-[#0B1020] border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-emerald-500"
              />
            </div>
            {defaultValue.fieldType !== 'checkbox' && defaultValue.fieldType !== 'radio' && (
              <div>
                <label className='text-xs font-semibold text-slate-400 mb-1.5 block'>Placeholder Text</label>
                <Input 
                  type="text" 
                  value={placeholder} 
                  onChange={(e) => setPlaceholder(e.target.value)} 
                  className="bg-[#0B1020] border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-emerald-500"
                />
              </div>
            )}
            <Button
              size="sm" 
              className="w-full bg-emerald-600 hover:bg-emerald-550 text-white font-semibold rounded-xl h-10 mt-2 shadow-md transition-all active:scale-[0.98]"
              onClick={() => onUpdate({
                fieldLabel: label,
                placeholder: placeholder
              })}
            >
              Sync Changes
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Delete Confirmation Alert */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button 
            type="button" 
            className='p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-rose-400 hover:text-rose-300 rounded-xl transition-all duration-200 shadow-sm active:scale-95'
            title="Delete Field"
          >
            <Trash2 className='h-4 w-4' />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#111827] border border-slate-800 text-white rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">Remove form field?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 text-sm">
              This field will be deleted from your form structure. Any layout configs will be reset.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="bg-transparent border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-2.5 rounded-xl font-medium transition-colors">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteField()} 
              className="bg-rose-650 hover:bg-rose-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              Delete Field
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default FieldEdit

