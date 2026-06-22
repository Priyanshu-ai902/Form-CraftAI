"use client"

import { Progress } from '@/components/ui/progress'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { Edit3, LibraryBig, MessageCircleCode, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Responses',
            icon: MessageCircleCode,
            path: '/dashboard/responses'
        },
        {
            id: 3,
            name: 'Custom Form',
            icon: Edit3,
            path: '/dashboard/custom'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
    ]
    const { user } = useUser();
    const path = usePathname();
    const [formList, setFormList] = useState([]);
    const [PercFileCreated, setPercFileCreated] = useState(0)

    useEffect(() => {
        user && GetFormList()
    }, [user])

    const GetFormList = async () => {
        try {
            const result = await db.select().from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id))

            setFormList(result)
            const perc = (result.length / 5) * 100;
            setPercFileCreated(perc)
        } catch (error) {
            console.error("Failed to load sidebar form list:", error);
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 w-64 bg-[#0F172A] border-r border-slate-800/80 flex flex-col justify-between z-40 transition-all duration-300'>
            <div>
                {/* Branding Logo slot at top */}
                <div className='p-6 flex items-center gap-3 border-b border-slate-800/60 mb-6'>
                    <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_CYM_Qpcl3zLppLDyqBFm2n7wMFBbCQcJQ&s"
                        width={32}
                        height={32}
                        alt="logo"
                        className="rounded-full ring-2 ring-emerald-500/20"
                    />
                    <Link href={'/'}>
                        <h1 className="font-extrabold text-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text hover:opacity-90 transition-opacity">
                            Form-Craft
                        </h1>
                    </Link>
                </div>

                {/* Navigation items */}
                <div className='px-4 space-y-1.5'>
                    {menuList.map((menu, index) => {
                        const isActive = path === menu.path;
                        return (
                            <Link href={menu.path} key={index}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium relative group ${
                                    isActive 
                                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/40 border border-transparent'
                                }`}
                            >
                                <menu.icon className={`h-4.5 w-4.5 shrink-0 transition-colors duration-250 ${
                                    isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-350'
                                }`}/>
                                <span>{menu.name}</span>
                                
                                {isActive && (
                                    <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-emerald-500 rounded-r-md"></span>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Bottom plan progression panel */}
            <div className="p-4 w-full">
                <div className="bg-[#111827]/75 border border-slate-800/80 rounded-2xl p-4.5 shadow-sm">
                    <div className='flex items-center justify-between text-xs text-slate-400 font-semibold mb-2'>
                        <span>Forms Usage</span>
                        <span>{formList?.length || 0} / 5</span>
                    </div>
                    <div className="h-1.5 bg-[#0B1020] rounded-full overflow-hidden border border-slate-800/60">
                        <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, PercFileCreated)}%` }}
                        ></div>
                    </div>
                    <p className='text-[10px] text-slate-500 mt-3 leading-relaxed'>
                        Upgrade to build unlimited AI forms and unlock rich custom styles.
                    </p>
                    <Link href='/dashboard/upgrade' className="block mt-3.5">
                        <button className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700/40">
                            <Zap className="h-3 w-3 text-amber-400" /> Upgrade Plan
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideNav




