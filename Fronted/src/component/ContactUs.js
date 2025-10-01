
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createContactUs } from '../Store/Slices/contactusSlice';
import { contactUsSchema } from '../schemas';
import { useFormik } from 'formik';

// icons
import { MdOutlineLocationOn, MdOutlineCall } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


function ContactUs() {

    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.contactUs);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const subjects = [
        "General Inquiry",
        "Order Tracking",
        "Payment Issues",
        "Returns & Exchanges",
        "Product Information",
        "Other",
    ];

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        comments: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema: contactUsSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(createContactUs(values));
            alert("Message sent successfully!");
            resetForm();
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = formik;


    return (
        <>

            {/* Contact Us Section */}
            <section className='bg-[#F9FAFB] py-10 md:py-14'>

                {/* Main Container */}
                <div className="main_container flex items-center justify-center">

                    {/* main */}
                    <div className="w-full flex flex-col md:flex-row md:gap-0 gap-8 overflow-hidden">

                        {/* Left Side - Contact Info */}
                        <div className="w-full md:w-1/2 border-gray-200">
                            {/* left side */}
                            <h1 className="text-[35px] md:text-[40px] lg:text-[42px] text-[#0A0E17] font-bold">
                                Contact Us
                            </h1>
                            <p className="text-[16px] lg:text-[18px] xl:text-[20px] text-[#44506A] mt-1 lg:mt-3 font-medium">
                                We’re here to help - reach out anytime!
                            </p>

                            <div className='mt-4'>
                                <div className='flex items-center gap-2 mt-3 md:mt-6'>
                                    <MdOutlineLocationOn className='text-[#F97316] text-[28px]' />
                                    <p className='text-[#44506A] text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>123 CoralBay Street, Sydney, Australia</p>
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                    <MdOutlineCall className='text-[#F97316] text-[28px]' />
                                    <p className='text-[#44506A] text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>+61 400 123 456</p>
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                    <FiMail className='text-[#F97316] text-[28px]' />
                                    <p className='text-[#44506A] text-[16px] lg:text-[18px] xl:text-[20px] font-medium'>support@coralbay.com.au</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-full md:w-1/2 bg-gray-50">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="" className='text-[#44506A] text-[16px] font-semibold'>
                                            First Name
                                            <span className='text-[#DC2626] font-medium ml-1'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder='Enter first name'
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='w-full text-[#6B7280] py-3 px-4 mt-2 font-medium border border-[#44506A33] rounded-lg outline-none'
                                        />
                                        {errors.firstName && touched.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                        )}
                                    </div>
                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="" className='text-[#44506A] text-[16px] font-semibold'>
                                            Last Name
                                            <span className='text-[#DC2626] font-medium ml-1'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder='Enter last name'
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='w-full text-[#6B7280] py-3 px-4 mt-2 font-medium border border-[#44506A33] rounded-lg outline-none'
                                        />
                                        {errors.lastName && touched.lastName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="" className='text-[#44506A] text-[16px] font-semibold'>
                                        Email
                                        <span className='text-[#DC2626] font-medium ml-1'>*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Enter your email address'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className='w-full text-[#6B7280] py-3 px-4 mt-2 font-medium border border-[#44506A33] rounded-lg outline-none'
                                    />
                                    {errors.email && touched.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Subject */}
                                <div>
                                    {/* Dropdown */}
                                    <div className='flex flex-col relative'>
                                        {/* Label */}
                                        <label htmlFor="" className='text-[#44506A] text-[16px] font-semibold mb-2'>
                                            Subject
                                            <span className='text-[#DC2626] font-medium ml-1'>*</span></label>

                                        {/* Dropdown */}
                                        <div
                                            className="w-full border border-[#44506A33] rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer bg-[var(--bg-white)] text-base"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            <span
                                                className={
                                                    values.subject
                                                        ? "text-[#44506A] font-medium"
                                                        : "text-[#6B7280] font-medium"
                                                }
                                            >
                                                {values.subject || "Select a subject"}
                                            </span>
                                            <MdOutlineKeyboardArrowDown
                                                className={`text-[#6B7280] text-2xl transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </div>

                                        {/* Dropdown Menu */}
                                        {dropdownOpen && (
                                            <ul className="absolute top-full mt-1 w-full bg-white border border-[#44506A33] rounded-md shadow-md max-h-48 overflow-y-auto z-50 text-base">
                                                {subjects.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="px-3 py-2 cursor-pointer text-[#44506A] hover:bg-gray-100"
                                                        onClick={() => {
                                                            setFieldValue("subject", item);
                                                            setDropdownOpen(false);
                                                        }}
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {errors.subject && touched.subject && (
                                            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Comments */}
                                <div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className='text-[#44506A] text-[16px] font-semibold'>
                                            Comments
                                            <span className='text-[#DC2626] font-medium ml-1'>*</span></label>
                                        <textarea
                                            name="comments"
                                            placeholder='Enter your comments'
                                            value={values.comments}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='text-[#6B7280] py-3 px-4 mt-2 font-medium border border-[#44506A33] rounded-lg outline-none resize-none'
                                            rows={3}
                                        />
                                        {errors.comments && touched.comments && (
                                            <p className="text-red-500 text-sm mt-1">{errors.comments}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-5">
                                    <button
                                        type="submit"
                                        className="bg-[#F97316] text-white text-lg rounded-lg py-3 font-medium w-full disabled:opacity-50"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >

            </section >
        </>
    )
}

export default ContactUs