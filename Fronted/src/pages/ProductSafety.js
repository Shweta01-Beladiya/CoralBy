import React from 'react'
import { LiaAngleRightSolid } from 'react-icons/lia'
import { VscTriangleRight } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

const ProductSafety = () => {
	return (
		<div className='product_safety_page'>
			{/* Breadcrumb navigation */}
			<div className="bg-[#F9FAFB] py-[22px] sm:py-[32px]">
				<div className="main_container px-[22px] sm:px-[32px] mx-0 h_breadcrumb">
					<h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
						Product Safety
					</h2>
					<div className="h_Breadcrumb_navigation flex items-center gap-2">
						<h5 className="text-[16px] text-[#BABABA] font-medium">
							<Link to={"/"}>
								Home
							</Link>
						</h5>
						<LiaAngleRightSolid />
						<h3 className="text-[16px] text-[#44506A] font-medium">
							Product Safety
						</h3>
					</div>
				</div>
			</div>

			<div className='main_container'>
				<div className='py-[30px] sm:py-[60px]'>
					<div className='welcome-profile-part mb-[32px]'>
						<h4 className='text-[24px] font-bold text-[#0A0E17] mb-[6px]'>We Care About Our Customer's Safety</h4>
						<p className='text-[16px] sm:text-[18px] font-medium text-[#44506A]'>At CORALBAY, we are committed to providing our valued customers with safe, high-quelity products. We place customer safety as our top prority, keeping you informed about any product safety issues, withdrawals or recalls.</p>
					</div>
					{/* 1. */}
					<div className='mb-[32px]'>
						<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>1. Product Safety Requirement</h2>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We strictly follow the product safety requirements under Australian Consumer Law (ACL) to ensure the highest standard of safety. For our own brand products, this includes: </p>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>supplying products that comply with Australian standards and regulations</p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Reporting product safety incidents as required by law</p>
						</div>
					</div>
					{/* 2. */}
					<div className='mb-[32px]'>
						<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>2. CORALBAY Product Safety Policy</h2>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Our product safety policy applies to all products sold by CORALBAY on our platform.</p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We are dedicated to ensuring that every product we sell is safe and of the highest quality.</p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>Together with our trusted suppliers, we share the responsibility of the delivering safe and reliable products to our customers. </p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>How to Report a Product Safety Incident:</p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>If you wish to report a product safety-related incident, you can: </p>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Call us at: <span className='underline'>+61 585 585 585</span></p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Email us: <span className='underline'>support@coralbay.com.au</span></p>
						</div>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Once we receive your report, it will be handled according to our safety protocols to ensure proper escalation and resolution.</p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Serious injuries (Classified as Severity 1)will undergo a formal investigation to indentify the root cause.</p>
					</div>
					{/* 3. */}
					<div className='mb-[32px]'>
						<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>3. Product Recalls</h2>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Our highest priority is to ensure the health and safety of our customers and staff. </p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>We respond promptly to product recalls or withdrawals as per our internal policy and legal requirements.</p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>Our key focus areas during a recall include:</p>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Customer and staff safety</p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Compliance with Australian legal standards</p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[16px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Maintaining product quality reputation</p>
						</div>
					</div>
					{/* 4. */}
					<div className='mb-[32px]'>
						<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>4. Food Specific Safety Information</h2>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Food Standards Australia New Zealand (FSANZ) oversees food recalls in Australia and New Zealand.</p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>If you Purchased food from CORALBAY that has been recalled, detailed information is available at:</p>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A] underline'>support@Coralbay.com.au</p>
						</div>
					</div>
					{/* 5. */}
					<div className='mb-[32px]'>
						<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>5. How to Stay Safe Online</h2>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Your online safety is important to us.</p>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We strongly advise customers to report any cyberbullying, abusive content, or illegal activities.</p>
					</div>
					{/* 6. */}
					<div>
						<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>6. Set Up Parental Control and Content Filters</h2>
						<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We recommends the following best practices to keep children safe online:</p>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Monitor children's online activity</p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Set rules and limits on social media usage</p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Use content filters to block inappropriate content</p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Limit screen time</p>
						</div>
						<div className='flex justify-start items-start gap-2 mb-2'>
							<VscTriangleRight className='text-[#f97316] text-[14px] sm:text-[18px] flex-shrink-0 mt-1' />
							<p className='text-[16px] font-medium text-[#44506A]'>Regularly update software and parental control setting</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default ProductSafety;