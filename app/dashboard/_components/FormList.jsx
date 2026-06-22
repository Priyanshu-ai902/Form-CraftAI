"use client"

import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';
import { FilePlus2, Sparkles } from 'lucide-react';
import CreateForm from './CreateForm';

function FormList({ forms, refreshData }) {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        if (forms) {
            setFormList(forms);
        } else if (user) {
            GetFormList();
        }
    }, [forms, user]);

    const GetFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id))

        setFormList(result);
    }

    const handleRefresh = () => {
        if (refreshData) {
            refreshData();
        } else {
            GetFormList();
        }
    }

    if (formList.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center p-12 border border-slate-800 border-dashed rounded-2xl bg-[#111827]/40 max-w-lg mx-auto text-center mt-12 transition-all duration-300 hover:border-slate-700/80'>
                <div className='w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative'>
                    <FilePlus2 className='h-8 w-8' />
                    <span className='absolute -top-1 -right-1 flex h-3 w-3'>
                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                        <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500'></span>
                    </span>
                </div>
                <h3 className='text-xl font-bold text-white mb-2 flex items-center gap-1.5 justify-center'>
                    No forms created yet <Sparkles className='h-4 w-4 text-emerald-400' />
                </h3>
                <p className='text-slate-400 text-sm mb-6 leading-relaxed'>
                    Get started by describing your form ideas. Input a simple prompt, and our advanced AI will craft a high-converting form schema in seconds.
                </p>
                <CreateForm onFormCreated={handleRefresh} />
            </div>
        )
    }

    return (
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12'>
            {formList.map((form, index) => (
                <div key={index} className="transition-all duration-300">
                    <FormListItem jsonform={form.jsonform}
                        formRecord={form}
                        refreshData={handleRefresh}
                    />
                </div>
            ))}
        </div>
    )
}

export default FormList

