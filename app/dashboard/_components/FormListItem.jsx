import { Button } from '@/components/ui/button'
import { EditIcon, Share, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
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
import { JsonForms } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'


function FormListItem({ formRecord, jsonform, refreshData }) {



    const { user } = useUser();
    const onDeleteForm = async () => {
        const result = await db.delete(JsonForms)
            .where(and(eq(JsonForms.id, formRecord.id),
                eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

        if (result) {
            toast('Form Deleted!!!')
            refreshData()
        }
    }
    return (
        <div className='border shadow-sm rounded-lg p-4'>
            <div className="flex justify-between">
                <h2></h2>

                <AlertDialog>
                    <AlertDialogTrigger> <Trash2 className='h-5 w-5 text-purple-400'
                    /></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-500 hover:bg-red-500'
                                onClick={() => onDeleteForm()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>


            <h2 className='font-semibold text-lg'>{jsonform?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{jsonform?.formHeading}</h2>
            <hr className='my-4'></hr>
            <div className="flex justify-between">

                <RWebShare
                    data={{
                        text: jsonform?.formHeading+"Build Your Form with Form-CraftAi",
                        url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
                        title: jsonform?.formTitle,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button size="sm" className='flex gap-2 bg-teal-500 hover:bg-teal-700 text-white '><Share className='h-5 w-5' /> Share </Button>
                </RWebShare>



                <Link href={'/edit-form/' + formRecord?.id}>
                    <Button size="sm" className='flex gap-2 bg-rose-500 hover:bg-rose-700 text-white'><EditIcon className='h-5 w-5' /> Edit</Button>
                </Link>
            </div>
        </div>
    )
}

export default FormListItem
