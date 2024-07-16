"use client"

import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2Icon, ShareIcon, SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';
import Controller from '../_components/Controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForms, setJsonForm] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('light')
  const [selectedBackground, setSelectedBackground] = useState();



  useEffect(() => {
    user && GetFormData();
  }, [user])

  const GetFormData = async () => {
    const result = await db.select().from(JsonForms).where(and(eq(JsonForms.id, params?.formId),
      eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
    setSelectedBackground((result[0].background));
    setSelectedTheme(result[0].theme); 
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

  const updateControllerFields = async (value, columnName) => {
    try {
      const result = await db.update(JsonForms).set({
        [columnName]: value
      }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
      toast('Form Color change.....');
      console.log(result);
    } catch (error) {
      console.error('Failed to update the database:', error);
    }
  }
  



  return (
    <div className='p-2 max-h-screen'>

      <div className='flex justify-between items-center'>

        <h2 className='flex gap-2 items-center my-3 cursor-pointer hover:font-semibold' onClick={() => router.back()}>
          <ArrowLeft />  Back
        </h2>
        <div className='flex gap-2'>
          <Link href={'/aiform/'+record?.id} target='_blank'>
            <Button className='flex gap-2'><SquareArrowOutUpRight className='h-5 w-5' />Live Preview</Button>
          </Link>
          <Button className='flex gap-2 bg-blue-500 hover:bg-blue-700'><ShareIcon className='h-5 w-5' />Share</Button>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-5 border rounded-lg shadow-md h-screen overflow-y-auto"><Controller selectedTheme={(value) => {

          updateControllerFields(value, 'theme')

          setSelectedTheme(value)
        }}
          selectedBackground={(value) => {

            updateControllerFields(value, 'background')

            setSelectedBackground(value)
          }} />
        </div>



        <div className="md:col-span-2 border rounded-lg p-4 h-screen overflow-y-auto flex items-center justify-center" style={{
          backgroundImage: selectedBackground
        }}>
          <FormUi jsonForms={jsonForms}
            selectedTheme={selectedTheme}
            selectedBackground={selectedBackground}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)} />
        </div>


      </div>
    </div>
  )
}

export default EditForm
