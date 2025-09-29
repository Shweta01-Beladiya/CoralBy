import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import OrdersItem2 from '../images/OrdersItem2.png'
import { IoStar } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    TransitionChild,
} from "@headlessui/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Check } from 'lucide-react';




export default function TrackOrder() {

    const [openCancel, setOpenCancel] = useState(false)
    const [cancelReason, setCancelReason] = useState("");
    const [reasonDropdownOpen, setReasonDropdownOpen] = useState(false);
    const [reviewImages, setReviewImages] = useState([]);
    const [openReview, setOpenReview] = useState(false)


    const ReasonData = ["I was hoping for a shorter delivery time.", "I'm worried about the ratings/reviews.", "I want to change the payment option.", "I want to change the contact details.", "Price of the product has now decreased.", "I want to change the size/color/type."];


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




    // ********** Stepper - Order Confirmed Only *********
    // const steps = [
    //     {
    //         id: 1,
    //         title: "Order Confirmed",
    //         date: "Tue, 9th Sep '25",
    //         description: "",
    //         time: "",
    //         status: "completed",
    //         isMainPoint: true
    //     },
    //     {
    //         id: 2,
    //         title: "Shipped Expected",
    //         date: "By Thu 11th Sep",
    //         description: "",
    //         time: "",
    //         status: "pending",
    //         isMainPoint: true
    //     },
    //     {
    //         id: 3,
    //         title: "Out For Delivery",
    //         date: "",
    //         description: "",
    //         time: "",
    //         status: "pending",
    //         isMainPoint: true
    //     },
    //     {
    //         id: 4,
    //         title: "Delivery Expected By Sun 14th Sep",
    //         date: "",
    //         description: "",
    //         time: "",
    //         status: "pending",
    //         isMainPoint: true
    //     }
    // ]

    // ******** Stepper - Order Confirmed and Cancelled (Not Proceed) ********
    // const steps = [
    //      {
    //         id: 1,
    //         title: "Order Confirmed",
    //         date: "Tue, 9th Sep '25",
    //         description: "",
    //         time: "",
    //         status: "completed",
    //         isMainPoint: true
    //     },
    //     {
    //         id: 2,
    //         title: "Cancelled",
    //         date: "Tue, 9th Sep '25",
    //         description: "",
    //         time: "",
    //         status: "cancel",
    //         isMainPoint: true
    //     }
    // ]

    // ******** Stepper - Order Confirmed and started Proceed ***********
    const steps = [
        {
            id: 1,
            title: "Order Confirmed",
            date: "Tue, 9th Sep '25",
            description: "",
            time: "",
            status: "completed",
            isMainPoint: true
        },
        {
            id: 2,
            title: "Your Order has been placed.",
            date: "",
            description: "",
            time: "Tue, 9th Sep '25-4:17pm",
            status: "completed",
            isMainPoint: false
        },
        {
            id: 3,
            title: "Seller is processing your order.",
            date: "",
            description: "",
            time: "",
            status: "completed",
            isMainPoint: false
        },
        {
            id: 4,
            title: "Item waiting to be picked up by delivery partner.",
            date: "",
            description: "",
            time: "Wed, 10th Sep 25-6:00pm",
            status: "completed",
            isMainPoint: false
        },
        {
            id: 5,
            title: "Shipped Expected",
            date: "By Thu 11th Sep",
            description: "",
            time: "",
            status: "pending",
            isMainPoint: true
        },
        {
            id: 6,
            title: "Out For Delivery",
            date: "",
            description: "",
            time: "",
            status: "pending",
            isMainPoint: true
        },
        {
            id: 7,
            title: "Delivery Expected By Sun 14th Sep",
            date: "",
            description: "",
            time: "",
            status: "pending",
            isMainPoint: true
        }
    ]

    // ******** Stepper - Order Confirmed , Started proceed and canceled  **********
    // const steps = [
    //      {
    //         id: 1,
    //         title: "Order Confirmed",
    //         date: "Tue, 9th Sep '25",
    //         description: "",
    //         time: "",
    //         status: "completed",
    //         isMainPoint: true
    //     },
    //     {
    //         id: 2,
    //         title: "Your Order has been placed.",
    //         date: "",
    //         description: "",
    //         time: "Tue, 9th Sep '25-4:17pm",
    //         status: "completed",
    //         isMainPoint: false
    //     },
    //     {
    //         id: 3,
    //         title: "Seller is processing your order.",
    //         date: "",
    //         description: "",
    //         time: "",
    //         status: "completed",
    //         isMainPoint: false
    //     },
    //     {
    //         id: 4,
    //         title: "Item waiting to be picked up by delivery partner.",
    //         date: "",
    //         description: "",
    //         time: "Wed, 10th Sep 25-6:00pm",
    //         status: "completed",
    //         isMainPoint: false
    //     },
    //     {
    //         id: 5,
    //         title: "Cancelled",
    //         date: "Tue, 9th Sep '25",
    //         description: "Your order was cancelled as per your request.",
    //         time: "Tue, 9th Sep '25 - 4:22pm",
    //         status: "cancel",
    //         isMainPoint: true
    //     }
    // ]


    // ******** Stepper - Order Delivered *******
    // const steps = [
    //         {
    //             id: 1,
    //             title: "Order Confirmed",
    //             date: "Tue, 9th Sep '25",
    //             description: "",
    //             time: "",
    //             status: "completed",
    //             isMainPoint: true
    //         },
    //         {
    //             id: 2,
    //             title: "Shipped Expected",
    //             date: "By Thu 11th Sep",
    //             description: "",
    //             time: "",
    //             status: "completed",
    //             isMainPoint: true
    //         },
    //         {
    //             id: 3,
    //             title: "Out For Delivery",
    //             date: "",
    //             description: "",
    //             time: "",
    //             status: "completed",
    //             isMainPoint: true
    //         },
    //         {
    //             id: 4,
    //             title: "Delivery Expected By Sun 14th Sep",
    //             date: "",
    //             description: "",
    //             time: "",
    //             status: "completed",
    //             isMainPoint: true
    //         }
    //     ]


    // Find last completed step index
    const lastCompletedIndex = steps.findLastIndex(step => step.status === 'completed');




    return (
        <>

            {/* Heading */}
            <section className='bg-[var(--profile-bg)] py-7'>
                <div className='main_container'>
                    <h3 className=' text-2xl md:text-4xl text-[var(--profile-dark-text)] font-semibold'>Profile</h3>
                    <div className="flex flex-wrap gap-1  items-center text-[var(--profile-gray-text)] font-medium text-sm md:text-base mt-3">
                        <Link to="/" className="flex items-center">
                            Home <FaChevronRight className="mx-1" size={12} />
                        </Link>
                        <Link to="/profile/PersonalInformation" className="flex items-center">
                            Profile <FaChevronRight className="mx-1" size={12} />
                        </Link>
                        <Link to="/profile/Orders" className="flex items-center">Orders <FaChevronRight className="mx-1" size={12} /> </Link>
                        <span className="text-[var(--profile-light-text)]">Men Self Design Zip...</span>    
                    </div>
                </div>
            </section>


            <section className='main_container'>
                <div className='my-8'>
                    <div className="grid md:grid-cols-10 grid-cols-1 w-full gap-5">

                        <div className="lg:col-span-7 md:col-span-6 w-full bg-[var(--profile-bg)]  p-3 space-y-4">

                            {/* Product */}
                            <div className='p-3 bg-[var(--bg-white)] flex flex-wrap items-center  gap-3  rounded-md'>
                                {/* Product Image */}
                                <div className='lg:w-20 lg:h-20 w-24 h-24 sm:justify-start  flex-shrink-0'>
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
                                    <div className='flex flex-col sm:flex-wrap sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-1 mt-2'>
                                        <h5 className='text-[var(--profile-dark-text)] text-base font-medium'>
                                            AU$ 120.00
                                        </h5>
                                        <p className='text-[var(--profile-light-text)] text-sm sm:text-base font-semibold'>
                                            Delivered by: 15 June 2025
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Stepper */}
                            <div className="py-5">
                                <div className=" bg-[var(--bg-white)] rounded-md sm:px-5 px-3 pt-5">
                                    <div className="relative">
                                        {steps.map((step, index) => {
                                            const isLast = index === steps.length - 1;
                                            const isCompleted = step.status === "completed";
                                            const isCancelled = step.status === "cancel";

                                            // Find last active (completed or cancelled) index
                                            const lastActiveIndex = steps
                                                .map((s, i) =>
                                                    s.status === "completed" || s.status === "cancel" ? i : -1
                                                )
                                                .filter(i => i !== -1)
                                                .pop(); // last index with completed/cancel

                                            // Line is green if before or equal to last active step
                                            const showGreenLine = lastActiveIndex !== undefined && index < lastActiveIndex;

                                            return (
                                                <div key={step.id} className="relative flex items-start">
                                                    {/* Vertical Line */}
                                                    {!isLast && (
                                                        <div className="absolute left-3 top-0 bottom-0 flex justify-center">
                                                            <div
                                                                className={`w-0.5 h-full ${showGreenLine ? "bg-green-500" : "bg-gray-200"
                                                                    }`}
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Status Indicator */}
                                                    <div className="relative flex-shrink-0 mr-4 z-10 flex items-center justify-center">
                                                        <div
                                                            className={`${step.isMainPoint ? "w-6 h-6" : "w-4 h-4 ml-1"
                                                                } rounded-full flex items-center justify-center ${isCancelled
                                                                    ? "bg-red-500"
                                                                    : isCompleted
                                                                        ? "bg-green-500"
                                                                        : "bg-gray-300"
                                                                }`}
                                                        />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0 pb-5">
                                                        {step.title && (
                                                            <div className="flex flex-wrap items-center gap-1">
                                                                <h3
                                                                    className={`font-semibold text-[var(--profile-dark-text)] ${step.isMainPoint ? "text-base" : "text-sm ps-1 -mt-[2px]"
                                                                        }`}
                                                                >
                                                                    {step.title}
                                                                </h3>
                                                                {step.date && (
                                                                    <span
                                                                        className={`text-[var(--profile-light-text)] ${step.isMainPoint ? "text-sm" : "text-sm ps-1"
                                                                            }`}
                                                                    >
                                                                        {step.date}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {step.description && (
                                                            <p
                                                                className={`text-[var(--profile-dark-text)] font-medium ${step.isMainPoint ? "text-sm" : "text-sm"
                                                                    } ${!step.isMainPoint ? "ps-1" : ""}`}
                                                            >
                                                                {step.description}
                                                            </p>
                                                        )}

                                                        {step.time && (
                                                            <p
                                                                className={`text-[var(--profile-darkgray-text)] text-sm ${!step.isMainPoint ? "ps-1" : ""
                                                                    }`}
                                                            >
                                                                {step.time}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>





                            <h4 className='sm:text-lg text-base text-[var(--profile-light-text)] font-semibold'>Delivery Address</h4>

                            <div className='grid grid-cols-1 sm:grid-cols-5 gap-4'>
                                <div className='sm:col-span-2 w-full bg-[var(--bg-white)] p-2 rounded-md'>
                                    <h6 className='text-sm text-[var(--profile-dark-text)] font-medium'>Liam Mitchell</h6>
                                    <p className='text-base text-[var(--profile-darkgray-text)] font-medium'>+61 589 589 589</p>
                                </div>
                                <div className='sm:col-span-3 w-full bg-[var(--bg-white)] p-2 rounded-md'>
                                    <h6 className='text-sm text-[var(--profile-dark-text)] font-medium '>Home</h6>
                                    <p className='text-base text-[var(--profile-darkgray-text)] font-medium'>88 George Street, Melbourne, VIC 3000, Australia</p>
                                </div>

                            </div>




                            {/* ************ Order Delivered - Edit Review *************** */}
                            {/* <div className='flex justify-between'>
                            <h4 className='sm:text-lg text-base text-[var(--profile-light-text)] font-semibold'>Product Rating</h4>
                            <button onClick={ () => setOpenReview(true) } className='text-[var(--profile-gray-text)] text-base'>Edit Review</button>
                        </div>
                        <div className='bg-[var(--bg-white)] px-3 py-5 rounded-md flex justify-between items-center flex-wrap'>
                            <h3 className='sm:text-large text-base text-[var(--profile-light-text)] font-bold'>Good</h3>
                            <div className='flex gap-1 text-xl'>
                                <IoStar className='text-[#F59E0B]' />
                                <IoStar className='text-[#F59E0B]' />
                                <IoStar className='text-[#F59E0B]' />
                                <IoStar className='text-[#F59E0B]' />
                                <IoStar className='text-[#E5E7EB]' />
                            </div>
                        </div> */}


                            {/* ******* Edit a Review - Modal ****** */}
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
                            {/* ************************************************************ */}



                            <div className='border-t border-[#E5E7EB] mt-10 '>

                                <p className='py-4 text-base font-medium text-[var(--profile-darkgray-text)]'>Delivery Executive details will be available once the order is out for delivery.</p>


                                {/* Order On the Way - Invoice and Cancel Order Buttons */}
                                <div className='flex'>
                                    <button className='p-2 bg-[var(--bg-orange)] rounded-md text-[var(--text-white)] sm:text-lg text-base font-semibold w-full'>Invoice</button>
                                    <button onClick={() => setOpenCancel(true)} className='p-2 w-full text-[var(--profile-darkgray-text)] font-semibold text-base sm:text-lg '>Cancel Order</button>
                                </div>

                            </div>

                            {/* ******* Cancel Order - Modal ****** */}
                            <Dialog open={openCancel} onClose={setOpenCancel} className="relative z-[999]">
                                {/* Backdrop */}
                                <DialogBackdrop
                                    transition
                                    className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0"
                                />

                                {/* Centered modal */}
                                <div className="fixed inset-0 flex items-center justify-center p-4">
                                    <DialogPanel
                                        transition
                                        className="w-full p-4 max-w-md lg:max-w-lg xl:max-w-xl  rounded-xl bg-[var(--profile-bg)] shadow-lg transform transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex flex-col"
                                    >
                                        {/* Header */}
                                        <div className="flex justify-between items-center py-3 shrink-0">
                                            <DialogTitle className="text-lg font-semibold text-[var(--profile-dark-text,#111)]">
                                                Easy Cancelation
                                            </DialogTitle>
                                            <IoMdClose onClick={() => setOpenCancel(false)} className="text-[24px] text-[var(--profile-dark-text)] cursor-pointer bg-[#44506A33] p-1 rounded-full" />
                                        </div>

                                        <div className="border-b border-[var(--profile-border,#ddd)]"></div>

                                        {/* Scrollable Body */}
                                        <div className="py-5 space-y-4 ">


                                            <div className="flex flex-col relative">
                                                <label className="text-[var(--profile-light-text)] text-base font-semibold mb-1">
                                                    Reason For Cancelation <span className="text-[var(--text-orange)]">*</span>
                                                </label>

                                                <div
                                                    className="w-full border border-[#44506A33] rounded-md px-3 py-2 flex items-center justify-between cursor-pointer bg-[var(--bg-white)] text-base"
                                                    onClick={() => setReasonDropdownOpen(!reasonDropdownOpen)}
                                                >
                                                    <span
                                                        className={
                                                            cancelReason
                                                                ? "text-[var(--canvas-dark-text)]"
                                                                : "text-[var(--canvas-light-text)]"
                                                        }
                                                    >
                                                        {cancelReason || "Select Reason"}
                                                    </span>
                                                    <MdOutlineKeyboardArrowDown
                                                        className={`transition-transform ${reasonDropdownOpen ? "rotate-180" : "rotate-0"
                                                            }`}
                                                    />
                                                </div>

                                                {reasonDropdownOpen && (
                                                    <ul className="absolute top-full mt-1 w-full bg-[var(--profile-bg)] border border-[#44506A33] rounded-md shadow-md max-h-64 overflow-y-auto z-50 text-base">
                                                        {ReasonData.map((reason, id) => (
                                                            <li
                                                                key={id}
                                                                className={`px-3 py-2 cursor-pointer hover:bg-[#E5E7EB] text-[var(--profile-light-text)] ${cancelReason === reason
                                                                    ? "font-semibold bg-[#E5E7EB] text-[#111827]"
                                                                    : ""
                                                                    }`}
                                                                onClick={() => {
                                                                    setCancelReason(reason);
                                                                    setReasonDropdownOpen(false);
                                                                }}
                                                            >
                                                                {reason}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            <div className='flex flex-col'>
                                                <label className="text-[var(--profile-light-text)] text-base font-semibold mb-1">
                                                    Comments <span className="text-[var(--text-orange)]">*</span>
                                                </label>

                                                <textarea name="" id="" placeholder='Enter your comments' className='p-2 resize-none h-32 focus:outline-none  border border-[#44506A33] rounded-md text-base placeholder:text-[var(--profile-darkgray-text)]'></textarea>
                                            </div>


                                        </div>


                                        {/* Footer */}
                                        <div className="flex w-full gap-3">

                                            <button className='p-2 w-full bg-[var(--bg-orange)] sm:text-large text-base font-semibold text-[var(--text-white)] rounded-md'>Submit</button>
                                            <button onClick={() => setOpenCancel(false)} className='w-full p-2 border border-[var(--profile-darkgray-text)] rounded-md text-[var(--profile-darkgray-text)] font-semibold'>Cancel</button>
                                        </div>

                                    </DialogPanel>
                                </div>
                            </Dialog>


                        </div>

                        <div className="lg:col-span-3 md:col-span-4 w-full">

                            {/* Order Summary */}
                            <div className='bg-[var(--bg-white)] pb-3'>
                                <h4 className='text-lg font-semibold text-[var(--profile-dark-text)]'>Order Summary</h4>
                            </div>

                            <div className='rounded-md bg-[var(--profile-bg)] px-3 py-5'>

                                <div className='flex justify-between border-b border-[#E5E7EB] text-base text-[var(--profile-dark-text)] font-normal py-3'>
                                    <h3>3 Item</h3>
                                    <h3>AU$ 6,600</h3>
                                </div>

                                <div className='flex justify-between border-b border-[#E5E7EB] text-base text-[var(--profile-dark-text)] font-semibold py-3'>
                                    <h3>Subtotal</h3>
                                    <h3>AU$ 6,600</h3>
                                </div>

                                <div className='flex justify-between border-b border-[#E5E7EB] text-base text-[var(--profile-dark-text)] font-normal py-3'>
                                    <h3>Estimated Delivery</h3>
                                    <h3>AU$ 100</h3>
                                </div>

                                <div className='flex justify-between border-b border-[#E5E7EB] text-base text-[var(--profile-dark-text)] font-normal py-3'>
                                    <h3>Discount</h3>
                                    <h3 className='text-[var(--text-red)]'>- AU$ 560</h3>
                                </div>

                                <div className='flex justify-between border-b border-[#E5E7EB] text-base text-[var(--profile-dark-text)] font-normal py-3'>
                                    <h3>Platform Fee</h3>
                                    <h3>AU$ 13</h3>
                                </div>

                                <div className='flex justify-between text-base text-[var(--profile-dark-text)] font-semibold py-3'>
                                    <h3>Total</h3>
                                    <h3>AU$ 6,152</h3>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>




        </>
    )
}
