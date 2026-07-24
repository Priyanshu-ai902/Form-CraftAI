"use client"
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { desc, eq } from 'drizzle-orm'
import { LayoutGrid, Plus } from 'lucide-react'

function Page() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && GetFormList();
  }, [user]);

  const GetFormList = async () => {
    const result = await db.select().from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));
    setFormList(result);
  }

  const remainingForms = Math.max(0, 5 - formList.length);

  return (
    <div className='min-h-screen bg-[#0B1020] text-slate-100 p-6 lg:p-10 transition-all duration-300'>
      {/* Centered Product Hunt Launch Badge */}
      <div className='flex justify-center items-center pb-6 mb-6 border-b border-slate-800/40'>
        <a 
          href="https://www.producthunt.com/products/form-craft?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-form-craft" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block transition-transform hover:scale-105"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1194772&theme=light&t=1784880432840" 
            alt="Form-Craft - Build forms from one prompt. Customize, track, and export. | Product Hunt" 
            width="320" 
            height="70" 
            className="w-[280px] sm:w-[340px] md:w-[360px] h-auto drop-shadow-xl"
          />
        </a>
      </div>

      {/* Top Welcome / Header section */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/60 pb-8 mb-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-white flex items-center gap-2'>
            My Workspace
          </h1>
          <p className='text-slate-400 mt-2 text-sm md:text-base'>
            Create, manage, and analyze your AI-powered forms and surveys.
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='bg-[#111827]/80 border border-slate-800/80 rounded-xl px-4 py-2.5 flex items-center gap-6 shadow-sm'>
            <div className='text-center border-r border-slate-800/80 pr-6'>
              <div className='text-2xl font-bold text-white'>{formList.length}</div>
              <div className='text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5'>Total Forms</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-emerald-400'>{remainingForms}</div>
              <div className='text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5'>Remaining</div>
            </div>
          </div>
          <CreateForm onFormCreated={GetFormList} />
        </div>
      </div>

      <div>
        <div className='flex items-center gap-2 text-slate-400 mb-6 font-medium text-sm uppercase tracking-wider'>
          <LayoutGrid className='h-4 w-4 text-emerald-500' />
          <span>Active Forms</span>
        </div>
        <FormList forms={formList} refreshData={GetFormList} />
      </div>
    </div>
  )
}

export default Page;

