// "use client"

// import { Button } from '@/components/ui/button'
// import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// function Header() {
//   const { user, isSignedIn } = useUser();
//   const path = usePathname();

//   useEffect(() => {
//     console.log(path)
//   }, [])


//   return !path.includes('aiform')&&(
//     <div className='p-2 border-b shadow-sm sticky'>
//       <div className='flex items-center justify-between sticky'>
//         <div className='flex items-center'>
//           <Image
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_CYM_Qpcl3zLppLDyqBFm2n7wMFBbCQcJQ&s"
//             width={30}
//             height={30}
//             alt='logo'
//           />
//           <h1 className='ml-1 font-bold'>Form-CraftAi</h1>
//         </div>
//         {isSignedIn ?
//           <div className='flex items-center gap-5'>
//             <Link href={'/dashboard'}>
//               <Button variant="outline">DashBoard</Button>
//             </Link>
//             <UserButton />
//           </div> :
//           <SignInButton>

//             <Button>Get Started</Button>
//           </SignInButton>
//         }

//       </div>
//     </div>
//   )
// }

// export default Header


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

  useEffect(() => {
    console.log(path)
  }, [path])


  return !path.includes('aiform') && (
    <div className='p-2 border-b shadow-sm fixed top-0 left-0 right-0  z-50'>
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
