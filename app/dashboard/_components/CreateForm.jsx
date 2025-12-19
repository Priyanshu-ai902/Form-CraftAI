"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { JsonForms } from '@/configs/schema'
import moment from 'moment/moment'
import { db } from '@/configs'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { generateFormSchema } from '@/configs/Aimodal'

const PROMPT = ", on the basis of description please give formFields in Json format with formTitle,formHeading, formSubheading with form having form field, form name, placeholder name, and fieldLabel , fieldtype,field required in Json format"


import { toast } from 'sonner';

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState();
    const { user } = useUser();
    const route = useRouter();

    const onCreateForm = async () => {
        setLoading(true);

        try {
            const jsonResponse = await generateFormSchema(userInput);

            const resp = await db.insert(JsonForms).values({
                jsonform: jsonResponse,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD/MM/YYYY"),
            }).returning({ id: JsonForms.id });

            if (resp[0]?.id) {
                route.push("/edit-form/" + resp[0].id);
                toast.success("Form created successfully!");
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to create form. The AI failed to generate valid JSON.");
        }

        setLoading(false);
        setOpenDialog(false);
    };




    return (
        <div>
            <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
            <Dialog open={openDialog}>
                <DialogTrigger asChild>

                </DialogTrigger>
                <DialogContent className='bg-black text-white'>
                    <DialogHeader>
                        <DialogTitle>Create new form with Form-CraftAI</DialogTitle>
                        <DialogDescription>

                            <Textarea className="my-2 text-white bg-black"
                                onChange={(event) =>
                                    setUserInput(event.target.value)
                                }
                                placeholder="write description about your form" />
                            <div className=" flex gap-2  justify-end pt-5">

                                <Button onClick={() => setOpenDialog(false)}
                                    variant="destructive">Cancel</Button>

                                <Button disabled={loading} onClick={() => onCreateForm()}>
                                    {loading ?
                                        <Loader2 className='animate-spin' /> : 'Create'}
                                </Button>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateForm
