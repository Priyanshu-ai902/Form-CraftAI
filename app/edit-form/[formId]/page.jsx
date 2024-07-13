"use client"

import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi';

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForms, setJsonForm] = useState([]);
  const router = useRouter();

  useEffect(() => {
    user && GetFormData();
  }, [user])

  const GetFormData = async () => {
    const result = await db.select().from(JsonForms).where(and(eq(JsonForms.id, params?.formId),
      eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

    console.log(JSON.parse(result[0].jsonform));
    setJsonForm(JSON.parse(result[0].jsonform))
  }
  return (
    <div className='p-2 max-h-screen'>
      <h2 className='flex gap-2 items-center my-3 cursor-pointer hover:font-semibold' onClick={() => router.back()}>
        <ArrowLeft />  Back
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-5 border rounded-lg shadow-md h-screen overflow-y-auto">Controller</div>
        <div className="md:col-span-2 border rounded-lg p-4 h-screen overflow-y-auto flex items-center justify-center"><FormUi jsonForms={jsonForms} /></div>
      </div>

    </div>
  )
}

export default EditForm
