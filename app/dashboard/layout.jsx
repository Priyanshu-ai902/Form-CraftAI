import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import SideNav from './_components/SideNav'

function Dashboardlayout({ children }) {
    return (
        <SignedIn>
            <div className="min-h-screen bg-[#0B1020] text-slate-100 antialiased font-sans">
                <div className="hidden md:block md:w-64 fixed top-0 bottom-0 left-0 z-40">
                    <SideNav />
                </div>
                <div className="md:ml-64 min-h-screen bg-[#0B1020] pt-20">
                    {children}
                </div>
            </div>
        </SignedIn>
    )
}

export default Dashboardlayout

