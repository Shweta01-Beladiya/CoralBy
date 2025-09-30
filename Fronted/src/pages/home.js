import React, { useEffect, useRef, useState } from 'react'
import Cmn_product_slider from "../component/Cmn_product_slider";
import Slider from "react-slick";
import Newsletter from "../component/Newsletter";
import QuickView from "../component/QuickView";

// images
import Sider1 from '../images/Banner.png'
import Banner2 from '../images/Banner 2.png'
import RBanner1 from '../images/Fila.png'
import RBanner2 from '../images/Logo1.png'
import RBanner3 from '../images/Asics.png'
import RBanner4 from '../images/True.png'
import Rate from '../images/Rate.png'
import TopBrands from '../images/workspace_premium.png'
import Delivery from '../images/local_shipping.png'
import Secure from '../images/local_police.png'
import Smile from '../images/tag_faces.png'
import Buye1Get1 from '../images/Image.png'
import Flatoff1 from '../images/Image (1).png'
import Upto0ff1 from '../images/Image (2).png'
import Upto0ff2 from '../images/Image (3).png'
import Flatoff2 from '../images/Image (4).png'
import MacBook from '../images/MacBook contents.png'
import MobilesTablets from '../images/Rectangle 100.png'
import FashionEssentials from '../images/Rectangle 101.png'
import Electronics from '../images/Rectangle 102.png'
import HomeFurniture from '../images/Rectangle 103.png'
import Beauty from '../images/Rectangle 104.png'
import PersonalCareGrocery from '../images/Rectangle 105.png'
import Offer1 from '../images/Furniture Image.png'
import Offer2 from '../images/Shop Mobiles Image (1).png'
import card1 from '../images/Rectangle 106.png'
import card2 from '../images/Rectangle 107.png'
import card3 from '../images/Rectangle_108-removebg-preview.png'
import WomensDaySpecials from '../images/Image (5).png'
import HomeGarden from '../images/Image (6).png'
import GamingToys from '../images/Image (7).png'
import MensGrooming from '../images/Image (8).png'
import HardwareTools from '../images/Image (9).png'

// brand images
import f_brand_1 from "../images/fashion-brand (1).png";
import f_brand_2 from "../images/fashion-brand (2).png";
import f_brand_3 from "../images/fashion-brand (3).png";
import f_brand_4 from "../images/fashion-brand (4).png";
import f_brand_5 from "../images/fashion-brand (5).png";
import f_brand_6 from "../images/fashion-brand (6).png";
import f_brand_7 from "../images/fashion-brand (7).png";
import f_brand_8 from "../images/fashion-brand (8).png";
import f_brand_9 from "../images/fashion-brand (9).png";
import f_brand_10 from "../images/fashion-brand (10).png";
import f_brand_11 from "../images/fashion-brand (11).png";
import f_brand_12 from "../images/fashion-brand (12).png";
import f_brand_13 from "../images/fashion-brand (13).png";
import f_brand_14 from "../images/fashion-brand (14).png";
import f_brand_15 from "../images/fashion-brand (15).png";
import f_brand_16 from "../images/fashion-brand (16).png";
import f_brand_17 from "../images/fashion-brand (17).png";
import f_brand_18 from "../images/fashion-brand (18).png";
import f_brand_19 from "../images/fashion-brand (19).png";
import f_brand_20 from "../images/fashion-brand (20).png";
import f_brand_21 from "../images/fashion-brand (21).png";
import f_brand_22 from "../images/fashion-brand (22).png";
import f_brand_23 from "../images/fashion-brand (23).png";
import f_brand_24 from "../images/fashion-brand (24).png";
import f_brand_25 from "../images/fashion-brand (25).png";
import f_brand_26 from "../images/fashion-brand (26).png";
import f_brand_27 from "../images/fashion-brand (27).png";
import f_brand_28 from "../images/fashion-brand (28).png";

// icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// All Modal
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	TransitionChild,
} from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import WelcomeToCoralBay from "../images/WelcomeToCoralBay.png";
import WelcomeBack from "../images/WelcomeBack.png";
import '../App.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMainCategory } from '../Store/Slices/categorySlice';



