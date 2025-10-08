import React, { useEffect, useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FaShieldAlt, FaRegUser } from "react-icons/fa";
import {
	MdCurrencyExchange,
	MdOutlineCall,
	MdOutlineLocalShipping,
	MdOutlinePayment,
	MdOutlinePayments,
	MdOutlineSecurity,
	MdOutlineSupport,
	MdOutlineVerified,
} from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import { FAQ, FAQ2 } from "../component/FAQ";
import our_promise from "../images/our-promise.png"
import { Link } from "react-router-dom";
import { fetchHelpSupportCategories } from "../Store/Slices/helpsupportSlice";
import { useDispatch, useSelector } from "react-redux";

const Help_Support = () => {
	const [selectedCard, setSelectedCard] = useState(null);

	// const cards = [
	// 	{
	// 		icon: <GoFileDirectory className="text-[#F97316] text-3xl" />,
	// 		title: "Getting Started",
	// 		desc: "Learn how to create an account, browse products, and place orders with ease. Our step-by-step guides will help you start shopping quickly and confidently.",
	// 	},
	// 	{
	// 		icon: <MdOutlineLocalShipping className="text-[#F97316] text-3xl" />,
	// 		title: "Orders & Shipping",
	// 		desc: "Track your orders, update delivery details, and learn about shipping options. We’re here to ensure your items arrive safely and on time.",
	// 	},
	// 	{
	// 		icon: <MdOutlinePayment className="text-[#F97316] text-3xl" />,
	// 		title: "Payments & Returns",
	// 		desc: "Learn how to manage payments, request returns, and explore step-by-step guides that make your shopping secure and easy.",
	// 	},
	// 	{
	// 		icon: <FaRegUser className="text-[#F97316] text-3xl" />,
	// 		title: "Account Management",
	// 		desc: "Manage your personal information, reset passwords, and customize notifications. Keep your profile secure and up-to-date for a seamless experience.",
	// 	},
	// 	{
	// 		icon: <MdOutlineSupport className="text-[#F97316] text-3xl" />,
	// 		title: "Technical Support",
	// 		desc: "Get assistance with app issues, troubleshoot problems, and access guides tailored to ensure seamless navigation and usage.",
	// 	},
	// 	{
	// 		icon: <FaShieldAlt className="text-[#F97316] text-3xl" />,
	// 		title: "Safety & Security",
	// 		desc: "Protect your personal information and shop with confidence. Learn how we secure payments, prevent fraud, and keep your data safe at every step.",
	// 	},
	// ];

	const iconMap = {
		"Getting Started": <GoFileDirectory className="text-[#F97316] text-3xl" />,
		"Orders & Shipping": <MdOutlineLocalShipping className="text-[#F97316] text-3xl" />,
		"Payments & Returns": <MdOutlinePayment className="text-[#F97316] text-3xl" />,
		"Account Management": <FaRegUser className="text-[#F97316] text-3xl" />,
		"Technical Support": <MdOutlineSupport className="text-[#F97316] text-3xl" />,
		"Safety & Security": <FaShieldAlt className="text-[#F97316] text-3xl" />,
	};


	const dispatch = useDispatch();
	const { categories, loading, error } = useSelector((state) => state.helpSupport);

	useEffect(() => {
		dispatch(fetchHelpSupportCategories());
	}, [dispatch]);

	const allCategories = Array.isArray(categories)
		? categories.map((help) => ({
			id: help._id,
			name: help.mainFaqCategoryName,
			description: help.mainFaqCategoryDescription,
		}))
		: [];

	const features = [
		{
			icon: <MdOutlinePayments className="text-[#F97316] text-4xl" />,
			title: "Secure Payments",
			desc: "All transactions are encrypted and protected, so your information stays safe.",
		},
		{
			icon: <MdCurrencyExchange className="text-[#F97316] text-4xl" />,
			title: "Easy Returns & Exchanges",
			desc: "Hassle-free return policies and simple exchanges make shopping worry-free.",
		},
		{
			icon: <MdOutlineVerified className="text-[#F97316] text-4xl" />,
			title: "Verified Sellers",
			desc: "We partner only with trusted brands and sellers to ensure product authenticity and reliability.",
		},
		{
			icon: <MdOutlineSecurity className="text-[#F97316] text-4xl" />,
			title: "Data Protection",
			desc: "Your privacy is our priority — we never share your personal information without your consent.",
		},
	];

	return (
		<div className="help_support_page">
			{/* Breadcrumb */}
			<div className="bg-[#F9FAFB] py-[22px] sm:py-[32px]">
				<div className="main_container px-[22px] sm:px-[32px] mx-0 h_breadcrumb">
					<h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
						{selectedCard ? selectedCard.name : "Help & Support"}
					</h2>
					<div className="h_Breadcrumb_navigation flex items-center justify-start gap-[2px]">
						<h5 className="text-[16px] text-[#BABABA] font-medium">
							<Link to={"/"}>
								Home
							</Link>
						</h5>
						<LiaAngleRightSolid />
						{!selectedCard ? (
							<h3 className="text-[12px] sm:text-[16px] text-[#44506A] font-medium">
								Help & Support
							</h3>
						) : (
							<>
								<h3
									className="text-[12px] sm:text-[16px] text-[#BABABA] font-medium cursor-pointer"
									onClick={() => setSelectedCard(null)}
								>
									Help & Support
								</h3>
								<LiaAngleRightSolid />
								<h3 className="text-[12px] sm:text-[16px] text-[#44506A] font-medium">
									{selectedCard.name}
								</h3>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="main_container">
				<div className=" py-[30px] sm:py-[60px]">
					{!selectedCard ? (
						<>
							{/* Intro Section */}
							<div className="pb-[16px] sm:pb-[32px] sm:max-w-[570px]">
								<h1 className="text-[28px] sm:text-[42px] font-bold leading-tight">
									Help & Resources for a Smooth Shopping Experience
								</h1>
								<p className="text-[16px] sm:text-[20px] font-medium mt-4 text-[#44506A]">
									We’re here to assist you every step of the way. Explore our
									guides, FAQs, and expert help to make your shopping experience
									smooth, safe, and enjoyable.
								</p>
							</div>

							{/* Cards Section */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px] mt-8">
								{loading ? (
									<p>Loading categories...</p>
								) : error ? (
									<p className="text-red-500">{error}</p>
								) : (
									allCategories.map((category, index) => (
										<div
											key={category.id || index}
											onClick={() => {
												// alert("Category ID:: " + category.id);
												setSelectedCard(category);
												window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
											}}
											className="cursor-pointer group bg-[#F9FAFB] rounded-xl p-[18px] sm:p-[32px] flex flex-col items-center justify-center text-center gap-[8px] hover:bg-white hover:shadow-md hover:border hover:border-[#E5E7EB] transition duration-300"
										>
											{/* Optionally show an icon */}
											{iconMap[category.name] || <GoFileDirectory className="text-[#F97316] text-3xl" />}


											<h3 className="text-[18px] font-bold text-[#111827] group-hover:underline">
												{category.name}
											</h3>
											<p className="text-[#6B7280] font-medium text-[14px] sm:text-[16px]">
												{category.description}
											</p>
										</div>
									))
								)}
							</div>

							{/* Contact Customer Care */}
							<div className="contact-customer-care bg-[#0A0E17] text-white p-[28px] md:p-[36px] lg:p-[48px] my-[30px] sm:my-[60px] rounded-xl">
								<div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-4">
									<div>
										<h3 className="text-[30px] lg:text-[38px] font-bold mb-2">
											Contact Customer Care
										</h3>
										<p className="text-[16px] lg:text-[18px] font-medium">
											Our support team is ready to help you with any questions or
											issues.
										</p>
									</div>
									<div>
										<div className="flex justify-start items-center mb-[14px] gap-2">
											<MdOutlineCall className="text-[#F97316] text-[26px]" />
											<h6 className="text-[16px] lg:text-[20px]">+61 400 123 456</h6>
										</div>
										<div className="flex justify-start items-center gap-2">
											<FiMail className="text-[#F97316] text-[26px]" />
											<h6 className="text-[16px] lg:text-[20px]">
												support@coralbay.com.au
											</h6>
										</div>
									</div>
								</div>
							</div>

							{/* Global FAQ */}
							<FAQ />
						</>
					) : (
						<>
							{/* FAQ specific to this card */}
							<FAQ2 category={selectedCard} />

							{/* Contact Customer Care */}
							<div className="contact-customer-care bg-[#0A0E17] text-white p-[28px] md:p-[36px] lg:p-[48px] mt-[30px] sm:mt-[60px] rounded-xl">
								<div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-4">
									<div>
										<h3 className="text-[30px] lg:text-[38px] font-bold mb-2">
											Contact Customer Care
										</h3>
										<p className="text-[16px] lg:text-[18px] font-medium">
											Our support team is ready to help you with any questions or
											issues.
										</p>
									</div>
									<div>
										<div className="flex justify-start items-center mb-[14px] gap-2">
											<MdOutlineCall className="text-[#F97316] text-[26px]" />
											<h6 className="text-[16px] lg:text-[20px]">+61 400 123 456</h6>
										</div>
										<div className="flex justify-start items-center gap-2">
											<FiMail className="text-[#F97316] text-[26px]" />
											<h6 className="text-[16px] lg:text-[20px]">
												support@coralbay.com.au
											</h6>
										</div>
									</div>
								</div>
							</div>

							{/* our Promise */}
							<div className="our-promise text-center my-[30px] sm:my-[60px]">
								<h2 className="text-[28px] sm:text-[42px] font-bold text-[#0A0E17]">Our Promise</h2>
								<p className="text-[16px] sm:text-[20px] font-medium text-[#44506A]">Shop with confidence and peace of mind</p>
							</div>
							<div className="flex gap-10 items-stretch flex-wrap md:flex-nowrap">
								{/* Left Side Image */}
								<div className="flex justify-center w-full md:max-w-[392px]">
									<img
										src={our_promise}
										alt="Trust & Safety"
										className="rounded-lg shadow-md w-full h-full"
									/>
								</div>

								{/* Right Side Content */}
								<div className="flex flex-col h-auto items-stretch">

									{/* Features Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8 h-full items-stretch">
										{features.map((item, index) => (
											<div
												key={index}
												className="flex m-auto gap-4 p-[18px] sm:p-[24px] lg:[32px] xl:p-[42px] border border-gray-200 rounded-lg bg-[#F9FAFB] hover:shadow-md transition"
											>
												{item.icon}

												{/* Text */}
												<div>
													<h3 className="text-[18px] sm:text-[20px] font-semibold text-[#44506A]">{item.title}</h3>
													<p className="text-[#6B7280] text-[14px] sm:text-[16px]">{item.desc}</p>
												</div>
											</div>
										))}
									</div>

								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>

	);
};

export default Help_Support;