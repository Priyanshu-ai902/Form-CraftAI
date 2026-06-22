import { Button } from '@/components/ui/button'
import { Edit3, Share2, Trash2, Calendar, MessageSquare, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms, userResponses } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'

function FormListItem({ formRecord, jsonform, refreshData }) {
    let parsedJsonForm;
    try {
        parsedJsonForm = typeof jsonform === 'string' ? JSON.parse(jsonform) : jsonform;
    } catch (error) {
        console.error("Malformed JSON in form record:", formRecord.id, error);
        parsedJsonForm = {
            formTitle: "Corrupted Form Data",
            formHeading: "This form could not be displayed due to corrupted data."
        };
    }

    const { user } = useUser();
    const [responseCount, setResponseCount] = useState(0);

    useEffect(() => {
        if (formRecord?.id) {
            fetchResponseCount();
        }
    }, [formRecord?.id]);

    const fetchResponseCount = async () => {
        try {
            const result = await db.select().from(userResponses)
                .where(eq(userResponses.formRef, formRecord.id));
            setResponseCount(result.length);
        } catch (error) {
            console.error("Error fetching response count:", error);
        }
    }

    const onDeleteForm = async () => {
        try {
            const result = await db.delete(JsonForms)
                .where(and(
                    eq(JsonForms.id, formRecord.id),
                    eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                ));

            if (result) {
                toast.success('Form Deleted successfully!!!')
                refreshData()
            }
        } catch (error) {
            console.error("Failed to delete form:", error);
            toast.error("Failed to delete form.");
        }
    }

    return (
        <div className='group bg-[#111827] border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/[0.02] flex flex-col justify-between h-full relative overflow-hidden'>
            {/* Top row with status badge and delete icon */}
            <div>
                <div className='flex items-center justify-between gap-2 mb-4'>
                    <div className='flex items-center gap-2'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
                            Active
                        </span>
                        <span className='flex items-center gap-1 text-slate-500 text-xs'>
                            <Calendar className='h-3.5 w-3.5' />
                            {formRecord?.createdAt}
                        </span>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className='text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition-all duration-200'>
                                <Trash2 className="h-4.5 w-4.5" />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-[#111827] border border-slate-800 text-white rounded-2xl'>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='text-xl font-bold'>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className='text-slate-400'>
                                    This action cannot be undone. This will permanently delete this form and all its responses.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='bg-transparent border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl'>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className='bg-rose-600 hover:bg-rose-500 text-white rounded-xl'
                                    onClick={onDeleteForm}>
                                    Delete Form
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <h3 className='font-bold text-lg text-white group-hover:text-emerald-400 transition-colors duration-200 line-clamp-1'>
                    {parsedJsonForm?.formTitle || 'Untitled Form'}
                </h3>
                <p className='text-sm text-slate-400 mt-2 line-clamp-2 min-h-[40px] leading-relaxed'>
                    {parsedJsonForm?.formHeading || 'No description provided.'}
                </p>
            </div>

            <div>
                <hr className='border-slate-800/80 my-4'></hr>
                
                <div className='flex items-center gap-4 text-slate-400 text-sm mb-4'>
                    <div className='flex items-center gap-1.5'>
                        <MessageSquare className='h-4 w-4 text-indigo-400' />
                        <span className='font-semibold text-white'>{responseCount}</span>
                        <span>responses</span>
                    </div>
                </div>

                <div className="flex gap-2.5">
                    <RWebShare
                        data={{
                            text: parsedJsonForm?.formHeading + " - Build Your Form with Form-CraftAi",
                            url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + formRecord?.id,
                            title: parsedJsonForm?.formTitle,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button size="sm" className='flex-1 flex gap-1.5 items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/50 rounded-xl transition-all duration-200'>
                            <Share2 className='h-4 w-4' /> Share
                        </Button>
                    </RWebShare>

                    <Link href={'/edit-form/' + formRecord?.id} className="flex-1">
                        <Button size="sm" className='w-full flex gap-1.5 items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 font-medium transition-all duration-200'>
                            <Edit3 className='h-4 w-4' /> Edit
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FormListItem

