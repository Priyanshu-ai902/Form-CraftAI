"use client"

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LibraryBig, MessageCircleCode, MountainIcon, ShieldCheck } from 'lucide-react'
import { Linden_Hill } from 'next/font/google'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

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
            name: 'Analytics',
            icon: MountainIcon,
            path: '/dashboard/analytics'
        },
        {
            id: 1,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
    ]

    const path = usePathname();
    useEffect(() => {

    }, [path])



    return (
        <div className='h-screen shadow-md border'>
            <div className='p-5'>
                {menuList.map((menu, index) => (
                    <h2 key={index}
                        className={`flex items-center gap-3 p-3  hover:bg-primary 
                    hover:text-white  rounded-lg cursor-pointer text-gray-500
                    ${path == menu.path && 'bg-primary text-white'}
                    `}>
                        <menu.icon />
                        {menu.name}
                    </h2>
                ))}
            </div>
            <div className=" bottom-0 p-6 w-64">
                <Button className="w-full">Create Form</Button>
                <div className="my-7">
                    <Progress value={33} />
                    <h2 className='text-sm mt-2 text-gray-600'><strong>2</strong> out of <strong>3</strong> File Created</h2>
                    <h2 className='text-sm mt-3 text-gray-600'>Upgrade Your plan to build for AI forms</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav
