import { Edit, Trash } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

function FieldEdit({ defaultValue, onUpdate }) {
  const [label, setLabel] = useState(defaultValue.fieldLabel);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);

  useEffect(() => {
    setLabel(defaultValue.fieldLabel);
    setPlaceholder(defaultValue.placeholder);
  }, [defaultValue]);

  return (
    <div className='flex gap-2'>
      <Popover>
        <PopoverTrigger><Edit className='h-5 w-5 text-gray-700' /></PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className='text-xs'>Label Name</label>
            <Input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div>
            <label className='text-xs'>Placeholder</label>
            <Input type="text" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
          </div>
          <Button
            size="sm" className="mt-3"
            onClick={() => onUpdate({
              fieldLabel: label,
              placeholder: placeholder
            })}>Update</Button>
        </PopoverContent>
      </Popover>
      <Trash className='h-5 w-5 text-blue-950' />
    </div>
  )
}

export default FieldEdit
