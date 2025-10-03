import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    TransitionChild,
} from "@headlessui/react";
import Wishlist from '../component/Wishlist';
import OrdersItem1 from '../images/OrdersItem1.png'
import OrdersItem2 from '../images/OrdersItem2.png'
import OrdersItem3 from '../images/OrdersItem3.png'
import NoOrders from '../images/NoOrders.png'
import { IoStar } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getAuthData } from '../Store/Slices/authProfileSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function Profile() {

    const [activeTab, setActiveTab] = useState("PersonalInformation");
    const [openAddress, setOpenAddress] = useState(false)
    const [openReview, setOpenReview] = useState(false)
    const [activeOrdersTab, setActiveOrdersTab] = useState("CurrentOrders")
    const [reviewImages, setReviewImages] = useState([]);
    const { tab } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (tab) setActiveTab(tab);
    }, [tab]);

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);

        // not upload above 5 img
        if (reviewImages.length + files.length > 5) {
            alert("You can upload a maximum of 5 images.");
            e.target.value = ""; // reset input
            return;
        }

        const newImages = files.map((file) => ({
            id: URL.createObjectURL(file),
            file,
        }));

        setReviewImages((prev) => [...prev, ...newImages]);
        e.target.value = ""; // reset input 
    };

    const handleRemove = (id) => {
        setReviewImages((prev) => prev.filter((img) => img.id !== id));
    };

    const navLabels = {
        PersonalInformation: "Personal Information",
        Saveaddress: "Save address",
        wishlist: "Wishlist",
        Orders: "Orders",
    };


    const authData = useSelector( (state) => state.authProfie.userData)
    console.log("Auth Data From Profile ::" , authData);
    
    const token = localStorage.getItem('token');

    useEffect(()=>{
        if(token){
            dispatch(getAuthData())
        }
    },[token])



    return (
        <>

            {/* Heading */}
            <section className='bg-[var(--profile-bg)] py-7'>
                <div className='main_container'>
                    <h3 className=' text-2xl md:text-4xl text-[var(--profile-dark-text)] font-semibold'>Profile</h3>
                    <div className="flex items-center text-[var(--profile-gray-text)] font-medium text-sm md:text-base mt-3">
                        <Link to="/" className="flex items-center">
                            Home <FaChevronRight className="mx-1" size={12} />
                        </Link>
                        <Link to="/profile/PersonalInformation" className="flex items-center">
                            Profile <FaChevronRight className="mx-1" size={12} />
                        </Link>
                        <span className="text-[var(--profile-light-text)]">
                            {navLabels[activeTab]}
                        </span>
                    </div>
                </div>
            </section>


            {/* Nav And Tabs - Custom */}
            <section className='main_container'>
                <div className='my-8 '>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">

                        {/* Navs */}
                        <div className="md:col-span-1 h-fit">
                            <nav className="flex flex-col space-y-3 ">
                                <button
                                    onClick={() => setActiveTab("PersonalInformation")}
                                    className={`p-4 bg-[var(--profile-bg)] text-lg text-left transition ${activeTab === "PersonalInformation"
                                        ? "border-l-4 border-[var(--text-orange)]  text-[var(--profile-dark-text)] font-semibold bg-[var(--profile-bg)]"
                                        : "text-[var(--profile-light-text)] font-normal"
                                        }`}
                                >
                                    Personal Information
                                </button>

                                <button
                                    onClick={() => setActiveTab("Saveaddress")}
                                    className={`p-4 bg-[var(--profile-bg)] text-lg text-left transition ${activeTab === "Saveaddress"
                                        ? "border-l-4 border-[var(--text-orange)] text-[var(--profile-dark-text)] font-semibold bg-[var(--profile-bg)]"
                                        : "text-[var(--profile-light-text)] font-normal"
                                        }`}
                                >
                                    Save Address
                                </button>

                                <button
                                    onClick={() => setActiveTab("wishlist")}
                                    className={`p-4 bg-[var(--profile-bg)] text-lg text-left transition ${activeTab === "wishlist"
                                        ? "border-l-4 border-[var(--text-orange)] text-[var(--profile-dark-text)] font-semibold bg-[var(--profile-bg)]"
                                        : "text-[var(--profile-light-text)] font-normal "
                                        }`}
                                >
                                    Wishlist
                                </button>

                                <button
                                    onClick={() => setActiveTab("Orders")}
                                    className={`p-4 bg-[var(--profile-bg)] text-lg text-left transition ${activeTab === "Orders"
                                        ? "border-l-4 border-[var(--text-orange)] text-[var(--profile-dark-text)] font-semibold bg-[var(--profile-bg)]"
                                        : "text-[var(--profile-light-text)] font-normal "
                                        }`}
                                >
                                    Orders
                                </button>
                            </nav>
                        </div>


                        {/* Tabs :  Content */}
                        <div className="md:col-span-2 lg:col-span-3 ">

                            {/* Personal Information */}
                            {activeTab === "PersonalInformation" && (

                                <div className="p-5 bg-[var(--profile-bg)] rounded-md ">

                                    <div className="flex flex-col md:flex-row w-full gap-4 mb-4">

                                        {/* First Name */}
                                        <div className="flex-1">
                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                First Name <span className="text-[var(--text-orange)]">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                placeholder="Ex. John"
                                                value={authData.firstName}
                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div className="flex-1">
                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                Last Name <span className="text-[var(--text-orange)]">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                placeholder="Ex. Fernandez"
                                                value={authData.lastName}
                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                            />
                                        </div>

                                    </div>

                                    <div className="flex flex-col md:flex-row w-full gap-4 mb-4">

                                        {/* Email */}
                                        <div className="flex-1">
                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                Email <span className="text-[var(--text-orange)]">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                placeholder="Ex. Jhon89@example.com"
                                                value={authData.email}
                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                            />
                                        </div>

                                        {/* Mobile Number */}
                                        <div className="flex-1">
                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                Mobile Number <span className="text-[var(--text-orange)]">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                placeholder="+61 999 222 444"
                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                            />
                                        </div>

                                    </div>

                                    {/* Button - Update - Cancel */}
                                    <div className='text-base font-semibold flex gap-4 text-[var(--profile-darkgray-text)] '>
                                        <button className='bg-[#E5E7EB] px-5 py-2 rounded-md sm:w-fit w-full'>Update</button>
                                        <button className='border border-[var(--profile-darkgray-text)] px-5 py-2 rounded-md sm:w-fit w-full'>Cancel</button>
                                    </div>



                                </div>

                            )}


                            {/* Save Address */}
                            {activeTab === "Saveaddress" && (

                                <div>

                                    {/* Add New Address */}
                                    <div className='mb-5 bg-[var(--profile-bg)] rounded-md p-5'>
                                        <h3 onClick={() => setOpenAddress(true)} command="show-modal" commandfor="dialog" className='text-[var(--profile-dark-text)] bg-[var(--bg-white)] p-3 rounded-md text-lg font-semibold flex items-center gap-2 cursor-pointer'> <span> <FaPlus className='text-[var(--text-orange)]' /> </span> Add New Address </h3>

                                        {/* Exist Address */}
                                        <div className='mt-5 space-y-5'>

                                            {/* Add:1 */}
                                            <div className="flex flex-row items-start gap-2 p-3 bg-[var(--bg-white)] rounded-md">

                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        className=" mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-2 checked:ring-[var(--text-orange)] checked:ring-offset-2 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-[var(--profile-dark-text)] sm:text-lg text-base font-semibold mb-2">Emily Thompson</h4>
                                                    <div className='text-[var(--profile-darkgray-text)] font-medium te'>
                                                        <p>24 Victoria Street, Sydney,</p>
                                                        <p>NSW 2000, Australia</p>
                                                    </div>
                                                    <p className='flex flex-wrap gap-1 mt-2 text-[var(--profile-darkgray-text)] text-base'>Mobile: <span className='text-[var(--profile-dark-text)]'> +61 412 345 678 </span></p>
                                                    <div className="mt-2 text-[var(--profile-darkgray-text)] text-base font-semibold flex gap-2 flex-wrap ">
                                                        <button className="border border-gray-400 px-3 py-2 rounded-md w-24 ">Remove</button>
                                                        <button onClick={() => setOpenAddress(true)} className="border border-gray-400 px-3 py-2 rounded-md w-24 ">Edit</button>
                                                    </div>

                                                </div>

                                                <div className="text-[var(--text-red)] font-medium text-base w-auto">
                                                    <h6>Office</h6>
                                                </div>

                                            </div>

                                            {/* Add: 2 */}
                                            <div className="flex flex-row items-start gap-2 p-3 bg-[var(--bg-white)] rounded-md">

                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        className=" mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-2 checked:ring-[var(--text-orange)] checked:ring-offset-2 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-[var(--profile-dark-text)] sm:text-lg text-base font-semibold mb-2">Liam Mitchell</h4>
                                                    <div className='text-[var(--profile-darkgray-text)] font-medium te'>
                                                        <p>88 George Street, </p>
                                                        <p>Melbourne, VIC 3000,</p>
                                                        <p>Australia</p>
                                                    </div>
                                                    <p className='flex flex-wrap gap-1 mt-2 text-[var(--profile-darkgray-text)] text-base'>Mobile: <span className='text-[var(--profile-dark-text)]'> +61 999 900 005 </span></p>
                                                    <div className="mt-2 text-[var(--profile-darkgray-text)] text-base font-semibold flex gap-2 flex-wrap ">
                                                        <button className="border border-gray-400 px-3 py-2 rounded-md w-24 ">Remove</button>
                                                        <button onClick={() => setOpenAddress(true)} className="border border-gray-400 px-3 py-2 rounded-md w-24 ">Edit</button>
                                                    </div>

                                                </div>

                                                <div className="text-[var(--text-red)] font-medium text-base w-auto">
                                                    <h6>Home</h6>
                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                    {/* Add Billing Address */}
                                    <div className='bg-[var(--profile-bg)] rounded-md p-5'>
                                        <h3 onClick={() => setOpenAddress(true)} className='text-[var(--profile-dark-text)] bg-[var(--bg-white)] p-3 rounded-md text-lg font-semibold flex items-center gap-2 cursor-pointer'> <span> <FaPlus className='text-[var(--text-orange)]' /> </span> Add Billing Address </h3>

                                        {/* Exist Billing Address */}
                                        <div className='mt-5 space-y-5'>

                                            {/* Add:1 */}
                                            <div className="flex flex-row items-start gap-2 p-3 bg-[var(--bg-white)] rounded-md">

                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        className=" mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-2 checked:ring-[var(--text-orange)] checked:ring-offset-2 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-[var(--profile-dark-text)] sm:text-lg text-base font-semibold mb-2">Chloe Harrison</h4>
                                                    <div className='text-[var(--profile-darkgray-text)] font-medium te'>
                                                        <p>12 Green Lane, Brisbane, QLD</p>
                                                        <p>4000, Australia</p>
                                                    </div>
                                                    <p className='flex flex-wrap gap-1 mt-2 text-[var(--profile-darkgray-text)] text-base'>Mobile: <span className='text-[var(--profile-dark-text)]'> +61 418 654 321 </span></p>
                                                    <div className="mt-2 text-[var(--profile-darkgray-text)] text-base font-semibold flex gap-2 flex-wrap ">
                                                        <button className="border border-gray-400 px-3 py-2 rounded-md w-24 ">Remove</button>
                                                        <button onClick={() => setOpenAddress(true)} className="border border-gray-400 px-3 py-2 rounded-md w-24 ">Edit</button>
                                                    </div>

                                                </div>

                                                <div className="text-[var(--text-red)] font-medium text-base w-auto">
                                                    <h6>Office</h6>
                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                    {/* ***** Modal - Address ******* */}
                                    <Dialog open={openAddress} onClose={setOpenAddress} className="relative z-[999]">
                                        {/* Backdrop */}
                                        <DialogBackdrop
                                            transition
                                            className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0"
                                        />

                                        {/* Centered modal */}
                                        <div className="fixed inset-0 flex items-center justify-center p-4">
                                            <DialogPanel
                                                transition
                                                className="w-full p-4 max-w-md lg:max-w-lg xl:max-w-xl max-h-[90vh] rounded-xl bg-[var(--profile-bg,#fff)] shadow-lg transform transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex flex-col"
                                            >
                                                {/* Header */}
                                                <div className="flex justify-between items-center py-3 shrink-0">
                                                    <DialogTitle className="text-lg font-semibold text-[var(--profile-dark-text,#111)]">
                                                        Add New & Billing Address
                                                    </DialogTitle>
                                                    <IoMdClose onClick={() => setOpenAddress(false)} className="text-[24px] text-[var(--profile-dark-text)] cursor-pointer bg-[var(--profile-gray-text)] p-1 rounded-full" />
                                                </div>

                                                <div className="border-b border-[var(--profile-border,#ddd)]"></div>

                                                {/* Scrollable Body */}
                                                <div className="flex-1 overflow-y-auto py-5 px-1 space-y-4 custom-scrollbar-modal">

                                                    {/* First + Last name */}
                                                    <div className="flex flex-col md:flex-row gap-4">
                                                        <div className="flex-1">
                                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                                First Name
                                                            </p>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Your First Name"
                                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                                Last Name
                                                            </p>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Your Last Name"
                                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Mobile Number */}
                                                    <div>
                                                        <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                            Mobile Number
                                                        </p>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Your Number"
                                                            className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                                        />
                                                    </div>

                                                    <h4 className="text-[var(--profile-dark-text)] font-semibold text-lg">
                                                        Address
                                                    </h4>

                                                    {/* ZIP */}
                                                    <div>
                                                        <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                            ZIP Code
                                                        </p>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Your ZIP Code"
                                                            className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                                        />
                                                    </div>

                                                    {/* Address */}
                                                    <div>
                                                        <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                            Address
                                                        </p>
                                                        <input
                                                            type="text"
                                                            placeholder="(locality, building, street)"
                                                            className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                                        />
                                                    </div>

                                                    {/* City + State */}
                                                    <div className="flex flex-col md:flex-row gap-4">
                                                        <div className="flex-1">
                                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                                City
                                                            </p>
                                                            <input
                                                                type="text"
                                                                placeholder="City"
                                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[var(--profile-light-text)] font-semibold text-base mb-1">
                                                                State
                                                            </p>
                                                            <input
                                                                type="text"
                                                                placeholder="State"
                                                                className="focus:outline-none border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Address Type */}
                                                    <h4 className="text-[var(--profile-dark-text)] font-semibold text-lg">
                                                        Address Type
                                                    </h4>

                                                    <div className='flex items-center gap-4'>
                                                     
                                                        <div className='flex items-center gap-2'>
                                                            <input
                                                                id='mHome'
                                                                type='radio'
                                                                name='maddress'
                                                                value='home'
                                                                className='appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 
                 checked:ring-2 checked:ring-[var(--text-orange)] checked:ring-offset-2 
                 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]'
                                                            />
                                                            <label htmlFor='mHome'>Home</label>
                                                        </div>

                                                     
                                                        <div className='flex items-center gap-2'>
                                                            <input
                                                                id='mOffice'
                                                                type='radio'
                                                                name='maddress'
                                                                value='office'
                                                                defaultChecked
                                                                className='appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 
                 checked:ring-2 checked:ring-[var(--text-orange)] checked:ring-offset-2 
                 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]'
                                                            />
                                                            <label htmlFor='mOffice'>Office</label>
                                                        </div>
                                                    </div>


                                                    <p className='text-[var(--profile-light-text)] font-medium text-sm'>If your office open on weekends?</p>

                                                    <div className='flex flex-col justify-center-center gap-2'>
                                                        <div className='flex items-center gap-2'>
                                                            <input

                                                                id='mOpenSat'
                                                                type="checkbox"
                                                                className=" h-4 w-4 accent-[var(--text-orange)]"
                                                            />
                                                            <label htmlFor="mOpenSat" className='text-[var(--profile-darkgray-text)] text-sm font-medium'>Open on Saturday</label>
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <input
                                                                id='mOpenSun'
                                                                type="checkbox"
                                                                className=" h-4 w-4 accent-[var(--text-orange)]"
                                                            />
                                                            <label htmlFor="mOpenSun" className='text-[var(--profile-darkgray-text)] text-sm font-medium'>Open on Sunday</label>
                                                        </div>
                                                    </div>

                                                </div>


                                                {/* Footer */}
                                                <div className="flex flex-col gap-3 py-5 px-1 shrink-0 border-t border-[var(--profile-border,#ddd)]">


                                                    <div className='flex items-center gap-2'>
                                                        <input
                                                            id='defAdd'
                                                            type="checkbox"
                                                            className=" h-4 w-4 accent-[var(--text-orange)]"
                                                        />
                                                        <label htmlFor="defAdd" className='text-[var(--profile-darkgray-text)] text-sm font-medium'>Set my default address</label>
                                                    </div>

                                                    <button className='bg-[var(--bg-orange)] text-[var(--text-white)] p-2 rounded-md text-lg font-semibold'>Save</button>
                                                    <button onClick={() => setOpenAddress(false)} className='p-2 rounded-md text-lg font-semibold text-[var(--profile-darkgray-text)] border border-[var(--profile-darkgray-text)]'> Cancel </button>

                                                </div>

                                            </DialogPanel>
                                        </div>
                                    </Dialog>


                                </div>

                            )}

                            {/* Wishlist */}
                            {activeTab === "wishlist" && (
                                <div >
                                    <Wishlist viewType="profile" />
                                </div>
                            )}

                            {/* Orders */}
                            {activeTab === "Orders" && (
                                <div className="p-5 bg-[var(--profile-bg)] rounded-md shadow">

                                    <div className='border-b border-[var(--profile-border)] w-full  flex gap-5 text-[var(--profile-light-text)] font-normal text-base sm:text-lg'>
                                        <button
                                            onClick={() => setActiveOrdersTab("CurrentOrders")}
                                            className={`pb-3 ${activeOrdersTab === "CurrentOrders"
                                                ? "border-b-2 border-[var(--text-orange)] font-bold"
                                                : "border-b-2 border-transparent"
                                                }`}
                                        >
                                            Current Orders
                                        </button>

                                        <button
                                            onClick={() => setActiveOrdersTab("OrdersHistory")}
                                            className={`pb-3 ${activeOrdersTab === "OrdersHistory"
                                                ? "border-b-2 border-[var(--text-orange)] font-bold"
                                                : "border-b-2 border-transparent"
                                                }`}
                                        >
                                            Order History
                                        </button>

                                    </div>


                                    {activeOrdersTab === "CurrentOrders" && (

                                        <div className='mt-5 space-y-3'>


                                            {/* Item : 1 */}
                                            <div className='p-3 bg-[var(--bg-white)] flex flex-wrap items-center gap-3  rounded-md' onClick={() => navigate('/trackOrder')} >
                                                {/* Product Image */}
                                                <div className='lg:w-20 lg:h-20 w-24 h-24 flex-shrink-0'>
                                                    <img
                                                        src={OrdersItem1}
                                                        alt="Product"
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex-1 flex flex-col justify-between min-w-[200px]'>
                                                    {/* Title */}
                                                    <div className='flex lg:flex-row flex-col justify-between flex-warp gap-2'>
                                                        <h6 className='text-base text-[var(--profile-dark-text)] font-semibold line-clamp-2 '>
                                                            Men Self Design Zip Neck Cotton Blend White, Black T-Shirt
                                                        </h6>
                                                        <h6 className='text-base text-[var(--trackOrder-text)] font-semibold'>
                                                            # EE123456789AU
                                                        </h6>
                                                    </div>

                                                    {/* Price & Delivery */}
                                                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mt-2'>
                                                        <h5 className='text-[var(--profile-dark-text)] text-base font-medium'>
                                                            AU$ 120.00
                                                        </h5>
                                                        <p className='text-[var(--profile-light-text)] text-sm sm:text-base font-semibold'>
                                                            Delivered by: 15 June 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Item : 2 */}
                                            <div className='p-3 bg-[var(--bg-white)] flex flex-wrap items-center gap-3  rounded-md' onClick={() => navigate('/trackOrder')}>
                                                {/* Product Image */}
                                                <div className='lg:w-20 lg:h-20 w-24 h-24 flex-shrink-0'>
                                                    <img
                                                        src={OrdersItem2}
                                                        alt="Product"
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex-1 flex flex-col justify-between min-w-[200px]'>
                                                    {/* Title */}
                                                    <div className='flex lg:flex-row flex-col justify-between flex-warp gap-2'>
                                                        <h6 className='text-base text-[var(--profile-dark-text)] font-semibold line-clamp-2 '>
                                                            Men Self Design Zip Neck Cotton Blend White, Black T-Shirt
                                                        </h6>
                                                        <h6 className='text-base text-[var(--trackOrder-text)] font-semibold'>
                                                            # EE123456789AU
                                                        </h6>
                                                    </div>

                                                    {/* Price & Delivery */}
                                                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mt-2'>
                                                        <h5 className='text-[var(--profile-dark-text)] text-base font-medium'>
                                                            AU$ 120.00
                                                        </h5>
                                                        <p className='text-[var(--profile-light-text)] text-sm sm:text-base font-semibold'>
                                                            Delivered by: 15 June 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Item : 3 */}
                                            <div className='p-3 bg-[var(--bg-white)] flex flex-wrap items-center gap-3  rounded-md' onClick={() => navigate('/trackOrder')}>
                                                {/* Product Image */}
                                                <div className='lg:w-20 lg:h-20 w-24 h-24 flex-shrink-0'>
                                                    <img
                                                        src={OrdersItem3}
                                                        alt="Product"
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex-1 flex flex-col justify-between min-w-[200px]'>
                                                    {/* Title */}
                                                    <div className='flex lg:flex-row flex-col justify-between flex-warp gap-2'>
                                                        <h6 className='text-base text-[var(--profile-dark-text)] font-semibold line-clamp-2 '>
                                                            Men Self Design Zip Neck Cotton Blend White, Black T-Shirt
                                                        </h6>
                                                        <h6 className='text-base text-[var(--trackOrder-text)] font-semibold'>
                                                            # EE123456789AU
                                                        </h6>
                                                    </div>

                                                    {/* Price & Delivery */}
                                                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mt-2'>
                                                        <h5 className='text-[var(--profile-dark-text)] text-base font-medium'>
                                                            AU$ 120.00
                                                        </h5>
                                                        <p className='text-[var(--profile-light-text)] text-sm sm:text-base font-semibold'>
                                                            Delivered by: 15 June 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>



                                            {/* No Product */}
                                            {/* <div className='flex flex-col justify-center items-center my-20'>
                                                <img src={NoOrders} alt="NoOrdersFound" className='w-40 mb-4' />
                                                <p className="text-[var(--text-black)] text-base font-medium mb-4">Your cart is currently empty.</p>
                                                <button className="bg-[var(--bg-orange)] px-10 py-3 text-[var(--text-white)] text-lg font-semibold rounded-md">Back to Store</button>
                                        </div> */}



                                        </div>


                                    )}




                                    {activeOrdersTab === "OrdersHistory" && (

                                        <div className='mt-5 space-y-3'>


                                            {/* Item : 1 : Delivered */}
                                            <div className='p-3 bg-[var(--bg-white)] flex flex-wrap items-center gap-3  rounded-md' >
                                                {/* Product Image */}
                                                <div className='lg:w-20 lg:h-20 w-24 h-24 flex-shrink-0' onClick={() => navigate('/trackOrder')}>
                                                    <img
                                                        src={OrdersItem1}
                                                        alt="Product"
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex-1 flex flex-col gap-1 justify-between min-w-[200px]'>
                                                    {/* Title */}
                                                    <div className='flex lg:flex-row flex-col justify-between flex-warp gap-2' onClick={() => navigate('/trackOrder')} >
                                                        <h6 className='text-base text-[var(--profile-dark-text)] font-semibold line-clamp-2 '>
                                                            Men Self Design Zip Neck Cotton Blend White, Black T-Shirt
                                                        </h6>
                                                        <h6 className='text-base text-[var(--trackOrder-text)] font-semibold'>
                                                            # EE123456789AU
                                                        </h6>
                                                    </div>

                                                    <h5 className='text-[var(--profile-dark-text)] text-base font-medium'>
                                                        AU$ 120.00
                                                    </h5>

                                                    {/* Price & Delivery */}
                                                    <div className='flex flex-wrap flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 '>
                                                        <div className='flex items-center gap-2 text-lg font-medium'>
                                                            <div className='flex items-center gap-1'>
                                                                <IoStar className='text-[#F59E0B]' />
                                                                <IoStar className='text-[#F59E0B]' />
                                                                <IoStar className='text-[#E5E7EB]' />
                                                                <IoStar className='text-[#E5E7EB]' />
                                                                <IoStar className='text-[#E5E7EB]' />
                                                            </div>
                                                            <p onClick={() => setOpenReview(true)} className='text-[var(--profile-darkgray-text)] text-base font-medium cursor-pointer'>Write review</p>
                                                        </div>
                                                        <p className='text-[var(--profile-light-text)] text-sm sm:text-base font-semibold'>
                                                            Delivered on: 15 June 2025
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* Item : 2 : Delivered */}
                                            <div className='p-3 bg-[var(--bg-white)] flex flex-wrap items-center gap-3  rounded-md' >
                                                {/* Product Image */}
                                                <div className='lg:w-20 lg:h-20 w-24 h-24 flex-shrink-0' onClick={() => navigate('/trackOrder')}>
                                                    <img
                                                        src={OrdersItem2}
                                                        alt="Product"
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex-1 flex flex-col gap-1 justify-between min-w-[200px]'>
                                                    {/* Title */}
                                                    <div className='flex lg:flex-row flex-col justify-between flex-warp gap-2' onClick={() => navigate('/trackOrder')}>
                                                        <h6 className='text-base text-[var(--profile-dark-text)] font-semibold line-clamp-2 '>
                                                            Men Self Design Zip Neck Cotton Blend White, Black T-Shirt
                                                        </h6>
                                                        <h6 className='text-base text-[var(--trackOrder-text)] font-semibold'>
                                                            # EE123456789AU
                                                        </h6>
                                                    </div>

                                                    <h5 className='text-[var(--profile-dark-text)] text-base font-medium'>
                                                        AU$ 120.00
                                                    </h5>

                                                    {/* Price & Delivery */}
                                                    <div className='flex flex-wrap flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 '>
                                                        <div className='flex items-center gap-2 text-lg font-medium'>
                                                            <div className='flex items-center gap-1'>
                                                                <IoStar className='text-[#F59E0B]' />
                                                                <IoStar className='text-[#F59E0B]' />
                                                                <IoStar className='text-[#E5E7EB]' />
                                                                <IoStar className='text-[#E5E7EB]' />
                                                                <IoStar className='text-[#E5E7EB]' />
                                                            </div>
                                                            <p onClick={() => setOpenReview(true)} className='text-[var(--profile-darkgray-text)] text-base font-medium cursor-pointer'>Write review</p>
                                                        </div>
                                                        <p className='text-[var(--profile-light-text)] text-sm sm:text-base font-semibold'>
                                                            Delivered on: 15 June 2025
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* Item : 3 : Cancelled */}
                                            <div className='p-3 bg-[var(--bg-white)] flex flex-wrap items-center gap-3  rounded-md' onClick={() => navigate('/trackOrder')}>
                                                {/* Product Image */}
                                                <div className='lg:w-20 lg:h-20 w-24 h-24 flex-shrink-0'>
                                                    <img
                                                        src={OrdersItem3}
                                                        alt="Product"
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex-1 flex flex-col justify-between min-w-[200px]'>
                                                    {/* Title */}
                                                    <div className='flex lg:flex-row flex-col justify-between flex-warp gap-2'>
                                                        <h6 className='text-base text-[var(--profile-dark-text)] font-semibold line-clamp-2 '>
                                                            Men Self Design Zip Neck Cotton Blend White, Black T-Shirt
                                                        </h6>
                                                        <h6 className='text-base text-[var(--trackOrder-text)] font-semibold'>
                                                            # EE123456789AU
                                                        </h6>
                                                    </div>

                                                    {/* Price & Delivery */}
                                                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mt-2'>
                                                        <h5 className='text-[var(--profile-dark-text)] text-base font-medium'>
                                                            AU$ 120.00
                                                        </h5>
                                                        <p className='text-[var(--text-red)] text-sm sm:text-base font-semibold'>
                                                            Cancelled on: 15 June 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* No Product */}
                                            {/* <div className='flex flex-col justify-center items-center my-20'>
                                                <img src={NoOrders} alt="NoOrdersFound" className='w-40 mb-4' />
                                                <p className="text-[var(--text-black)] text-base font-medium mb-4">Your cart is currently empty.</p>
                                                <button className="bg-[var(--bg-orange)] px-10 py-3 text-[var(--text-white)] text-lg font-semibold rounded-md">Back to Store</button>
                                        </div> */}




                                            {/* ******* Write a Review - Modal ****** */}
                                            <Dialog open={openReview} onClose={setOpenReview} className="relative z-[999]">
                                                {/* Backdrop */}
                                                <DialogBackdrop
                                                    transition
                                                    className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0"
                                                />

                                                {/* Centered modal */}
                                                <div className="fixed inset-0 flex items-center justify-center p-4">
                                                    <DialogPanel
                                                        transition
                                                        className="w-full p-4 max-w-md lg:max-w-lg xl:max-w-xl max-h-[90vh] rounded-xl bg-[var(--profile-bg)] shadow-lg transform transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex flex-col"
                                                    >
                                                        {/* Header */}
                                                        <div className="flex justify-between items-center py-3 shrink-0">
                                                            <DialogTitle className="text-lg font-semibold text-[var(--profile-dark-text,#111)]">
                                                                Review Product
                                                            </DialogTitle>
                                                            <IoMdClose onClick={() => setOpenReview(false)} className="text-[24px] text-[var(--profile-dark-text)] cursor-pointer bg-[var(--profile-gray-text)] p-1 rounded-full" />
                                                        </div>

                                                        <div className="border-b border-[var(--profile-border,#ddd)]"></div>

                                                        {/* Scrollable Body */}
                                                        <div className="flex-1 overflow-y-auto py-5 space-y-4 custom-scrollbar-modal">


                                                            <div className='flex justify-evenly'>
                                                                <div className='flex flex-col items-center md:text-[50px] text-[40px]'>
                                                                    <IoStar className='text-[#F59E0B]' />
                                                                    <span className='mt-1 text-sm text-[var(--profile-darkgray-text)] font-medium'>Terrible</span>
                                                                </div>
                                                                <div className='flex flex-col items-center md:text-[50px] text-[40px]'>
                                                                    <IoStar className='text-[#F59E0B]' />
                                                                    <span className='mt-1 text-sm text-[var(--profile-darkgray-text)] font-medium'>Bad</span>
                                                                </div>
                                                                <div className='flex flex-col items-center md:text-[50px] text-[40px]'>
                                                                    <IoStar className='text-[#F59E0B]' />
                                                                    <span className='mt-1 text-sm text-[var(--profile-darkgray-text)] font-medium'>Okay</span>
                                                                </div>
                                                                <div className='flex flex-col items-center md:text-[50px] text-[40px]'>
                                                                    <IoStar className='text-[#F59E0B]' />
                                                                    <span className='mt-1 text-sm text-[var(--profile-darkgray-text)] font-medium'>Good</span>
                                                                </div>
                                                                <div className='flex flex-col items-center md:text-[50px] text-[40px]'>
                                                                    <IoStar className='text-[#E5E7EB]' />
                                                                    <span className='mt-1 text-sm text-[var(--profile-darkgray-text)] font-medium'>Great</span>
                                                                </div>
                                                            </div>


                                                            <h4 className='text-base text-[var(--profile-light-text)] font-semibold'>What did you love about it?</h4>

                                                            {/* Rating - All */}
                                                            <div className="flex flex-col gap-3">
                                                                {/* Row 1 */}
                                                                <div className="flex items-center justify-between">
                                                                    <h5>Fabric quality</h5>
                                                                    <div className="flex sm:gap-5 gap-2 text-xl sm:text-2xl">
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                    </div>
                                                                </div>

                                                                {/* Row 2 */}
                                                                <div className="flex items-center justify-between">
                                                                    <h5>Fit</h5>
                                                                    <div className="flex sm:gap-5 gap-2 text-xl sm:text-2xl">
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                    </div>
                                                                </div>

                                                                {/* Row 3 */}
                                                                <div className="flex items-center justify-between">
                                                                    <h5>Style</h5>
                                                                    <div className="flex sm:gap-5 gap-2 text-xl sm:text-2xl">
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                    </div>
                                                                </div>

                                                                {/* Row 4 */}
                                                                <div className="flex items-center justify-between">
                                                                    <h5>Comfort</h5>
                                                                    <div className="flex sm:gap-5 gap-2 text-xl sm:text-2xl">
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                    </div>
                                                                </div>

                                                                {/* Row 5 */}
                                                                <div className="flex items-center justify-between">
                                                                    <h5>Value for money</h5>
                                                                    <div className="flex sm:gap-5 gap-2 text-xl sm:text-2xl">
                                                                        <IoStar className="text-[#F59E0B]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                        <IoStar className="text-[#E5E7EB]" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <h4 className='text-base text-[var(--profile-light-text)] font-semibold'>Upload Photo & Video</h4>

                                                            {/* Images - Upload */}
                                                            <div className="flex flex-wrap gap-3 bg-[var(--bg-white)] border border-[var(--profile-gray-text)] p-1 rounded-md w-full">
                                                                {/* Uploaded Images */}
                                                                {reviewImages.map((img) => (
                                                                    <div key={img.id} className="relative w-fit">
                                                                        <img
                                                                            src={img.id}
                                                                            alt="Preview"
                                                                            className="h-24 w-24 object-cover rounded-md"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleRemove(img.id)}
                                                                            className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
                                                                        >
                                                                            <IoClose size={18} />
                                                                        </button>
                                                                    </div>
                                                                ))}

                                                                {/* Upload Box (only if No images) */}
                                                                {reviewImages.length === 0 && (
                                                                    <div
                                                                        onClick={() => document.getElementById("fileInput").click()}
                                                                        className="bg-[var(--bg-white)] rounded-md w-full flex flex-col items-center justify-center p-2 cursor-pointer text-[var(--profile-darkgray-text)]"
                                                                    >
                                                                        <input
                                                                            id="fileInput"
                                                                            type="file"
                                                                            accept="image/*"
                                                                            multiple
                                                                            className="hidden"
                                                                            onChange={handleUpload}
                                                                        />
                                                                        <IoMdCloudUpload size={50} />
                                                                        <p className="text-sm font-medium">
                                                                            The top 5% of our best reviewers usually add a photo/video
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Write a Review */}
                                                            <h4 className='text-base text-[var(--profile-light-text)] font-semibold'>Write a Review</h4>

                                                            <textarea name="" id="" placeholder='Enter your review' className='resize-none focus:outline-none w-full bg-[var(--bg-white)] rounded-md p-2 border border-[var(--profile-gray-text)] placeholder:text-[var(--profile-darkgray-text)] text-base h-24'></textarea>


                                                        </div>




                                                        {/* Footer */}
                                                        <div className="flex flex-row w-full gap-3 pt-5 shrink-0 border-t border-[var(--profile-border)]">


                                                            <button onClick={() => setOpenReview(false)} className='py-2 rounded-md sm:text-lg text-base font-semibold w-full text-[var(--profile-gray-text)] border border-[var(--profile-gray-text)]'> Maybe later </button>
                                                            <button className='bg-[var(--bg-orange)] text-[var(--text-white)] py-2 rounded-md sm:text-lg text-base font-semibold w-full'>Submit</button>

                                                        </div>

                                                    </DialogPanel>
                                                </div>
                                            </Dialog>



                                        </div>

                                    )}

                                </div>
                            )}

                        </div>
                    </div>


                </div>
            </section>


        </>
    )
}
