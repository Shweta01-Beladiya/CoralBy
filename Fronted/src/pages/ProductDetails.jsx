import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar, FaEye, FaRegHeart, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import thumb1 from '../images/thumb1.png';
import thumb2 from '../images/thumb2.png';
import thumb3 from '../images/thumb3.png';
import thumb4 from '../images/thumb4.png';
import thumb5 from '../images/thunb5.png';

// Brown 
import bshoes1 from '../images/bs1.png';
import bshoes2 from '../images/bs2.png';
import bshoes3 from '../images/bs3.png';
import bshoes4 from '../images/bs4.png';
import bshoes5 from '../images/bs5.png';
import bshoes6 from '../images/bs6.png';

//white
import wshoes1 from '../images/ss1.png';
import wshoes2 from '../images/ss2.png';
import wshoes3 from '../images/ss3.png';
import wshoes4 from '../images/ss4.png';
import wshoes5 from '../images/ss5.png';
import wshoes6 from '../images/ss6.png';

//Green
import gshoes1 from '../images/gs1.png';
import gshoes2 from '../images/gs2.png';
import gshoes3 from '../images/gs3.png';

//Navy blue
import nshoes1 from '../images/ns1.png';
import nshoes2 from '../images/ns1.png';

//Orange
import oshoes1 from '../images/os1.png';
import oshoes2 from '../images/os2.png';

import TopBrands from '../images/workspace_premium.png'
import Delivery from '../images/local_shipping.png'
import Secure from '../images/local_police.png'
import Smile from '../images/tag_faces.png'

import { PiCodesandboxLogoFill } from "react-icons/pi";
import { MdOutlineEmail, MdOutlineLocalPhone, MdOutlineShoppingBag } from "react-icons/md";
import SizeGuide from "../component/SizeGuide";
import Cmn_product_slider from "../component/Cmn_product_slider";
import StarRating from "../component/StarRating";

