import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import Slider from "react-slick";
// import products from "../pages/ProductList";
import { SingleProduct } from "../component/Single_product_card";

const ProductCard = forwardRef(({ initialSlideProductId = 1, slidePaddingPx = 12, onQuickView, productData, }, ref) => {

	const sliderRef = useRef(null);

	// Allow parent to control the slider
	useImperativeHandle(ref, () => ({
		next: () => sliderRef.current?.slickNext(),
		prev: () => sliderRef.current?.slickPrev(),
	}));

	// Extract products safely from productData.data
	const products = Array.isArray(productData) ? productData : [];

	// Debugging
	// useEffect(() => {
	// 	console.log("ProductCard received productData:", productData);
	// 	console.log("Processed products array:", products);
	// }, [productData]);

	//  Compute the initial slide safely
	const initialIndex = Math.max(
		0,
		products.findIndex((p) => p._id === initialSlideProductId)
	);

	// 🛠 Slider settings
	const settings = {
		dots: false,
		nav: false,
		infinite: true,
		margin: slidePaddingPx,
		speed: 700,              
		slidesToShow: 4,
		slidesToScroll: 2,
		arrows: false,
		initialSlide: initialIndex === -1 ? 0 : initialIndex,
		responsive: [
			{ breakpoint: 1240, settings: { slidesToShow: 3, slidesToScroll: 2 } },
			{ breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
			{ breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
		],
	};


	return (
		<div className="product_slider">

			<Slider ref={sliderRef} {...settings}>
				{products.map((product) => (
					<div key={product._id} className="py-2 px-2">
						<SingleProduct product={product} onQuickView={onQuickView} />
					</div>
				))}
			</Slider>

		</div>
	);
}
);

export default ProductCard;