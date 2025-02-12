

import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import {  userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { LoaderPinwheel } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

function FormListItemResp({ jsonForm, formRecord }) {

    const [loading, setLoading] = useState(false)


    const ExportData = async () => {
        let jsonData=[]
        setLoading(true)
        const result = await db.select().from(userResponses).where(eq(userResponses.formRef, formRecord.id))


        if(result){
            result.forEach((item)=>{
                const jsonItem=JSON.parse(item.jsonResponse);
                jsonData.push(jsonItem)
            })
            setLoading(false);
        }
        exportToExcel(jsonData)
    }


    const exportToExcel = (jsonData) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx")
    }

   


    return (
        <div className='border shadow-sm rounded-lg p-4 my-5'>


            <h2 className='font-semibold text-lg'>{jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
            <hr className='my-4'></hr>
            <div className="flex justify-between items-center">
                <Button className='bg-purple-600 hover:bg-purple-600' size='sm'
                    onClick={() => ExportData()}
                    disabled={loading}>
                    {loading ? <LoaderPinwheel className='animate-spin' /> : 'Export'}
                </Button>
            </div>
        </div>
    )
}

export default FormListItemResp

