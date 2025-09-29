import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import icon from '../images/icon.svg';
import icon1 from '../images/icon1.svg';
import icon2 from '../images/icon2.svg';
import icon4 from '../images/icon4.svg';


function ContactUs() {
    // Add the missing state
    const [firstAddressForm, setFirstAddressForm] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        zipCode: '',
        address: '',
        city: '',
        state: ''
    });

    // Add the missing handler function
    const handleFirstAddressChange = (field, value) => {
        setFirstAddressForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Add form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', firstAddressForm);
        // Add your form submission logic here
    };

    return (
        <>
            <section >
                <div className="bg-[#F9FAFB] py-6">
                    <div className='main_container'>
                    <h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
                        Contact Us
                    </h2>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <h5 className="text-[16px] text-[#BABABA] font-medium">Home</h5>
                            <ChevronRight className="w-4 h-4 text-[#BABABA]" />
                            <h3 className="text-[16px] text-[#44506A] font-medium">Contact Us</h3>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 ">
                <div className="max-w-6xl mx-auto main_container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center md:text-left">
                            <div>

                            <div className="flex justify-center md:justify-start mb-4">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img src={icon2} alt="Location" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Head Office</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-gray-900">CoralBay</p>
                                <p className="text-gray-600">123 CoralBay Street, Sydney, Australia</p>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-4">
                                <div className="w-12 h-12 flex items-center justify-center">

                                    <img src={icon1} alt="Time" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">CoralBay Help Center Time</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="font-semibold text-gray-900">Norfolk Island Standard Time</p>
                                    <p className="text-gray-600">Now 5:15 pm [Kingston (GMT+11)]</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Australian Central Standard Time</p>
                                    <p className="text-gray-600">Now 3:45 pm [Adelaide (GMT+9:30)]</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Australian Western Standard Time</p>
                                    <p className="text-gray-600">Now 2:15 pm [Perth (GMT+8)]</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Christmas Island Time</p>
                                    <p className="text-gray-600">Now 1:15 pm [Christmas Island (GMT+7)]</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-4">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img src={icon} alt="Customer Care" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Care</h3>
                            <div className="space-y-2">
                                <p className="font-semibold text-gray-900">+61 400 123 456</p>
                                <p className="text-gray-600">support@coralbay.com.au</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='bg-gray-50 '>
                    <div className='main_container'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto py-5'>
                        <div>
                            <div>
                                <h1 className='text-[30px] font-semibold font-heading'>Contact Us</h1>
                                <p>We're here to help - reach out anytime!</p>
                                <div className='flex gap-2 align-center mt-4'>
                                    <div className=''>
                                         <img src={icon2} alt="Location" width={15}/>
                                    </div>
                                    <div className='align-center'>
                                        123 CoralBay Street, Sydney, Australia
                                    </div>
                                </div>
                                 <div className='flex gap-2 align-center mt-4'>
                                    <div className=''>
                                        <img src={icon1} alt="Time" width={20}/>
                                    </div>
                                    <div className='align-center'>
                                        +61 400 123 456
                                    </div>
                                </div>
                                 <div className='flex gap-2 align-center mt-4'>
                                    <div className=''>
                                         <img src={icon4} alt="Location" width={20}/>
                                    </div>
                                    <div className='align-center'>
                                       support@coralbay.com.au
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <form className="max-w-md mx-auto  p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none "
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none">
                                        <option>What can we help you with?</option>
                                        <option>General Inquiry</option>
                                        <option>Support</option>
                                        <option>Feedback</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Comments <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Enter your comments"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition duration-200 font-medium"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactUs;