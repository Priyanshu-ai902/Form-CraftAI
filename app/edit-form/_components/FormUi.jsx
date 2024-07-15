import { Input } from '@/components/ui/input';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Checkbox } from '@/components/ui/checkbox';
import FieldEdit from './FieldEdit';

function FormUi({ jsonForms,selectedTheme, onFieldUpdate ,deleteField}) {
  return (
    <div className='border p-5 md:w-[600px] h-full overflow-y-auto rounded-lg' data-theme={selectedTheme}>
      <h2 className='font-bold text-center text-2xl'>{jsonForms?.formTitle}</h2>
      <h2 className='text-sm text-gray-600 text-center'>{jsonForms?.formHeading}</h2>

      {jsonForms?.formFields && jsonForms.formFields.map((field, index) => (
        <div key={index} className='flex'>
          {
            field.fieldType == "select" ?
              <div className='my-3 w-full'>
                <label className='text-xm text-gray-600'>{field.fieldLabel}</label>
                < Select >
                  <SelectTrigger className="w-full md:w-[180px] bg-transparent">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((item, index) => (
                      <SelectItem key={index} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              : field.fieldType == 'radio' ?
                <div className='my-3 w-full'>
                  <label className='text-xm text-gray-600'>{field.fieldLabel}</label>
                  <RadioGroup defaultValue={item.label}>
                    {field.options.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={item.label} id={item.label} />
                        <Label htmlFor={item.label}>{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                : field.fieldType == 'checkbox' ?
                  <div className='my-3 w-full'>
                    <label>{field.fieldLabel}</label>
                    {field.options ? field.options.map((item, index) => (
                      <div key={index} className='flex gap-2 items-center'>
                        <Checkbox />
                        <h2>{item}</h2>
                      </div>
                    ))
                      :
                      <div>
                        <Checkbox />
                        <h2>{field.label}</h2>
                      </div>
                    }
                  </div>
                  : <div className='my-3 w-full'>
                    <label className='text-xm text-gray-600'>{field.fieldLabel}</label>
                    <Input
                      type={field.fieldType}
                      placeholder={field.placeholder}
                      name={field.fieldName}
                    />
                  </div>}
          <div>
            <FieldEdit defaultValue={field} onUpdate={(value) => onFieldUpdate(value, index)} 
              deleteField={()=>deleteField(index)}/>
          </div>
        </div>
      ))}
      <button className='btn btn-primary'>Submit</button>
    </div>
  );
}

export default FormUi;



// http://localhost:3000/edit-form/19