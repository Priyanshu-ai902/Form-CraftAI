"use client"

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className='p-2 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_CYM_Qpcl3zLppLDyqBFm2n7wMFBbCQcJQ&s"
            width={30}
            height={30}
            alt='logo'
          />
          <h1 className='ml-1 font-bold'>Form-CraftAi</h1>
        </div>
        {isSignedIn ?
          <div className='flex items-center gap-5'>
            <Button variant="outline">DashBoard</Button>
            <UserButton />
          </div> :
          <Button>Get Started</Button>
        }

      </div>
    </div>
  )
}

export default Header
