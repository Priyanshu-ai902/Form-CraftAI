"use client"

import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';


function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForms, setJsonForm] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    user && GetFormData();
  }, [user])

  const GetFormData = async () => {
    const result = await db.select().from(JsonForms).where(and(eq(JsonForms.id, params?.formId),
      eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
  }

  useEffect(() => {
    if (updateTrigger) {

      setJsonForm(jsonForms);
      updateJsonFormDb();
    }
  }, [updateTrigger])

  const onFieldUpdate = (value, index) => {
    jsonForms.formFields[index].fieldLabel = value.fieldLabel;
    jsonForms.formFields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now())
  }

  const updateJsonFormDb = async () => {
    try {
      const result = await db.update(JsonForms)
        .set({
          jsonform: JSON.stringify(jsonForms)
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
      toast('Updated successfully!!!')
      console.log(result);
    } catch (error) {
      console.error('Failed to update the database:', error);
    }
  };

  const deleteField = (indexToRemove) => {
    const result = jsonForms.formFields.filter((item, index) => index != indexToRemove)

    jsonForms.formFields = result;
    setUpdateTrigger(Date.now())

  }

  return (
    <div className='p-2 max-h-screen'>
      <h2 className='flex gap-2 items-center my-3 cursor-pointer hover:font-semibold' onClick={() => router.back()}>
        <ArrowLeft />  Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-5 border rounded-lg shadow-md h-screen overflow-y-auto">Controller</div>
        <div className="md:col-span-2 border rounded-lg p-4 h-screen overflow-y-auto flex items-center justify-center">
          <FormUi jsonForms={jsonForms} onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)} />
        </div>
      </div>
    </div>
  )
}

export default EditForm
