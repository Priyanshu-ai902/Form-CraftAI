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

  const [formData, setFormData] = useState();
  let formRef = useRef();

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
    console.log(formData);

    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format('DD/MM/yyy'),
      formRef: formId
    })

    if (result) {
      formRef.reset();
      toast('Record Submitted!!!!')
    }
    else {
      toast('Error in form saving')
    }
  }

  const handleCheckboxChange = (fieldName, itemName, value) => {
    console.log(fieldName, itemName, value)
  }

  return (
    <div ref={(e) => formRef = e}
      onSubmit={onFormSubmit}
      className='border p-5 md:w-[600px] overflow-y-auto h-full  rounded-lg ' data-theme={selectedTheme}>
      <h2 className='font-bold text-center text-2xl'>{jsonForms?.formTitle}</h2>
      <h2 className='text-sm text-gray-600 text-center'>{jsonForms?.formHeading}</h2>

      {jsonForms?.formFields && jsonForms.formFields.map((field, index) => (
        <div key={index} className='flex'>


          {
            field.fieldType == "select" ?
              <div className='my-3 w-full'>
                <label className='text-xm text-gray-600'>{field.fieldLabel}</label>

                < Select required={field?.isRequired} onValueChange={(v) => handleSelectChange(field.fieldName, v)}>
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



                  <RadioGroup required={field?.isRequired} defaultValue={item.label}>
                    {field.options.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={item.label} id={item.label}
                          onClick={() => handleSelectChange(field.fieldName, item.label)} />
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
                        <Checkbox required={field?.isRequired} />
                        <h2>{item}</h2>
                      </div>
                    ))
                      :
                      <div>
                        <Checkbox onCheckedChange={(v) => handleCheckboxChange(field?.label, item.label, v)} />
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
                      required={field?.isRequired}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>}



          {editable && <div>
            <FieldEdit defaultValue={field} onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)} />
          </div>}
        </div>
      ))}
      {!enabledSignIn ?
        <button type='submit' className='btn btn-primary'>Submit</button> :
        isSignedIn && enabledSignIn ?
          <button type='submit' className='btn btn-primary'>Submit</button> :
          <Button>
            <SignInButton mode='modal'>Sign In before Submit</SignInButton>
          </Button>
      }
    </div>
  );
}

export default FormUi;