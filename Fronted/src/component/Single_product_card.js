import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineShoppingBag, MdStar } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getWishlist, removeWishlist } from "../Store/Slices/wishlistSlice";
import { useNavigate } from "react-router-dom";

export const SingleProduct = ({ product, onQuickView }) => {

	const [activeVariant, setActiveVariant] = useState(0);
	const [inCart, setInCart] = useState(false);
	const [inWishlist, setInWishlist] = useState(false);
	const dispatch = useDispatch()
	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	const variants = product.varientId || [];
	const currentVariant = variants[activeVariant] || {};


	// const authData = useSelector( (state) => state.authProfie.userData)
	const wishData = useSelector((state) => state.wishlist.wishlistData)
	// console.log('auth Data ::' , wishData)

	// useEffect(() => {
	// 	 dispatch(getWishlist())
	// }, [dispatch])

	// Add Wishlist
	const handleWishlist = async (pid) => {
		await dispatch(addToWishlist(pid))
		await dispatch(getWishlist())
	}

	// Remove From Wishlist 
	const delWishlist = async (pid) => {
		await dispatch(removeWishlist(pid))
		await dispatch(getWishlist())
	}

	const handleNavigate = (id) => {
		navigate(`/prodctDetails/${id}`);
	}

	const getBadgeColor = (badge) => {
		switch (badge?.toUpperCase()) {
			case "TOP RATED":
				return "var(--bg-red)" ; 
			case "BEST DEAL":
				return "var(--bg-yellow)" ;
			case "CORALBAY CHOICE":
				return "var(--bg-orange)" ;
			case "BEST SELLER":
				return "var(--bg-dark-blue)" ;
			case "NEW":
				return "var(--bg-blue)" ;
			case "TRENDING":
				return "var(--text-green)" ;
			default:
				return "var(--bg-gray)" ;
		}
	};
	return (

		<div className="product_card bg-[#F9FAFB] p-2 h-fit group rounded-xl shadow hover:shadow-lg transition-all duration-300" >
			<div className="flex flex-col">
				{/* IMAGE PART */}
				<div className="relative rounded overflow-hidden bg-[#E5E7EB]">
					{/* Badge */}
					{(product.badge || product.badgeImage) && (
						<div
							className="absolute top-3 left-3 text-white text-[12px] font-semibold px-3 py-1 rounded shadow-md flex items-center justify-center z-20"
							style={{ backgroundColor: getBadgeColor(product.badge) }}
						>
							{product.badge ? (
								product.badge
							) : (
								<>
									<img src={product.badgeImage} alt="badge" className="w-auto" />
									<span className="ms-1 uppercase">Choice</span>
								</>
							)}
						</div>
					)}

					{/* Product Image */}
					<img
						src={currentVariant.images?.[0]}
						alt={product.title}
						className="w-full h-[300px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
					/>

					{/* Wishlist */}
					<div
						className="absolute top-0 right-0 p-3 text-[22px] cursor-pointer z-20"
						onClick={() => { if (!token) { navigate('/login') } }}
					>

						{(wishData || []).some((item) => item.productId._id === product._id) ? (
							<FaHeart
								className="text-[#F97316]"
								onClick={() => delWishlist(product._id)}
							/>
						) : (
							<FaRegHeart onClick={() => handleWishlist(product._id)} />
						)}
					</div>

					{/* Variant Colors */}
					<div className="product-color flex gap-2 absolute bottom-3 left-1/2 -translate-x-1/2 z-10 group-hover:bottom-[60px] transition-all duration-500">
						{variants.map((v, i) => (
							<div
								key={i}
								onClick={() => setActiveVariant(i)}
								className={`w-4 h-4 rounded-full cursor-pointer `}
								style={{
									backgroundColor: v.color,
									outline:
										activeVariant === i ? `2px solid ${v.color}` : "none",
									outlineOffset: "2px",
								}}
							></div>
						))}
					</div>

					{/* Add to Cart & Quick View */}
					<div
						className="absolute bottom-0 left-0 right-0 h-[50px] border-t border-[#D1D5DB]
						translate-y-[100%] group-hover:translate-y-0 
						opacity-0 group-hover:opacity-100
						bg-[#E5E7EB] transition-all duration-500 ease-in-out 
						flex justify-center divide-x divide-[#D1D5DB]"
					>
						<button
							onClick={() => setInCart(true)}
							className="text-black w-1/2 text-[13px] font-semibold flex items-center justify-center gap-1 
								hover:bg-[#111827] hover:text-white transition-all duration-300 ease-in-out"
						>
							<MdOutlineShoppingBag className="text-[18px]" />
							{inCart ? "ADDED" : "ADD TO CART"}
						</button>

						<button
							className="text-black w-1/2 text-[13px] font-semibold flex items-center justify-center gap-1 
								hover:bg-[#111827] hover:text-white transition-all duration-300 ease-in-out"
							onClick={() => onQuickView(product)}
						>
							<IoEyeOutline className="text-[18px]" /> QUICK VIEW
						</button>
					</div>
				</div>

				{/* INFO PART */}
				<div className="mt-2 px-3 pb-2" onClick={() => handleNavigate(product._id)}>
					<p className="text-[#6B7280] text-[16px] font-medium">
						{product.brand?.brandName || "No Brand"}
					</p>
					<h5 className="text-black text-[16px] font-semibold truncate w-full">
						{product.title || "No Title"}
					</h5>

					{/* Price */}
					<div className="flex justify-start items-center gap-1 my-1">
						<del className="text-[#DC2626] text-[16px] font-semibold">
							{currentVariant.price?.original ? `AU$${currentVariant.price.original}` : ""}
						</del>
						<h4 className="text-[#000] text-[18px] font-semibold">
							{currentVariant.price?.discounted ? `AU$${currentVariant.price.discounted}` : ""}
						</h4>
						<p className="text-[#6B7280] text-[14px] font-bold italic">
							(Included IST)
						</p>
					</div>

					{/* Rating */}
					<div className="text-[#F59E0B] flex items-center text-[16px]">
						{Array.from({ length: 5 }, (_, i) => (
							<MdStar
								key={i}
								className={i < (currentVariant.rating || 0) ? "text-[#F59E0B]" : "text-[#D1D5DB]"}
							/>
						))}
						<p className="text-[#6B7280] text-[14px] font-bold ms-1">
							({currentVariant.ratingIndex || 0})
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
