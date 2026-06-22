"use client"

import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, ShareIcon, SquareArrowOutUpRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';
import Controller from '../_components/Controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RWebShare } from 'react-web-share';

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForms, setJsonForm] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('light')
  const [selectedBackground, setSelectedBackground] = useState();

  useEffect(() => {
    user && GetFormData();
  }, [user])

  const GetFormData = async () => {
    try {
      const result = await db.select().from(JsonForms).where(and(eq(JsonForms.id, params?.formId),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
      
      if (result.length > 0) {
        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform));
        setSelectedBackground(result[0].background);
        setSelectedTheme(result[0].theme);
      } else {
        toast.error("Form not found.");
        setJsonForm({ formTitle: "Form not found", formFields: [] });
      }
    } catch (error) {
      console.error("Failed to parse form data:", error);
      toast.error("This form's data is corrupted and could not be loaded.");
      setJsonForm({ formTitle: "Corrupted Form", formFields: [] });
    }
  }

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForms);
      updateJsonFormDb();
    }
  }, [updateTrigger])

  const onFieldUpdate = (value, index) => {
    jsonForms.formFields[index].fieldLabel = value.fieldLabel;
    jsonForms.formFields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now())
  }

  const updateJsonFormDb = async () => {
    try {
      const result = await db.update(JsonForms)
        .set({
          jsonform: JSON.stringify(jsonForms)
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
      toast.success('Form layout updated successfully!')
      console.log(result);
    } catch (error) {
      console.error('Failed to update the database:', error);
      toast.error("Failed to save layout changes.");
    }
  };

  const deleteField = (indexToRemove) => {
    const result = jsonForms.formFields.filter((item, index) => index != indexToRemove)
    jsonForms.formFields = result;
    setUpdateTrigger(Date.now())
  }

  const updateControllerFields = async (value, columnName) => {
    try {
      const result = await db.update(JsonForms).set({
        [columnName]: value
      }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
      toast.success('Form styles synced successfully!');
      console.log(result);
    } catch (error) {
      console.error('Failed to update the database:', error);
    }
  }

  return (
    <div className='min-h-screen bg-[#0B1020] text-slate-100 font-sans antialiased transition-all duration-300 pb-12'>
      {/* Sticky Top Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0B1020]/90 backdrop-blur-md border-b border-slate-800/80 py-4 px-6 flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-1.5 text-slate-400 hover:text-white font-medium text-sm transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
        <div className='flex items-center gap-3'>
          <Link href={'/aiform/' + record?.id} target='_blank'>
            <Button variant="outline" className='flex gap-1.5 items-center bg-transparent border-slate-800 hover:bg-slate-900 text-slate-350 hover:text-white rounded-xl px-4 py-2.5 h-10 font-semibold text-xs transition-all'>
              <SquareArrowOutUpRight className='h-4 w-4' /> Preview
            </Button>
          </Link>

          <RWebShare
            data={{
              text: (jsonForms?.formHeading || "") + " - Build Your Form with Form-CraftAi",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
              title: jsonForms?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className='flex gap-1.5 items-center bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl px-4 py-2.5 h-10 font-semibold text-xs border border-slate-700/30 transition-all'>
              <ShareIcon className='h-4 w-4' /> Share
            </Button>
          </RWebShare>

          <Button 
            onClick={() => toast.success("Form settings published successfully!")}
            className='flex gap-1.5 items-center bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold rounded-xl px-5 py-2.5 h-10 text-xs shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-95 transition-all'
          >
            Publish Form
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto px-6 py-8 items-stretch min-h-[calc(100vh-140px)]">
        {/* Left Sidebar (Configuration Panel) */}
        <div className="w-full lg:w-[360px] shrink-0 space-y-6">
          <Controller 
            theme={selectedTheme}
            background={selectedBackground}
            signInEnable={record?.enabledSignIn}
            selectedTheme={(value) => {
              updateControllerFields(value, 'theme')
              setSelectedTheme(value)
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, 'background')
              setSelectedBackground(value)
            }}
            setSignInEnable={(value) => {
              updateControllerFields(value, 'enabledSignIn')
            }} 
          />
        </div>

        {/* Right Side (Live Preview) */}
        <div className="flex-1 bg-[#111827]/40 border border-slate-800/80 rounded-2xl p-6 lg:p-12 overflow-y-auto flex items-center justify-center relative min-h-[500px] shadow-sm transition-all duration-300" style={{
          backgroundImage: selectedBackground
        }}>
          <div className="w-full flex justify-center">
            <FormUi jsonForms={jsonForms}
              selectedTheme={selectedTheme}
              selectedBackground={selectedBackground}
              onFieldUpdate={onFieldUpdate}
              deleteField={(index) => deleteField(index)} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditForm





