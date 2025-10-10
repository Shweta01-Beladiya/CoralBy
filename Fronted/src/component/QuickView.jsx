import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineShoppingBag, MdStar } from "react-icons/md";
import { FaHeart, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import SizeGuide from "./SizeGuide";
import { IoIosShareAlt } from "react-icons/io";

const QuickView = ({ product, onClose }) => {
  console.log("productQuickView>>>>>>>>>", product);

  // safe defaults
  const safeVariants = (product?.varientId || []).map((v) => ({
    _id: v._id,
    color: v.color || "Default",
    colorName: v.color ? v.color.charAt(0).toUpperCase() + v.color.slice(1) : "Unknown",
    image: v.images?.[0],
    images: v.images || [],
    price: v.price || {},
    size: v.size,
    sku: v.sku,
    stock: v.stock,
  }));
  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [activeVariant, setActiveVariant] = useState(initialVariant);
  const [activeSize, setActiveSize] = useState(8);
  const [activeVariant, setActiveVariant] = useState(safeVariants[0]);
  const [activeSize, setActiveSize] = useState(safeVariants[0]?.size || '');
  const [inWishlist, setInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [mainImages, setMainImages] = useState(
    safeVariants[0]?.images?.length > 0
      ? safeVariants[0].images.slice(0, 2)
      : [safeVariants[0]?.image]
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

  if (!product) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
        onClick={onClose}
      >
        <div className="relative flex justify-center px-2">
          <div
            className="max-h-[90vh] overflow-y-auto 
             w-[95%] sm:w-[90%] md:w-[100%] 
             max-w-[95vw] md:max-w-4xl lg:max-w-5xl 
             bg-white rounded-[12px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-[4px] right-[28px] sm:top-0 sm:right-[12px] md:right-[-20px] text-[#F97316] text-xl bg-white w-6 h-6 flex items-center justify-center rounded-full sm:rounded-none shadow hover:bg-gray-100"
            >
              <IoClose />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-6">
              {/* Left: Main images */}
              <div className="w-full sm:w-[45%] lg:w-[40%] flex flex-col gap-3">
                {/* Mobile: 1 image for <640px */}
                <img
                  src={mainImages[0]}
                  alt={product.title}
                  className="w-full h-[200px] object-cover rounded-lg border sm:hidden"
                />

                {/* Tablet & above: 2 images for ≥640px */}
                {mainImages.slice(0, 2).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.title}-${i}`}
                    className="hidden sm:block w-full h-[220px] max-w-[200px] object-cover rounded-lg border"
                  />
                ))}
              </div>

              {/* Right: Details */}
              <div className="w-full sm:w-[55%] lg:w-[60%] flex flex-col">
                <div className="flex justify-between items-center">
                  <div>
                    {/* Badge */}
                    {product.badge && (
                      <div
                        className="max-w-fit text-white text-[10px] sm:text-[12px] font-semibold px-2 sm:px-3 py-1 mb-[6px] rounded shadow-md"
                        style={{
                          backgroundColor: product.badgeColor || "#DC2626",
                        }}
                      >
                        {product.badge}
                      </div>
                    )}

                    <p className="text-[#6B7280] text-[14px] sm:text-[16px] font-medium">
                      {product.brand}
                    </p>
                  </div>
                  <div className="border border-[#E5E7EB] text-[18px] sm:text-[20px] text-[#6B7280] rounded-full p-2 flex-shrink-0">
                    <IoIosShareAlt />
                  </div>
                </div>

                <h5 className="text-black text-[16px] sm:text-[20px] font-semibold truncate mt-2 mb-2 max-w-[440px]">
                  {product.title}
                </h5>

                {/* Rating */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    SKU: {product.sku}
                  </p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < product.rating ? (
                        <MdStar
                          key={i}
                          className="text-yellow-500 text-base sm:text-lg"
                        />
                      ) : (
                        <MdStar
                          key={i}
                          className="text-gray-300 text-base sm:text-lg"
                        />
                      )
                    )}
                    <span className="ml-2 text-xs sm:text-[14px] font-semibold text-[#6B7280]">
                      ({product.ratingIndex}) & Review (02)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  {activeVariant?.price?.original && (
                    <del className="text-red-500 font-semibold text-sm sm:text-lg">
                      {activeVariant.price.currency || "AU$"}
                      {activeVariant.price.original}
                    </del>
                  )}
                  {activeVariant?.price?.discounted && (
                    <span className="text-black font-bold text-base sm:text-xl">
                      {activeVariant.price.currency || "AU$"}
                      {activeVariant.price.discounted}
                    </span>
                  )}
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <p className="text-gray-700 font-medium text-sm sm:text-base mb-1">
                    Color: {activeVariant.colorName}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {safeVariants.map((v) => (
                      <img
                        key={v._id}
                        src={v.image}
                        alt={v.colorName}
                        onClick={() => {
                          setActiveVariant(v);
                          setActiveSize(v.size || "");
                          setMainImages(
                            v.images?.length > 0 ? v.images.slice(0, 2) : [v.image]
                          );
                        }}
                        className={`w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover rounded cursor-pointer border-2 ${
                          v.color === activeVariant.color
                            ? "border-[#44506A33] shadow-lg transform scale-[1.05]"
                        className={`w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover rounded cursor-pointer border-2 ${v._id === activeVariant._id
                          ? "border-[#44506A33] shadow-lg transform scale-[1.05]"
                            : "border-gray-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-4">
                  <p className="text-gray-700 font-medium text-sm sm:text-base mb-2">
                    Size: {activeSize}
                  </p>
                  <div className="flex gap-2 flex-wrap items-center">
                    {[...new Set(safeVariants.map((v) => v.size))].map((size) => (
                      <button
                        key={size}
                        onClick={() => setActiveSize(size)}
                        className={`px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm transition ${
                          activeSize === size
                            ? "bg-black text-white"
                            : "hover:bg-black hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                     <span
                      className="text-[#44506A] text-[10px] sm:text-[12px] font-semibold underline uppercase cursor-pointer"
                      onClick={() => setIsSizeGuideOpen(true)}
                    >
                      size guide
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {/* <div className="flex gap-2 mb-3 flex-wrap">
                  {activeVariant.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`thumb-${i}`}
                      onClick={() => handleImageClick(img)}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border border-[#E5E7EB] cursor-pointer hover:ring-2"
                    />
                  ))}
                </div> */}

                {/* Quantity + Buttons */}
                <div className="flex items-stretch gap-2 sm:gap-3 mb-4 flex-wrap flex-row">
                  {/* Quantity Box */}
                  <div className="flex items-center justify-center border rounded p-1 sm:p-2 gap-1">
                    <button
                      onClick={decreaseQty}
                      className="p-1 sm:p-2 hover:bg-gray-200 rounded-full"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="px-2 font-medium text-sm">{quantity}</span>
                    <button
                      onClick={increaseQty}
                      className="p-1 sm:p-2 hover:bg-gray-200 rounded-full"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button className="flex-1 flex items-center justify-center flex-nowrap gap-1 sm:gap-2 text-nowrap text-[#44506A] text-sm text-[16px] md:text-[18px] font-semibold border border-[#7d8ba9] px-2 sm:px-4 py-[6px] rounded transition">
                    <MdOutlineShoppingBag
                      size={16}
                      className="sm:size-[18px]"
                    />
                    Add to Cart
                  </button>

                  {/* Wishlist Heart */}
                  <div
                    className="py-2 px-3 text-[16px] sm:text-[18px] text-[#44506A] border border-[#E5E7EB] rounded-lg flex justify-center items-center cursor-pointer"
                    onClick={() => setInWishlist(!inWishlist)}
                  >
                    {inWishlist ? (
                      <FaHeart className="text-[#F97316]" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                </div>

                <button className="bg-[#F97316] text-sm sm:text-[18px] font-medium text-white px-4 sm:px-5 py-2 rounded hover:bg-[#e66b13]">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSizeGuideOpen && (
        <SizeGuide
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      )}
    </>
  );
};

export default QuickView;