const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState("brown");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(8);
    const [quantity, setQuantity] = useState(1);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);


    const colorImages = {
        brown: [bshoes6, bshoes5, bshoes4, bshoes3, bshoes2, bshoes1],
        white: [wshoes6, wshoes5, wshoes4, wshoes3, wshoes2, wshoes1],
        green: [gshoes3, gshoes2, gshoes1],
        navy: [nshoes2, nshoes1],
        orange: [oshoes2, oshoes1],
    };

    const colors = [
        { id: "brown", name: "Brown", image: thumb2 },
        { id: "navy", name: "Navy", image: thumb1 },
        { id: "orange", name: "Orange", image: thumb3 },
        { id: "green", name: "Green", image: thumb4 },
        { id: "white", name: "White", image: thumb5 },
    ];

    const sizes = [6, 7, 8, 9, 10, 11, 12];
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);

    const productSliderRef1 = useRef(null);
    const productSliderRef2 = useRef(null);
    const productSliderRef3 = useRef(null);

    return (
        <>
            <div className="main_container">
                <div className=" mx-auto py-8">
                    {/* Grid layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                        {/* Left side - images */}
                        <div className="grid grid-cols-2 gap-3">
                            {colorImages[selectedColor].map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`thumb-${i}`}
                                    className="w-full h-auto rounded-lg cursor-pointer object-cover"
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>

                        {/* Right side - product details */}
                        <div>
                            <div>
                                <span className="text-[var(--text-white)] text-xs font-bold px-2 py-1 rounded  bg-[var(--bg-blue)]">New</span>
                                <h2 className="text-md text-[var(--text-gray)] font-semibold  mt-1">
                                    Polo Ralph Lauren
                                </h2>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                Premium Tasselled Leather Loafers – Formal Men’s Footwear
                            </h1>

                            {/* Rating */}
                            <div className="md:flex block items-center mt-3">
                                <div className="me-2">
                                    <b>SKU:</b> <span>CB-650490</span>
                                </div>
                                <div className="flex items-center space-x-1 text-yellow-500">
                                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaRegStar />
                                    <span className="ml-2 text-gray-600 text-sm font-semibold">(06) & Review (02)</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mt-4">
                                <span className="line-through text-[var(--text-red)] mr-3">AU$1499</span>
                                <span className="text-2xl font-bold">
                                    AU$1349
                                </span>
                                <span className="text-[var(--text-gray)] text-sm ml-2">(Include IST)</span>
                            </div>

                            <div className="mt-2 flex items-center font-semibold text-[var(--text-gray)]"><FaEye className="me-1" />145 People are viewing this right now.</div>
                            {/* Stock info */}
                            <div className="text-[var(--text-green)] bg-[var(--bg-light-green)] flex items-center px-2 py-3 font-semibold rounded mt-2"><PiCodesandboxLogoFill className="text-xl me-2" />53 Products sold in last 12 hours</div>

                            {/* Color selection */}
                            <div className="mt-5">
                                <p className="font-semibold">
                                    Color :{" "}
                                    <span className="capitalize text-[var(--text-gray)]">
                                        {selectedColor}
                                    </span>
                                </p>
                                <div className="flex space-x-3 mt-2">
                                    {colors.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => {
                                                setSelectedColor(c.id);
                                                setSelectedImage(null); // reset main image
                                            }}
                                            className={`w-16 h-16 rounded border-2 overflow-hidden 
                    ${selectedColor === c.id ? "ring-2 ring-black" : "border-gray-300"}`}
                                        >
                                            <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Size selection */}
                            <div className="mt-5">
                                <p className="font-semibold">
                                    Size: <span className="text-[var(--text-gray)]">{selectedSize}</span>
                                </p>
                                <div className="flex flex-wrap md:flex-nowrap  space-x-2 mt-2">
                                    {sizes.map((s) => {
                                        const isDisabled = s === 12; // Disable size 12

                                        return (
                                            <button
                                                key={s}
                                                onClick={() => !isDisabled && setSelectedSize(s)}
                                                disabled={isDisabled}
                                                className={`px-3 py-1 border rounded-md relative
                                         ${isDisabled
                                                        ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
                                                        : selectedSize === s
                                                            ? "bg-black text-white"
                                                            : "border-gray-300"
                                                    }`}
                                            >
                                                {s}
                                                {/* Draw cross line if disabled */}
                                                {isDisabled && (
                                                    <span className="absolute left-0 top-1/2 w-full h-[2px] bg-gray-400 rotate-[-20deg]"></span>
                                                )}
                                            </button>
                                        );
                                    })}
                                    <button onClick={() => setIsSizeGuideOpen(true)} className="ml-3 underline text-gray-600 text-sm">
                                        SIZE GUIDE
                                    </button>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mt-6">
                                <p className="font-semibold">Quantity:</p>
                                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-1 space-y-3 md:space-y-0">

                                    {/* Quantity counter */}
                                    <div className="flex items-center justify-center border rounded-md md:w-fit w-full">
                                        <button
                                            className="px-3 py-3"
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{quantity}</span>
                                        <button
                                            className="px-3 py-3"
                                            onClick={() => setQuantity((q) => q + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                        <button className="px-6 py-3 border border-gray-300 rounded-lg flex items-center justify-center w-full md:w-96">
                                            <MdOutlineShoppingBag className="text-2xl me-2" /> Add to Cart
                                        </button>
                                        <button className="py-3 px-4 border border-gray-300 rounded-lg flex justify-center">
                                            <FaRegHeart />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-3">
                                <button className="bg-[var(--shop-now-btn)] text-white rounded w-full py-3">Buy Now</button>
                            </div>

                            {/* Delivery Options */}
                            <div className="mt-8">
                                <p className="font-semibold">Delivery Options</p>

                                <div className="relative mt-2 w-64">
                                    <input
                                        type="text"
                                        placeholder="Enter postcode"
                                        className="border rounded-md w-full py-2 pl-3 pr-16 focus:outline-none"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--shop-now-btn)] font-semibold">
                                        Check
                                    </button>
                                </div>

                                <p className="text-sm text-[var(--text-gray)] mt-2">
                                    Please enter postcode to check delivery time & availability.
                                </p>
                            </div>

                            <div className="mt-5 text-sm text-[var(--text-gray)]" >
                                <p>100% Original Products</p>
                                <p>Pay on delivary might be avaiable</p>
                                <p>Easy 14 days returns and exchange</p>
                            </div>

                            {/* Accordian */}
                            <div className=" mt-10">
                                <div className="border-b border-t">
                                    <button
                                        onClick={() => setIsProductOpen(!isProductOpen)}
                                        className="flex justify-between items-center w-full py-5 font-semibold text-left"
                                    >
                                        Product Details
                                        <FaChevronDown
                                            className={`transition-transform duration-300 ${isProductOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {isProductOpen && <div className="pb-4 text-gray-600">
                                        <div className="mb-5"><b>Material:</b>
                                            <p className="text-sm">Breathable mesh upper with synthetic sole for lightweight and durable wear.</p>
                                        </div>
                                        <div className="mb-5"><b>Fit:</b>
                                            <p className="text-sm">True to size with cushioned insole for arch support and all-day comfort.</p>
                                        </div>
                                        <div className="mb-5"><b>Closure:</b>
                                            <p className="text-sm">Lace-up design with elastic comfort strap for easy adjustment.</p>
                                        </div>
                                        <div className="mb-5"><b>Weight:</b>
                                            <p className="text-sm">300g per shoe for effortless movement.</p>
                                        </div>
                                        <div className="mb-5"><b>Care Instructions:</b>
                                            <p className="text-sm">Wipe with a damp cloth and air dry. Avoid machine wash.</p>
                                        </div>
                                        <div className="mb-5"><b>Origin:</b>
                                            <p className="text-sm">Made in Australia using premium Shipping & Returns and sustainable processes.</p>
                                        </div>
                                        <div className="mb-5"><b>Additional Features:</b>
                                            <p className="text-sm">High-traction sole for slip-resistant grip</p>
                                            <p className="text-sm">Shock absorption for comfort</p>
                                            <p className="text-sm">Eco-friendly packaging</p>
                                        </div>
                                    </div>}
                                </div>
                                <div className="border-b ">
                                    <button
                                        onClick={() => setIsShippingOpen(!isShippingOpen)}
                                        className="flex justify-between items-center w-full py-5 font-semibold text-left"
                                    >
                                        Shipping & Returns
                                        <FaChevronDown
                                            className={`transition-transform duration-300 ${isShippingOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {isShippingOpen && <div className="pb-4 text-gray-600">
                                        <div className="mb-5"><b>Free Shipping:</b>
                                            <p className="text-sm">On orders above AU$500, express delivery in 2–3 business days within Australia.</p>
                                        </div>
                                        <div className="mb-5"><b>Return Policy:</b>
                                            <p className="text-sm">30-day return window for unused products with original packaging and tags.</p>
                                        </div>
                                        <div className="mb-5"><b>International Shipping:</b>
                                            <p>Available with surcharge depending on destination.</p>
                                        </div>
                                        <div className="mb-5"><b>Packaging:</b>
                                            <p className="text-sm">Recyclable and biodegradable packaging to support the environment.</p>
                                        </div>
                                        <div className="mb-5"><b>Delivery Tracking:</b>
                                            <p className="text-sm">Real-time updates via email and SMS from dispatch to doorstep.</p>
                                        </div>
                                        <div className="mb-5"><b>Order Processing:</b>
                                            <p className="text-sm">Ships within 24 hours excluding holidays and weekends.</p>
                                        </div>
                                    </div>}
                                </div>
                                <div className="border-b">
                                    <button
                                        onClick={() => setIsWarrantyOpen(!isWarrantyOpen)}
                                        className="flex justify-between items-center w-full py-5 font-semibold text-left"
                                    >
                                        Warranty & Support
                                        <FaChevronDown
                                            className={`transition-transform duration-300 ${isWarrantyOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {isWarrantyOpen && <div className="pb-4 text-gray-600">
                                        <div className="mb-5"><b>Warranty:</b>
                                            <p className="text-sm">1-year manufacturer warranty for defects in Shipping & Returns or workmanship.</p>
                                        </div>
                                        <div className="mb-5"><b>Care Tips:</b>
                                            <p className="text-sm">Avoid excess moisture and heat; clean with soft cloth; air dry.</p>
                                        </div>
                                        <div className="mb-5"><p className="text-[var(--bg-blue)] underline ">Customer Support:</p>
                                            <p className="text-sm mb-2">24/7 assistance available through:</p>
                                            <div className="flex items-center text-lg"><MdOutlineEmail className="me-2" /><p className="underline">support@poloralphlauren.com</p></div>
                                            <div className="flex items-center text-lg"><MdOutlineLocalPhone className="me-2" /><p className="underline">+61 3 9000 0000</p></div>
                                        </div>
                                        <div className="mb-5"><p className="text-[var(--bg-blue)] underline ">FAQs:</p>
                                            <p className="text-sm">Runs true to size.</p>
                                            <p className="text-sm">Can be paired with formal or casual wear.</p>
                                            <p className="text-sm">Easy returns within 30 days.</p>
                                        </div>
                                    </div>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Service All Card */}
                <div className="w-full bg-[#F9FAFB] p-5 border border-gray-200 rounded-lg my-10">
                    {/* All 4 Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {/* Card 1 */}
                        <div className="flex flex-col items-center">
                            <img src={TopBrands} alt="Top Brands" className="h-14 w-14 object-contain mb-4" />
                            <h1 className="text-xl mb-1 font-semibold text-black">Top Brands & Trends</h1>
                            <p className="text-base text-gray-600">Global & Local Brands, All in One</p>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col items-center">
                            <img src={Delivery} alt="Delivery" className="h-14 w-14 object-contain mb-4" />
                            <h1 className="text-xl mb-1 font-semibold text-black">Fast & Reliable Delivery</h1>
                            <p className="text-base text-gray-600">Fast Australia-wide Shipping</p>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col items-center">
                            <img src={Secure} alt="Secure" className="h-14 w-14 object-contain mb-4" />
                            <h1 className="text-xl mb-1 font-semibold text-black">Secure Shopping</h1>
                            <p className="text-base text-gray-600">Secure Payments & Easy Returns</p>
                        </div>

                        {/* Card 4 */}
                        <div className="flex flex-col items-center">
                            <img src={Smile} alt="Smile" className="h-14 w-14 object-contain mb-4" />
                            <h1 className="text-xl mb-1 font-semibold text-black">Easy Returns & Support</h1>
                            <p className="text-base text-gray-600">7-Day Returns & 24/7 Support</p>
                        </div>

                    </div>
                </div>

                {/* Silimar Products */}
                <section className="bg-[#FFFFFF] w-full py-5">

                    {/* Title */}
                    <div className="flex items-center justify-between mt-8 mb-5">
                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-semibold  text-[#0A0E17]">
                            Silimar Products
                        </h1>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => productSliderRef1.current?.prev()}
                                className="rounded-full text-sm border bg-[#FFFFFF] border-gray-400 p-2.5 hover:bg-gray-100 transition">
                                <FaChevronLeft className="" />
                            </button>
                            <button
                                onClick={() => productSliderRef1.current?.next()}
                                className="rounded-full text-sm border bg-[#FFFFFF] border-gray-400 p-2.5 hover:bg-gray-100 transition">
                                <FaChevronRight className="" />
                            </button>
                        </div>
                    </div>

                    {/* image */}
                    <div className='mb-14'>
                        <Cmn_product_slider ref={productSliderRef1} initialSlideProductId={1} />
                    </div>
                </section>

                {/* Product Description */}
                <div className=" mx-auto bg-white">
                    <h2 className="text-xl font-bold mb-6 text-[var(--bg-dark)]">Product Description</h2>

                    <div className="mb-7">
                        <h3 className="text-base font-semibold mb-4 text-[var(--bg-dark)]">Composition</h3>

                        {/* Table-like layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-2">
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Brand:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Polo Ralph Lauren</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Brand Color:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">BROWN/BLACK–PSYCHIC BROWNE–BLACK</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Color:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Brown</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Occasion:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Casual</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Size:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">8 AU/UK Size</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Article Number:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">CD5010-401</span>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-2 lg:border-s border-0 lg:ps-2 ps-0 ">
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Outer material:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Suede</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Model name:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">SB Heritage Vulc</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Ideal for:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Men</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Type For Casual:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Sneakers</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Euro Size:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">42 EU</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Heel Height:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">1.5 C.M.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-[var(--bg-gray)] mb-3">Step up your footwear game with the Urban Runner Sneakers. Designed for people who never stop moving, these sneakers blend sleek style with unmatched comfort and functionality. The breathable mesh upper keeps your feet cool while the cushioned insole supports every step you take.</p>
                        <p className="text-sm text-[var(--bg-gray)] mb-3">
                            Whether you're running errands, hitting the gym, or exploring the city streets, these lightweight sneakers are built to keep you comfortable all day long. The lace-up design paired with an elastic comfort strap ensures the perfect fit without hassle. Choose from four versatile colors to complement any outfit effortlessly.
                        </p>
                        <p className="text-sm text-[var(--bg-gray)] mb-3">
                            The synthetic sole offers high traction and stability, ensuring you can confidently move through urban and outdoor environments alike. Caring for your sneakers is simple   wipe clean with a cloth and air dry.
                        </p>
                        <p className="text-sm text-[var(--bg-gray)] mb-3">
                            With a 1-year warranty and eco-friendly packaging, these sneakers not only support your lifestyle but also the planet. Experience comfort, style, and peace of mind with the Urban Runner Sneakers — where performance meets fashion.
                        </p>
                    </div>
                </div>

                {/* About the Product  */}
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-xl font-bold mt-6 mb-3 text-[var(--bg-dark)]">Product Description</h2>
                        <p className="text-sm text-[var(--bg-gray)] mb-3">Polo Ralph Lauren designs products that fit seamlessly into your active lifestyle. Combining ergonomic support with modern aesthetics, the Urban Runner Sneakers are crafted for adventure, comfort, and sustainability.</p>
                        <img src={require('../images/banner.jpg')} alt="" className="w-full object-cover my-10" />
                    </div>
                </div>

                {/* View Supplier Information  */}
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-xl font-bold mt-6 mb-3 text-[var(--bg-dark)]">View Supplier Information</h2>
                        <div className="grid grid-cols-1">
                            <div className="space-y-2">
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Supplier Name:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Polo Ralph Lauren</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Location:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">Melbourne, Australia</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Contact:</span>
                                    <span className="text-sm text-[var(--bg-gray)] truncate">support@poloralphlauren.com</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Phone:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">+61 3 9000 0000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="bg-[#F9FAFB]">
                    <StarRating />
                </div>

                {/* Recently View */}
                <section className="bg-[#FFFFFF] w-full py-5">

                    {/* Title */}
                    <div className="flex items-center justify-between mt-8 mb-5">
                        <h1 className="text-2xl md:text-3xl font-semibold  text-[#0A0E17]">
                           Recently View
                        </h1>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => productSliderRef2.current?.prev()}
                                className="rounded-full text-sm border bg-[#FFFFFF] border-gray-400 p-2.5 hover:bg-gray-100 transition">
                                <FaChevronLeft className="" />
                            </button>
                            <button
                                onClick={() => productSliderRef2.current?.next()}
                                className="rounded-full text-sm border bg-[#FFFFFF] border-gray-400 p-2.5 hover:bg-gray-100 transition">
                                <FaChevronRight className="" />
                            </button>
                        </div>
                    </div>

                    {/* image */}
                    <div className='mb-14'>
                        <Cmn_product_slider ref={productSliderRef2} initialSlideProductId={2} />
                    </div>
                </section>


                {/* Cusomer also Liked */}
                <section className="bg-[#FFFFFF] w-full py-5">

                    {/* Title */}
                    <div className="flex items-center justify-between mt-8 mb-5">
                        <h1 className="text-2xl md:text-3xl font-semibold  text-[#0A0E17]">
                          Cusomer also Liked
                        </h1>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => productSliderRef2.current?.prev()}
                                className="rounded-full text-sm border bg-[#FFFFFF] border-gray-400 p-2.5 hover:bg-gray-100 transition">
                                <FaChevronLeft className="" />
                            </button>
                            <button
                                onClick={() => productSliderRef2.current?.next()}
                                className="rounded-full text-sm border bg-[#FFFFFF] border-gray-400 p-2.5 hover:bg-gray-100 transition">
                                <FaChevronRight className="" />
                            </button>
                        </div>
                    </div>

                    {/* image */}
                    <div className='mb-14'>
                        <Cmn_product_slider ref={productSliderRef2} initialSlideProductId={3} />
                    </div>
                </section>

                <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
            </div>
        </>
    );
};

export default ProductDetails;
