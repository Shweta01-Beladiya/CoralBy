import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Slider from "react-slick";
import products from "../pages/ProductList";
import { SingleProduct } from "../component/Single_product_card";

const ProductCard = forwardRef(({ initialSlideProductId = 1, slidePaddingPx = 12 }, ref) => {
	const sliderRef = useRef(null);

	useImperativeHandle(ref, () => ({
		next: () => sliderRef.current?.slickNext(),
		prev: () => sliderRef.current?.slickPrev(),
	}));

	const initialIndex = Math.max(
		0,
		products.findIndex((p) => p.id === initialSlideProductId)
	);

	const settings = {
		dots: false,
		nav: false,
		infinite: true,
		margin: 12,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		initialSlide: initialIndex === -1 ? 0 : initialIndex,
		responsive: [
			{
				breakpoint: 1240,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<div className="product_slider">
			<Slider ref={sliderRef} {...settings}>
				{products.map((product) => (
					<div key={product.id} className="py-2 px-2">
						<SingleProduct product={product} />
					</div>
				))}
			</Slider>
		</div>
	);
});

export default ProductCard;
