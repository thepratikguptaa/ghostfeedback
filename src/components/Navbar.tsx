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
    <nav className='p-4 md:p-6 shadow-md bg-white'>
        <div className='container mx-auto flex flex-col items-center justify-between md:flex-row gap-4'>
            <a className='text-2xl font-bold mb-2 md:mb-0 text-gray-800 hover:text-gray-600' href="#">Ghost Feedback</a>
            {
                session ? (
                    <>
                    <span className='mr-4 hidden md:block justify-center items-center text-gray-700'>Welcome, {user?.username || user?.email}</span>
                    <Button className='w-full md:w-auto cursor-pointer' onClick={() => signOut()}>Logout</Button>
                    </>
                ) : (
                    <Link className='cursor-pointer' href="/sign-in">
                        <Button className='w-full md:w-auto cursor-pointer'>Login</Button>
                    </Link>
                )
            }
        </div>
    </nav>
    )
}

export default Navbar