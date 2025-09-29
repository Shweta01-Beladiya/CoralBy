
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import wishList1 from '../images/wish1.png';
import wishList2 from '../images/wish2.png';
import wishList3 from '../images/wish3.png';
import wishList4 from '../images/wish4.png';
import tShirt1 from '../images/t1.jpg';
import tShirt2 from '../images/t2.jpg';
import tShirt3 from '../images/t3.jpg';
import shoes1 from '../images/s1.jpg';
import shoes2 from '../images/s2.jpg';
import shoes3 from '../images/s3.jpg';
import stool1 from '../images/s4.jpg';
import stool2 from '../images/s5.jpg';
import shoes4 from '../images/l1.jpg';
import shoes5 from '../images/l2.jpg';
import NoProductProfile from '../images/NoProductWishlistProfile.png'
import NoProductHeader from '../images/wishlist_empty_header.png'
import logo from '../images/logo.png';
import { useState } from "react";



const products = [
    {
        id: 1,
        title: "Regular Cotton T-Shirt",
        brand: "Droopier",
        price: 14,
        oldPrice: 24,
        tag: "TOP RATED",
        tagColor: "bg-[var(--bg-red)]",
        images: {
            orange: wishList1,
            blue: tShirt1,
            black: tShirt2,
            pink: tShirt3
        },
        rating: 4.5,
        reviews: "49,903",
        colors: ["orange", "blue", "black", "pink"],
    },
    {
        id: 2,
        title: "SB Ishod Wair Wheat Flax DC723...",
        brand: "Nike",
        price: 119,
        oldPrice: 156,
        tag: "NEW",
        tagColor: "bg-[var(--bg-blue)]",
        // image: wishList2,
        images: {
            orange: wishList2,
            white: shoes1,
            black: shoes2,
            blue: shoes3
        },
        rating: 3.8,
        reviews: "202",
        colors: ["orange", "blue", "black", "white"],
    },
    {
        id: 3,
        title: "Minimalist Black Wooden Stool",
        brand: "CoralBay",
        price: 49,
        oldPrice: 69,
        tag: "BEST DEAL",
        tagColor: "bg-[var(--bg-yellow)]",
        images: {
            black: wishList3,
            blue: stool1,
            brown: stool2
        },
        image: wishList3,
        rating: 4.5,
        reviews: "4,787",
        colors: ["black", "blue", "brown"],
    },
    {
        id: 4,
        title: "Premium Tasselled Leather Loaf...",
        brand: "Polo Ralph Lauren",
        price: 1349,
        oldPrice: 1499,
        tag: "CORALBAY CHOICE",
        tagColor: "bg-[var(--bg-orange)]",
        // image: wishList4,
        images: {
            orange: wishList4,
            blue: shoes4,
            black: shoes5,
        },
        rating: 3.0,
        reviews: "06",
        colors: ["orange", "blue", "black"],
    },
    {
        id: 5,
        title: "SB Ishod Wair Wheat Flax DC723...",
        brand: "Nike",
        price: 119,
        oldPrice: 156,
        tag: "NEW",
        tagColor: "bg-[var(--bg-blue)]",
        // image: wishList2,
        images: {
            orange: wishList2,
            white: shoes1,
            black: shoes2,
            blue: shoes3
        },
        rating: 3.8,
        reviews: "202",
        colors: ["orange", "blue", "black", "white"],
    },
];

export default function Wishlist({ viewType }) {

    const [selectedColors, setSelectedColors] = useState({});

    // this component call anthour page
    // <wishlist viewType="profile" />
    // <wishlist viewType="header"  />

    const getGridClasses = () => {
        if (viewType === "profile") {
            return "grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 "
        }
        if (viewType === "header") {
            return "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-5 gap-3"
        }
        return "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4"
    }

    const handleColorClick = (productId, color) => {
        setSelectedColors((prev) => ({ ...prev, [productId]: color }));
    };

    return (
        <div className="">

            {/* Grid */}
            <div className={getGridClasses()}>
                {products.length > 0 ? (
                    products.map((product) => {
                        const selectedColor = selectedColors[product.id] || product.colors[0];
                        return (
                            <div
                                key={product.id}
                                className="bg-[var(--bg-light)]  rounded-xl p-[6px] relative flex flex-col"
                            >
                                {/* Badge */}
                                {product.tag && (
                                    <span
                                        className={`absolute top-3 left-3 z-20 text-[var(--text-white)] text-xs font-extrabold px-2 py-1.5 rounded-md flex items-center gap-1 ${product.tagColor}`}
                                    >
                                        {product.tag === "CORALBAY CHOICE" ? (
                                            <>
                                                <img src={logo} alt="CoralBay Logo" className="w-4 h-4" />
                                                {product.tag}
                                            </>
                                        ) : (
                                            product.tag
                                        )}
                                    </span>
                                )}

                                {/* Favorite Button */}
                                <button className="absolute top-6 right-7 z-20">
                                    <FaHeart className="text-[var(--bg-orange)] text-xl" />
                                </button>

               
                                {/* Image + Colors */}
                                <div className="relative">
                                    <img
                                        src={product.images[selectedColor]}
                                        alt={product.title}
                                        className="w-full h-72 object-cover rounded-lg z-0"
                                    />

                                    {/* Color options */}
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center justify-center gap-2 z-10">
                                        {product.colors.map((color, i) => (
                                            <span
                                                key={i}
                                                onClick={() => handleColorClick(product.id, color)}
                                                className="w-5 h-5 rounded-full cursor-pointer border-2"
                                                style={{
                                                    backgroundColor: color,
                                                    boxShadow:
                                                        selectedColor === color ? `0 0 0 2px ${color}` : "none",
                                                }}
                                            ></span>
                                        ))}
                                    </div>

                                </div>


                                {/* Info */}
                                <div className="flex-1 lg:p-3 p-1">
                                    <h3 className="text-[#6B7280] font-medium text-base">{product.brand}</h3>
                                    <p className="mt-1 font-semibold text-[#111827] text-base truncate">{product.title}</p>

                                    {/* Price */}
                                    <div className="mt-1">
                                        <span className="line-through text-base font-semibold text-[var(--text-red)]">
                                            AU${product.oldPrice}
                                        </span>{" "}
                                        <span className="font-bold text-base text-[#0A0E17] ms-1">
                                            AU${product.price}
                                        </span>{" "}
                                        {/* <span className="text-gray-400 text-sm">(Included IST)</span> */}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center mt-1 text-sm text-[#F59E0B]">
                                        {Array.from({ length: 5 }, (_, i) => {
                                            const starValue = i + 1;
                                            if (product.rating >= starValue) {
                                                return <FaStar key={i} />; // full star
                                            } else if (product.rating >= starValue - 0.5) {
                                                return <FaStarHalfAlt key={i} />; // half star
                                            } else {
                                                return <FaRegStar key={i} className="text-[#D1D5DB]" />; // empty star
                                            }
                                        })}
                                        <span className="ms-2 text-[#6B7280]">({product.reviews})</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : viewType === "profile" ? (

                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <img src={NoProductProfile} alt="No Product" className="w-40 mb-4" />
                        <p className="text-[var(--text-black)] text-base font-medium mb-4">Add now, Buy Later.</p>
                        <button className="bg-[var(--bg-orange)] md:px-10 px-3 py-2 md:py-3 text-[var(--text-white)] md:text-lg text-base font-semibold rounded-md">Back to Store</button>
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
