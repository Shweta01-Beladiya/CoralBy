import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { createCareerJob, applyCareerJob } from '../Store/Slices/careerjobSlice';
import { careerJobSchema } from '../schemas';
import { useFormik } from 'formik';

// images
import JoinOurGrowingTeam from '../images/group-people-working-out-business-plan-office 1.png'
import colleaguesdetails from '../images/colleagues-working-project-discussing-details 1.png'
import seriousman1 from '../images/serious-man-isolated-orange-background-confident-person-looking-camera 1.png'
import seriousman2 from '../images/serious-man-isolated-orange-background-confident-person-looking-camera 1 (1).png'
// import seriousman3 from '../images/serious-man-isolated-orange-background-confident-person-looking-camera 1 (2).png'
import seriousman3 from '../images/Team_Mem3.jpg'
import CompetitiveSalary from '../images/All Icons.png'
import PaidTimeoff from '../images/All Icons (1).png'
import CareerPrograms from '../images/All Icons (2).png'
import HealthInsurance from '../images/All Icons (3).png'
import FlexibleWorkEnvironment from '../images/All Icons (4).png'
import PerformanceBonuses from '../images/All Icons (5).png'

// icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaCloudArrowUp } from "react-icons/fa6";

// modal
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";


export default function CareerPage() {


    // *************** 4. Meet Our Team Section ***************

    // Team Members Data
    const teamMembers = [
        {
            name: "Priya Sharma",
            role: "CEO",
            img: seriousman1,
            text: "Working at CoralBay has given me endless growth opportunities and a supportive team environment. Every day brings new challenges and learning.",
        },
        {
            name: "James Wilson",
            role: "Co-Founder",
            img: seriousman2,
            text: "Flexible work hours and a great work–life balance make CoralBay a fantastic place to work. The team collaboration is exceptional.",
        },
        {
            name: "Sarah Thompson",
            role: "Manager",
            img: seriousman3,
            text: "I love the innovative culture here. The management listens and genuinely supports professional development. Proud to be part of this team!",
        },
        {
            name: "Priya Sharma",
            role: "CEO",
            img: seriousman1,
            text: "Working at CoralBay has given me endless growth opportunities and a supportive team environment. Every day brings new challenges and learning.",
        },
        {
            name: "James Wilson",
            role: "Co-Founder",
            img: seriousman2,
            text: "Flexible work hours and a great work–life balance make CoralBay a fantastic place to work. The team collaboration is exceptional.",
        },
        {
            name: "Sarah Thompson",
            role: "Manager",
            img: seriousman3,
            text: "I love the innovative culture here. The management listens and genuinely supports professional development. Proud to be part of this team!",
        },
        {
            name: "Sarah Thompson",
            role: "Manager",
            img: seriousman3,
            text: "I love the innovative culture here. The management listens and genuinely supports professional development. Proud to be part of this team!",
        },
    ];

    //  Carousel State and Refs
    const [startIndex, setStartIndex] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(3);
    const gridRef = useRef(null);

    // Responsive cards per page
    useEffect(() => {
        const updateCardsPerPage = () => {
            if (window.innerWidth < 640) setCardsPerPage(1); // mobile
            else if (window.innerWidth < 1024) setCardsPerPage(2); // tablet
            else setCardsPerPage(3); // desktop
        };
        updateCardsPerPage();
        window.addEventListener("resize", updateCardsPerPage);
        return () => window.removeEventListener("resize", updateCardsPerPage);
    }, []);

    // Carousel Navigation Handlers
    const handleNext = () => {
        setStartIndex((prev) =>
            prev + cardsPerPage >= teamMembers.length ? 0 : prev + 1
        );
        gridRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    // Previous button handler
    const handlePrev = () => {
        setStartIndex((prev) =>
            prev === 0 ? teamMembers.length - cardsPerPage : prev - 1
        );
        gridRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    // Visible cards based on current index and cards per page
    const visibleCards = teamMembers.slice(
        startIndex,
        startIndex + cardsPerPage
    );


    // *************** 6. Current Job Openings Section ***************

    // Job listings data
    // const jobs = [
    //     {
    //         title: "Product Manager",
    //         description: "Manage product listings, optimize descriptions, ensure accurate stock availability.",
    //     },
    //     {
    //         title: "Customer Support Executive",
    //         description: "Provide high-quality support to customers via email, chat, and phone.",
    //     },
    //     {
    //         title: "Web Developer",
    //         description: "Develop and maintain website features, optimize performance, and implement functionality.",
    //     },
    //     {
    //         title: "Digital Marketing Specialist",
    //         description: "Plan and execute online marketing campaigns, analyze data for growth.",
    //     },
    //     {
    //         title: "Warehouse Operations Manager",
    //         description: "Oversee inventory management, and warehouse staff to ensure smooth logistics.",
    //     },
    //     {
    //         title: "Supply Chain Coordinator",
    //         description: "Coordinate with suppliers and ensure efficient supply chain operations.",
    //     },
    //     {
    //         title: "Finance & Accounts Executive",
    //         description: "Handle billing, payments and assist in preparing financial reports and budgets.",
    //     },
    //     {
    //         title: "Social Media Manager",
    //         description: "Manage social media accounts, create engaging posts and run paid social campaigns.",
    //     },
    // ];

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.careerJob);
    // console.log("Career Job Data:", data);


    useEffect(() => {
        dispatch(createCareerJob());
    }, [dispatch]);


    // Job Openings Modal State
    const [openJob, setOpenJob] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        currentCompany: "",
        currentCTC: "",
        expectedCTC: "",
        resume: null,
    };

    const formik = useFormik({
        initialValues,
        validationSchema: careerJobSchema,
        onSubmit: async (values, { resetForm, setFieldError }) => {
            // Check if user is logged in
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to apply for this job.");
                setOpenJob(false);
                return;
            }

            // Check if resume is uploaded
            if (!file) {
                setFieldError("resume", "Resume is required");
                return;
            }

            setIsSubmitting(true);

            try {
                // Create FormData for file upload
                const formData = new FormData();
                formData.append("firstName", values.firstName);
                formData.append("lastName", values.lastName);
                formData.append("email", values.email);
                formData.append("mobileNo", values.mobileNo);
                formData.append("currentCompany", values.currentCompany);
                formData.append("currentCTC", values.currentCTC);
                formData.append("expectedCTC", values.expectedCTC);
                formData.append("resume", file);

                const result = await dispatch(applyCareerJob({
                    jobId: selectedJobId,
                    applicationData: formData
                }));

                if (applyCareerJob.fulfilled.match(result)) {
                    alert("Job application submitted successfully!");
                    setFile(null);
                    resetForm();
                    setOpenJob(false);
                    setSelectedJobId(null);
                } else if (applyCareerJob.rejected.match(result)) {
                    const errorMessage = result.payload?.message || "Failed to submit application. Please try again.";
                    console.error("Application failed:", result.payload);
                    alert(errorMessage);
                } else {
                    alert("Failed to submit application. Please try again.");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;


    // *************** Resume Upload Section ***************

    // Resume upload state
    const [file, setFile] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // only one file

        if (selectedFile) {
            // Allow only PDF files (backend requirement)
            const isValidType = selectedFile.type === "application/pdf";

            // Max size 2MB (backend requirement)
            const isValidSize = selectedFile.size <= 2 * 1024 * 1024;

            if (isValidType && isValidSize) {
                setFile(selectedFile);
                // Update formik values to clear validation error
                formik.setFieldValue("resume", selectedFile);
            } else {
                alert("Only PDF files under 2MB are allowed.");
                e.target.value = ""; // reset input
                setFile(null);
                formik.setFieldValue("resume", null);
            }
        }
    };




    return (
        <>
            {/* Main Container */}

            <div className=''>




                {/* 1.  Heading */}
                <section className='bg-[var(--profile-bg)] py-7'>

                    {/* Main Container */}
                    <div className='main_container'>
                        <h3 className=' text-2xl md:text-4xl text-[var(--profile-dark-text)] font-semibold '>Career</h3>
                        <div className="flex items-center text-[var(--profile-gray-text)] font-medium text-sm md:text-base mt-3">
                            <Link to="/" className="flex items-center">
                                Home <FaChevronRight className="mx-1" size={12} />
                            </Link>
                            <span className="text-[var(--profile-light-text)]">
                                Career
                            </span>
                        </div>
                    </div>
                </section>

                {/* 2. Join Our Growing Team Section */}
                <section className='bg-[#FFFFFF] my-14'>

                    {/* Main Container */}
                    <div className="main_container relative">

                        {/* Join Our Growing Team */}
                        <div className="mt-2 md:mt-5 xl:mt-7 w-full md:h-[370px] lg:h-96">
                            <div className='text-[#111827] text-2xl sm:text-3xl md:text-[42px]  font-bold flex flex-col gap-0 sm:gap-2 '>
                                <h1>Join Our Growing Team</h1>
                                <div className='flex gap-2'>
                                    <p><span className='text-[#F97316]'>Shape the Future</span> of Online Shopping!</p>
                                </div>
                            </div>
                            <div className='text-[#6B7280] text-base sm:text-lg md:text-lg lg:text-xl mt-3'>
                                <p>Empowering people with innovative solutions while delivering <br className='md:block hidden' /> exceptional products to Australians. </p>
                            </div>
                        </div>

                        {/* Image + Stats Section */}
                        <div className="mt-10 w-[100%] md:w-[91%] lg:w-[93%] xl:w-[96%] h-auto flex flex-col lg:flex-row gap-10 items-stretch md:absolute md:top-[42%] lg:top-[40%] xl:top-[45%]">

                            {/* Left image */}
                            <div className="lg:w-2/3 w-full">
                                <img src={JoinOurGrowingTeam} alt="Our Team"
                                    className="w-full h-[350px] md:h-[350px] lg:h-[450px] object-cover rounded-xl" />
                            </div>

                            {/* Right stats card */}
                            <div className="lg:w-1/3 w-full bg-white rounded-xl shadow-md p-8 flex flex-col justify-center">
                                <div className="space-y-8">
                                    <div>
                                        <h1 className="text-[#111827] text-2xl md:text-3xl font-bold">50,000+</h1>
                                        <p className="text-[#6B7280] text-base md:text-lg font-medium">
                                            Large E-Commerce Platform
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className="text-[#111827] text-2xl md:text-3xl font-bold">9000+</h1>
                                        <p className="text-[#6B7280] text-base md:text-lg font-medium">
                                            Products Sold Monthly
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className="text-[#111827] text-2xl md:text-3xl font-bold">200+</h1>
                                        <p className="text-[#6B7280] text-base md:text-lg font-medium">
                                            Happy Employees
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gray layer */}
                    <div className='bg-[#E5E7EB] w-full md:h-[590px] lg:h-[310px] xl:h-[350px]'></div>
                </section>

                {/* 3. Why Work With Us Section */}
                <section className='bg-[#FFFFFF]'>

                    {/* Main Container */}
                    <div className="main_container">

                        {/* main */}
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
                            {/* Left Side (Content) */}
                            <div className="w-full lg:w-2/4 xl:w-[62%] bg-[#F9FAFB] p-4 md:p-8 rounded-xl">
                                {/* title */}
                                <h1 className="text-2xl md:text-3xl lg:text-[42px] font-bold text-[#111827]">
                                    Why Work With Us
                                </h1>
                                <p className="text-lg lg:text-[20px] text-[#44506A] font-semibold mt-2">
                                    Delivering Australia’s best online shopping with innovation and care.
                                </p>

                                {/* list */}
                                <div className="mt-8 space-y-3">
                                    {[
                                        "Innovation-driven culture",
                                        "Career growth opportunities",
                                        "Inclusive & supportive environment",
                                        "Flexible working hours",
                                        "Work remotely or in-office",
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <FaChevronRight className="text-[#F97316] text-lg mt-1 flex-shrink-0" />
                                            <p className="text-[#6B7280] text-base md:text-lg">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side (Image) */}
                            <div className="w-full lg:w-2/4 xl:w-[38%]">
                                <div className="h-full rounded-xl overflow-hidden">
                                    <img
                                        src={colleaguesdetails}
                                        alt="Our Promise"
                                        className="w-full h-full object-contain rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 4. Meet Our Team Section */}
                <section className="bg-[var(--profile-bg)] my-14">

                    {/* Main Container */}
                    <div className="main_container mx-auto px-4">
                        {/* Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 py-14">

                            {/* Left Side */}
                            <div className="lg:col-span-4 flex flex-col justify-between h-full">
                                {/* Title */}
                                <div>
                                    <h1 className="text-3xl lg:text-[42px] font-bold text-[#111827]">
                                        Meet Our Team
                                    </h1>
                                    <p className="text-lg md:text-[20px] text-[#44506A] font-medium mt-3">
                                        Meet the talented professionals driving our success. We are passionate,
                                        innovative, and committed to delivering the best e-commerce experience.
                                    </p>
                                </div>

                                {/* Contact Button */}
                                <div>
                                    <button className="px-8 lg:px-12 py-2 rounded-lg bg-[#F97316] text-base text-white mt-6">
                                        Contact us
                                    </button>
                                </div>

                                {/* Navigation Arrows */}
                                <div className="flex items-center gap-2 mt-6 lg:mt-auto">
                                    <button
                                        onClick={handlePrev}
                                        className="rounded-full text-sm bg-white border p-2 sm:p-3 hover:bg-gray-100 transition"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="rounded-full text-sm bg-white border p-2 sm:p-3 hover:bg-gray-100 transition"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="lg:col-span-8">
                                <div className="relative">
                                    {/* Scrollable Container */}
                                    <div
                                        ref={gridRef}
                                        className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth no-scrollbar"
                                    >
                                        {visibleCards.map((member, index) => (
                                            <div
                                                key={index}
                                                className="
                                                    flex-shrink-0 
                                                    w-full     
                                                    sm:w-[calc(49%-0.75rem)] 
                                                    lg:w-[calc(40%-1rem)]    
                                                    bg-white rounded-xl p-2 flex flex-col items-start
                                                    "
                                            >

                                                <img
                                                    src={member.img}
                                                    alt={member.name}
                                                    className="w-full md:h-44 h-56 sm:h-56 object-cover rounded-lg"
                                                />

                                                {/* Name + Role */}
                                                <h3 className="text-[#F97316] font-semibold text-base mt-3">
                                                    {member.name}{" "}
                                                    <span className="text-[#6B7280] font-medium">| {member.role}</span>
                                                </h3>

                                                {/* Description */}
                                                <p className="text-[#6B7280] font-normal mt-1.5 text-base leading-relaxed">
                                                    {member.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 5. Benefits & Perks Section */}
                <section className='bg-[#FFFFFF] '>

                    {/* Main Container */}
                    <div className='main_container'>

                        {/* Title */}
                        <div className="flex items-center justify-between mb-8">
                            {/* Title */}
                            <h1 className="text-2xl lg:text-[42px] font-bold text-[#0A0E17]">
                                Benefits & Perks Section
                            </h1>
                        </div>

                        {/* Benefits & Perks Card */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 sm:gap-5 gap-3">
                            <div className="bg-[#F9FAFB] text-[#44506A] md:text-lg text-base font-bold text-center rounded-xl flex flex-col items-center justify-center py-6 px-5">
                                <img src={CompetitiveSalary} alt="" className="sm:w-20 sm:h-20  w-[70px] h-[70px] object-contain mx-auto mb-3" />
                                <p>Competitive</p>
                                <p>Salary</p>
                            </div>

                            <div className="bg-[#F9FAFB] text-[#44506A] md:text-lg text-base font-bold text-center rounded-xl flex flex-col items-center justify-center py-6 px-5">
                                <img src={PaidTimeoff} alt="" className="sm:w-20 sm:h-20  w-[70px] h-[70px] object-contain mx-auto mb-3" />
                                <p>PaidTime</p>
                                <p>Off</p>
                            </div>

                            <div className="bg-[#F9FAFB] text-[#44506A] md:text-lg text-base font-bold text-center rounded-xl flex flex-col items-center justify-center py-6 px-5">
                                <img src={CareerPrograms} alt="" className="sm:w-20 sm:h-20  w-[70px] h-[70px] object-contain mx-auto mb-3" />
                                <p>Career</p>
                                <p>Programs</p>
                            </div>

                            <div className="bg-[#F9FAFB] text-[#44506A] md:text-lg text-base font-bold text-center rounded-xl flex flex-col items-center justify-center py-6 px-5">
                                <img src={HealthInsurance} alt="" className="sm:w-20 sm:h-20  w-[70px] h-[70px] object-contain mx-auto mb-3" />
                                <p>Health</p>
                                <p>Insurance</p>
                            </div>

                            <div className="bg-[#F9FAFB] text-[#44506A] md:text-lg text-base font-bold text-center rounded-xl flex flex-col items-center justify-center py-6 px-5">
                                <img src={FlexibleWorkEnvironment} alt="" className="sm:w-20 sm:h-20  w-[70px] h-[70px] object-contain mx-auto mb-3" />
                                <p>FlexibleWork</p>
                                <p>Environment</p>
                            </div>

                            <div className="bg-[#F9FAFB] text-[#44506A] md:text-lg text-base font-bold text-center rounded-xl flex flex-col items-center justify-center py-6 px-5">
                                <img src={PerformanceBonuses} alt="" className="sm:w-20 sm:h-20  w-[70px] h-[70px] object-contain mx-auto mb-3" />
                                <p>Performance</p>
                                <p>Bonuses</p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 6. Current Job Openings Section */}
                <section className='bg-[#FFFFFF] my-8'>

                    {/* Main Container */}
                    <div className='main_container'>

                        {/* Title */}
                        <div className="flex items-center justify-between ">
                            {/* Title */}
                            <h1 className="text-2xl lg:text-[42px] font-bold over text-[#0A0E17]">
                                Current Job Openings
                            </h1>
                        </div>

                        {/* Benefits & Perks Card */}
                        <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-8">

                            {/* Job card */}
                            {data?.map((data, index) => (
                                <div
                                    key={data.id || index}
                                    className="group bg-[#F9FAFB] rounded-xl flex flex-col p-6 col-span-1 h-full hover:bg-white hover:shadow-[0_0_10px_0_#75757533] transition-all duration-200 ease-in-out "
                                >
                                    <h1 className="text-[#111827] font-semibold text-lg sm:text-[20px] ">
                                        {data.title}
                                    </h1>
                                    <p className="text-[#6B7280] font-medium text-[15px] mt-3 mb-4">
                                        {data.description}
                                    </p>

                                    <div className="mt-auto flex justify-center">
                                        <button
                                            onClick={() => {
                                                // Check if user is logged in
                                                const token = localStorage.getItem("token");
                                                if (!token) {
                                                    alert("Please log in to apply for this job.");
                                                    return;
                                                }

                                                console.log(`Job ID: ${data._id}`);
                                                setSelectedJobId(data._id);
                                                setOpenJob(true); // modal open
                                            }}
                                            className="w-full py-2.5 rounded-lg bg-[#E5E7EB] lg:text-lg text-base text-[#6B7280] hover:bg-[#F97316] group-hover:bg-[#F97316] group-hover:text-white hover:text-[#ffffff] font-semibold  focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>


            {/* ***** Job Openings Modal ******* */}
            <Dialog open={openJob} onClose={setOpenJob} className="relative z-[999]">

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
                                Product Manager
                            </DialogTitle>
                            <IoMdClose onClick={() => setOpenJob(false)} className="text-[24px] text-[var(--profile-dark-text)] cursor-pointer bg-[var(--profile-gray-text)] p-1 rounded-full" />
                        </div>

                        <div className="border-b border-[var(--profile-border,#ddd)]"></div>

                        {/* Scrollable Body */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex-1 overflow-y-auto py-5 space-y-4 custom-scrollbar-modal">

                            {/* First + Last name */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* First Name */}
                                <div className="flex-1">
                                    <label htmlFor="" className='text-[#44506A] text-base font-semibold'>
                                        First Name
                                        <span className='text-[#DC2626] font-medium ml-1'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Ex. John"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="focus:outline-none mt-1 border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                    />
                                    {errors.firstName && touched.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                {/* Last Name */}
                                <div className="flex-1">
                                    <label htmlFor="" className='text-[#44506A] text-base font-semibold'>
                                        Last Name
                                        <span className='text-[#DC2626] font-medium ml-1'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Ex. Doe"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="focus:outline-none mt-1 border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email + Mobile Number */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Email */}
                                <div className="flex-1">
                                    <label htmlFor="" className='text-[#44506A] text-base font-semibold'>
                                        Email ID
                                        <span className='text-[#DC2626] font-medium ml-1'>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Ex. john.doe@example.com"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="focus:outline-none mt-1 border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                    />
                                    {errors.email && touched.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                                {/* Mobile Number */}
                                <div className="flex-1">
                                    <label htmlFor="" className='text-[#44506A] text-base font-semibold'>
                                        Mobile Number
                                        <span className='text-[#DC2626] font-medium ml-1'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="mobileNo"
                                        placeholder="Ex. +61 412 345 678"
                                        value={values.mobileNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="focus:outline-none mt-1 border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                    />
                                    {errors.mobileNo && touched.mobileNo && (
                                        <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
                                    )}
                                </div>
                            </div>

                            {/* Current Company */}
                            <div>
                                <label htmlFor="" className='text-[#44506A] text-base font-semibold'>
                                    Current Company
                                </label>
                                <input
                                    type="text"
                                    name="currentCompany"
                                    placeholder='Ex. ABC Technologies'
                                    value={values.currentCompany}
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className='w-full placeholder:text-[var(--profile-darkgray-text)] py-2 px-4 mt-2 border border-[#44506A33] rounded-lg outline-none' />
                            </div>

                            {/* Current CTC + Expected CTC */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Current CTC */}
                                <div className="flex-1">
                                    <label htmlFor="" className='text-[#44506A] text-base font-semibold'>
                                        Current CTC
                                    </label>
                                    <input
                                        type="number"
                                        name="currentCTC"
                                        placeholder="Ex. 80000"
                                        value={values.currentCTC}
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        className="focus:outline-none mt-1 border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                    />
                                </div>
                                {/* Expected CTC */}
                                <div className="flex-1">
                                    <label htmlFor="" className='text-[#44506A] text-base font-semibold'>
                                        Expected CTC
                                    </label>
                                    <input
                                        type="number"
                                        name="expectedCTC"
                                        placeholder="Ex. 100000"
                                        value={values.expectedCTC}
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        className="focus:outline-none mt-1 border border-[var(--profile-border)] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]"
                                    />
                                </div>
                            </div>

                            {/* Upload resume */}
                            <div className="w-full mx-auto">
                                <label htmlFor="" className="text-[#44506A] text-base font-semibold">
                                    Upload Your Resume
                                </label>

                                {/* Show upload area only if no file */}
                                {!file && (
                                    <label
                                        htmlFor="file-upload"
                                        className="flex flex-col items-center justify-center border border-[#44506A33] rounded-lg cursor-pointer bg-[#FFFFFF] hover:bg-[var(--border-gray-200)] transition p-6 text-center mt-2"
                                    >
                                        <FaCloudArrowUp className="w-20 h-20 text-[#6B7280]" />

                                        <p className="font-medium text-[#6B7280]">
                                            <span>Drag and drop your resume here</span>
                                        </p>
                                        <p className="font-medium text-[#6B7280] mt-1">
                                            ( PDF only ), or click to select
                                        </p>
                                        <p className="font-medium text-[#6B7280]">a file for upload</p>

                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}

                                {/* Resume validation error */}
                                {errors.resume && touched.resume && (
                                    <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                                )}

                                {/* Preview section */}
                                {file && (
                                    <div
                                        id="preview"
                                        className="mt-4 flex items-center gap-3 p-3 border rounded-md bg-gray-50 shadow-sm"
                                    >
                                        {/* File Icon */}
                                        {file.type === "application/pdf" ? (
                                            <i className="fa-solid fa-file-pdf text-red-500 text-2xl"></i>
                                        ) : (
                                            <i className="fa-solid fa-file-word text-blue-500 text-2xl"></i>
                                        )}

                                        {/* File Name */}
                                        <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                                            {file.name}
                                        </p>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => {
                                                setFile(null);
                                                formik.setFieldValue("resume", null);
                                            }}
                                            className="ml-auto flex items-center justify-center"
                                            title="Remove File"
                                        >
                                            <IoMdClose className="text-lg text-red-600" />
                                        </button>

                                    </div>
                                )}
                            </div>
                            {/* Footer Buttons */}
                            <div className="flex gap-3 shrink-0 border-[#F9FAFB] mt-4">

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className='bg-[var(--bg-orange)] w-full text-[var(--text-white)] p-2 rounded-md text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed'>
                                    {isSubmitting ? 'Applying...' : 'Apply'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenJob(false);
                                        setSelectedJobId(null);
                                        setFile(null);
                                        formik.resetForm();
                                    }}
                                    className='p-2 rounded-md text-base w-full font-medium text-[var(--profile-darkgray-text)] border border-[var(--profile-darkgray-text)]'>
                                    Cancel
                                </button>

                            </div>
                        </form>

                    </DialogPanel>
                </div>

            </Dialog>

        </>
    )
}
