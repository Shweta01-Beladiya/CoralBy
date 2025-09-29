import React from 'react'
import logoIcon from '../images/LogoIcon.png'
import { LiaFacebook } from "react-icons/lia";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Playstore from '../images/Playstore.png'
import Apple from '../images/Apple.png'
import Mastercard from '../images/Master Card.png'
import Visacard from '../images/Visa.png'
import UnionPay from '../images/Union Pay.png'
import AmricanExpress from '../images/American Express.png'
import Paypal from '../images/Paypal.png'
import ApplePay from '../images/Apple Pay.png'
import Zip from '../images/Zip.png'
import AfterPay from '../images/Afterpay.png'
import Latitude from '../images/Clip path group.png'
import { Link } from 'react-router-dom';



export default function Footer() {


  return (
    <>

      <footer className='w-full'>

        <section className='bg-[var(--bg-category)]'>
          <div className='main_container'>
            <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8 ">

            <div>
              <div className="flex justify-start items-center gap-1 mb-3">
                <img src={logoIcon} alt="Coralbay" className=" w-8 h-8" />
                <h5 className="text-[var(--text-white)] font-[700] text-2xl">
                  CORALBAY
                </h5>
              </div>

              <p className="text-[var(--text-white)] text-base font-semibold mb-2">
                The Hottest Picks This Season
              </p>

              <div className="flex items-center gap-2 text-[var(--text-white)] mb-3">
                <LiaFacebook size={26} />
                <IoLogoInstagram size={21} />
                <FaXTwitter size={20} />
              </div>

              <h6 className="text-[var(--text-orange)] font-bold">DOWNLOAD OUR APP</h6>

              {/* Play Store */}
              <div className="bg-[var(--bg-black)] px-5 py-2 rounded-md border border-[var(--text-white)] flex items-center gap-3 w-fit mt-3">
                <img
                  src={Playstore}
                  alt="Google Play"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-xs text-[var(--text-white)] font-medium uppercase tracking-wide whitespace-nowrap">
                    GET IT ON
                  </p>
                  <p className="text-lg text-[var(--text-white)] font-semibold whitespace-nowrap">
                    Google Play
                  </p>
                </div>
              </div>

              {/* App Store */}
              <div className="bg-[var(--bg-black)] px-3 py-2 rounded-md border border-[var(--text-white)] flex items-center gap-3 w-fit mt-3">
                <img
                  src={Apple}
                  alt="Apple App Store"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-xs text-[var(--text-white)] font-medium uppercase tracking-wide whitespace-nowrap">
                    Download on the
                  </p>
                  <p className="text-lg text-[var(--text-white)] font-semibold whitespace-nowrap">
                    App Store
                  </p>
                </div>
              </div>


            </div>


            <div>
              <h5 className="text-lg text-[var(--text-orange)] font-bold mb-3">
                Company Info
              </h5>
              <ul className="text-[var(--text-white)] space-y-2">
                <li>
                  <Link to={"/ourBrandPage"}>
                    Our Brand
                  </Link>
                </li>
                <li>
                  <Link to={"/blogs"} >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to={"/careerPage"}>
                    Career
                  </Link>
                </li>
                <li>
                  <Link to={'/login'}>
                    Signup
                  </Link>
                </li>
              </ul>
            </div>


            <div>
              <h5 className="text-lg text-[var(--text-orange)] font-bold mb-3">
                Shopping
              </h5>
              <ul className="text-[var(--text-white)] space-y-2">
                <li>
                  <Link to={'/trackOrder'}>
                    Track my order
                  </Link>
                </li>
                <li>
                  <Link to={'/wishlist'}>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to={'/fashion'}>
                    Latest Deals
                  </Link>
                </li>
                <li>
                  <Link to={'/fashion'}>
                    Brands
                  </Link>
                </li>
                <li>
                  <Link to={'/fashion'}>
                    Men
                  </Link>
                </li>
                <li>
                  <Link to={'/fashion'}>
                    Women
                  </Link>
                </li>
                <li>
                  <Link to={'/fashion'}>
                    Kids
                  </Link>
                </li>
                <li>
                  <Link to={'/fashion'}>
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg text-[var(--text-orange)] font-bold mb-3">
                Customer service
              </h5>
              <ul className="text-[var(--text-white)] space-y-2">
                <li>
                  <Link to={'/HelpAndSupport'}>
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link to={'/contactus'}>
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link to={'/productSafety'}>
                    Product Safety
                  </Link>
                </li>
                <li>
                  <Link to={'/returnPolicy'}>
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link to={'/scamwarning'}>
                    Scam warning
                  </Link>
                </li>
              </ul>
            </div>

            </div>
          </div>
        </section>

      {/* Copyright  */}
       <section className='bg-[var(--bg-white)] '>
         <div className='main_container'>
            <div className="py-2 flex items-center justify-between flex-wrap gap-3">
              <h5 className="text-[var(--footer-copyright)] sm:text-base text-sm font-semibold">
                © 2025 CoralBay. All Rights Reserved.
              </h5>

              <div className="flex gap-3 items-center flex-wrap">
                <img src={Mastercard} alt="Mastercard" className="sm:h-6 h-5  object-contain" />
                <img src={Visacard} alt="Visa" className="sm:h-6 h-5  object-contain" />
                <img src={UnionPay} alt="UnionPay" className="sm:h-6 h-5  object-contain" />
                <img src={AmricanExpress} alt="American Express" className="sm:h-6 h-5  object-contain" />
                <img src={Paypal} alt="PayPal" className="sm:h-6 h-5  object-contain" />
                <img src={ApplePay} alt="Apple Pay" className="sm:h-6 h-5  object-contain" />
                <img src={Zip} alt="Zip" className="sm:h-6 h-5  object-contain" />
                <img src={AfterPay} alt="AfterPay" className="sm:h-6 h-5  object-contain" />
                <img src={Latitude} alt="Latitude" className="sm:h-6 h-5  object-contain" />
              </div>
            </div>
          </div>
        </section>

      </footer>



    </>
  )
}
