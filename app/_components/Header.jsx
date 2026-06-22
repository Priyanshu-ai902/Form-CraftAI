"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const isDashboard = path.includes('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (path.includes('aiform') || path.includes('edit-form')) {
    return null;
  }

  // Handle Dashboard navbar view separately (workspace console)
  if (isDashboard) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 p-4 border-b border-slate-800/80 bg-[#030712]/75 backdrop-blur-md transition-all duration-300 md:left-64">
        <div className='flex items-center justify-between px-2'>
          <div className='flex items-center'>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-900/60 border border-slate-800/60 px-3 py-1.5 rounded-lg">
              Workspace Console
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className="pl-4 h-8 flex items-center">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 rounded-full border border-slate-700/80 ring-2 ring-emerald-500/10"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redesigned landing page navbar
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#030712]/80 backdrop-blur-xl border-b border-emerald-500/10 shadow-lg shadow-black/20' 
        : 'py-5 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all duration-300">
            <Image
              src="/logo.png"
              width={32}
              height={32}
              alt="logo"
              className="rounded-lg bg-[#030712] p-1"
            />
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-200 text-transparent bg-clip-text">
            Form-Craft
          </span>
        </Link>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-[#10B981] transition-all duration-200 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link href="#showcase" className="text-sm font-medium text-slate-400 hover:text-[#10B981] transition-all duration-200 relative group">
            Templates
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="#faq" className="text-sm font-medium text-slate-400 hover:text-[#10B981] transition-all duration-200 relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Right: CTA button */}
        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-300 border-none">
                  Dashboard
                </Button>
              </Link>
              <div className="border-l border-slate-800 pl-4 h-6 flex items-center">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8 rounded-full border border-slate-700 ring-2 ring-emerald-500/10"
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-300 border-none">
                Get Started
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#030712]/95 border-b border-emerald-500/10 backdrop-blur-xl px-6 py-6 flex flex-col gap-6"
          >
            <Link 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-350 hover:text-white transition-colors"
            >
              Features
            </Link>

            <Link 
              href="#showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-350 hover:text-white transition-colors"
            >
              Templates
            </Link>
            <Link 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-350 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            
            <div className="border-t border-slate-800 pt-4 flex flex-col items-center">
              {isSignedIn ? (
                <div className="flex items-center justify-between w-full">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold px-5 py-2.5 rounded-xl">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-9 w-9 rounded-full border border-slate-700 ring-2 ring-emerald-500/10"
                      }
                    }}
                  />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl">
                    Get Started Free
                  </Button>
                </SignInButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

