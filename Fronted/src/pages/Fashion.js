import React, { useEffect, useState } from "react";
import "../styles/h_style.css";
import products from "../pages/ProductList";
import { SingleProduct } from "../component/Single_product_card";
import { LiaAngleRightSolid } from "react-icons/lia";
import { MdOutlineFilterAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Pagination from "../component/Pagination";
import { Link } from "react-router-dom";
import QuickView from "../component/QuickView";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, getProductVarient } from "../Store/Slices/categorySlice";

const Fashion = () => {

	const dispatch = useDispatch();

	const [showFilter, setShowFilter] = useState(false);
	const [openSection, setOpenSection] = useState(null);
	const [expandedSections, setExpandedSections] = useState({});
	const [searchTerms, setSearchTerms] = useState({
		Categories: "",
		Colors: "",
		Brands: "",
	});
	const [selectedFilters, setSelectedFilters] = useState({});
	const [searchHistory, setSearchHistory] = useState({
		Categories: [],
		Colors: [],
		Brands: [],
	});
	const [focusedSection, setFocusedSection] = useState(null);
	const [quickViewProduct, setQuickViewProduct] = useState(null);
	const [showQuickView, setShowQuickView] = useState(false);

	// QuickView handlers
	const openQuickView = (product) => {
		setQuickViewProduct(product);
		setShowQuickView(true);
	};

	const closeQuickView = () => {
		setShowQuickView(false);
		setQuickViewProduct(null);
	};
	const handleSearch = (section, value) =>
		setSearchTerms({ ...searchTerms, [section]: value });

	const saveSearchTerm = (section, value) => {
		if (!value.trim()) return;
		setSearchHistory((prev) => {
			const updated = [...new Set([value, ...prev[section]])];
			return { ...prev, [section]: updated.slice(0, 5) }; // keep max 5
		});
	};

	const handleSuggestionClick = (section, value) => {
		setSearchTerms({ ...searchTerms, [section]: value });
		setFocusedSection(null); // close dropdown
	};

	const handleCheckboxChange = (section, item) => {
		setSelectedFilters((prev) => {
			const sectionFilters = prev[section] || [];
			if (sectionFilters.includes(item)) {
				const newSectionFilters = sectionFilters.filter((i) => i !== item);
				if (newSectionFilters.length === 0) {
					const { [section]: _, ...rest } = prev;
					return rest;
				}
				return { ...prev, [section]: newSectionFilters };
			} else {
				return { ...prev, [section]: [...sectionFilters, item] };
			}
		});
	};

	const removeFilterTag = (section, item) =>
		handleCheckboxChange(section, item);

	// Sections & options
	const sections = {
		Gender: ["Men", "Women", "Kids", "Unisex"],
		Categories: [
			"T-Shirts",
			"Casual Shirts",
			"Formal Shirts",
			"Jackets",
			"Blazer & Coats",
			"Jeans",
			"Casual Trousers",
			"Formal Trousers",
			"Shorts",
			"Track Pants & Joggers",
			"Casual Shoes",
			"Formal Shoes",
			"Sports Shoes",
			"Sneakers",
			"Socks",
			"Watches",
		],
		FitType: [
			"Regular",
			"Loose",
			"Slim",
			"Compression",
			"Boxy",
			"Comfort Fit",
			"Oversized",
		],
		Size: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
		Price: [
			"Under AU$49",
			"AU$50 - AU$199",
			"AU$200 - AU$499",
			"AU$500 - AU$999",
			"AU$1000 - AU$2499",
			"AU$2500 - AU$4999",
			"AU$5000 & Above",
		],
		Brands: [
			"Nike",
			"Adidas",
			"Puma",
			"Levis",
			"Zara",
			"Gucci",
			"Prada",
			"Burberry",
			"Dior",
		],
		Colors: [
			"Black",
			"White",
			"Yellow",
			"Red",
			"Blue",
			"Grey",
			"Green",
			"Dark Blue",
			"Multicolor",
			"Pink",
			"Beige",
			"Gold",
		],
		Material: [
			"Poly Cotton",
			"Modal",
			"Linen Blend",
			"Viscose Rayon",
			"Nylon",
			"Wool Blend",
			"Polyester",
			"Cotton Blend",
			"Elastane",
			"Organic Cotton",
			"Pure Cotton",
		],
		Occasion: [
			"Casual",
			"Sports",
			"Party",
			"Formal",
			"Festive",
			"Beach Wear",
			"Lounge Wear",
		],
		Discount: [
			"30% or more",
			"40% or more",
			"50% or more",
			"60% or more",
			"70% or more",
		],
		Rating: ["4★ & above", "3★ & above"],
	};

	useEffect(() => {
		dispatch(getProduct());
		dispatch(getProductVarient());
	}, []);


	const product = useSelector((state) => state.category.product.data);
	const productVarient = useSelector((state) => state.category.productVarient.data);
	// console.log("productVarient",productVarient);
	

	// Filtered products based on selected filters
	const filteredProducts = products.filter((product) => {
		return Object.keys(selectedFilters).every((section) => {
			const selectedItems = selectedFilters[section];
			if (!selectedItems || selectedItems.length === 0) return true;

			const productValue =
				section === "Categories"
					? product.category
					: section === "Colors"
						? product.color
						: product[section.toLowerCase()] || "";

			if (Array.isArray(productValue)) {
				return selectedItems.some((item) => productValue.includes(item));
			}
			return selectedItems.includes(productValue);
		});
	});

	// State
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 16;

	// Paginated products
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

	const toggleFilter = () => setShowFilter(!showFilter);

	const toggleSection = (section) =>
		setOpenSection(openSection === section ? null : section);

	const toggleExpand = (section) => {
		setExpandedSections({
			...expandedSections,
			[section]: !expandedSections[section],
		});
	};

	return (
		<>
			<div className="fashion_page">
				{/* Breadcrumb */}
				<div className="bg-[#F9FAFB] py-[22px] sm:py-[32px]">
					<div className="main_container px-[22px] sm:px-[32px] mx-0 h_breadcrumb">
						<h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
							Fashion
						</h2>
						<div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 sm:gap-0">
							<div className="flex items-center gap-2">
								<h5 className="text-[16px] text-[#BABABA] font-medium">
									<Link to={"/"}>
										Home
									</Link>
								</h5>
								<LiaAngleRightSolid />
								<h3 className="text-[16px] text-[#44506A] font-medium">Fashion</h3>
							</div>
							<div>
								<h5 className="text-[16px] text-[#111827] font-semibold">
									Showing 01 - {filteredProducts.length} of {products.length}{" "}
									Products
								</h5>
							</div>
						</div>
					</div>
				</div>

				<div className="main_container ">
					<div className="py-[22px] sm:py-[32px] ">
						{/* Filter + Sort */}
						<div className="flex justify-between flex-col sm:flex-row items-start sm:items-center border-y border-[#E5E7EB] mb-5">
							<button
								onClick={toggleFilter}
								className="px-5 py-2 text-[#6B7280] text-[16px] font-medium border-b sm:border-r sm:border-b-0 border-[#E5E7EB] flex items-center gap-1 w-full sm:w-auto"
							>
								<MdOutlineFilterAlt /> Filter
							</button>
							{/* Active filter tags */}
							{Object.keys(selectedFilters).length > 0 && (
								<div className="flex flex-wrap gap-1 me-auto px-2 items-center border-y border-[#E5E7EB] sm:border-0 p-1 w-full sm:w-auto">
									{Object.entries(selectedFilters).map(([section, items]) =>
										items.map((item) => (
											<div
												key={`${section}-${item}`}
												className="flex items-center bg-[#E5E7EB] text-[#44506A] gap-1 p-1 rounded text-[14px] font-medium"
											>
												{item}
												<button
													onClick={() => removeFilterTag(section, item)}
													className="text-[#6B7280] font-bold text-[16px]"
												>
													<IoClose />
												</button>
											</div>
										))
									)}

									<button
										onClick={() => setSelectedFilters({})}
										className="ml-2 text-[14px] font-semibold text-[#44506A] underline"
									>
										Clear All
									</button>
								</div>
							)}

							{/* Sort dropdown */}
							<div className="flex items-center gap-2 sm:border-l border-[#E5E7EB] pl-3">
								<span className="text-[16px] text-[#6B7280] font-medium">
									Sort by :
								</span>
								<select className="px-2 py-2 text-[16px] font-medium text-[#111827] cursor-pointer">
									<option>Best selling</option>
									<option>Price: Low to High</option>
									<option>Price: High to Low</option>
									<option>Newest</option>
									<option>Customer Rating</option>
								</select>
							</div>
						</div>
						{/* Product grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{currentProducts.map((product) => (
								<SingleProduct key={product.id} product={product} onQuickView={openQuickView} />))}
						</div>

						{/* Pagination */}
						<Pagination
							currentPage={currentPage}
							totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
							onPageChange={setCurrentPage}
						/>
					</div>
				</div>
			</div>

			{/* Offcanvas Filter */}
			<div
				className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] px-[20px] sm:px-[32px] pt-[16px] sm:pt-[24px] bg-white shadow-lg z-[9999] transform transition-transform duration-300 ${showFilter ? "translate-x-0" : "-translate-x-full"
					}`}
			>
				<div className="flex justify-between items-center border-b pb-5">
					<h2 className="text-[20px] font-bold">FILTER</h2>
					<button
						onClick={toggleFilter}
						className="text-[16px] bg-[#44506A]/20 p-1"
					>
						<IoClose className="text-[#44506A]" />
					</button>
				</div>

				<div className="offcanvas-filter overflow-y-auto h-[calc(100%-60px)]">
					{Object.keys(sections).map((section) => {
						const filteredItems = sections[section].filter((item) =>
							["Categories", "Colors", "Brands"].includes(section)
								? item
									.toLowerCase()
									.includes((searchTerms[section] || "").toLowerCase())
								: true
						);

						const showCount = expandedSections[section]
							? filteredItems.length
							: Math.min(7, filteredItems.length);
						const showToggle = filteredItems.length > 7;

						return (
							<div key={section} className="border-b border-[#E5E7EB]">
								{/* Section header */}
								<div
									onClick={() => toggleSection(section)}
									className="py-3 flex justify-between items-center cursor-pointer"
								>
									<span className="font-semibold text-[16px] text-[#6B7280] uppercase">
										{section}
									</span>
									{openSection === section ? (
										<FaAngleDown />
									) : (
										<FaAngleUp />
									)}
								</div>

								{/* Section content */}
								{openSection === section && (
									<div className="pl-3 pb-3 flex flex-col gap-2 relative">
										{/* Search input for specific sections */}
										{["Categories", "Colors", "Brands"].includes(section) && (
											<div className="relative mb-2">
												<input
													type="text"
													placeholder={`Search ${section}`}
													value={searchTerms[section]}
													onChange={(e) =>
														handleSearch(section, e.target.value)
													}
													onFocus={() => setFocusedSection(section)}
													onBlur={() =>
														setTimeout(() => setFocusedSection(null), 150)
													}
													onKeyDown={(e) => {
														if (e.key === "Enter")
															saveSearchTerm(section, searchTerms[section]);
													}}
													className="w-full p-2 pl-3 pr-10 bg-[#E5E7EB] rounded focus:outline-none text-[14px]"
												/>
												<IoMdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px]" />

												{/* Suggestions dropdown */}
												{focusedSection === section && (
													<div className="absolute left-0 right-0 bg-white border border-gray-200 shadow-md rounded mt-1 z-50 max-h-[150px] overflow-y-auto offcanvas-filter">
														{searchHistory[section].length > 0 && (
															<div className="px-3 py-2 text-gray-400 text-xs">
																Recent
															</div>
														)}
														{searchHistory[section].map((term) => (
															<div
																key={term}
																className="px-3 py-2 cursor-pointer hover:bg-[#E5E7EB] text-sm"
																onClick={() =>
																	handleSuggestionClick(section, term)
																}
															>
																{term}
															</div>
														))}
														{sections[section].slice(0, 5).map((suggestion) => (
															<div
																key={suggestion}
																className="px-3 py-2 cursor-pointer hover:bg-[#E5E7EB] text-sm"
																onClick={() =>
																	handleSuggestionClick(section, suggestion)
																}
															>
																{suggestion}
															</div>
														))}
													</div>
												)}
											</div>
										)}

										{/* Filter options */}
										{filteredItems.slice(0, showCount).map((item) => (
											<label
												key={item}
												className="flex items-center gap-2 text-[16px] font-medium text-[#111827]"
											>
												<input
													type="checkbox"
													className="h-4 w-4 custom-checkbox"
													checked={
														selectedFilters[section]?.includes(item) || false
													}
													onChange={() => handleCheckboxChange(section, item)}
												/>
												{item}
											</label>
										))}

										{showToggle && (
											<button
												onClick={() => toggleExpand(section)}
												className="text-[14px] font-semibold text-[#2563EB] mt-1 text-left uppercase"
											>
												{expandedSections[section]
													? "View Less"
													: `${filteredItems.length - 6} more`}
											</button>
										)}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Overlay */}
			{showFilter && (
				<div
					className="fixed inset-0 bg-black bg-opacity-40 z-40"
					onClick={toggleFilter}
				></div>
			)}
			{/* Global QuickView Modal */}
			{showQuickView && quickViewProduct && (
				<QuickView product={quickViewProduct} onClose={closeQuickView} />
			)}
		</>
	);
};

export default Fashion;