import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar, FaEye, FaRegHeart, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TopBrands from '../images/workspace_premium.png'
import Delivery from '../images/local_shipping.png'
import Secure from '../images/local_police.png'
import Smile from '../images/tag_faces.png'

import { PiCodesandboxLogoFill } from "react-icons/pi";
import { MdOutlineEmail, MdOutlineLocalPhone, MdOutlineShoppingBag } from "react-icons/md";
import SizeGuide from "../component/SizeGuide";
import Cmn_product_slider from "../component/Cmn_product_slider";
import StarRating from "../component/StarRating";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../Store/Slices/categorySlice";

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [selectedColor, setSelectedColor] = useState("brown");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(8);
    const [quantity, setQuantity] = useState(1);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);

    const productSliderRef1 = useRef(null);
    const productSliderRef2 = useRef(null);


    useEffect(() => {
        dispatch(getProductById(id));
    }, [id]);

    const product = useSelector((state) => state.category.productId.data);
    console.log("product>>>>>>", product);


    const getBadgeColor = (badge) => {
        switch (badge?.toUpperCase()) {
            case "TOP RATED":
                return "var(--bg-red)";
            case "BEST DEAL":
                return "var(--bg-yellow)";
            case "CORALBAY CHOICE":
                return "var(--bg-orange)";
            case "BEST SELLER":
                return "var(--bg-dark-blue)";
            case "NEW":
                return "var(--bg-blue)";
            case "TRENDING":
                return "var(--text-green)";
            default:
                return "var(--bg-gray)";
        }
    };
    useEffect(() => {
        if (product?.varients?.length > 0) {
            setSelectedVariant(product.varients[0]);
            setSelectedImage(product.varients[0].images?.[0]);
        }
    }, [product]);

    if (!product) return null;

    // Extract unique color and size options
    const uniqueColors = [
        ...new Set(product?.varients?.map((v) => v.color).filter(Boolean)),
    ];
    const uniqueSizes = [
        ...new Set(product?.varients?.map((v) => v.size).filter(Boolean)),
    ];

    // Helper to get variant by color/size
    const getVariant = (color, size) => {
        return product.varients.find(
            (v) => v.color === color && (!size || v.size === size)
        );
    };

    // Add to cart mock
    const handleAddToCart = () => {
        if (selectedVariant) {
            console.log("Add to cart:", selectedVariant);
            alert(`Added SKU: ${selectedVariant.sku} to cart`);
        }
    };
    return (
        <>
            <div className="main_container">
                <div className=" mx-auto py-8">
                    {/* Grid layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                        {/* Left side - images */}
                        <div className="grid xl:grid-cols-2 md:grid-cols-4 grid-cols-2  gap-3">
                            {selectedVariant?.images?.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`variant-${i}`}
                                    className={`w-full h-auto rounded-lg cursor-pointer object-cover ${selectedImage === img ? "ring-2 ring-black" : ""
                                        }`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>

                        {/* Right side - product details */}
                        <div>
                            <div>
                                <span className="text-[var(--text-white)] text-xs font-bold px-2 py-1 rounded " style={{ backgroundColor: getBadgeColor(product.badge) }}>{product.badge}</span>
                                <h2 className="text-md text-[var(--text-gray)] font-semibold  mt-1">
                                    {product.brand?.brandName || 'No barnd'}
                                </h2>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            <div className="md:flex block items-center mt-3">
                                <div className="me-2">
                                    <b>SKU:</b> <span>CB-650490</span>
                                </div>
                                <div className="flex items-center space-x-1 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        i < Math.round(product?.rating?.average || 0) ?
                                            <FaStar key={i} /> :
                                            <FaRegStar key={i} />
                                    ))}
                                    <span className="ml-2 text-gray-600 text-sm font-semibold">
                                        ({product?.rating?.average || 0}) Reviews ({product?.rating?.totalReviews || 0})
                                    </span>
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

                            <div className="mt-2 flex items-center font-semibold text-[var(--text-gray)]"><FaEye className="me-1" />{product.view} People are viewing this right now.</div>
                            {/* Stock info */}
                            <div className="text-[var(--text-green)] bg-[var(--bg-light-green)] flex items-center px-2 py-3 font-semibold rounded mt-2"><PiCodesandboxLogoFill className="text-xl me-2" />{product.last12HoursSold} Products sold in last 12 hours</div>

                            {/* Color selection */}
                            <div className="mt-5">
                                <p className="font-semibold">
                                    Color :{" "}
                                    <span className="capitalize text-[var(--text-gray)]">
                                        {selectedColor}
                                    </span>
                                </p>
                                <div className="flex space-x-3 mt-2">
                                    {uniqueColors.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="font-medium text-gray-800 mb-2">Color</h3>
                                            <div className="flex space-x-3">
                                                {uniqueColors.map((color, i) => {
                                                    const variant = getVariant(color);
                                                    return (
                                                        <button
                                                            key={i}
                                                            onClick={() => {
                                                                setSelectedVariant(variant);
                                                                setSelectedImage(variant.images?.[0]);
                                                            }}
                                                            className={`w-16 h-16 rounded border-2 overflow-hidden ${selectedVariant?.color === color
                                                                ? "ring-2 ring-black"
                                                                : "border-gray-300"
                                                                }`}
                                                        >
                                                            <img
                                                                src={variant?.images?.[0]}
                                                                alt={color}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Size selection */}
                            <div className="mt-5">
                                <p className="font-semibold">
                                    Size: <span className="text-[var(--text-gray)]">{selectedSize}</span>
                                </p>
                                <div className="flex flex-wrap md:flex-nowrap  space-x-2 mt-2">
                                    {uniqueSizes.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="font-medium text-gray-800 mb-2">Size</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {uniqueSizes.map((size, i) => {
                                                    const variant = getVariant(selectedVariant?.color, size);
                                                    const isDisabled = !variant;

                                                    return (
                                                        <button
                                                            key={i}
                                                            disabled={isDisabled}
                                                            onClick={() =>
                                                                !isDisabled &&
                                                                (setSelectedVariant(variant),
                                                                    setSelectedImage(variant.images?.[0]))
                                                            }
                                                            className={`px-3 py-1 border rounded-md text-sm ${isDisabled
                                                                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                                                : selectedVariant?.size === size
                                                                    ? "bg-black text-white"
                                                                    : "border-gray-300 text-gray-800 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {size}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
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
                                        <div className="mb-4"><b>Material:</b>
                                            <p className="text-sm">{product?.productDetails?.material}</p>
                                        </div>
                                        <div className="mb-4"><b>Fit:</b>
                                            <p className="text-sm">{product?.productDetails?.fit}</p>
                                        </div>
                                        <div className="mb-4"><b>Closure:</b>
                                            <p className="text-sm">{product?.productDetails?.closure}</p>
                                        </div>
                                        <div className="mb-4"><b>Weight:</b>
                                            <p className="text-sm">{product?.productDetails?.weight}</p>
                                        </div>
                                        <div className="mb-4"><b>Care Instructions:</b>
                                            <p className="text-sm">{product?.productDetails?.careInstructions}</p>
                                        </div>
                                        <div className="mb-4"><b>Origin:</b>
                                            <p className="text-sm">{product?.productDetails?.origin}</p>
                                        </div>
                                        <div className="mb-4"><b>Additional Features:</b>
                                            {product?.productDetails?.additionalFeatures?.map((feature, i) => (
                                                <p key={i} className="text-sm">• {feature}</p>
                                            ))}
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
                                            <p className="text-sm">{product?.shippingReturn?.freeShipping}</p>
                                        </div>
                                        <div className="mb-5"><b>Return Policy:</b>
                                            <p className="text-sm">{product?.shippingReturn?.returnPolicy}</p>
                                        </div>
                                        <div className="mb-5"><b>International Shipping:</b>
                                            <p>{product?.shippingReturn?.internationalShipping}</p>
                                        </div>
                                        <div className="mb-5"><b>Packaging:</b>
                                            <p className="text-sm">{product?.shippingReturn?.packaging}</p>
                                        </div>
                                        <div className="mb-5"><b>Delivery Tracking:</b>
                                            <p className="text-sm">Real-time updates via email and SMS from dispatch to doorstep.</p>
                                        </div>
                                        <div className="mb-5"><b>Order Processing:</b>
                                            <p className="text-sm">{product?.shippingReturn?.orderProcessing}</p>
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
                                            <p className="text-sm">{product?.warrantySupport?.warranty || ""}</p>
                                        </div>
                                        <div className="mb-5"><b>Care Tips:</b>
                                            <p className="text-sm">{product?.warrantySupport?.careTips || ""}</p>
                                        </div>
                                        <div className="mb-5"><p className="text-[var(--bg-blue)] underline ">Customer Support:</p>
                                            <p className="text-sm mb-2">24/7 assistance available through:</p>
                                            <div className="flex items-center text-lg"><MdOutlineEmail className="me-2" /><p className="underline">{product?.warrantySupport?.customerSupport?.email}</p></div>
                                            <div className="flex items-center text-lg"><MdOutlineLocalPhone className="me-2" /><p className="underline"> {product?.warrantySupport?.customerSupport?.phone}</p></div>
                                            <div className="flex items-center text-lg">{product?.warrantySupport?.customerSupport?.available}</div>
                                        </div>
                                        <div className="mb-5"><p className="text-[var(--bg-blue)] underline ">FAQs:</p>
                                            {product?.warrantySupport?.faqs?.map((f, i) => (
                                                <p key={i} className="text-sm">• {f}</p>
                                            ))}
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

                    {selectedVariant && (
                        <>
                            <div className="mb-7">
                                <h3 className="text-base font-semibold mb-4 text-[var(--bg-dark)]">Composition</h3>

                                {/* Table-like layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Brand:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {product?.brand?.brandName || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Color:</span>
                                            <span className="text-sm text-[var(--bg-gray)] capitalize">
                                                {selectedVariant?.color || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Occasion:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Occasion || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Size:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.size || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Article Number:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Artical_Number || "N/A"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-2 lg:border-s border-0 lg:ps-2 ps-0">
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Outer Material:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Outer_material || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Model Name:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Model_name || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Ideal For:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Ideal_for || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Type For Casual:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Type_For_Casual || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Euro Size:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Euro_Size || "N/A"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                            <span className="text-sm font-bold text-[var(--bg-dark)]">Heel Height:</span>
                                            <span className="text-sm text-[var(--bg-gray)]">
                                                {selectedVariant?.Heel_Height || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Optional description */}
                            <p className="text-sm text-[var(--bg-gray)] mb-3">
                                {product?.description}
                            </p>
                        </>
                    )}
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
                                    <span className="text-sm text-[var(--bg-gray)]">{product?.sellerId?.name || 'No Name'}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Location:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">{product.sellerId?.location || 'No location'}</span>
                                </div>                             
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Contact:</span>
                                    <span className="text-sm text-[var(--bg-gray)] truncate">{product.sellerId?.email || 'No email'}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-4 py-1">
                                    <span className="text-sm font-bold text-[var(--bg-dark)]">Phone:</span>
                                    <span className="text-sm text-[var(--bg-gray)]">+91 {product.sellerId?.mobileNo || 'No email'}</span>
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
