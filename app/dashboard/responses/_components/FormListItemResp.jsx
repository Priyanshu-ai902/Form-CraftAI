import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Download, Loader2, MessageSquare, Calendar } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

function FormListItemResp({ jsonForm, formRecord, responseCount = 0, lastSubmissionDate = 'No submissions' }) {
    const [loading, setLoading] = useState(false)

    const ExportData = async () => {
        let jsonData = []
        setLoading(true)
        try {
            const result = await db.select().from(userResponses).where(eq(userResponses.formRef, formRecord.id))

            if (result) {
                result.forEach((item) => {
                    try {
                        const jsonItem = JSON.parse(item.jsonResponse);
                        jsonData.push(jsonItem)
                    } catch (e) {
                        console.error("Failed to parse response JSON", item.id, e);
                    }
                })
            }
            exportToExcel(jsonData)
        } catch (error) {
            console.error("Export failed:", error);
        }
        setLoading(false)
    }

    const exportToExcel = (jsonData) => {
        if (jsonData.length === 0) {
            alert("No responses to export!");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(jsonData)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses')

        XLSX.writeFile(workbook, (jsonForm?.formTitle || "Form") + "_Responses.xlsx")
    }

    return (
        <div className='group bg-[#111827] border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/[0.01] flex flex-col justify-between h-full'>
            <div>
                <h3 className='font-bold text-lg text-white group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1'>
                    {jsonForm?.formTitle || 'Untitled Form'}
                </h3>
                <p className='text-sm text-slate-400 mt-2 line-clamp-2 min-h-[40px] leading-relaxed'>
                    {jsonForm?.formHeading || 'No description provided.'}
                </p>

                <hr className='border-slate-800/80 my-4'></hr>
                
                <div className='space-y-2.5 mb-5'>
                    <div className='flex items-center justify-between text-sm text-slate-400'>
                        <span className='flex items-center gap-2'>
                            <MessageSquare className='h-4 w-4 text-indigo-400' />
                            Total Responses
                        </span>
                        <span className='font-semibold text-white bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-lg border border-indigo-500/20'>
                            {responseCount}
                        </span>
                    </div>
                    <div className='flex items-center justify-between text-sm text-slate-400'>
                        <span className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4 text-emerald-400' />
                            Last Submission
                        </span>
                        <span className='text-slate-300 font-medium text-xs'>
                            {lastSubmissionDate}
                        </span>
                    </div>
                </div>
            </div>

            <Button 
                onClick={ExportData}
                disabled={loading || responseCount === 0}
                className={`w-full flex items-center justify-center gap-2 font-medium py-2.5 rounded-xl border transition-all duration-200 ${
                    responseCount === 0
                        ? 'bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95'
                }`}
                size='sm'
            >
                {loading ? (
                    <>
                        <Loader2 className='animate-spin h-4 w-4' /> Exporting...
                    </>
                ) : (
                    <>
                        <Download className='h-4 w-4' /> Export Excel
                    </>
                )}
            </Button>
        </div>
    )
}

export default FormListItemResp
