import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import icon from '../images/icon.svg';
import icon1 from '../images/icon1.svg';
import icon2 from '../images/icon2.svg';
import icon4 from '../images/icon4.svg';
import ContactUs from '../component/ContactUs';
 
 
function ContactInfo() {
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
 
            <ContactUs/>
        </>
    );
}
 
export default ContactInfo;