export default function Home() {


	const dispatch = useDispatch();

	// *************** Modal Code ***************

	// 1. Welcome to CoralBay modal ( Before Signup Popup )
	const [openWelcomeToCoralBay, setOpenWelcomeToCoralBay] = useState(false)

	// 2. Welcome back modal ( After Login Popup )
	const [openWelcomeback, setOpenWelcomeback] = useState(false)

	// 3. QuickView modal (Global)
	const [quickViewProduct, setQuickViewProduct] = useState(null)
	const [showQuickView, setShowQuickView] = useState(false)

	// QuickView handlers
	const openQuickView = (product) => {
		setQuickViewProduct(product)
		setShowQuickView(true)
	}

	const closeQuickView = () => {
		setShowQuickView(false)
		setQuickViewProduct(null)
	}

	// Responsive check for mobile view
	const [isMobile, setIsMobile] = useState(false);

	// Check screen size on mount and resize
	useEffect(() => {
		// Check screen size on mount
		const checkScreen = () => setIsMobile(window.innerWidth <= 425);
		checkScreen();

		// Add resize listener
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);


	// Reference for Product Slider => 3 - 6 - 9 -11 section All products show in slider
	const productSliderRef1 = useRef(null);
	const productSliderRef2 = useRef(null);
	const productSliderRef3 = useRef(null);
	const productSliderRef4 = useRef(null);


	// *************** 1. Banner Section ***************
	// Slider ( Banner Section - Left )
	const slides = [
		{
			img: Sider1,
			tag: "#NEWONE",
			title1: "Top Smartphones,",
			title2: "Unbeatable Performance",
			desc1: "Flagship designs, lightning speed & stunning displays.",
			desc2: "Smartphones for Every Budget",
			btnText: "Shop Now",
		},
		{
			img: Sider1,
			tag: "#NEWONE",
			title1: "Top Smartphones,",
			title2: "Unbeatable Performance",
			desc1: "Flagship designs, lightning speed & stunning displays.",
			desc2: "Smartphones for Every Budget",
			btnText: "Shop Now",
		},
		{
			img: Sider1,
			tag: "#NEWONE",
			title1: "Top Smartphones,",
			title2: "Unbeatable Performance",
			desc1: "Flagship designs, lightning speed & stunning displays.",
			desc2: "Smartphones for Every Budget",
			btnText: "Shop Now",
		},
		{
			img: Sider1,
			tag: "#NEWONE",
			title1: "Top Smartphones,",
			title2: "Unbeatable Performance",
			desc1: "Flagship designs, lightning speed & stunning displays.",
			desc2: "Smartphones for Every Budget",
			btnText: "Shop Now",
		},
		{
			img: Sider1,
			tag: "#NEWONE",
			title1: "Top Smartphones,",
			title2: "Unbeatable Performance",
			desc1: "Flagship designs, lightning speed & stunning displays.",
			desc2: "Smartphones for Every Budget",
			btnText: "Shop Now",
		},
	];

	// Background Image Slider Settings
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false
	};


	// *************** 4. Save More, Shop More ***************
	// Card Images
	const CardImages = [
		{
			img: Buye1Get1,
			heading: "BUY 1 GET 1",
			desc1: "Trendy Men’s Clothing",
			desc2: "Shirts, Jackets and Everyday",
			desc3: "Fashion Essentials",
		},
		{
			img: Flatoff1,
			heading: "FLAT 25% OFF",
			desc1: "Cookware & Kitchen",
			desc2: "Premium Kitchenware for",
			desc3: "Effortless Healthy Meals",
		},
		{
			img: Upto0ff1,
			heading: "UP TO 50% OFF",
			desc1: "Outdoor & Hiking Gear",
			desc2: "Adventure-Ready Outdoor",
			desc3: "Gear for Every Journey",
		},
		{
			img: Upto0ff2,
			heading: "UP TO 70% OFF",
			desc1: "Shoes & Sneakers",
			desc2: "Comfortable Shoes Designed",
			desc3: "for Daily Australian Life",
		},
		{
			img: Flatoff2,
			heading: "FLAT 40% OFF",
			desc1: "Furniture & Home Decor",
			desc2: "Sofas, Tables and Décor for",
			desc3: "Complete Home Makeover",
		},
		{
			img: Buye1Get1,
			heading: "BUY 1 GET 1",
			desc1: "Trendy Men’s Clothing",
			desc2: "Shirts, Jackets and Everyday",
			desc3: "Fashion Essentials",
		},
		{
			img: Flatoff1,
			heading: "FLAT 25% OFF",
			desc1: "Cookware & Kitchen",
			desc2: "Premium Kitchenware for",
			desc3: "Effortless Healthy Meals",
		},
		{
			img: Upto0ff1,
			heading: "UP TO 50% OFF",
			desc1: "Outdoor & Hiking Gear",
			desc2: "Adventure-Ready Outdoor",
			desc3: "Gear for Every Journey",
		},
		{
			img: Upto0ff2,
			heading: "UP TO 70% OFF",
			desc1: "Shoes & Sneakers",
			desc2: "Comfortable Shoes Designed",
			desc3: "for Daily Australian Life",
		},
		{
			img: Flatoff2,
			heading: "FLAT 40% OFF",
			desc1: "Furniture & Home Decor",
			desc2: "Sofas, Tables and Décor for",
			desc3: "Complete Home Makeover",
		},
	]

	// Carousel State and Handlers
	const [startIndex, setStartIndex] = useState(0);
	const [cardsPerPage, setCardsPerPage] = useState(5);
	const gridRef = useRef(null);

	// Update cardsPerPage on screen resize
	useEffect(() => {
		const updateCardsPerPage = () => {
			if (window.innerWidth < 640) setCardsPerPage(1); // mobile
			else if (window.innerWidth < 1024) setCardsPerPage(3); // tablet
			else if (window.innerWidth < 1280) setCardsPerPage(4); // small desktop
			else setCardsPerPage(5); // large desktop
		};

		updateCardsPerPage();
		window.addEventListener("resize", updateCardsPerPage);
		return () => window.removeEventListener("resize", updateCardsPerPage);
	}, []);

	// Next button handler
	const handleNext = () => {
		setStartIndex((prev) =>
			prev + cardsPerPage >= CardImages.length ? 0 : prev + 1
		);
		gridRef.current?.scrollTo({
			left: gridRef.current.scrollLeft + 300, // adjust scroll step
			behavior: "smooth",
		});
	};

	// Previous button handler
	const handlePrev = () => {
		setStartIndex((prev) =>
			prev === 0 ? CardImages.length - cardsPerPage : prev - 1
		);
		gridRef.current?.scrollTo({
			left: gridRef.current.scrollLeft - 300,
			behavior: "smooth",
		});
	};

	// Determine visible cards based on startIndex and cardsPerPage
	const visibleCards = CardImages.slice(
		startIndex,
		startIndex + cardsPerPage
	);


	// *************** 5. Hurry, Ends Tonight! ***************
	// Countdown Timer State and Logic
	const [time, setTime] = useState(6 * 3600 + 36 * 60 + 44); // in seconds

	// Update timer every second
	useEffect(() => {
		const timer = setInterval(() => {
			setTime((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	// Format time as HH : MM : SS
	const formatTime = (secs) => {
		const h = String(Math.floor(secs / 3600)).padStart(2, "0");
		const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
		const s = String(secs % 60).padStart(2, "0");
		return `${h} : ${m} : ${s}`;
	};

	// Product Data for Ends Tonight Section
	const EndsImages = [
		{
			heading: "Ends in",
			img: MacBook,
			offer: "Flat 40% OFF",
			desc: "Ultra-Slim Laptop with Long Battery Life",
			oldPrice: "AU$1,299",
			newPrice: "AU$999",
			istInformation: "Inclusive of IST",
			btnText: "Grab Deal",
		},
	]

	// Category Cards Data
	const CategoryCards = [
		{
			img: MobilesTablets,
			title: "Mobiles & Tablets",
			offer: "Up to 30% OFF",
		},
		{
			img: FashionEssentials,
			title: "Fashion & Essentials",
			offer: "Flat 50% OFF Styles",
		},
		{
			img: Electronics,
			title: "Electronics",
			offer: "Save up to 35%",
		},
		{
			img: HomeFurniture,
			title: "Home & Furniture",
			offer: "Up to 40% OFF",
		},
		{
			img: Beauty,
			title: "Beauty",
			offer: "Deals from AU$19",
		},
		{
			img: PersonalCareGrocery,
			title: "Personal Care & Grocery",
			offer: "20% OFF Combos",
		},
	];


	// *************** 8. Grand Global Brands ***************
	// Active Category State
	const [activeCategory, setActiveCategory] = useState("Fashion");

	// All Categories
	const categories = [
		"Home & Furniture",
		"Fashion",
		"Electronics",
		"Mobile & Tablets",
		"Beauty",
		"Personal Care",
		"Grocery",
	];

	// Brand Images by Category
	const categoryBrands = {
		"Home & Furniture": [
			f_brand_1,
			f_brand_2,
			f_brand_3,
			f_brand_4,
			f_brand_5,
			f_brand_6,
		],
		"Fashion": [f_brand_27, f_brand_28, f_brand_14, f_brand_21, f_brand_10, f_brand_17, f_brand_3, f_brand_8, f_brand_9, f_brand_11, f_brand_26, f_brand_24, f_brand_6, f_brand_25, f_brand_12, f_brand_15, f_brand_7, f_brand_5, f_brand_19, f_brand_4, f_brand_1, f_brand_20, f_brand_22, f_brand_23, f_brand_13, f_brand_2, f_brand_18, f_brand_16],
		Electronics: [f_brand_5, f_brand_10, f_brand_15],
		"Mobile & Tablets": [f_brand_2, f_brand_8, f_brand_12],
		Beauty: [f_brand_9, f_brand_13, f_brand_16],
		"Personal Care": [f_brand_11, f_brand_14, f_brand_20],
		Grocery: [f_brand_18, f_brand_21, f_brand_23],
	};


	// *************** 10. Deals For You ***************

	useEffect(() => {
		getMainCategory()
	}, [dispatch])

	const mainCategory = useSelector((state) => state.category.mainCategory.data)

	const DealsCardImages = mainCategory?.map((cat) => ({
		img: cat.mainCategoryImage,  
		label: cat.mainCategoryName, 
	}));

	// Card Images
	// const DealsCardImages = [
	// 	{
	// 		img: WomensDaySpecials,
	// 		label: "Women's Day Specials",
	// 	},
	// 	{
	// 		img: HomeGarden,
	// 		label: "Home & Garden",
	// 	},
	// 	{
	// 		img: GamingToys,
	// 		label: "Gaming & Toys",
	// 	},
	// 	{
	// 		img: MensGrooming,
	// 		label: "Men’s Grooming",
	// 	},
	// 	{
	// 		img: HardwareTools,
	// 		label: "Hardware Tools",
	// 	},
	// 	{
	// 		img: WomensDaySpecials,
	// 		label: "Women's Day Specials",
	// 	},
	// 	{
	// 		img: HomeGarden,
	// 		label: "Home & Garden",
	// 	},
	// 	{
	// 		img: GamingToys,
	// 		label: "Gaming & Toys",
	// 	},
	// 	{
	// 		img: MensGrooming,
	// 		label: "Men’s Grooming",
	// 	},
	// 	{
	// 		img: HardwareTools,
	// 		label: "Hardware Tools",
	// 	}
	// ]

	// Carousel State and Handlers
	const [startIndex2, setStartIndex2] = useState(0);
	const [cardsPerPage2, setCardsPerPage2] = useState(5);
	const gridRef2 = useRef(null);

	// Update cardsPerPage on screen resize
	useEffect(() => {
		const updateCardsPerPage = () => {
			if (window.innerWidth < 640) setCardsPerPage2(2); // mobile
			else if (window.innerWidth < 1024) setCardsPerPage2(3); // tablet
			else if (window.innerWidth < 1280) setCardsPerPage2(4); // small desktop
			else setCardsPerPage2(5); // large desktop
		};

		updateCardsPerPage();
		window.addEventListener("resize", updateCardsPerPage);
		return () => window.removeEventListener("resize", updateCardsPerPage);
	}, []);

	// Next button handler
	const handleNext2 = () => {
		setStartIndex2((prev) =>
			prev + cardsPerPage2 >= DealsCardImages.length ? 0 : prev + 1
		);
		gridRef2.current?.scrollTo({
			left: gridRef2.current.scrollLeft + 300, // adjust scroll step
			behavior: "smooth",
		});
	};

	// Previous button handler
	const handlePrev2 = () => {
		setStartIndex2((prev) =>
			prev === 0 ? DealsCardImages.length - cardsPerPage2 : prev - 1
		);
		gridRef2.current?.scrollTo({
			left: gridRef2.current.scrollLeft - 300,
			behavior: "smooth",
		});
	};

	// Determine visible cards based on startIndex and cardsPerPage
	const visibleCards2 = DealsCardImages.slice(
		startIndex2,
		startIndex2 + cardsPerPage2
	);


	return (
		<>
			<div className=''>

				{/* Main Container 1 - 2 - 3 */}
				<div className="bg-white main_container">

					{/* 1. Banner Section */}
					<section className="w-full flex flex-col xl:flex-row gap-6 mt-5">

						{/* Left: Banner + Text */}
						<div className="w-full xl:w-4/6 h-[400px] md:h-[400px] relative bg-gray-100 rounded-lg overflow-hidden">
							{/* Background Image */}
							<Slider {...settings}>
								{slides.map((slide, index) => (
									<div
										key={index}
										className="relative w-full h-[400px] md:h-[400px]">
										<img
											src={slide.img}
											alt={`slide-${index}`}
											className="w-full h-full object-cover object-[80%] md:object-[70%] rounded-lg opacity-70 sm:opacity-100"
										/>

										{/* Text Overlay */}
										<div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-6 md:px-10 lg:px-10 xl:px-12 text-left">
											<span className="text-sm font-semibold text-blue-500">
												{slide.tag}
											</span>
											<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
												{slide.title1} <br />  {slide.title2}
											</h2>
											<p className="mt-2 text-gray-600">
												{slide.desc1} <br />
												{slide.desc2}
											</p>
											<button
												// 1. Welcome to CoralBay modal
												onClick={() => setOpenWelcomeToCoralBay(true)}
												className="mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded-md">
												{slide.btnText}
											</button>
										</div>
									</div>
								))}
							</Slider>
						</div>

						{/* Right: Banner + Text */}
						< div className="w-full xl:w-2/6 h-[400px] md:h-[400px] lg:h-[400px] bg-gray-50 rounded-lg relative overflow-hidden flex flex-col items-center p-6 md:p-8 border border-gray-200" >

							{/* Brand Logos */}
							<div className="flex flex-wrap justify-center items-center gap-4 md:gap-6" >
								<img src={RBanner1} alt="RBanner1" className="h-8  w-12 " />
								<img src={RBanner2} alt="RBanner2" className="h-4  w-12 " />
								<img src={RBanner3} alt="RBanner3" className="h-8  w-12 " />
								<img src={RBanner4} alt="RBanner4" className="h-4  w-12 " />
							</div>

							{/* Text */}
							<p className="mt-4 text-center text-base md:text-lg lg:text-[15px] font-bold text-[#111827]" >
								300 + Stylish & Comfortable Women’s Sports < br />
								Brands with up to 50 % Off
							</p>

							{/* Button */}
							<button
								onClick={() => setOpenWelcomeback(true)}
								className="mt-3 px-5 py-1.5 bg-[--shop-now-btn] text-white text-base font-medium rounded-lg" >
								Explore now
							</button >

							{/* 50% OFF Background */}
							<img
								src={Rate}
								alt="Rate"
								className="absolute mb-right-banner-img left-1/2 -translate-x-1/2 w-[300px] md:w-[360px] xl:w-[350px] opacity-80 z-[1]"
							/>

							{/* Model Image */}
							<img
								src={Banner2}
								alt="Banner2"
								className="absolute mb-right-banner-img1  left-1/2 -translate-x-1/2 w-[350px] md:w-[360px] xl:w-[550px] object-contain"
							/>
						</div>
					</section>

					{/* 2. Service Section */}
					<section className="w-full bg-[#F9FAFB] p-5 mt-5 border border-gray-200 rounded-lg">

						{/* All 4 Card */}
						<div className="grid grid-cols-2  md:grid-cols-4  gap-3 text-center">
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
					</section>

					{/* 3. Celebrate with Style & Savings Section */}
					<section className="w-full my-7 md:my-14">

						{/* Title */}
						<div className="flex flex-wrap sm:gap-2 gap-0  items-center justify-between mb-5">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#0A0E17]">
								Celebrate with Style & Savings
							</h1>

							{/* Navigation Arrows */}
							<div className="flex items-center gap-2 ml-auto">

								{/* {console.log(productSliderRef)} */}
								<button
									onClick={() => productSliderRef1.current?.prev()}
									className="rounded-full text-sm border border-[#E5E7EB] p-2.5 ">
									<FaChevronLeft className="" />
								</button>
								<button
									onClick={() => productSliderRef1.current?.next()}
									className="rounded-full text-sm border border-[#E5E7EB] p-2.5 ">
									<FaChevronRight className="" />
								</button>
							</div>
						</div>

						{/* image */}
						<div className='py-6'>
							<Cmn_product_slider ref={productSliderRef1} initialSlideProductId={1} onQuickView={openQuickView} />
						</div>
					</section>
				</div>

				{/* 4. Save More, Shop More Section */}
				<section className='bg-[#F9FAFB] py-7 md:py-14'>

					{/* Main Container */}
					<div className='main_container'>

						{/* Title */}
						<div className="flex flex-wrap  sm:gap-2 gap-0 items-center justify-between mt-8">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#0A0E17]">
								Save More, Shop More
							</h1>

							{/* Navigation Arrows */}
							<div className="flex items-center gap-2 ml-auto">
								<button
									onClick={handlePrev}
									className="rounded-full text-sm bg-[#FFFFFF] border border-[#E5E7EB] p-2.5">
									<FaChevronLeft className="" />
								</button>
								<button
									onClick={handleNext}
									className="rounded-full text-sm bg-[#FFFFFF] border border-[#E5E7EB] p-2.5">
									<FaChevronRight className="" />
								</button>
							</div>
						</div>

						{/* Card Grid */}
						<div
							ref={gridRef}
							className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-x-auto scroll-smooth"
						>
							{visibleCards.map((card, index) => (
								<div
									key={index}
									className="flex flex-col text-center items-center mt-6"
								>
									<img
										src={card.img}
										alt={card.heading}
										className="w-[70%] md:w-full h-auto object-cover mb-4"
									/>
									<h1 className="text-2xl font-bold text-[#F97316]">
										{card.heading}
									</h1>
									<p className="text-lg font-bold text-[#111827]">{card.desc1}</p>
									<p className="text-[15px] text-[#6B7280]">{card.desc2}</p>
									<p className="text-[15px] text-[#6B7280]">{card.desc3}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* 5. Hurry, Ends Tonight! Section */}
				<section className='bg-[#FFFFFF] my-7 md:my-14'>

					{/* Main Container */}
					<div className='main_container'>

						{/* Title */}
						<div className="flex items-center justify-between">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px]  font-bold  text-[#0A0E17]">
								Hurry, Ends Tonight!
							</h1>
						</div>

						{/* Main Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

							{/* Left Column */}
							{EndsImages.map((item, index) => (
								<div
									key={index}
									className="col-span-1 bg-[#fee3e4] flex flex-col items-center justify-center rounded-xl xl:p-8 py-8 px-4"
								>
									{/* Heading */}
									<p className="text-lg md:text-xl font-extrabold text-[#44506A] mb-1 ">
										{item.heading}
									</p>

									{/* Countdown */}
									<div className="flex items-center gap-3 text-4xl  lg:text-[38px]  font-bold text-[#44506A] mb-4">
										{formatTime(time)}
									</div>

									{/* Product Image */}
									<img
										src={item.img}
										alt={item.heading}
										className="w-[75%] md:w-[55%] lg:w-[70%] h-auto mb-3"
									/>

									<div className="text-center">
										{/* Offer */}
										<h1 className="text-[28px] md:text-4xl xl:text-[38px] font-extrabold text-[#F97316]">
											{item.offer}
										</h1>

										{/* Description */}
										<p className="text-base font-semibold mb-2">{item.desc}</p>

										{/* Prices */}
										<div className="flex items-center justify-center gap-2 font-semibold mb-4 flex-wrap">
											<span className="text-[#DC2626] text-base  line-through">
												{item.oldPrice}
											</span>
											<span className="text-lg">{item.newPrice}</span>
											<span className="block sm:inline text-sm italic text-[#6B7280]">
												({item.istInformation})
											</span>
										</div>

										{/* Button */}
										<button className="w-full py-2.5 font-semibold text-lg items-center bg-[#F97316] text-white rounded-lg ">
											{item.btnText}
										</button>
									</div>
								</div>
							))}

							{/* Right Categories */}
							<div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-2">
								{CategoryCards.map((item, index) => (
									<div
										key={index}
										className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
									>
										{/* Full Image */}
										<img
											src={item.img}
											alt={item.title}
											className="w-full h-full object-cover"
										/>

										{/* Overlay Text */}
										<div className="absolute bottom-2 left-2 right-2 rounded-lg flex justify-center items-center flex-col bg-white p-1  md:p-2">
											<p className=" text-[9px] sm:text-base md:text-[12px] lg:text-[14px] xl:text-base font-SemiBold  text-[#44506A]">
												{item.title}
											</p>
											<p className=" text-[11px] sm:text-[20px] md:text-[14px] lg:text-base xl:text-[20px] font-extrabold text-[#0A0E17]">
												{item.offer}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* 6. Trending Items Section */}
				<section className='bg-[#F9FAFB] py-7 md:py-14'>

					{/* Main Container */}
					<div className="main_container w-full py-6">

						{/* Title */}
						<div className="flex flex-wrap sm:gap-2 gap-0 items-center justify-between">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px] font-bold  text-[#0A0E17]">
								Trending Items
							</h1>

							{/* Navigation Arrows */}
							<div className="flex items-center gap-2 ml-auto">
								<button
									onClick={() => productSliderRef2.current?.prev()}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronLeft className="" />
								</button>
								<button
									onClick={() => productSliderRef2.current?.next()}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronRight className="" />
								</button>
							</div>
						</div>

						{/* image */}
						<div className='mt-6'>
							<Cmn_product_slider ref={productSliderRef2} initialSlideProductId={5} onQuickView={openQuickView} />
						</div>
					</div>
				</section>

				{/* 7. Offer Section */}
				<section className='bg-[#FFFFFF] my-7 md:my-14'>

					{/* Main Container */}
					<div className="main_container w-full">

						{/* image */}
						<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
							{/* Card 1 */}
							<div className="col-span-1 lg:col-span-3 bg-[#FFF9EE] rounded-xl md:p-8 p-4 flex flex-col sm:flex-col lg:flex-row items-center lg:items-center lg:justify-between gap-4 h-full">
								{/* Image */}
								<div className="flex-shrink-0 flex justify-center lg:justify-start">
									<img
										src={Offer1}
										alt="Furniture"
										className="w-40 md:w-52 lg:w-52 h-auto object-contain"
									/>
								</div>

								{/* Content */}
								<div className="text-center sm:text-center lg:text-left">
									<h4 className="text-[#2563EB] font-extrabold text-base lg:text-lg mb-1">
										UP TO 50% OFF
									</h4>
									<h2 className="text-lg md:text-xl lg:text-2xl text-[#111827] font-extrabold leading-snug">
										Modern & Stylish Furniture for Every Home
									</h2>
									<p className="text-[#44506A] font-medium text-base lg:text-lg mt-3">
										Upgrade your living with comfort & elegance
									</p>
									<button className="mt-4 lg:px-8 px-5 lg:py-[10px] py-2 bg-[#F97316] text-white lg:text-lg text-base font-medium rounded-lg">
										Shop Now
									</button>
								</div>
							</div>

							{/* Card 2 */}
							<div className="col-span-1 lg:col-span-2 bg-[#F0F7FF] rounded-xl md:p-8 p-4 flex flex-col sm:flex-col lg:flex-row flex-wrap xl:flex-nowrap lg:items-center lg:justify-center  gap-4 h-full">
								{/* Image */}
								<div className="flex-shrink-0 flex justify-center lg:justify-start">
									<img
										src={Offer2}
										alt="Mobiles"
										className="w-36 md:w-40 h-auto object-contain"
									/>
								</div>

								{/* Content */}
								<div className="w-full text-center">
									<h4 className="text-[#0A0E17] font-extrabold lg:text-lg text-base">
										UP TO 15% MORE OFF
									</h4>
									<h2 className="lg:text-2xl text-xl font-extrabold text-[#111827] leading-snug mt-1">
										Shop Mobiles & Tablets
									</h2>
									<p className="text-[#44506A] lg:text-lg text-base font-medium mt-3">
										Powerful, Sleek & Trusted, Smart. Sleek. Reliable.
									</p>
									<button className="mt-4 px-8 py-3 bg-[#2563EB] text-white lg:text-lg text-base font-semibold rounded-lg ">
										Shop Now
									</button>
								</div>
							</div>

						</div>



						{/* Card */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-4">
							{/* Card 1 */}
							<div className="relative bg-[#EEF2FF] rounded-xl overflow-hidden flex items-end justify-center text-center aspect-[4/5] w-full h-96">
								{/* Background Image */}
								<img
									src={card1}
									alt="Gaming Console"
									className="absolute inset-0 w-full h-full object-cover"
								/>

								{/* Text */}
								<h3 className="relative text-lg md:text-xl lg:text-2xl  font-extrabold  text-[#111827] pb-8">
									Find Ideal Gaming Consoles
								</h3>
							</div>

							{/* Card 2 */}
							<div className="relative bg-white border border-gray-100 rounded-xl md:p-8 p-4 w-full h-96 shadow-sm overflow-hidden flex items-center justify-center">

								{/* Title at Top */}
								<h3 className="absolute top-6 text-lg md:text-xl lg:text-2xl font-extrabold text-[#111827] text-center md:px-8 px-4">
									Toys Starting From AU$9
								</h3>

								{/* Image Center */}
								<img
									src={card2}
									alt="Toys"
									className="max-h-56 sm:max-h-64 md:max-h-72 lg:max-h-80 xl:max-h-[22rem] object-contain"
								/>

								{/* Content at Bottom */}
								<p className='absolute bottom-6 text-[#44506A] text-base lg:text-lg font-medium text-center md:px-8 px-4'>
									Creative playtime with toys that inspire  imagination and discovery
								</p>
							</div>

							{/* Card 3 */}
							<div className="relative bg-[#F97316]/20 rounded-xl md:p-8 p-4 w-full h-96 shadow-sm overflow-hidden flex items-center justify-center">

								{/* Title at Top */}
								<h3 className="absolute top-6 text-lg md:text-xl lg:text-2xl font-extrabold text-[#111827] text-center md:px-8 px-4">
									360° Sound for Every Corner
								</h3>

								{/* Image Center */}
								<img
									src={card3}
									alt="Toys"
									className="max-h-56 sm:max-h-64 md:max-h-72 lg:max-h-80 xl:max-h-[22rem] object-contain"
								/>

								{/* Content at Bottom */}
								<p className='absolute bottom-6 text-[#44506A] text-base lg:text-lg font-medium text-center md:px-8 px-4'>
									Hi-Res audio qualcomm aptx supported 30W sepaker
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* 8. Grand Global Brands Section */}
				<section className='bg-[#F9FAFB] py-7 md:py-14'>

					{/* Main Container */}
					<div className='main_container'>

						{/* Title */}
						<div className="flex items-center justify-between flex-wrap gap-2">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#0A0E17]">
								Grand Global Brands
							</h1>

							{/* Shop All Brands Button */}
							<div>
								<Link to={"/ShopAllBrands"}>
									<button className="bg-[#F97316] md:px-8 px-4 py-2 text-white md:text-lg text-base font-semibold rounded-lg ">
										Shop All Brands
									</button>
								</Link>
							</div>
						</div>

						{/* Category Header */}
						<div className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar mt-6">
							{categories.map((cat) => (
								<button
									key={cat}
									onClick={() => setActiveCategory(cat)}
									className={`relative py-2 text-[16px] text-nowrap font-semibold transition-colors ${activeCategory === cat ? "text-[#F97316]" : "text-[#6B7280]"
										}`}
								>
									{cat}
									{activeCategory === cat && (
										<span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F97316] rounded-full"></span>
									)}
								</button>
							))}
						</div>

						{/* Brands Grid */}
						<div className="h_brands-grid mt-6 ">
							{categoryBrands[activeCategory]?.map((brand, idx) => (
								<div
									key={idx}
									className="border rounded-lg flex justify-center items-center text-center font-semibold hover:bg-[#E5E7EB] hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
								>
									<img
										src={brand}
										alt={`brand-${idx}`}
										className="max-h-[60px] object-contain"
									/>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* 9. Discover What’s New Section */}
				<section className='bg-[#FFFFFF] md:my-14 my-7'>

					{/* Main Container */}
					<div className="main_container w-full">

						{/* Title */}
						<div className="flex justify-between items-center flex-wrap sm:gap-2 gap-0  ">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px] font-bold  text-[#0A0E17]">
								Discover What’s New
							</h1>

							{/* Navigation Arrows */}
							<div className="flex items-center gap-2 ml-auto">
								<button
									onClick={() => productSliderRef3.current?.prev()}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronLeft className="" />
								</button>
								<button
									onClick={() => productSliderRef3.current?.next()}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronRight className="" />
								</button>
							</div>
						</div>

						{/* image */}
						<div className='mt-6'>
							<Cmn_product_slider ref={productSliderRef3} initialSlideProductId={9} onQuickView={openQuickView} />
						</div>
					</div>
				</section>

				{/* 10. Deals For You Section */}
				<section className='bg-[var(--profile-bg)] py-7 md:py-14'>

					{/* Main Container */}
					<div className="main_container flex flex-col justify-between w-full">

						{/* Title */}
						<div className="flex flex-wrap gap-1 items-center justify-between">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px] font-bold  text-[#0A0E17]">
								Deals For You
							</h1>

							{/* Navigation Arrows */}
							<div className="flex items-center gap-2">
								<button
									onClick={handlePrev2}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronLeft className="" />
								</button>
								<button
									onClick={handleNext2}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronRight className="" />
								</button>
							</div>
						</div>

						{/* image */}
						<div className='overflow-hidden'>
							<div className='mt-6 flex gap-8 '>
								{visibleCards2.map((deal, index) => (
									<div
										key={index}
										className='w-full h-full'>
										<div className='lg:w-[200px] lg:h-[200px] sm:h-[176px] sm:w-[176px] w-[120px] h-[120px] mx-auto'>
											<img
												src={deal.img}
												alt={deal.label}
												className='rounded-full h-full w-full object-contain border border-[#E5E7EB]' />
										</div>

										<p className='text-base md:text-lg text-center text-[#111827] font-bold mt-3'>{deal.label}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* 11. Customer Favorites Section */}
				<section className='bg-[#FFFFFF] md:my-14 my-7 '>

					{/* Main Container */}
					<div className="main_container w-full">

						{/* Title */}
						<div className="flex items-center justify-between flex-wrap sm:gap-2 gap-0">
							{/* Title */}
							<h1 className="text-xl md:text-2xl lg:text-[32px] font-bold  text-[#0A0E17]">
								Customer Favorites
							</h1>

							{/* Navigation Arrows */}
							<div className="flex items-center gap-2">
								<button
									onClick={() => productSliderRef4.current?.prev()}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronLeft className="" />
								</button>
								<button
									onClick={() => productSliderRef4.current?.next()}
									className="rounded-full text-sm border bg-[#FFFFFF] border-[#E5E7EB] p-2.5 ">
									<FaChevronRight className="" />
								</button>
							</div>
						</div>

						{/* image */}
						<div className='mt-6'>
							<Cmn_product_slider ref={productSliderRef4} initialSlideProductId={13} onQuickView={openQuickView} />
						</div>
					</div>
				</section>

				{/* 12. Subscribe Section */}
				<Newsletter />



				{/* ******* 1. Welcome to CoralBay Modal ( Before Signup Popup ) ****** */}
				<Dialog open={openWelcomeToCoralBay} onClose={setOpenWelcomeToCoralBay} className="relative z-[999]">
					{/* Backdrop */}
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0"
					/>

					{/* Centered modal */}
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-3xl bg-white rounded-2xl shadow-xl transform transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex flex-col md:flex-row overflow-hidden px-3 pt-3 pb-0"
						>
							{/* Close button */}
							<IoMdClose
								onClick={() => setOpenWelcomeToCoralBay(false)}
								className="absolute right-4 top-4 text-[25px] text-gray-600 cursor-pointer bg-[#44506A33] p-1 rounded-full z-10"
							/>

							{/* Left Image Section (desktop only) */}
							<div className="hidden md:block w-1/2">
								<img
									src={WelcomeToCoralBay}
									alt="Shopping"
									className="h-[97%] w-full object-cover rounded-lg"
								/>
							</div>

							{/* Right Content Section with bg image on mobile */}
							<div
								className="w-full md:w-1/2 py-8 px-6 flex flex-col relative mb-3 md:bg-none rounded-lg"
								style={{
									backgroundImage: isMobile ? `url(${WelcomeToCoralBay})` : "none",
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								{/* Overlay for small screens */}
								<div className="absolute inset-0 bg-white/65 md:hidden rounded-lg"></div>

								<div className="relative z-10">
									<h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
										Welcome to CoralBay!
									</h2>
									<p className="text-[#44506A] mb-2 font-semibold text-lg sm:text-[22px]">
										Enjoy 10% off your first order.
										Sign up to get your exclusive code.
									</p>
									<p className="text-base sm:text-lg text-[#6B7280] mb-3">
										No spam. Unsubscribe anytime.
									</p>

									{/* Email Input */}
									<div className="flex flex-col gap-3">
										<input
											type="email"
											placeholder="Enter your email"
											className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-0"
										/>
										<button className="bg-[#F97316] text-white font-semibold py-3 text-base md:text-lg rounded-lg">
											Get My Discount
										</button>
									</div>
								</div>
							</div>
						</DialogPanel>
					</div>
				</Dialog>


				{/* ******* 2. Welcome back Modal ( After Login Popup ) ****** */}
				<Dialog open={openWelcomeback} onClose={setOpenWelcomeback} className="relative z-[999]">
					{/* Backdrop */}
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0"
					/>

					{/* Centered modal */}
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-3xl bg-white rounded-2xl shadow-xl transform transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex flex-col md:flex-row overflow-hidden px-3 pt-3 pb-0"
						>

							{/* Close button */}
							<IoMdClose
								onClick={() => setOpenWelcomeback(false)}
								className="absolute right-4 top-4 text-[25px] text-gray-600 cursor-pointer bg-[#44506A33] p-1 rounded-full z-10"
							/>

							{/* Left Image Section */}
							<div className="hidden md:block w-1/2">
								<img
									src={WelcomeBack}
									alt="Shopping"
									className="h-[97%] w-full object-cover rounded-lg"
								/>
							</div>

							{/* Right Content Section */}
							<div
								className="w-full md:w-1/2 py-8 px-6 flex flex-col relative mb-3 md:bg-none rounded-lg"
								style={{
									backgroundImage: isMobile ? `url(${WelcomeBack})` : "none",
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								{/* Overlay for small screens */}
								<div className="absolute inset-0 bg-white/70 md:hidden rounded-lg"></div>

								<div className="relative z-10">
									<h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
										Welcome back
									</h2>
									<p className="text-[#44506A] mb-2 font-semibold text-lg sm:text-[22px]">
										We’ve picked some fresh arrivals & deals just for you.
									</p>
									<p className="text-base sm:text-lg text-[#6B7280] mb-6">
										Shop now & unlock exclusive member discounts.
									</p>

									{/* Buttons */}
									<div className="flex flex-col gap-3 w-full max-w-sm">
										<button className="bg-[#F97316] text-white font-semibold py-3 text-base md:text-lg rounded-lg">
											View Recommendations
										</button>
										<button className="bg-[#FFFFFF] text-[#44506A] border border-[#44506A] font-semibold py-3 text-base md:text-lg rounded-lg">
											Continue Shopping
										</button>
									</div>
								</div>
							</div>

						</DialogPanel>
					</div>
				</Dialog>

				{/* ******* 3. Global QuickView Modal ****** */}
				{showQuickView && quickViewProduct && (
					<QuickView product={quickViewProduct} onClose={closeQuickView} />
				)}

			</div>
		</>
	)
}
