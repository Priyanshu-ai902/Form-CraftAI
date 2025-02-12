import React from 'react'
import FormBuilder from './_components/FormBuilder'

function page() {
    return (
        <div className='bg-slate-950 mt-16 p-28 text-white '>
            <h1 className='text-4xl font-semibold'>Drag & Drop Form Builder</h1>
            <FormBuilder />
        </div>
    )
}

export default page
