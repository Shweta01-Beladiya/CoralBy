import React, { useState, useEffect } from "react";
import "../styles/h_style.css";
import { LiaAngleRightSolid } from "react-icons/lia";
import { IoMdSearch } from "react-icons/io";

// Fashion Brands
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
// import { Cmn_btn } from "../components/button";
import { Link } from "react-router-dom";
import Newsletter from "../component/Newsletter";
import { FAQ } from "../component/FAQ";

const ShopAllBrands = () => {
	const [activeCategory, setActiveCategory] = useState("Fashion");

	const categories = [
		"Home & Furniture",
		"Fashion",
		"Electronics",
		"Mobile & Tablets",
		"Beauty",
		"Personal Care",
		"Grocery",
	];

	// Category-wise brands
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
		"Electronics": [f_brand_5, f_brand_10, f_brand_15],
		"Mobile & Tablets": [f_brand_2, f_brand_8, f_brand_12],
		"Beauty": [f_brand_9, f_brand_13, f_brand_16],
		"Personal Care": [f_brand_11, f_brand_14, f_brand_20],
		"Grocery": [f_brand_18, f_brand_21, f_brand_23],
	};



	return <>
		{/* <Header /> */}
		<div className="shop-all-brands">
			{/* Breadcrumb navigation */}
			<div className="bg-[#F9FAFB] py-[22px] sm:py-[32px]">
				<div className="main_container px-[22px] sm:px-[32px] mx-0 h_breadcrumb">
					<h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
						Shop All Brands
					</h2>
					<div className="h_Breadcrumb_navigation flex items-center gap-2">
						<h5 className="text-[16px] text-[#BABABA] font-medium">
							<Link to={"/"}>
								Home
							</Link>
						</h5>
						<LiaAngleRightSolid />
						<h3 className="text-[16px] text-[#44506A] font-medium">
							Shop All Brands
						</h3>
					</div>
				</div>
			</div>
			<div className="main_container">
				<div className="py-[16px] sm:py-[32px]">
					{/* Intro Section */}
					<div className=" sm:max-w-[640px]">
						<h1 className="text-[28px] sm:text-[42px] font-bold leading-tight">
							All Brands at CORALBAY, Explore Global & Local Favorites
						</h1>
						<p className="text-[16px] sm:text-[20px] font-medium mt-4 text-[#44506A]">
							Find top brands across categories like fashion, electronics,
							groceries, and more all in one place.
						</p>
					</div>

					{/* Search & Sort */}
					<div className="flex justify-between items-center flex-wrap gap-[12px] w-full mt-[30px] sm:mt-[60px]">
						{/* search input with icon */}
						<div className="relative flex-1 min-w-[250px]">
							<input
								type="search"
								placeholder="Search all brands here"
								className="h_shopAllBrand_search w-full px-4 py-2 pr-10 rounded text-[16px] text-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#bec1c9]"
							/>
							{/* search icon */}
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-[22px] text-[#F97316] cursor-pointer">
								<IoMdSearch />
							</span>
						</div>

						{/* sort dropdown */}
						<div className="flex items-center gap-2 h_sort_dropdown rounded">
							<label
								htmlFor="sort"
								className="text-[16px] font-medium text-gray-600 ml-3"
							>
								Sort by:
							</label>
							<select
								id="sort"
								className="px-2 py-2 mr-3 rounded-md text-[16px] bg-transparent focus:outline-none"
							>
								<option>Featured</option>
								<option>A - Z</option>
								<option>Z - A</option>
								<option>Price: Low to High</option>
								<option>Price: High to Low</option>
								<option>Popularity</option>
							</select>
						</div>
					</div>

					{/* Category Header */}
					<div className="flex items-center gap-6 sm:gap-10 border-b border-gray-200 overflow-x-auto no-scrollbar mt-[24px]">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setActiveCategory(cat)}
								className={`relative py-3 text-[16px] text-nowrap font-semibold transition-colors ${activeCategory === cat ? "text-[#F97316]" : "text-[#6B7280]"
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
					<div className="h_brands-grid mt-10">
						{categoryBrands[activeCategory]?.map((brand, idx) => (
							<div
								key={idx}
								className="border rounded-lg flex justify-center items-center text-center font-semibold hover:bg-[#E5E7EB] hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
							>
								<img
									src={brand}
									alt={`brand-${idx}`}
									className="max-h-[24px] object-contain"
								/>
							</div>
						))}
					</div>

					{/* Load More button */}
					<div className="flex justify-center mt-10 mb-[24px] sm:mb-[62px]">
						<Link
							to={"#"}
							className="bg-[#F97316] text-white rounded py-[8px] sm:py-[10px] px-[28px] sm:px-[33px] text-[16px] sm:text-[18px] font-medium"
						>
							Load more
						</Link>
					</div>

					{/* Faq */}
					<FAQ />

				</div>
			</div>
			{/* Newsletter */}
			<Newsletter />
		</div>

	</>
};

export default ShopAllBrands;