import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineShoppingBag, MdStar } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import ProductModal from "../component/ProductModal"; // import modal

export const SingleProduct = ({ product }) => {
	const [activeColor, setActiveColor] = useState(
		product.defaultColorIndex || 0
	);
	const [inCart, setInCart] = useState(false);
	const [inWishlist, setInWishlist] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="product_card bg-[#F9FAFB] p-2 h-fit group rounded-xl shadow hover:shadow-lg transition-all duration-300">
				<div className="flex flex-col">
					{/* Image Part */}
					<div className="product_img_part relative rounded overflow-hidden bg-[#E5E7EB]">
						{/* Badge - outside image */}
						{(product.badge || product.badgeImage) && (
							<div
								className="absolute top-3 left-3 text-white text-[12px] font-semibold px-3 py-1 rounded shadow-md flex items-center justify-center z-20"
								style={{ backgroundColor: product.badgeColor || "#DC2626" }}
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

						{/* Product Image (zoom inside) */}
						<img
							src={product.variants[activeColor].image}
							alt={product.title}
							className="w-full h-[300px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
						/>

						{/* Wishlist Heart */}
						<div
							className="absolute top-0 right-0 p-3 text-[22px] cursor-pointer z-20"
							onClick={() => setInWishlist(!inWishlist)}
						>
							{inWishlist ? <FaHeart className="text-[#F97316]" /> : <FaRegHeart />}
						</div>

						{/* Colors */}
						<div className="product-color flex gap-2 absolute bottom-3 left-1/2 -translate-x-1/2 z-10 group-hover:bottom-[60px] transition-all duration-500">
							{product.variants.map((variant, i) => (
								<div
									key={i}
									onClick={() => setActiveColor(i)}
									className="w-4 h-4 rounded-full cursor-pointer"
									style={{
										backgroundColor: variant.color,
										outline:
											i === activeColor ? `2px solid ${variant.color}` : "none",
										outlineOffset: "2px",
									}}
								></div>
							))}
						</div>

						{/* Buttons (slide into freed 50px) */}
						<div
							className="absolute bottom-0 left-0 right-0 h-[50px] border-t-[1px] border-[#D1D5DB]
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
								onClick={() => setShowModal(true)}
							>
								<IoEyeOutline className="text-[18px]" /> QUICK VIEW
							</button>
						</div>
					</div>

					{/* Info Part */}
					<div className="product-card-info mt-2 px-3 pb-2">
						<p className="text-[#6B7280] text-[16px] font-medium">
							{product.brand}
						</p>
						<h5 className="text-black text-[16px] font-semibold truncate w-full">
							{product.title}
						</h5>

						{/* Price */}
						<div className="flex justify-start items-center gap-1 my-1">
							<del className="text-[#DC2626] text-[16px] font-semibold">
								AU${product.oldPrice}
							</del>
							<h4 className="text-[#000] text-[18px] font-semibold">
								AU${product.price}
							</h4>
							<p className="text-[#6B7280] text-[14px] font-bold italic">
								(Included IST)
							</p>
						</div>

						{/* Rating */}
						<div className="text-[#F59E0B] flex items-center text-[16px]">
							{Array.from({ length: 5 }, (_, i) =>
								i < product.rating ? (
									<MdStar key={i} /> // filled star
								) : (
									<MdStar key={i} className="text-[#D1D5DB]" /> // unfilled star
								)
							)}
							<p className="text-[#6B7280] text-[14px] font-bold ms-1">
								({product.ratingIndex})
							</p>
						</div>
					</div>
				</div>
			</div>

			{showModal && <ProductModal product={product} onClose={() => setShowModal(false)} />}
		</>
	);
};