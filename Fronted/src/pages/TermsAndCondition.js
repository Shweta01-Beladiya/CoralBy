import React from 'react'
import { LiaAngleRightSolid } from 'react-icons/lia';
import { VscTriangleRight } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const TermsAndCondition = () => {
	return (
		<>
			<div className='term_condition_page'>
				{/* Breadcrumb navigation */}
				<div className="bg-[#F9FAFB] py-[22px] sm:py-[32px]">
					<div className="main_container px-[22px] sm:px-[32px] mx-0 h_breadcrumb">
						<h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
							Terms & Conditions
						</h2>
						<div className="h_Breadcrumb_navigation flex items-center gap-2">
							<h5 className="text-[16px] text-[#BABABA] font-medium">
								<Link to={"/"}>
									Home
								</Link>
							</h5>
							<LiaAngleRightSolid />
							<h3 className="text-[16px] text-[#44506A] font-medium">
								Terms & Conditions
							</h3>
						</div>
					</div>
				</div>
				<div className='main_container'>
					<div className="py-[30px] sm:py-[60px]">
						<p className='text-[#44506A] text-[16px] sm:text-[18px] font-medium mb-[24px]'>Last Updated on <span className='text-[#111827] font-bold'>29 January 2025.</span></p>
						<div className='welcome-profile-part mb-[32px]'>
							<h4 className='text-[24px] font-bold text-[#0A0E17] mb-[6px]'>Welcome to CORALBAY</h4>
							<p className='text-[16px] sm:text-[18px] font-medium text-[#44506A]'>These Terms and Conditions (“Terms”) govern your use of our website and services. By accessing or using our website, you agree to comply with these Terms along with our Privacy Policy. If you do not agree with any part of these Terms, please do not use our website or place an order.</p>
						</div>
						{/* 1. */}
						<div className='mb-[32px]'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>1. Acceptance of Terms</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>By placing an order, browsing, or using any part of this website, you confirm that you accept these Terms & Conditions.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>These form a legally binding agreement between you and CORALBAY.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We may update these Terms at any time, and changes will be effective immediately after posting.</p>
						</div>
						{/* 2. */}
						<div className='mb-[32px]'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>2. Eligibility</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>To use our website and services, you must meet the following requirements:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Be at least 18 years old.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Have legal capacity to enter into binding contracts in Australia.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Agree to use the website only for lawful purposes in compliance with Australian laws.</p>
							</div>
						</div>
						{/* 3. */}
						<div className='mb-[32px]'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>3. Product Descriptions and Availability</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>At CORALBAY, we strive to provide accurate, up-to-date product descriptions, images, and pricing. However, we do not warrant that the descriptions, images, or other content displayed on the website are completely accurate, current, or error-free. Products may differ slightly in appearance from their images due to variations in lighting, screen resolution, and supplier changes. Furthermore, product availability is subject to change without prior notice, and we reserve the right to limit quantities, discontinue products, or refuse service at our discretion. Product specifications, promotions, and pricing may also change without notice.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We aim to provide accurate product descriptions, images, and pricing, but we cannot guarantee 100% accuracy due to:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Supplier variations</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Differences in display screens</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-[14px]'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Ongoing stock updates</p>
							</div>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>Important Points:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Product images are for illustration only.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Prices and availability may change without notice.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>We may limit quantities or discontinue any product at any time.</p>
							</div>
						</div>
						{/* 4. */}
						<div className='mb-[32px]'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>4. Placing Orders and Payment</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>All orders placed through our website are subject to acceptance by CORALBAY. Placing an order constitutes an offer to purchase, which becomes binding only upon our acceptance. We reserve the right to cancel or refuse any order for any reason, including suspected fraud or violation of these Terms. Prices displayed include applicable Australian GST and are subject to change without prior notice. Payment methods accepted include major credit cards (Visa, MasterCard, AMEX), PayPal, and Afterpay where available. All transactions are processed securely in compliance with industry standards. You warrant that you are authorized to use the payment method you provide, and you accept responsibility for any charges incurred.</p>
						</div>
						{/* 5. */}
						<div className='mb-[32px]'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>5. Shipping and Delivery</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>We deliver products only within Australia.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>Delivery Information:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Estimated delivery: 3–7 business days</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Delivery charges vary by location and may apply extra for remote areas.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Risk passes to you once the product is dispatched.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>It is your responsibility to provide accurate delivery details.</p>
							</div>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Delays may occur due to unforeseen circumstances such as adverse weather or courier disruptions.</p>
						</div>
						{/* 6. */}
						<div className='mb-[32px]'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>6. Returns and Refunds</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>At COTALBAY, we want you to be satisfied with your purchase. You may return eligible products within 30 days of delivery for a full refund or exchange, provided that the items are unused, unopened, and in their original packaging. Please note that some items—such as personal care products, perishable goods, and gift cards—are not eligible for return due to hygiene or other reasons. To initiate a return, you must contact our customer support team at support@coralbay.com to receive a Return Authorization Number (RAN). Refunds will be processed after we receive and inspect the returned item, usually within 14 business days. Shipping costs for returned products are non-refundable unless the return is due to our error.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>Eligibility for Returns:</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>You may return a product within 30 calendar days from the date of delivery if all the following conditions are met:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>The item is in its original, unused condition.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>The product is returned in its original packaging, along with all accessories, manuals, and any included freebies or promotional items.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-[14px]'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>The product must not show signs of use, damage, or wear.</p>
							</div>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>Non-Returnable Products:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Personal hygiene products (e.g., face masks, skincare items).</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Perishable items (e.g., food, fragrances).</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Gift cards or downloadable digital products.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Customized or personalized items (unless defective).</p>
							</div>
						</div>
						{/* 7. */}
						<div className=''>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>7. Intellectual Property</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>All content on this website, including but not limited to text, images, graphics, logos, icons, designs, product descriptions, software, and audio or video materials (collectively referred to as “Content”), is the property of CORALBAY or is licensed to us by third-party partners.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>All intellectual property rights in the website, including but not limited to logos, graphics, designs, text, images, and software, are owned by [Your Website Name] or licensed to us by third parties. You are granted a limited, non-exclusive, non-transferable license to browse and use the website for personal use only. Any other use of the website content—such as copying, reproducing, publishing, or redistributing without express written permission—is strictly prohibited and constitutes an infringement of our intellectual property rights.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>Trademarks:</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>All trademarks, service marks, logos, and brand names displayed on this website are registered and unregistered trademarks of CORALBAT or their respective owners.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>You may not use any of these trademarks in any way that may cause confusion, dilute their value, or infringe on their rights.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>Copyright:</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>All Content on this website is protected by copyright laws under Australian Copyright Act and international intellectual property treaties.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal'>Unauthorized copying, reproduction, or redistribution of Content may lead to legal action, including civil and criminal penalties.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default TermsAndCondition;