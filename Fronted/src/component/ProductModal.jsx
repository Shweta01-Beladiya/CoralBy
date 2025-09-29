import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineShoppingBag, MdStar } from "react-icons/md";
import { FaHeart, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  // ✅ safe defaults
  const safeVariants = product?.variants || [];
  const initialVariant = safeVariants[0] || {
    images: [],
    image: "",
    color: "",
    colorName: "",
  };

  const [activeVariant, setActiveVariant] = useState(initialVariant);
  const [activeSize, setActiveSize] = useState(7);
  const [inWishlist, setInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mainImages, setMainImages] = useState(
    initialVariant.images?.length > 0
      ? initialVariant.images.slice(0, 2)
      : [initialVariant.image, initialVariant.image]
  );

  // Quantity handlers
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // update mainImages when thumbnail clicked
  const handleImageClick = (img) => {
    if (!activeVariant.images) return;
    setMainImages([
      img,
      ...activeVariant.images.filter((i) => i !== img).slice(0, 1),
    ]);
  };

  // render guard AFTER hooks
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close when clicking background
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[-5%] right-[-4%] text-[#F97316] text-lg bg-white border border-gray-300 w-6 h-6 flex items-center justify-center shadow hover:bg-gray-100"
        >
          <IoClose />
        </button>

        {/* Modal */}
        <div className="bg-white rounded-[10px] w-[95%] md:w-[700px] shadow-lg relative overflow-hidden flex p-[24px] gap-[32px]">
          {/* Left: Main images */}
          <div className="w-[40%] flex flex-col gap-3">
            {mainImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={product.title}
                className="w-full h-[220px] object-cover rounded-lg border"
              />
            ))}
          </div>

          {/* Right: Details */}
          <div className="w-[60%] flex flex-col">
            {/* Badge */}
            {product.badge && (
              <div
                className="max-w-fit text-white text-[12px] font-semibold px-3 py-1 rounded shadow-md flex items-center justify-center z-20"
                style={{ backgroundColor: product.badgeColor || "#DC2626" }}
              >
                {product.badge}
              </div>
            )}

            <p className="text-[#6B7280] text-[16px] font-medium">
              {product.brand}
            </p>
            <h5 className="text-black text-[16px] font-semibold truncate">
              {product.title}
            </h5>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) =>
                  i < product.rating ? (
                    <MdStar key={i} className="text-yellow-500 text-lg" />
                  ) : (
                    <MdStar key={i} className="text-gray-300 text-lg" />
                  )
                )}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.ratingIndex} Reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-3">
              <del className="text-red-500 font-semibold text-lg">
                AU${product.oldPrice}
              </del>
              <span className="text-black font-bold text-xl">
                AU${product.price}
              </span>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-1">
                Color: {activeVariant.colorName}
              </p>
              <div className="flex gap-2">
                {safeVariants.map((v, i) => (
                  <img
                    key={i}
                    src={v.image} // show the variant's main image
                    alt={v.colorName || `variant-${i}`}
                    onClick={() => {
                      setActiveVariant(v);
                      setMainImages(
                        v.images?.length > 0
                          ? v.images.slice(0, 2)
                          : [v.image, v.image]
                      );
                    }}
                    className={`w-12 h-12 object-cover rounded cursor-pointer border-2 ${
                      v.color === activeVariant.color
                        ? "border-[#44506A33] shadow-lg transform scale-[1.09]"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Size:</p>
              <div className="flex gap-2 flex-wrap items-center">
                {[6, 7, 8, 9, 10, 11].map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`px-3 py-1 border rounded text-sm transition ${
                      activeSize === size
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
                <span className="text-[#44506A] text-[12px] font-semibold underline uppercase">
                  size guide
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mb-4">
              {activeVariant.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => handleImageClick(img)}
                  className="w-16 h-16 object-cover rounded border border-[#E5E7EB] cursor-pointer hover:ring-2"
                />
              ))}
            </div>

            {/* Quantity + Buttons */}
            <div className="flex items-stretch gap-3 mb-4">
              {/* Quantity Box */}
              <div className="flex items-center border rounded p-2 gap-3">
                <button
                  onClick={decreaseQty}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <FaMinus size={12} />
                </button>
                <span className="px-3 font-medium">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Add to Cart (big button) */}
              <button className="flex-1 flex items-center justify-center gap-2 text-[#44506A] text-[18px] font-semibold border border-[#44506A] px-4 py-[6px] rounded text-sm transition">
                <MdOutlineShoppingBag size={18} />
                Add to Cart
              </button>

              {/* Wishlist Heart */}
              <div
                className="p-2 text-[18px] text-[#44506A] border border-[#E5E7EB] rounded-[8px] flex justify-center items-center cursor-pointer"
                onClick={() => setInWishlist(!inWishlist)}
              >
                {inWishlist ? (
                  <FaHeart className="text-[#F97316]" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
            </div>

            <button className="bg-[#F97316] text-white px-5 py-2 rounded hover:bg-orange-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;