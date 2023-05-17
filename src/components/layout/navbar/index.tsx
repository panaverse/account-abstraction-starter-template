'use client';
import React, { useContext, useState } from 'react'
import Link from 'next/link';

import Connect from '@/components/connect';
// import { AuthContext } from '@/context';

export default function Navbar() {
    const [isOpen, setisOpen] = useState<boolean>(false);



    return (
        <nav className="w-full py-5 px-0.5 sm:px-4 lg:px-20 z-50 fixed top-0 bg-[#E3E3E3] shadow">
            <div className="px-4 lg:px-0 mx-auto block lg:flex flex-wrap lg:flex-nowrap items-center">
                <div className="flex items-center justify-between flex-wrap">
                    <Link href="/"
                        title="Home Page"
                        className='flex items-center'
                    >
                        <img className="w-auto h-6 sm:h-7" src='/imgs/panacloud_logo.svg' alt="" />
                    </Link>
                    {/* <!-- Mobile menu button --> */}

                    <div className="flex lg:hidden items-center ">
                        <div className='px-3 flex flex-col items-center justify-center align-middle'>
                            <Connect />
                        
                        </div>
                        <button
                            //  @click="isOpen = !isOpen" 
                            type="button" onClick={() => { setisOpen(!isOpen) }} className=" p-1.5 nav-btn dark:bg-white bg-white rounded-full text-2xl dark:text-black outline-none dark:hover:bg-steelBlue-200  dark:hover:text-white focus:outline-none " aria-label="toggle menu">
                            {
                                !isOpen ?
                                    // <AiOutlineMenu fontSize="26px" />
                                    <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                        <path d="M4 8h16M4 16h16" />
                                    </svg>
                                    :
                                    <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                             
                            }
                        </button>
                    </div>
                </div>

                {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                <div
                    className={`${isOpen ? 'absolute translate-x-0 opacity-100' : 'hidden opacity-0 -translate-x-full'}  lg:relative inset-x-0 z-20 w-full pt-8 lg-pt-0 px-0 md:px-1.5 rounded-b-xl lg:rounded-none lg:space-y-0 lg:px-0 py-4 bg-white shadow lg:shadow-none dark:bg-darkSlateBlue dark:lg:bg-transparent lg:mt-0 lg:p-0 top-20 lg:top-0 lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0  min-h-full lg:flex lg:items-center lg:justify-between lg:flex-1 justify-between `}>

                    <div className="flex lg:pl-10 flex-col items-center space-y-1 lg:space-y-0 lg:flex-row lg:space-x-5">
                            <text className=' text-xl'>Items</text>
                            <text className=' text-xl'>Shop</text>
                    </div>

                    <div className='hidden lg:flex gap-0 flex-col justify-center align-middle items-center '>
                        <Connect />

                    </div>


                </div>

            </div>
        </nav>

       
    )
}
