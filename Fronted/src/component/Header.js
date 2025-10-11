import React from 'react'
import '../App.css'
import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import logoIcon from '../images/LogoIcon.png'
import { RxCountdownTimer } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import CartItem from '../images/CartItem.png'
import { MdDeleteOutline } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import img_black from "../images/YouLikeProduct.png";
import img_blue from "../images/fashion-img(2).png";
import img_Yellow from "../images/fashion-img(3).png";
import img_orange from "../images/fashion-img(4).png";
import { MdCardGiftcard } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import GiftWrap from '../images/GiftWrap.png'
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getMainCategory, getCategory, getSubCategory, getInsideSubCategory } from '../Store/Slices/categorySlice';
import { getAuthData } from '../Store/Slices/authProfileSlice';
import { getWishlist } from '../Store/Slices/wishlistSlice';


export default function Header() {

    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [openCatCanvas, setOpenCatCanvas] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [productQty1, setProductQty1] = useState(1);
    const [productQty2, setProductQty2] = useState(1)
    const [notes, setNotes] = useState(false)
    const [shiping, setShipping] = useState(false)
    const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
    const [state, setState] = useState("");
    const [gift, setGift] = useState(false);
    const [giftAdd, setGiftAdd] = useState(false);
    const menuRef = useRef(null);
    const searchDropRef = useRef(null)
    const navigate = useNavigate()
    const [openTrackOrderVerify, setOpenTrackOrderVerify] = useState(false)
    const [trackOTPVerify, setTrackOTPVerify] = useState(false)
    const dispatch = useDispatch();


    const authData = useSelector((state) => state.authProfie.userData)

    const token = localStorage.getItem('token');
    // console.log('Token ::' , token)

    useEffect(() => {
        if (token) {
            dispatch(getAuthData())
        }
    }, [token])

    // console.log("Auth Data Header :::" , authData)


    // Stop Body Scroll - Canvas 
    useEffect(() => {
        if (openCart || openCatCanvas) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";

            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [openCart, openCatCanvas]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        const handleScroll = () => {
            setOpenMenu(null);
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Search Dropdown hide when click outside or scroll
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchDropRef.current && !searchDropRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };

        const handleScroll = () => {
            setShowSearchDropdown(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // You May Also Like Products
    const products = [
        {
            title: "Melton Peacoat",
            price: "AU$ 120.00",
            rating: 5,
            variants: [
                { color: "#0A0E17", image: img_black },
                { color: "#44506A", image: img_blue },
                { color: "#F59E0B", image: img_Yellow },
                { color: "#F97316", image: img_orange },
            ]
        },
        {
            title: "Casual Hoodie",
            price: "AU$ 89.00",
            rating: 4,
            variants: [
                { color: "#44506A", image: img_blue },
                { color: "#0A0E17", image: img_black },
                { color: "#F59E0B", image: img_Yellow },
                { color: "#F97316", image: img_orange },
            ]
        },
        {
            title: "Leather Boots",
            price: "AU$ 150.00",
            rating: 3,
            variants: [
                { color: "#F97316", image: img_orange },
                { color: "#F59E0B", image: img_Yellow },
                { color: "#0A0E17", image: img_black },
                { color: "#44506A", image: img_blue },
            ]
        },
    ];

    const scrollRef = useRef(null);
    const [activeColors, setActiveColors] = useState(products.map(() => 0));

    const handleColorChange = (productIndex, colorIndex) => {
        const updated = [...activeColors];
        updated[productIndex] = colorIndex;
        setActiveColors(updated);
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            const item = scrollRef.current.firstChild;
            if (!item) return;
            const style = window.getComputedStyle(scrollRef.current);
            const gap = parseInt(style.gap) || 0;
            const scrollAmount = item.offsetWidth + gap;
            scrollRef.current.scrollLeft -= scrollAmount;
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            const item = scrollRef.current.firstChild;
            if (!item) return;
            const style = window.getComputedStyle(scrollRef.current);
            const gap = parseInt(style.gap) || 0;
            const scrollAmount = item.offsetWidth + gap;
            scrollRef.current.scrollLeft += scrollAmount;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            scrollRef.current.scrollLeft = 0;
        };
        window.addEventListener("resize", handleResize);



        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Shipping > State Dropdown
    const states = ["Gujarat", "Maharastra", "Rajasthan", "Madhya Pradesh"];



    // ************ Category **************

    useEffect(() => {
        dispatch(getMainCategory())
        dispatch(getCategory());
        dispatch(getSubCategory());
        dispatch(getInsideSubCategory())
    }, [dispatch])

    const mainCategory = useSelector((state) => state.category.mainCategory.data);
    const category = useSelector((state) => state.category.category.data);
    const subCategory = useSelector((state) => state.category.subCategory.data);
    const insideSubCategory = useSelector((state) => state.category.inSubCategory.data);

    // console.log("insideSubCategory :: ", insideSubCategory)

    const toggleMenu = (id) => {
        // alert(id)
        setOpenMenu(openMenu === id ? null : id);
    };

    const handleToggleAccordion = (id) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    

    useEffect(()=>{
        dispatch(getWishlist())
    },[])

    // Wishlist
    const wishData = useSelector((state) => state.wishlist.wishlistData)
    const wishBadge = wishData?.length;



    return (
        <>


            {/* Header */}
            <section className=' bg-[var(--bg-white)] sticky top-0 z-[99] shadow-md'>
                <div className='main_container'>
                    <div className="  flex flex-wrap sm:flex-nowrap sm:gap-0 gap-2 items-center xl:px-0 py-3  relative">
                        {/* Logo */}
                        <div className="flex justify-center items-center gap-1 cursor-pointer" onClick={() => navigate("/")} >
                            <img src={logoIcon} alt="Coralbay" className="md:w-8 md:h-8 w-6 h-6" />
                            <h5 className="text-[var(--logo-heading-text)] font-[700] md:text-2xl text-xl">
                                CORALBAY
                            </h5>
                        </div>

                        {/* Searchbar */}
                        <div className="relative sm:w-96 sm:order-1 order-2 w-full ms-auto sm:px-3">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more "
                                className="w-full py-1.5 sm:ps-4 ps-2 pe-10 rounded-md border border-[var(--header-gray-bg)] bg-[var(--header-gray-bg)] focus:outline-none placeholder:truncate placeholder:text-[var(--header-placeholder)]"
                                onFocus={() => setShowSearchDropdown(true)}
                                onChange={() => setShowSearchDropdown(true)}
                                onBlur={() => setTimeout(() => setShowSearchDropdown(false))}
                            />
                            <IoSearchSharp className="absolute top-1/2 sm:right-5 right-3 -translate-y-1/2 text-[var(--header-text-orange)] text-lg" />

                            {/* Search Dropdown */}
                            {showSearchDropdown && (
                                <div ref={searchDropRef} className="absolute left-0 top-full mt-1 w-full bg-[var(--bg-white)] shadow-md rounded-md border border-[var(--header-border-dropdown)] z-[99] py-2">

                                    {/* Recent Searches */}
                                    <ul className="text-[var(--dropdown-text-color)] text-base font-medium">
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <RxCountdownTimer /> Samsung S24 Plus
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <RxCountdownTimer /> Kirke Perfume
                                            </Link>
                                        </li>
                                    </ul>

                                    {/* Trending Section */}
                                    <h5 className="px-4 pt-3 pb-1 text-[var(--header-tranding-textheaded)] font-bold text-base">
                                        TRENDING
                                    </h5>
                                    <ul className="text-[var(--dropdown-text-color)] text-base font-medium">
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <IoSearchOutline /> Books
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <IoSearchOutline /> Laptop
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <IoSearchOutline /> Watches
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <IoSearchOutline /> Watches
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <IoSearchOutline /> T-shirts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <IoSearchOutline /> Lakmē
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--dropdown-hover)]">
                                                <IoSearchOutline /> iPhone 17 Pro Max
                                            </Link>
                                        </li>
                                    </ul>

                                </div>
                            )}

                        </div>

                        {/* Profile - Wishlist - Cart */}
                        <div className="flex items-center gap-3 sm:ms-0 ms-auto text-[22px] text-[var(--header-icon-color)] sm:order-2 order-1 relative">

                            {/* Profile */}
                            <div className="relative">

                                <FaRegUserCircle
                                    className="cursor-pointer"
                                    onClick={() => setShowUserDropdown(true)}
                                />

                                {showUserDropdown && (
                                    <>

                                        {/* Hide Dropdown when click outside */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowUserDropdown(false)}
                                        ></div>

                                        {/* User Dropdown */}
                                        <div className="absolute left-1/2 -translate-x-1/2 sm:mt-5 mt-3 w-48 bg-[var(--bg-white)] shadow-lg rounded-md border border-[var(--header-border-dropdown)] z-50">

                                            {/* Cap */}
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
                                            border-l-8 border-r-8 border-b-8
                                            border-l-transparent border-r-transparent 
                                            border-b-[var(--bg-white)]"></div>

                                            <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-0 h-0 
                                            border-l-8 border-r-8 border-b-8
                                            border-l-transparent border-r-transparent 
                                            border-b-[var(--header-border-dropdown)]"></div>

                                            {token ? (
                                                <div>
                                                    {/* LogIn user */}
                                                    <ul className="text-[var(--dropdown-text-color)] text-base font-medium relative z-10 py-2">
                                                        <li className="block px-3 py-2 text-[14px] text-[var(--dropdown-dark-text)] font-bold">
                                                            Hello, {authData.firstName}
                                                        </li>
                                                        <li>
                                                            <Link
                                                                onClick={() => setShowUserDropdown(false)}
                                                                to="/profile/PersonalInformation"
                                                                className="block px-3 py-2 hover:bg-[var(--dropdown-hover)]"
                                                            >
                                                                Account
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                onClick={() => setShowUserDropdown(false)}
                                                                to="/profile/Saveaddress"
                                                                className="block px-3 py-2 hover:bg-[var(--dropdown-hover)]"
                                                            >
                                                                Save address
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                onClick={() => setShowUserDropdown(false)}
                                                                to="/profile/Orders"
                                                                className="block px-3 py-2 hover:bg-[var(--dropdown-hover)]"
                                                            >
                                                                Orders
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                onClick={() => setShowUserDropdown(false)}
                                                                to="/profile/Orders"
                                                                // to="#"
                                                                // onClick={ () => setOpenTrackOrderVerify(true) }
                                                                className="block px-3 py-2 hover:bg-[var(--dropdown-hover)]"
                                                            >
                                                                Track Order
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                onClick={() => { setShowUserDropdown(false); navigate('/'); localStorage.removeItem('token'); }}
                                                                to="/"
                                                                className="block px-3 py-2 hover:bg-[var(--dropdown-hover)] text-[var(--text-red)] "
                                                            >
                                                                Sign out
                                                            </Link>
                                                        </li>
                                                    </ul>

                                                </div>
                                            ) :
                                                (
                                                    <div>
                                                        {/* Login - Not LogInUser */}
                                                        <div className='z-10 relative p-2 text-base'>
                                                            <button className='bg-[var(--bg-orange)] w-full rounded-md p-2 text-[var(--text-white)] font-semibold' onClick={() => navigate('/login')}>LOGIN</button>
                                                            <p className='mt-2 text-[var(--dropdown-text-color)] font-medium text-[15px] flex justify-between'>New Customer? <span className='text-[var(--dropdown-dark-text)] font-semibold cursor-pointer' onClick={() => navigate('/login', { state: { signup: true } })} >Sign Up</span> </p>
                                                        </div>
                                                    </div>
                                                )}





                                        </div>
                                    </>
                                )}

                            </div>



                            {/* Wishlist */}
                            <div className="relative" onClick={() => { if (!token) { navigate('/login') } else { navigate('/wishlist') } }}   >
                                <FaRegHeart className="cursor-pointer" />
                                { (token && wishBadge > 0 ) && (
                                    <span className="absolute -top-2.5 -right-3 bg-[var(--bg-black)] text-[var(--text-white)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishBadge}
                                    </span>
                                )}
                            </div>

                            {/* Cart */}
                            <div className="relative">
                                <HiOutlineShoppingCart
                                    className="cursor-pointer"
                                    onClick={()=> navigate('addToCart')}
                                    // onClick={() => setOpenCart(true)}
                                />
                                <span className="absolute -top-2.5 -right-2 bg-[var(--bg-black)] text-[var(--text-white)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    6
                                </span>

                                {/* Cart - OffCanvas */}
                                <div
                                    className={`fixed top-0 right-0 h-full w-full sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] bg-[var(--bg-white)] shadow-lg z-50 transition-transform duration-300 ease-in-out
                                        ${openCart ? "translate-x-0" : "translate-x-full"}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center px-5 py-4 ">
                                        <h2 className="text-xl text-[var(--canvas-main-heading)] font-medium">
                                            Shopping cart
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={() => setOpenCart(false)}
                                        >
                                            <HiX size={20} color='var(--canvas-main-heading)' />
                                        </button>
                                    </div>

                                    {/* Canvas -  Body */}
                                    <div className=" flex flex-col h-[calc(100vh-60px)]">

                                        <div className='flex-1 overflow-y-auto bg-[var(--cart-can-bg)]'>

                                            <div className='bg-[var(--bg-white)] px-5 py-2'>

                                                {/* Gift */}
                                                {giftAdd && (

                                                    <div className="flex gap-2 my-3">

                                                        <div className="md:h-24 md:w-24 h-20 w-20">
                                                            <img
                                                                src={GiftWrap}
                                                                alt="Product"
                                                                className="max-h-full max-w-full object-contain rounded-md"
                                                            />
                                                        </div>


                                                        <div className="flex-1 flex flex-col justify-between">

                                                            <div className="flex justify-between items-center">
                                                                <h3 className="lg:text-lg text-base font-semibold text-[var(--canvas-dark-text)]">
                                                                    Gift Wrap
                                                                </h3>
                                                                <MdDeleteOutline className="cursor-pointer text-[#787878]" onClick={() => setGiftAdd(false)} />
                                                            </div>


                                                            <h6 className="text-[var(--canvas-dark-text)] lg:text-lg text-base font-medium">
                                                                AU$ 20.00
                                                            </h6>
                                                        </div>
                                                    </div>
                                                )}


                                                {/* Product - 1 */}
                                                <div className="flex items-start gap-2 my-3">

                                                    <div className="md:h-24 md:w-24 h-20 w-20 ">
                                                        <img
                                                            src={CartItem}
                                                            alt="Product"
                                                            className="max-h-full max-w-full object-contain rounded-md"
                                                        />
                                                    </div>

                                                    <div className="flex-1">

                                                        <div className="flex justify-between items-center w-full">
                                                            <h3 className='lg:text-lg text-base font-semibold text-[var(--canvas-dark-text)]'>Melton peacoat</h3>
                                                            <span className='text-[#787878]'>
                                                                <MdDeleteOutline className='cursor-pointer' />
                                                            </span>
                                                        </div>

                                                        <p className='text-[var(--canvas-light-text)] lg:text-base text-sm'> Green | <span>M</span> </p>

                                                        <div className='flex justify-between items-center w-full md:mt-2 '>

                                                            <h6 className='text-[var(--canvas-dark-text)] lg:text-lg text-base font-medium'>AU$ 120.00</h6>

                                                            <div className='bg-[var(--cart-can-bg)] text-[var(--canvas-dark-text)]  border border-[#E5E7EB] rounded-md lg:py-1 py-1.5 px-2 flex items-center gap-2'>
                                                                <FaMinus size={14} className='cursor-pointer' onClick={() => setProductQty1(prev => (prev > 1 ? prev - 1 : 1))} />
                                                                <span className='w-6 text-center lg:text-lg text-base'>{productQty1}</span>
                                                                <FaPlus size={14} className='cursor-pointer' onClick={() => setProductQty1(prev => prev + 1)} />
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* Product - 2 */}
                                                <div className="flex items-start gap-2 my-3">

                                                    <div className="md:h-24 md:w-24 h-20 w-20 ">
                                                        <img
                                                            src={CartItem}
                                                            alt="Product"
                                                            className="max-h-full max-w-full object-contain rounded-md"
                                                        />
                                                    </div>

                                                    <div className="flex-1">

                                                        <div className="flex justify-between items-center w-full">
                                                            <h3 className='lg:text-lg text-base font-semibold text-[var(--canvas-dark-text)]'>Melton peacoat</h3>
                                                            <span className='text-[#787878]'>
                                                                <MdDeleteOutline className='cursor-pointer' />
                                                            </span>
                                                        </div>

                                                        <p className='text-[var(--canvas-light-text)] lg:text-base text-sm'> Green | <span>M</span> </p>

                                                        <div className='flex justify-between items-center w-full md:mt-2 '>

                                                            <h6 className='text-[var(--canvas-dark-text)] lg:text-lg text-base font-medium'>AU$ 120.00</h6>

                                                            <div className='bg-[var(--cart-can-bg)] text-[var(--canvas-dark-text)]  border border-[#E5E7EB] rounded-md lg:py-1 py-1.5 px-2 flex items-center gap-2'>
                                                                <FaMinus size={14} className='cursor-pointer' onClick={() => setProductQty2(prev => (prev > 1 ? prev - 1 : 1))} />
                                                                <span className='w-6 text-center lg:text-lg text-base'>{productQty2}</span>
                                                                <FaPlus size={14} className='cursor-pointer' onClick={() => setProductQty2(prev => prev + 1)} />
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>





                                            </div>

                                            <div className='p-5 bg-[var(--cart-can-bg)] '>


                                                {/* Header */}
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-[var(--text-black)] text-xl font-semibold">
                                                        You may also like
                                                    </h3>
                                                    <div className="flex items-center gap-3">
                                                        <MdOutlineKeyboardArrowLeft
                                                            onClick={scrollLeft}
                                                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer"
                                                        />
                                                        <MdOutlineKeyboardArrowRight
                                                            onClick={scrollRight}
                                                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Slider */}
                                                <div
                                                    ref={scrollRef}
                                                    className="flex gap-4 overflow-x-hidden w-full scroll-smooth no-scrollbar mt-4 mb-5"
                                                >
                                                    {products.map((product, i) => (
                                                        <div key={i} className="flex items-start gap-2 my-3 min-w-full">
                                                            {/* Product Image */}
                                                            <div className="h-24 w-24">
                                                                <img
                                                                    src={product.variants[activeColors[i]].image}
                                                                    alt={product.title}
                                                                    className="max-h-full max-w-full object-contain rounded-md"
                                                                />
                                                            </div>

                                                            {/* Product Info */}
                                                            <div className="flex-1 relative">
                                                                {/* Stars */}
                                                                <div className="flex items-center">
                                                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                                                        <IoMdStar
                                                                            key={starIndex}
                                                                            size={20}
                                                                            color={
                                                                                starIndex < product.rating ? "#F59E0B" : "#E5E7EB"
                                                                            }
                                                                        />
                                                                    ))}
                                                                </div>

                                                                {/* Title */}
                                                                <h3 className="lg:text-lg text-base font-semibold text-[var(--canvas-dark-text)]">
                                                                    {product.title}
                                                                </h3>

                                                                {/* Price */}
                                                                <h6 className="text-[var(--canvas-light-text)] md:text-base text-sm font-normal">
                                                                    {product.price}
                                                                </h6>

                                                                {/* Colors */}
                                                                <div className="product-color flex gap-2 mt-1">
                                                                    {product.variants.map((variant, colorIndex) => (
                                                                        <div
                                                                            key={colorIndex}
                                                                            onClick={() => handleColorChange(i, colorIndex)}
                                                                            className={`w-4 h-4 rounded-full cursor-pointer transition
                                                                                ${activeColors[i] === colorIndex
                                                                                    ? "ring-2 ring-offset-2"
                                                                                    : ""
                                                                                }`}
                                                                            style={{
                                                                                backgroundColor: variant.color,
                                                                                ...(activeColors[i] === colorIndex && {
                                                                                    "--tw-ring-color": variant.color,
                                                                                }),
                                                                            }}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>

                                        </div>


                                        {!notes && !shiping && !gift && (

                                            <div className='p-5 bg-[var(--cart-can-bg)] border border-[#E5E7EB]'>
                                                <div className='flex flex-row items-center justify-center py-7 text-[--canvas-light-text] font-medium'>



                                                    <div className='flex-1 flex flex-col items-center gap-2 border-r border-[#E5E7EB] cursor-pointer' onClick={() => setNotes(true)} >
                                                        <GrNotes size={24} />
                                                        <span className='text-base'>Notes</span>
                                                    </div>

                                                    <div className={`flex-1 flex flex-col items-center gap-2  px-2 sm:px-0 cursor-pointer  ${giftAdd ? "" : "border-r border-[#E5E7EB]"} `} onClick={() => setShipping(true)} >
                                                        <MdOutlineLocalShipping size={26} />
                                                        <span className='text-base'>Shipping</span>
                                                    </div>

                                                    {!giftAdd && (

                                                        <div className='flex-1 flex flex-col items-center gap-2 cursor-pointer' onClick={() => setGift(true)}>
                                                            <MdCardGiftcard size={26} />
                                                            <span className='text-base'>Gift</span>
                                                        </div>
                                                    )}

                                                </div>

                                                <div className='flex justify-between items-center text-[var(--canvas-dark-text)] font-bold text-lg'>
                                                    <h5 className=''>Subtotal</h5>
                                                    <h5>AU$ 240.00</h5>
                                                </div>

                                                <div className='flex items-center gap-2 my-5'>
                                                    <input type="checkbox" className='accent-[var(--text-orange)]' id='acceptTerms' />
                                                    <label className='text-[#6B7280] sm:text-base text-sm font-medium' for='acceptTerms'> I agree with the <span className='text-[var(--canvas-light-text)] cursor-pointer underline underline-[var(--canvas-light-text)]'>terms & conditions</span> </label>
                                                </div>

                                                <div className='text-lg font-semibold flex flex-col gap-2'>
                                                    <button className='bg-[var(--bg-orange)] w-full text-[var(--text-white)] rounded-md p-2'>Checkout</button>
                                                    <button className='border border-[#6B7280] text-[#6B7280] rounded-md p-2' onClick={()=> {navigate('/addtocart'); setOpenCart(false)}}>View Cart</button>
                                                </div>

                                            </div>
                                        )}


                                        {/* Order Notes */}
                                        {notes && (
                                            <div className='p-5 bg-[var(--bg-white)] flex flex-col h-[370px] '>

                                                <div className='flex-1 '>
                                                    <div className='text-[var(--canvas-dark-text)] flex gap-2 items-center text-lg font-semibold'>
                                                        <GrNotes size={24} /> <span>Order special instructions</span>
                                                    </div>

                                                    <textarea className='w-full h-40 resize-none border border-[#44506A33] rounded-md my-3 focus:outline-none text-base'></textarea>
                                                </div>


                                                <div className='text-lg font-semibold flex flex-col gap-2'>
                                                    <button className='bg-[var(--bg-orange)] w-full text-[var(--text-white)] rounded-md p-2'>Save</button>
                                                    <button className='border border-[#6B7280] text-[#6B7280] rounded-md p-2' onClick={() => setNotes(false)}>Cancel</button>
                                                </div>

                                            </div>
                                        )}

                                        {/* Shipping */}
                                        {shiping && (
                                            <div className='p-5 bg-[var(--bg-white)] flex flex-col h-[370px] '>

                                                <div className='flex-1 '>
                                                    <div className='text-[var(--canvas-dark-text)] flex gap-2 items-center text-lg font-semibold my-3'>
                                                        <MdOutlineLocalShipping size={26} /> <span>Get shipping estimates</span>
                                                    </div>

                                                    <div className="flex flex-col">

                                                        <div className="flex flex-col relative">
                                                            <label className="text-[var(--canvas-light-text)] text-base font-semibold mb-1">
                                                                Province <span className="text-[var(--text-orange)]">*</span>
                                                            </label>

                                                            <div
                                                                className="w-full border border-[#44506A33] rounded-md px-3 py-2 flex items-center justify-between cursor-pointer bg-[var(--bg-white)] text-base"
                                                                onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                                                            >
                                                                <span
                                                                    className={
                                                                        state ? "text-[var(--canvas-dark-text)]" : "text-[var(--canvas-light-text)]"
                                                                    }
                                                                >
                                                                    {state || "Select State"}
                                                                </span>
                                                                <MdOutlineKeyboardArrowDown
                                                                    className={`transition-transform ${stateDropdownOpen ? "rotate-180" : "rotate-0"}`}
                                                                />
                                                            </div>

                                                            {stateDropdownOpen && (
                                                                <ul className="absolute top-full mt-1 w-full bg-white border border-[#44506A33] rounded-md shadow-md max-h-48 overflow-y-auto z-50 text-base">
                                                                    {states.map((prov, id) => (
                                                                        <li
                                                                            key={id}
                                                                            className={`px-3 py-2 cursor-pointer hover:bg-[var(--cart-can-bg)] ${state === prov ? "font-semibold bg-[var(--cart-can-bg)]" : ""
                                                                                }`}
                                                                            onClick={() => {
                                                                                setState(prov);
                                                                                setStateDropdownOpen(false);
                                                                            }}
                                                                        >
                                                                            {prov}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}

                                                        </div>

                                                        {/* ZIP code */}
                                                        <label className="text-[var(--canvas-light-text)] text-base font-semibold mt-3 mb-1">
                                                            ZIP code <span className="text-[var(--text-orange)]">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter ZIP code"
                                                            className="text-base px-3 py-2 focus:outline-none rounded-md border border-[#44506A33]"
                                                        />
                                                    </div>


                                                </div>


                                                <div className='text-lg font-semibold flex flex-col gap-2'>
                                                    <button className='bg-[var(--bg-orange)] w-full text-[var(--text-white)] rounded-md p-2'>Save</button>
                                                    <button className='border border-[#6B7280] text-[#6B7280] rounded-md p-2' onClick={() => setShipping(false)}>Cancel</button>
                                                </div>

                                            </div>
                                        )}


                                        {/* Gift */}
                                        {gift && (
                                            <div className='p-5 bg-[var(--bg-white)] flex flex-col'>

                                                <div className='flex-1 '>
                                                    <div className='text-[var(--canvas-dark-text)] flex gap-2 items-center text-lg font-semibold'>
                                                        <MdCardGiftcard size={26} /> <span>Gift</span>
                                                    </div>

                                                    <p className='text-[var(--canvas-dark-text)] text-base font-medium my-5'>Do you want a gift wrap? Only AU$20</p>

                                                </div>

                                                <div className='text-lg font-semibold flex flex-col gap-2'>
                                                    <button className='bg-[var(--bg-orange)] w-full text-[var(--text-white)] rounded-md p-2' onClick={() => { setGiftAdd(true); setGift(false); }}>Add a gift wrap</button>
                                                    <button className='border border-[#6B7280] text-[#6B7280] rounded-md p-2' onClick={() => setGift(false)}>Cancel</button>
                                                </div>

                                            </div>
                                        )}



                                    </div>

                                </div>

                                {/* Backdrop also click event close - offcanvas */}
                                {openCart && (
                                    <div
                                        onClick={() => setOpenCart(false)}
                                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                    />
                                )}
                            </div>





                            {/* Btn - OffCanvas Category */}
                            <div className='md:hidden block' onClick={() => setOpenCatCanvas(true)} >
                                <FaBars />
                            </div>

                            {/* Offcanvas - category */}
                            <div
                                className={`fixed top-0 left-0 h-full w-4/5 sm:w-1/2 bg-[var(--bg-white)] shadow-lg z-[100]  transition-transform duration-300 ease-in-out
                                        ${openCatCanvas ? "translate-x-0" : "-translate-x-full"} md:hidden `}   >

                                <div className="flex justify-between items-center px-5 py-4 border-b">
                                    <h2 className='text-xl text-[var(--dropdown-dark-text)] font-medium'>Categories</h2>
                                    <button onClick={() => setOpenCatCanvas(false)}>
                                        <HiX size={20} />
                                    </button>
                                </div>

                                <div className="p-5 overflow-y-auto h-screen">
                                    <div className="w-full max-w-md mx-auto space-y-5">

                                        <div>
                                            {mainCategory?.map((main) => {
                                                const hasCategories = category?.some(
                                                    (cat) => cat.mainCategoryId === main._id
                                                );

                                                return (
                                                    <div key={main._id} className="mb-4">
                                                        {/* Main Category */}
                                                        <div
                                                            onClick={() => hasCategories && handleToggleAccordion(main._id)}
                                                            className="cursor-pointer flex justify-between items-center text-lg text-[var(--dropdown-dark-text)] font-medium "
                                                        >
                                                            <span className='w-full'>{main.mainCategoryName}</span>

                                                            {hasCategories && (
                                                                <span>
                                                                    {openIndex === main._id ? <FaAngleUp /> : <FaAngleDown />}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Dropdown Content */}
                                                        {openIndex === main._id && (
                                                            <div className="text-base mt-2 ps-2">
                                                                {category
                                                                    ?.filter((cat) => cat.mainCategoryId === main._id)
                                                                    .map((cat) => (
                                                                        <div key={cat._id} className="mb-3">
                                                                            {/* Category */}
                                                                            <h3 className="font-semibold mb-2 text-base text-[var(--dropdown-dark-text)]"  >
                                                                                {cat.categoryName}
                                                                            </h3>

                                                                            {/* Subcategories */}
                                                                            <ul className="space-y-2 mb-3 text-sm text-[var(--dropdown-mmenu-text)] font-normal">
                                                                                {subCategory
                                                                                    ?.filter((sub) => sub.categoryId === cat._id)
                                                                                    .map((sub) => {
                                                                                        const insideSubs = insideSubCategory.filter(
                                                                                            (inside) => inside.subCategoryId?._id === sub._id
                                                                                        );

                                                                                        return (
                                                                                            <li key={sub._id} >
                                                                                                {insideSubs.length > 0 ? (
                                                                                                    <>
                                                                                                        {/* Subcategory heading */}
                                                                                                        <h4 className="text-base font-semibold text-[var(--dropdown-dark-text)] mb-1" >
                                                                                                            {sub.subCategoryName}
                                                                                                        </h4>

                                                                                                        {/* Inside Subcategories */}
                                                                                                        <ul className="space-y-2 text-sm text-[var(--dropdown-mmenu-text)]">
                                                                                                            {insideSubs.map((inside) => (
                                                                                                                <li key={inside._id} onClick={() => alert(inside.insideSubCategoryName)}>
                                                                                                                    {inside.insideSubCategoryName}
                                                                                                                </li>
                                                                                                            ))}
                                                                                                        </ul>
                                                                                                    </>
                                                                                                ) : (
                                                                                                    // Subcategory without inside subs
                                                                                                    <h4 className="text-sm text-[var(--dropdown-mmenu-text)] font-normal" >
                                                                                                        {sub.subCategoryName}
                                                                                                    </h4>
                                                                                                )}
                                                                                            </li>
                                                                                        );
                                                                                    })}
                                                                            </ul>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    </div>
                                </div>


                            </div>

                            {/* Backdrop also click event close - offcanvas */}
                            {openCatCanvas && (
                                <div onClick={() => setOpenCatCanvas(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
                            )}


                        </div>
                    </div>
                </div>
            </section>



            {/* Category */}
            <section className='bg-[var(--bg-category)]'>
                <div className='main_container'>
                    <div className="relative text-[var(--text-white)]  py-3 w-full hidden md:block" ref={menuRef}>

                        <div className="overflow-x-auto custom-scrollbar">
                            <div className="flex justify-between items-center min-w-max w-full">

                                {mainCategory?.map((main) => {

                                    const hasCategories = category?.some(
                                        (cat) => cat.mainCategoryId === main._id
                                    );


                                    return (

                                        <div
                                            className="cursor-pointer flex items-center gap-2 shrink-0 px-2  xl:ps-0"

                                            onClick={() => hasCategories && toggleMenu(main._id)}
                                        >
                                            {main.mainCategoryName}


                                            {hasCategories && (
                                                openMenu === main._id ? (
                                                    <FaAngleUp className="text-sm text-[var(--header-text-orange)]" />
                                                ) : (
                                                    <FaAngleDown className="text-sm" />
                                                )
                                            )
                                            }



                                            {openMenu === main._id && (
                                                <div className="absolute left-0 top-full w-full bg-[var(--bg-white)] shadow-lg z-[90]">

                                                    <div className="max-w-7xl min-w-full px-6 py-6 bg-white 
                                                        [column-count:5]  [column-fill:balance] [column-gap:1.5rem] 
                                                        max-h-[500px] xl:max-h-[550px] 
                                                        overflow-auto cursor-auto break-words cat-scrollbar">
                                                        {category
                                                            .filter((cat) => cat.mainCategoryId === main._id)
                                                            .map((cat) => (
                                                                <div key={cat._id} className="break-inside-avoid mb-2">
                                                                    {/* Category */}
                                                                    <h3 className="font-semibold mb-2 text-base text-[var(--dropdown-dark-text)] cursor-pointer">
                                                                        {cat.categoryName}
                                                                    </h3>

                                                                    {/* Subcategories */}
                                                                    <ul className="space-y-2 mb-2 text-sm text-[var(--dropdown-mmenu-text)] font-normal cursor-pointer">
                                                                        {subCategory
                                                                            .filter((sub) => sub.categoryId === cat._id)
                                                                            .map((sub) => {
                                                                                const insideSubs = insideSubCategory.filter(
                                                                                    (inside) => inside.subCategoryId?._id === sub._id
                                                                                );

                                                                                return (
                                                                                    <li key={sub._id}>
                                                                                        {insideSubs.length > 0 ? (
                                                                                            <>
                                                                                                {/* Subcategory as heading */}
                                                                                                <h4 className="text-base font-semibold text-[var(--dropdown-dark-text)] mb-1 cursor-pointer">
                                                                                                    {sub.subCategoryName}
                                                                                                </h4>
                                                                                                <ul className="space-y-2 text-sm text-[var(--dropdown-mmenu-text)] cursor-pointer">
                                                                                                    {insideSubs.map((inside) => (
                                                                                                        <li key={inside._id}>{inside.insideSubCategoryName}</li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </>
                                                                                        ) : (
                                                                                            // Normal subcategory - no insideSubCategory
                                                                                            <h4 className='space-y-2 text-sm text-[var(--dropdown-mmenu-text)] font-normal'>
                                                                                                {sub.subCategoryName}
                                                                                            </h4>
                                                                                        )}
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                    </div>


                                                </div>
                                            )}

                                        </div>
                                    )

                                })

                                }


                            </div>
                        </div>

                    </div>
                </div>
            </section>





            {/* Modal - Track Order - 1 (OrderID and MobileNo) */}
            <Dialog open={openTrackOrderVerify} onClose={setOpenTrackOrderVerify} className="relative z-[999]">
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
                                Track Order
                            </DialogTitle>
                            <IoMdClose onClick={() => setOpenTrackOrderVerify(false)} className="text-[24px] text-[var(--profile-dark-text)] cursor-pointer bg-[#44506A33] p-1 rounded-full" />
                        </div>

                        <div className="border-b border-[var(--profile-border,#ddd)]"></div>

                        {/* Scrollable Body */}
                        <div className="py-5 space-y-4 ">
                            {/* Id */}
                            <div>
                                <p className='text-base text-[var(--profile-light-text)] font-semibold mb-1'>Order ID  </p>
                                <input type="text" placeholder='Enter Order ID' className='focus:outline-none text-base border border-[#44506A33] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]' />
                            </div>
                            {/* Mobile No */}
                            <div>
                                <p className='text-base text-[var(--profile-light-text)] font-semibold mb-1'>Mobile Number</p>
                                <input type="text" placeholder='Enter Your Number' className='focus:outline-none text-base border border-[#44506A33] rounded-md p-2 w-full placeholder:text-[var(--profile-darkgray-text)]' />
                            </div>

                        </div>


                        {/* Footer */}
                        <div className="flex w-full gap-3">
                            <button onClick={() => {
                                setTrackOTPVerify(true);
                                setOpenTrackOrderVerify(false);
                            }}
                                className='bg-[var(--bg-orange)] text-[var(--text-white)] text-lg font-semibold rounded-md w-full p-2' >Send OTP</button>
                        </div>

                    </DialogPanel>
                </div>
            </Dialog>


            {/* Modal - Track Order - 2 (OTP) */}
            <Dialog open={trackOTPVerify} onClose={setTrackOTPVerify} className="relative z-[999]">
                {/* Backdrop */}
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0"
                />

                {/* Centered modal */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full p-4 max-w-md lg:max-w-lg  rounded-xl bg-[var(--profile-bg)] shadow-lg transform transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center py-3 shrink-0">
                            <DialogTitle className="text-lg font-semibold text-[var(--profile-dark-text,#111)]">
                                Track Order
                            </DialogTitle>
                            <IoMdClose onClick={() => setTrackOTPVerify(false)} className="text-[24px] text-[var(--profile-dark-text)] cursor-pointer bg-[#44506A33] p-1 rounded-full" />
                        </div>

                        <div className="border-b border-[var(--profile-border,#ddd)]"></div>

                        {/* Scrollable Body */}
                        <div className="py-5 space-y-4 ">
                            {/* Id */}
                            <div>
                                <p class="text-base text-[var(--profile-light-text)] font-semibold mb-2">OTP</p>
                                <div class="flex gap-2">
                                    <input type="text" maxlength="1" class="w-14 h-14 text-center border border-[#44506A33] rounded-xl text-base focus:outline-none" />
                                    <input type="text" maxlength="1" class="w-14 h-14 text-center border border-[#44506A33] rounded-xl text-base focus:outline-none" />
                                    <input type="text" maxlength="1" class="w-14 h-14 text-center border border-[#44506A33] rounded-xl text-base focus:outline-none" />
                                    <input type="text" maxlength="1" class="w-14 h-14 text-center border border-[#44506A33] rounded-xl text-base focus:outline-none" />
                                </div>
                                <p class="text-base text-[var(--profile-darkgray-text)] font-semibold mt-2"> <span className='text-[var(--profile-dark-text)]'>Send OTP again</span> : 00:56 </p>

                            </div>


                        </div>


                        {/* Footer */}
                        <div className="flex w-full gap-3">
                            <button className='bg-[var(--bg-orange)] text-[var(--text-white)] text-lg font-semibold rounded-md w-full p-2'>Submit</button>
                        </div>

                    </DialogPanel>
                </div>
            </Dialog>



        </>
    )
}
