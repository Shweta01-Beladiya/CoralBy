
import { FaHeart } from "react-icons/fa";
import NoProductProfile from '../images/NoProductWishlistProfile.png'
import NoProductHeader from '../images/wishlist_empty_header.png'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Store/Slices/categorySlice";
import {getWishlist, removeWishlist } from "../Store/Slices/wishlistSlice";
import { MdStar } from "react-icons/md";



export default function Wishlist({ viewType }) {

    const dispatch = useDispatch()
    const [activeVariants, setActiveVariants] = useState({});


     const getGridClasses = () => {
        if (viewType === "profile") {
            return "grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 "
        }
        if (viewType === "header") {
            return "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-5 gap-3"
        }
        // return "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4"
    }



    

    const products = useSelector((state) => state.category.product.data);
    const wishData = useSelector((state) => state.wishlist.wishlistData)

    useEffect(() => {
        dispatch(getProduct())
        dispatch(getWishlist())
    }, [])

   
    const wishProducts = products.filter((product) =>
        (wishData || []).some((wishItem) => wishItem.productId._id === product._id)
    );

    const handleVariantClick = (productId, variantIndex) => {
        setActiveVariants((prev) => ({ ...prev, [productId]: variantIndex }));
    };

   
    // Remove From Wishlist 
    const delWishlist = async (pid) => {
        await dispatch(removeWishlist(pid))
        await dispatch(getWishlist())
    }

    // Badge Colors
	const badgeNameColors = {
		"BEST SELLER": "bg-[#1E40AF]",
		"TRENDING": "bg-[#16A34A]",
		"NEW": "bg-[#2563EB]",
		"BEST DEAL": "bg-[#F59E0B]",
		"TOP RATED": "bg-[#DC2626]",
		"CORALBAY CHOICE": "bg-[#F97316]",
	};
    


    return (
        <div className="">

            {/* Grid */}
            <div className={getGridClasses()}>
                {wishProducts.length > 0 ? (
                    wishProducts.map((product) => {
                        const variantIndex = activeVariants[product._id] || 0;
                        const currentVariant = product.varientId?.[variantIndex];
	                    const badgeBg = badgeNameColors[product?.badge];


                        return (
                            <div
                                key={product._id}
                                className="bg-[var(--bg-light)] rounded-xl p-[6px] relative flex flex-col"
                            >
                                {/* Badge */}
                                { product.badge && (
                                    <div
                                        className={`absolute top-3 left-3 text-white text-[12px] font-semibold px-3 py-1 rounded shadow-md flex items-center justify-center z-20 ${badgeBg}`}
                                        // style={{ backgroundColor: product.badgeColor || "#DC2626" }}
                                    >
                                        {product.badge}
                                    </div>
                                )}

                                {/* Favorite */}
                                <div className="absolute top-0 right-0 p-3 text-[22px] cursor-pointer z-20">
                                        <FaHeart
                                            className="text-[#F97316]"
                                            onClick={() => delWishlist(product._id)}
                                        />
                                </div>

                                {/* Image + Variants */}
                                <div className="relative">
                                    <img
                                        src={currentVariant?.images?.[0]}
                                        alt={product.title}
                                        className="w-full h-72 object-cover rounded-lg z-0"
                                    />

                                    {/* Variant Colors */}
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center justify-center gap-2 z-10">
                                        {(product.varientId || []).map((v, i) => (
                                            <span
                                                key={i}
                                                onClick={() => handleVariantClick(product._id, i)}
                                                className="w-5 h-5 rounded-full cursor-pointer border-2"
                                                style={{
                                                    backgroundColor: v.color || "#ccc",
                                                    boxShadow:
                                                        variantIndex === i ? `0 0 0 2px ${v.color || "#ccc"}` : "none",
                                                }}
                                            ></span>
                                        ))}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 lg:p-3 p-1">
                                    <h3 className="text-[#6B7280] font-medium text-base">
                                        {product.brand?.brandName || "No Brand"}
                                    </h3>
                                    <p className="mt-1 font-semibold text-[#111827] text-base truncate">
                                        {product.title || "No Title"}
                                    </p>

                                    {/* Price */}
                                    <div className="mt-1">
                                        <span className="line-through text-base font-semibold text-[var(--text-red)]">
                                            {currentVariant?.price?.original ? `AU$${currentVariant.price.original}` : ""}
                                        </span>{" "}
                                        <span className="font-bold text-base text-[#0A0E17] ms-1">
                                            {currentVariant?.price?.discounted ? `AU$${currentVariant.price.discounted}` : ""}
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center mt-1 text-sm text-[#F59E0B]">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <MdStar
                                                key={i}
                                                className={i < (currentVariant?.rating?.average || 0) ? "text-[#F59E0B]" : "text-[#D1D5DB]"}
                                            />
                                        ))}
                                        <span className="ms-2 text-[#6B7280]">
                                            ({currentVariant?.rating?.totalReviews || 0})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })


                ) : viewType === "profile" ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <img src={NoProductProfile} alt="No Product" className="w-40 mb-4" />
                        <p className="text-[var(--text-black)] text-base font-medium mb-4">
                            Add now, Buy Later.
                        </p>
                        <button className="bg-[var(--bg-orange)] md:px-10 px-3 py-2 md:py-3 text-[var(--text-white)] md:text-lg text-base font-semibold rounded-md">
                            Back to Store
                        </button>
                    </div>
                ) : viewType === "header" ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <img src={NoProductHeader} alt="No Product" className="w-40 mb-4" />
                        <p className="text-[var(--text-black)] text-base font-medium mb-4">
                            No items in your wishlist.
                        </p>
                        <button className="bg-[var(--bg-orange)] md:px-10 px-3 py-2 md:py-3 text-[var(--text-white)] md:text-lg text-base font-semibold rounded-md">
                            Back to Store
                        </button>
                    </div>
                ) : null}
            </div>


        </div>
    );
}
