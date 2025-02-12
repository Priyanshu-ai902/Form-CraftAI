"use client"

import { Progress } from '@/components/ui/progress'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { Edit3, LibraryBig, MessageCircleCode, MountainIcon, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
            id: 1,
            name: 'Responses',
            icon: MessageCircleCode,
            path: '/dashboard/responses'
        },
        {
            id: 1,
            name: 'Custom Form',
            icon: Edit3,
            path: '/dashboard/custom'
        },
        {
            id: 1,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
    ]
    const { user } = useUser();
    const path = usePathname();
    const [formList, setFormList] = useState();
    const [PercFileCreated,setPercFileCreated]=useState(0)

    useEffect(() => {
        user && GetFormList()
    }, [user])

    const GetFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id))

        setFormList(result)
        const perc=(result.length/5)*100;
        setPercFileCreated(perc)
    }



    return (
        <div className='shadow-md border fixed h-full left-0 w-64 flex flex-col justify-between 
        bg-slate-900 pt-5'>
            <div className='p-5 text-lg'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index}
                        className={`flex items-center gap-4 p-3 mb-2 text-white
                    ${path == menu.path }
                    `}>
                        <menu.icon className='text-green-300'/>
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className="p-5 w-64">
                <div className="my-9 pb-3">
                    <Progress value={PercFileCreated} />
                    <h2 className='text-sm mt-2 text-white'><strong>{formList?.length}</strong> out of <strong>5</strong> File Created</h2>
                    <h2 className='text-sm mt-3 text-gray-300'>Upgrade Your plan to build more for AI forms</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav



