"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();



  return !path.includes('aiform') && (
    <div className='p-6 border-b shadow-sm fixed top-0 left-0 right-0  z-50 bg-black'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_CYM_Qpcl3zLppLDyqBFm2n7wMFBbCQcJQ&s"
            width={40}
            height={40}
            alt="logo"
            className="rounded-full"
          />

          <Link href={'/'}>
            <h1 className="ml-1 font-bold text-3xl bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
              Form-Craft
            </h1>
          </Link>


        </div>
        {isSignedIn ?
          <div className='flex items-center gap-5'>
            <Link href={'/dashboard'}>
              <Button variant="outline">DashBoard</Button>
            </Link>
            <UserButton />
          </div> :
          <SignInButton>

            <Button>Get Started</Button>
          </SignInButton>
        }

      </div>
    </div>
  )
}

export default Header
