import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';
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
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function FormUi({ jsonForms, selectedTheme, onFieldUpdate, deleteField, editable = true, formId = 0, enabledSignIn = false }) {
  const [formData, setFormData] = useState({});
  let formRef = useRef("");
  const { user, isSignedIn } = useUser()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await db.insert(userResponses).values({
        jsonResponse: formData,
        createdAt: moment().format('DD/MM/yyyy'),
        formRef: formId
      })

      if (result) {
        formRef.current?.reset();
        setFormData({});
        toast.success('Response Submitted successfully!')
      } else {
        toast.error('Error submitting response')
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to submit response');
    }
  }

  const handleCheckboxChange = (fieldName, itemName, value) => {
    console.log(fieldName, itemName, value)
  }

  return (
    <form 
      ref={formRef}
      onSubmit={onFormSubmit}
      className='w-full max-w-[700px] border p-8 rounded-2xl shadow-2xl relative transition-all duration-300 h-fit overflow-y-auto mb-16 theme-form' 
      data-theme={selectedTheme}
    >
      <div className="border-b border-slate-800/60 pb-5 mb-6 text-center lg:text-left">
        <h2 className='font-extrabold text-2xl lg:text-3xl tracking-tight theme-form-heading'>
          {jsonForms?.formTitle || 'Untitled Form'}
        </h2>
        {jsonForms?.formHeading && (
          <p className='text-sm mt-2 leading-relaxed theme-form-subheading'>
            {jsonForms?.formHeading}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {jsonForms?.formFields && jsonForms.formFields.map((field, index) => (
          <div 
            key={index} 
            className='relative group p-5 rounded-xl flex items-center justify-between gap-4 theme-form-field-wrapper'
          >
            <div className='flex-1 w-full'>
              {field.fieldType === "select" ? (
                <div className='w-full'>
                  <label className='text-xs font-semibold uppercase tracking-wider mb-2 block theme-form-label'>
                    {field.fieldLabel} {field.isRequired && <span className="text-rose-500">*</span>}
                  </label>
                  <Select required={field?.isRequired} onValueChange={(v) => handleSelectChange(field.fieldName, v)}>
                    <SelectTrigger className="w-full rounded-xl h-11 theme-form-select-trigger">
                      <SelectValue placeholder={field.placeholder || "Select option"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl theme-form-select-content" data-theme={selectedTheme}>
                      {Array.isArray(field.options) && field.options.map((item, idx) => (
                        <SelectItem key={idx} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : field.fieldType === 'radio' ? (
                <div className='w-full'>
                  <label className='text-xs font-semibold uppercase tracking-wider mb-2.5 block theme-form-label'>
                    {field.fieldLabel} {field.isRequired && <span className="text-rose-500">*</span>}
                  </label>
                  <RadioGroup required={field?.isRequired} className="space-y-2.5">
                    {Array.isArray(field.options) && field.options.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 cursor-pointer">
                        <RadioGroupItem 
                          value={item.label} 
                          id={`${field.fieldName}-${idx}`}
                          onClick={() => handleSelectChange(field.fieldName, item.label)} 
                          className="theme-form-radio-item"
                        />
                        <Label htmlFor={`${field.fieldName}-${idx}`} className="text-sm font-medium cursor-pointer theme-form-inline-label">
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : field.fieldType === 'checkbox' ? (
                <div className='w-full'>
                  <label className='text-xs font-semibold uppercase tracking-wider mb-2.5 block theme-form-label'>
                    {field.fieldLabel} {field.isRequired && <span className="text-rose-500">*</span>}
                  </label>
                  <div className="space-y-2">
                    {Array.isArray(field.options) && field.options.length > 0 ? (
                      field.options.map((item, idx) => (
                        <div key={idx} className='flex gap-2.5 items-center cursor-pointer'>
                          <Checkbox required={field?.isRequired} id={`${field.fieldName}-${idx}`} className="theme-form-checkbox" />
                          <Label htmlFor={`${field.fieldName}-${idx}`} className="text-sm font-medium cursor-pointer theme-form-inline-label">{item}</Label>
                        </div>
                      ))
                    ) : (
                      <div className='flex gap-2.5 items-center cursor-pointer'>
                        <Checkbox onCheckedChange={(v) => handleCheckboxChange(field.fieldName, field.label, v)} id={field.fieldName} className="theme-form-checkbox" />
                        <Label htmlFor={field.fieldName} className="text-sm font-medium cursor-pointer theme-form-inline-label">{field.label}</Label>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className='w-full'>
                  <label className='text-xs font-semibold uppercase tracking-wider mb-2 block theme-form-label'>
                    {field.fieldLabel} {field.isRequired && <span className="text-rose-500">*</span>}
                  </label>
                  <Input
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    name={field.fieldName}
                    required={field?.isRequired}
                    onChange={handleInputChange}
                    className="w-full rounded-xl px-4 py-2.5 h-11 transition-colors theme-form-input"
                  />
                </div>
              )}
            </div>

            {editable && (
              <div className='shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 pl-4 theme-form-field-divider'>
                <FieldEdit 
                  defaultValue={field} 
                  onUpdate={(value) => onFieldUpdate(value, index)}
                  deleteField={() => deleteField(index)} 
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        {!enabledSignIn ? (
          <Button type="submit" className="w-full py-3 h-12 font-bold rounded-xl transition-all shadow-md theme-form-button">
            Submit Response
          </Button>
        ) : isSignedIn && enabledSignIn ? (
          <Button type="submit" className="w-full py-3 h-12 font-bold rounded-xl transition-all shadow-md theme-form-button">
            Submit Response
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button type="button" className="w-full py-3 h-12 font-bold rounded-xl shadow-md transition-all theme-form-button-secondary">
              Sign In to Submit
            </Button>
          </SignInButton>
        )}
      </div>
    </form>
  );
}

export default FormUi;