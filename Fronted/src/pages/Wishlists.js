import React from 'react'
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import Wishlist from '../component/Wishlist';

export default function Wishlists() {
  return (
    <>
            {/* Heading */}
            <section className='bg-[var(--profile-bg)] py-7'>
                <div className='main_container'>
                    <h3 className=' text-2xl md:text-4xl text-[var(--profile-dark-text)] font-semibold '>Wishlist</h3>
                    <div className="flex items-center text-[var(--profile-gray-text)] font-medium text-sm md:text-base mt-3">
                        <Link to="/" className="flex items-center">
                            Home <FaChevronRight className="mx-1" size={12} />
                        </Link>
                        <span  className="text-[var(--profile-light-text)]">
                            Shopping Cart 
                        </span>
                    </div>
                </div>
            </section>

            <section className='bg-[var(--bg-white)] my-8'>
                <div className='main_container'>
                    <Wishlist viewType="header"/>
                </div>
            </section>
    </>
  )
}
