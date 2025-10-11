import React, { useEffect, useState , useRef } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineShoppingBag, MdStar } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getWishlist, removeWishlist } from "../Store/Slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { addToCart, getCartData, YouMayAlsoLike } from "../Store/Slices/cartSlice";
import { HiX } from "react-icons/hi";
import {
  MdDeleteOutline,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineLocalShipping,
  MdCardGiftcard,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";
import { GrNotes } from "react-icons/gr";
import CartItem from '../images/CartItem.png'
import GiftWrap from '../images/GiftWrap.png'
import img_black from "../images/YouLikeProduct.png";
import img_blue from "../images/fashion-img(2).png";
import img_Yellow from "../images/fashion-img(3).png";
import img_orange from "../images/fashion-img(4).png";




export const SingleProduct = ({ product, onQuickView }) => {

	const [activeVariant, setActiveVariant] = useState(0);
	const [inCart, setInCart] = useState(false);
	const [inWishlist, setInWishlist] = useState(false);

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
	const scrollRef = useRef(null);


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


	// Badge Colors
	const badgeNameColors = {
		"BEST SELLER": "bg-[#1E40AF]",
		"TRENDING": "bg-[#16A34A]",
		"NEW": "bg-[#2563EB]",
		"BEST DEAL": "bg-[#F59E0B]",
		"TOP RATED": "bg-[#DC2626]",
		"CORALBAY CHOICE": "bg-[#F97316]",
	};
	const badgeBg = badgeNameColors[product?.badge];


	// Cart Control
	const handleCartControl = async (productId, varientId) => {
		// alert(pid)
		console.log('Product Id :', productId)
		console.log('varient Id :', varientId)

		const sendCartData = {
			quantity: 1,
			productVarientId: varientId
		}

		dispatch(addToCart({ id: productId, data: sendCartData }))

		const response = await dispatch(getCartData())
		const cartId = response?.payload?.cartId
		// console.log("Response Payload", cartId)

		dispatch(YouMayAlsoLike(cartId));
		

		setOpenCart(true)

	}


	// ******* Cart Canvas ********

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





	return (


		<>
			<div className="product_card bg-[#F9FAFB] p-2 h-fit group rounded-xl shadow hover:shadow-lg transition-all duration-300" >
				<div className="flex flex-col">
					{/* IMAGE PART */}
					<div className="relative rounded overflow-hidden bg-[#E5E7EB]">
						{/* Badge */}
						{(product.badge) && (
							<div
								className={`absolute top-3 left-3 text-white text-[12px]  font-semibold px-3 py-1 rounded shadow-md flex items-center justify-center z-20 ${badgeBg}`}
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
							{!token ? (

								<FaRegHeart onClick={() => navigate("/login")} />
							) : (wishData || []).some((item) => item.productId?._id === product?._id) ? (

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
								onClick={() => {
									handleCartControl(product._id, currentVariant._id)
									setInCart(true);
								}}
								className="text-black w-1/2 text-[13px] font-semibold flex items-center justify-center gap-1 
								hover:bg-[#111827] hover:text-white transition-all duration-300 ease-in-out"
							>
								<MdOutlineShoppingBag className="text-[18px]" />
								ADD TO CART
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



			{/* Cart - OffCanvas */}
			<div
				className={`fixed top-0 right-0 h-full w-full sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] bg-[var(--bg-white)] shadow-lg z-[999] transition-transform duration-300 ease-in-out
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
								<button className='border border-[#6B7280] text-[#6B7280] rounded-md p-2' onClick={() => { navigate('/addtocart'); setOpenCart(false) }}>View Cart</button>
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
					className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
				/>
			)}

		</>


	);
};
