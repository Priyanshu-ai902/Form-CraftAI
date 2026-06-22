"use client"
import React from 'react'
import FormBuilder from './_components/FormBuilder'

function Page() {
    return (
        <div className='min-h-screen bg-[#0B1020] text-slate-100 p-6 lg:p-10 transition-all duration-300'>
            {/* Header section */}
            <div className='border-b border-slate-800/60 pb-8 mb-8'>
                <h1 className='text-3xl font-bold tracking-tight text-white'>
                    Drag & Drop Builder
                </h1>
                <p className='text-slate-400 mt-2 text-sm md:text-base'>
                    Design, prototype, and build custom form layouts visually without writing code.
                </p>
            </div>
            
            <FormBuilder />
        </div>
    )
}

export default Page

