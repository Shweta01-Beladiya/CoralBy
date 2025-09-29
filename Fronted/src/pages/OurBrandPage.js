import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Newsletter from '../component/Newsletter';
import ContactUs from '../component/ContactUs';

// images
import Image from '../images/Our Brand Header.png'
import Service1 from '../images/Group (3).png'
import Service2 from '../images/Group (4).png'
import Service3 from '../images/Group (5).png'
import OurMission from '../images/Logo icon Our Mission.png'
import TopBrands from '../images/workspace_premium.png'
import Delivery from '../images/local_shipping.png'
import Secure from '../images/local_police.png'
import Smile from '../images/tag_faces.png'
import WhyYouCanTrustUs from '../images/Why_You_Can_Trust_Us-removebg-preview.png'
import OurPromise from '../images/Our Promise Image.png'
import Payments from '../images/payments.png'
import CurrencyExchange from '../images/currency_exchange.png'
import Verified from '../images/verified.png'
import Security from '../images/security.png'
import JoinOurStory from '../images/Join Our Story.png'


// icons
import { MdOutlineLocationOn, MdOutlineCall } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// icons
import { FaChevronRight } from "react-icons/fa";

export default function OurBrandPage() {

    const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
    const [state, setState] = useState("");


    const Subject = ["General Inquiry", "Order Tracking", "Payment Issues", "Returns & Exchanges", "Product Information", "Other"];

    return (
        <>
            {/* Main Container */}

            <div className=''>

                {/* 1. Heading Section*/}
                <section className='bg-[var(--profile-bg)] py-7'>
                    <div className='main_container'>
                        <h3 className=' text-2xl md:text-4xl text-[var(--profile-dark-text)] font-semibold'>Our Brand</h3>
                        <div className="flex flex-wrap gap-1  items-center text-[var(--profile-gray-text)] font-medium text-sm md:text-base mt-3">
                            <Link to="/" className="flex items-center">
                                Home <FaChevronRight className="mx-1" size={12} />
                            </Link>
                            <span className="text-[var(--profile-light-text)]">Our Brand</span>
                        </div>
                    </div>
                </section>

                {/* 2. Image Section */}
                <section className='bg-[#FFFFFF] py-0 sm:py-2 md:py-6 lg:py-9'>

                    {/* Main Container */}
                    <div className="main_container">
                        <div className="mt-7 w-full">
                            <img
                                src={Image}
                                alt="banner"
                                className="w-full h-auto object-cover rounded-xl "
                            />
                        </div>
                    </div>
                </section>

                {/* 3. Service Section */}
                <section className='bg-[#FFFFFF]'>

                    {/* Main Container */}
                    <div className="main_container mt-6 md:mt-0">

                        {/* All Service */}
                        <div className="mt-2 mb-14 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
                            {/* Service 1 */}
                            <div className="bg-[#F9FAFB] md:p-6 rounded-xl p-4 lg:p-8 xl:p-10">
                                <img src={Service1} alt="" className="w-20 h-20 object-cover" />
                                <h1 className="text-[20px] lg:text-[28px] xl:text-[32px] mt-4 font-semibold text-[#111827]">Shop Everything</h1>
                                <p className="text-[16px] lg:text-[18px] text-[#44506A] font-semibold mt-1">A marketplace for every need</p>
                                <p className="text-[15px] lg:text-[17px] text-[#6B7280] mt-2">
                                    Discover top products across categories - from tech to fashion - all in one easy-to-shop platform.
                                </p>
                            </div>

                            {/* Service 2 */}
                            <div className="bg-[#F9FAFB] rounded-xl p-4 md:p-6 lg:p-8 xl:p-10">
                                <img src={Service2} alt="" className="w-20 h-20 object-cover" />
                                <h1 className="text-[20px] lg:text-[28px] xl:text-[32px] mt-4 font-semibold text-[#111827]">Trusted & Secure</h1>
                                <p className="text-[16px] lg:text-[18px] text-[#44506A] font-semibold mt-1">Shop with peace of mind</p>
                                <p className="text-[15px] lg:text-[17px] text-[#6B7280] mt-2">
                                    Enjoy safe payments, verified sellers, and 24/7 support for a seamless, worry-free shopping experience.
                                </p>
                            </div>

                            {/* Service 3 */}
                            <div className="bg-[#F9FAFB] rounded-xl p-4 md:p-6 lg:p-8 xl:p-10">
                                <img src={Service3} alt="" className="w-20 h-20 object-cover" />
                                <h1 className="text-[20px] lg:text-[28px] xl:text-[32px] mt-4 font-semibold text-[#111827]">Fast Delivery</h1>
                                <p className="text-[16px] lg:text-[18px] text-[#44506A] font-semibold mt-1">What you need, when you need it</p>
                                <p className="text-[15px] lg:text-[17px] text-[#6B7280] mt-2">
                                    Australia-wide delivery with tracking, fast dispatch, and hassle-free returns to keep you shopping confidently.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Our Mission Section */}
                <section className='bg-[#F9FAFB]'>

                    {/* Main Container */}
                    <div className="main_container">

                        {/* main */}
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 pt-10 md:pt-14 lg:pt-16 pb-10 md:pb-16">
                            {/* Left Side (Image) */}
                            <div className="w-full lg:w-2/5 flex items-center justify-center rounded-xl bg-[#F97316] p-6">
                                <img
                                    src={OurMission}
                                    alt="Our Mission"
                                    className="max-w-[50%] md:max-w-[45%] lg:max-w-full max-h-[60%] object-contain"
                                />
                            </div>

                            {/* Right Side (Content) */}
                            <div className="w-full lg:w-3/5 bg-[#FFFFFF] p-4 sm:px-8 sm:py-5 rounded-xl">
                                <h1 className="text-[35px] md:text-[40px] lg:text-[42px] font-semibold text-[#111827]">
                                    Our Mission
                                </h1>
                                <p className="text-[15px] md:text-[18px] lg:text-[20px] text-[#44506A] font-semibold">
                                    Connecting People, Products & Possibilities
                                </p>

                                <div className="mt-7 space-y-3">
                                    {[
                                        "To connect people seamlessly with the best products, from trusted global brands to local favorites, all in one place.",
                                        "To deliver an effortless, secure, and highly personalized shopping experience to every Australian customer.",
                                        "To bring convenience, trust, and unmatched choice to online shopping, making life easier every single day.",
                                        "To empower shoppers with curated products, fast delivery, and seamless checkout solutions tailored to their needs.",
                                        "Support local businesses and community initiatives",
                                        "Deliver exceptional customer service at every step",
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-start gap-3 ml-2 md:ml-3">
                                            <FaChevronRight className="text-[#F97316] text-lg mt-1 flex-shrink-0" />
                                            <p className="text-[#6B7280] text-[15px] md:text-[16px] lg:text-[17px]">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Service Section */}
                <section className='bg-[#FFFFFF] mt-14 mb-14'>

                    {/* Main Container */}
                    <div className="main_container">

                        {/* Service All Card */}
                        <div className="w-full bg-[#F9FAFB] p-5 border border-gray-200 rounded-lg">

                            {/* All 4 Card */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                                {/* Card 1 */}
                                <div className="flex flex-col items-center">
                                    <img src={TopBrands} alt="Top Brands" className="md:h-10 md:w-10 h-9 w-9 object-contain mb-4" />
                                    <h1 className="lg:text-lg text-base mb-1 font-semibold text-black">Top Brands & Trends</h1>
                                    <p className="lg:text-base text-sm text-gray-600">Global & Local Brands, All in One</p>
                                </div>

                                {/* Card 2 */}
                                <div className="flex flex-col items-center">
                                    <img src={Delivery} alt="Delivery" className="md:h-10 md:w-10 h-9 w-9 object-contain mb-4" />
                                    <h1 className="lg:text-lg text-base mb-1 font-semibold text-black">Fast & Reliable Delivery</h1>
                                    <p className="lg:text-base text-sm text-gray-600">Fast Australia-wide Shipping</p>
                                </div>

                                {/* Card 3 */}
                                <div className="flex flex-col items-center">
                                    <img src={Secure} alt="Secure" className="md:h-10 md:w-10 h-9 w-9 object-contain mb-4" />
                                    <h1 className="lg:text-lg text-base mb-1 font-semibold text-black">Secure Shopping</h1>
                                    <p className="lg:text-base text-sm text-gray-600">Secure Payments & Easy Returns</p>
                                </div>

                                {/* Card 4 */}
                                <div className="flex flex-col items-center">
                                    <img src={Smile} alt="Smile" className="md:h-10 md:w-10 h-9 w-9 object-contain mb-4" />
                                    <h1 className="lg:text-lg text-base mb-1 font-semibold text-black">Easy Returns & Support</h1>
                                    <p className="lg:text-base text-sm text-gray-600">7-Day Returns & 24/7 Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Why You Can Trust Us Section */}
                <section className='bg-[#F9FAFB]'>

                    {/* Main Container */}
                    <div className="main_container">

                        {/* Title */}
                        <div className="flex flex-col items-center text-center px-7 pt-10 md:pt-14">
                            <h1 className="trust-title text-[33px] md:text-[40px] lg:text-[42px] text-[#0A0E17] font-semibold">
                                Why You Can Trust Us
                            </h1>
                            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#44506A] font-medium">
                                Real customers. Verified brands. Exceptional service.
                            </p>
                        </div>

                        {/* main */}
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 pt-10 md:pt-7 pb-10 md:pb-16">

                            {/* Left Side (Content) */}
                            <div className="w-full lg:w-1/2 bg-[#FFFFFF] p-5 md:p-7 rounded-xl flex flex-col gap-6">
                                <div>
                                    <h1 className="text-[#F97316] font-bold text-[19px] md:text-[22px] lg:text-[24px] mb-1">5000+ Brands</h1>
                                    <p className="text-[#44506A] text-[16px] md:text-[16px] lg:text-[18px]">
                                        Partnering with trusted global and local brands to offer you the best products.
                                    </p>
                                </div>

                                <div>
                                    <h1 className="text-[#F97316] font-bold text-[19px] md:text-[22px] lg:text-[24px] mb-1">50M Reviews</h1>
                                    <p className="text-[#44506A] text-[16px] md:text-[16px] lg:text-[18px]">
                                        Loved by millions of customers - your feedback helps us grow and improve.
                                    </p>
                                </div>

                                <div>
                                    <h1 className="text-[#F97316] font-bold text-[19px] md:text-[22px] lg:text-[24px] mb-1">98% Satisfaction Rate</h1>
                                    <p className="text-[#44506A] text-[16px] md:text-[16px] lg:text-[18px]">
                                        We prioritize your experience, ensuring safe payments and hassle-free shopping.
                                    </p>
                                </div>

                                <div>
                                    <h1 className="text-[#F97316] font-bold text-[19px] md:text-[22px] lg:text-[24px] mb-1">24/7 Support</h1>
                                    <p className="text-[#44506A] text-[16px] md:text-[16px] lg:text-[18px]">
                                        Our team is always available to assist you and make your shopping experience worry-free.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side (Image) */}
                            <div className="w-full lg:w-1/2 flex items-center justify-center rounded-xl bg-black">
                                <img
                                    src={WhyYouCanTrustUs}
                                    alt="Our Mission"
                                    className="max-w-full lg:max-w-[120%] xl:max-w-full h-[100%] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Our Promise Section */}
                <section className='bg-[#FFFFFF] pb-9'>

                    {/* Main Container */}
                    <div className="main_container">
                        {/* Title */}
                        <div className="flex flex-col items-center text-center px-7 pt-10 md:pt-12">
                            <h1 className="text-[35px] md:text-[40px] lg:text-[42px] text-[#0A0E17] font-bold">
                                Our Promise
                            </h1>
                            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#44506A] md:mt-1 font-medium">
                                Shop with confidence and peace of mind
                            </p>
                        </div>

                        {/* main */}
                        <div className="flex flex-col lg:flex-row items-center lg:h-full xl:h-96 gap-8 my-8">

                            {/* Left side Image */}
                            <div className="w-full h-96 lg:w-1/3">
                                <img
                                    src={OurPromise}
                                    alt="Our Promise"
                                    className="rounded-xl object-cover w-full h-full"
                                />
                            </div>

                            {/* Right side Grid */}
                            <div className="w-full h-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">

                                {/* Card 1 */}
                                <div className="p-5 md:p-6 xl:p-7 border rounded-xl shadow-sm bg-[#F9FAFB]">
                                    <div className="flex items-start gap-2">
                                        <img src={Payments} alt="Secure Payments" className="w-8 h-8" />
                                        <div>
                                            <h2 className="text-[18px] xl:text-[20px] font-semibold text-[#44506A]">
                                                Secure Payments
                                            </h2>
                                            <p className="text-[16px] md:text-[15px] lg:text-[16px] font-medium text-[#6B7280] ml-[-5px] mt-2">
                                                All transactions are encrypted and protected, so your information stays safe.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="p-5 md:p-6 xl:p-7 border rounded-xl shadow-sm bg-[#F9FAFB]">
                                    <div className="flex items-start gap-2">
                                        <img src={CurrencyExchange} alt="Easy Returns" className="w-8 h-8" />
                                        <div>
                                            <h2 className="text-[18px] xl:text-[20px] font-semibold text-[#44506A]">
                                                Easy Returns & Exchanges
                                            </h2>
                                            <p className="text-[16px] md:text-[15px] lg:text-[16px] font-medium text-[#6B7280] ml-[-5px] mt-2">
                                                Hassle-free return policies and simple exchanges make shopping worry-free.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="p-5 md:p-6 xl:p-7 border rounded-xl shadow-sm bg-[#F9FAFB]">
                                    <div className="flex items-start gap-2">
                                        <img src={Verified} alt="Verified Sellers" className="w-8 h-8" />
                                        <div>
                                            <h2 className="text-[18px] xl:text-[20px] font-semibold text-[#44506A]">
                                                Verified Sellers
                                            </h2>
                                            <p className="text-[16px] md:text-[15px] lg:text-[16px] font-medium text-[#6B7280] ml-[-5px] mt-2">
                                                We partner only with trusted brands and sellers to ensure product authenticity and reliability.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="p-5 md:p-6 xl:p-7 border rounded-xl shadow-sm bg-[#F9FAFB]">
                                    <div className="flex items-start gap-2">
                                        <img src={Security} alt="Data Protection" className="w-8 h-8" />
                                        <div>
                                            <h2 className="text-[18px] xl:text-[20px] font-semibold text-[#44506A]">
                                                Data Protection
                                            </h2>
                                            <p className="text-[16px] md:text-[15px] lg:text-[16px] font-medium text-[#6B7280] ml-[-5px] mt-2">
                                                Your privacy is our priority — we never share your personal information without your consent.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Contact Us Section */}
                <ContactUs />

                {/* 9. Join Our Story Section */}
                <section className='bg-[#FFFFFF]'>

                    {/* Main Container */}
                    <div className="main_container">

                        {/* main */}
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 pt-10 md:pt-14 lg:pt-16 pb-10 md:pb-16">

                            {/* Left Side (Content) */}
                            <div className="w-full lg:w-2/4 xl:w-2/3 bg-[#F9FAFB]  md:p-8 p-4 rounded-xl">
                                <h1 className="text-3xl md:text-3xl lg:text-[42px] font-bold text-[#111827] mb-3">
                                    Join Our Story
                                </h1>
                                <p className="text-lg md:text-xl text-[#44506A] font-medium">
                                    Connecting People, Products & Possibilities
                                </p>

                                <div className="mt-7 space-y-4 text-[#6B7280] md:text-lg text-base font-normal">
                                    <p>At CORALBAY, we believe shopping should be simple, inspiring, and trustworthy. Born in Australia, we bring together global brands and local favorites in one seamless online experience. Whether you’re upgrading your tech, refreshing your wardrobe, or stocking up on essentials, we’re here to make shopping easy, safe, and enjoyable - all at your fingertips.</p>

                                    <p>Over time, we’ve built a community that trusts us. By listening and improving, we offer smarter solutions and better experiences for every shopper.</p>

                                    <p>Looking ahead, we’re committed to supporting your needs, local businesses, and sustainability — creating an inclusive, reliable, and eco-friendly marketplace.</p>
                                </div>
                            </div>

                            {/* Right Side (Image) */}
                            <div className="w-full lg:h-auto sm:h-[500px]  lg:w-2/4 xl:w-1/3">
                                <img
                                    src={JoinOurStory}
                                    alt="Our Promise"
                                    className="rounded-xl lg:object-cover sm:object-contain h-full w-[100%]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. Subscribe Section */}
                <Newsletter />

            </div>
        </>
    )
}
