"use client"

import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp';

function Responses() {

    const { user } = useUser();
    const [formList, setFormList] = useState();


    useEffect(() => {
        user && getFormList()
    }, [user])


    const getFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))

        setFormList(result)
    }
    return formList&&(
        <div className='p-8 mt-20 bg-slate-900 text-white h-screen'>
            <h2 className='font-semibold text-3xl flex items-center justify-between'>Responses

            </h2>

            <div className='grid grid-cols-4 gap-5 lg:grid-cols-3'>
                {formList&&formList?.map((form, index) => (
                    <FormListItemResp key={index}
                    formRecord={form}
                    jsonForm={JSON.parse(form.jsonform)}/>
                ))}
            </div>
        </div>
    )
}

export default Responses


