"use client"

import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useState } from 'react'

function FormListItemResp({ jsonForm, formRecord }) {

    const [loading, setLoading] = useState(false)


    const ExportData = async () => {
        setLoading(true)
        const result = await db.select().from(userResponses).where(eq(userResponses.formRef, formRecord.id))

        console.log(result)
        if(result){
            setLoading(false);
        }
    }


    return (
        <div className='border shadow-sm rounded-lg p-4 my-5'>


            <h2 className='font-semibold text-lg'>{jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
            <hr className='my-4'></hr>
            <div className="flex justify-between items-center">
                <h2 className='text-sm'>45 Responses</h2>
                <Button className='bg-purple-600 hover:bg-purple-600' size='sm'
                onClick={()=>ExportData()}
                disabled={loading}>
                    
                    Export</Button>
            </div>
        </div>
    )
}

export default FormListItemResp

