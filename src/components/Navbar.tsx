'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {
    const {data: session} = useSession()
    
    const user: User = session?.user as User
    
    return (
    <nav className='px-6 py-4 shadow-sm bg-white sticky top-0 z-50'>
        <div className='max-w-container mx-auto flex flex-col items-center justify-between md:flex-row gap-6'>
            <a className='text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors font-[Poppins]' href="#">Ghost Feedback</a>
            {
                session ? (
                    <>
                    <span className='hidden md:block text-gray-600 font-medium flex-grow text-center mr-40'>Welcome, {user?.username || user?.email}</span>
                    <Button className='w-full md:w-auto bg-gray-900 hover:bg-gray-700 transition-colors cursor-pointer' onClick={() => signOut()}>Logout</Button>
                    </>
                ) : (
                    <Link className='cursor-pointer' href="/sign-in">
                        <Button className='w-full md:w-auto bg-gray-900 hover:bg-gray-700 transition-colors cursor-pointer'>Login</Button>
                    </Link>
                )
            }
        </div>
    </nav>
    )
}

export default Navbar