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
import { Loader2, Plus, Sparkles } from 'lucide-react'
import { generateFormSchema } from '@/configs/Aimodal'
import { toast } from 'sonner';

const PROMPT = ", on the basis of description please give formFields in Json format with formTitle,formHeading, formSubheading with form having form field, form name, placeholder name, and fieldLabel , fieldtype,field required in Json format"

function CreateForm({ onFormCreated }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const route = useRouter();

    const onCreateForm = async () => {
        if (!userInput.trim()) {
            toast.error("Please describe your form first.");
            return;
        }

        setLoading(true);
        try {
            const jsonResponse = await generateFormSchema(userInput);

            const resp = await db.insert(JsonForms).values({
                jsonform: jsonResponse,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD/MM/YYYY"),
            }).returning({ id: JsonForms.id });

            if (resp[0]?.id) {
                toast.success("Form created successfully!");
                if (onFormCreated) onFormCreated();
                route.push("/edit-form/" + resp[0].id);
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
            <Button 
                onClick={() => setOpenDialog(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-95 transition-all duration-300"
            >
                <Plus className="h-4 w-4" /> Create Form
            </Button>
            
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='bg-[#111827] border border-slate-800 text-white rounded-2xl max-w-md shadow-2xl'>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                            Create with AI <Sparkles className="h-5 w-5 text-emerald-400" />
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 mt-2 text-sm leading-relaxed">
                            Describe the purpose and fields of your form (e.g. "Feedback form for a restaurant with name, rating, and suggestions"). Form-Craft's AI will generate the layout and fields instantly.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-4">
                        <Textarea 
                            className="w-full text-slate-100 bg-[#0B1020] border-slate-800 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none p-4 transition-all duration-200 resize-none h-28"
                            onChange={(event) => setUserInput(event.target.value)}
                            value={userInput}
                            placeholder="e.g., A newsletter signup form collecting first names, email address, and interest category..."
                        />
                    </div>
                    
                    <div className="flex gap-3 justify-end mt-6">
                        <Button 
                            onClick={() => setOpenDialog(false)}
                            className="bg-transparent border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-2.5 rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </Button>

                        <Button 
                            disabled={loading} 
                            onClick={onCreateForm}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/15 flex items-center gap-2 transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='animate-spin h-4 w-4' /> Crafting...
                                </>
                            ) : (
                                'Generate Form'
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateForm

