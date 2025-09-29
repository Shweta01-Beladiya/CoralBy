import React from 'react'
import { LiaAngleRightSolid } from 'react-icons/lia'
import { VscTriangleRight } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

const Privacy_policy = () => {
	return (
		<>
			<div className='privacy_policy_page scroll-smooth'>
				{/* Breadcrumb navigation */}
				<div className="bg-[#F9FAFB] py-[22px] sm:py-[32px]">
					<div className="main_container px-[22px] sm:px-[32px] mx-0 h_breadcrumb">

						<h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
							Privacy Policy
						</h2>
						<div className="h_Breadcrumb_navigation flex items-center gap-2">
							<h5 className="text-[16px] text-[#BABABA] font-medium">
								<Link to={"/"}>
									Home
								</Link>
							</h5>
							<LiaAngleRightSolid />
							<h3 className="text-[16px] text-[#44506A] font-medium">
								Privacy Policy
							</h3>
						</div>
					</div>
				</div>
				<div className='main_container'>
					<div className="py-[30px] sm:py-[60px]">
						<div className='welcome-profile-part mb-[32px]'>
							<h4 className='text-[24px] font-bold text-[#0A0E17] mb-[6px]'>CORALBAY Privacy Policy</h4>
							<p className='text-[16px] sm:text-[18px] font-medium text-[#44506A]'>At CORALBAY, your privacy is of utmost importance to us. This Privacy Policy explains how CORALBAY collects, uses, processes, and protects your personal information when you browse our website, place orders, or interact with our services. We are committed to protecting your personal data in accordance with Australian Privacy Principles (APPs) and applicable laws.</p>
						</div>
						{/* contents */}
						<div className='mb-[32px]'>
							<h3 className='text-[#111827] text-[20px] font-bold mb-[6px]'>CONTENT</h3>
							<a href="#introduction" className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								1. Introduction
							</a>
							<a href="#personal-info" className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								2. Personal Information We Collect
							</a>
							<a href="#methods" className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								3. Methods of Data Collection
							</a>
							<a href="#use" className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								4. Use of Personal Information
							</a>
							<a href="#sharing" className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								5. Sharing Personal Information
							</a>
							<a href='#update-data' className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								6. Accessing and Updating Your Data
							</a>
							<a href='#del-personal-info' className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								7. Deleting Your Personal Information
							</a>
							<a href='#security' className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								8. Data Security Practices
							</a>
							<a href='#contact' className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline mb-[6px]'>
								9. Contact Information
							</a>
							<a href='#law' className='block text-[#44506A] text-[16px] sm:text-[20px] font-medium underline'>
								10. Applicable Law
							</a>
						</div>
						{/* 1. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='introduction'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>1. Introduction</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>CORALBAY is committed to handling your personal data in a responsible and transparent manner.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>This Privacy Policy outlines how we collect, store, and use your data while providing our products and services through our website.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>By using our website, you agree to the terms stated in this policy.</p>
						</div>
						{/* 2. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='personal-info'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>2. Personal Information We Collect</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>During our relationship with you, we may collect Personal Data from you. Examples of the types of Personal Data we may collect includes your name, contact details, delivery addresses, email address, date of birth, your shopping or browsing behaviours, voice recording (from customer service calls) and any other personally identifiable information that you have provided us in any form you may have submitted to us, or in the course of any other forms of interaction between you and us. Where such information pertains to an identified individual - Personal Data may also include network and device data such as IP address and device or advertising identifiers and information we obtain using cookies or other tracking technologies. We may also collect information about you from third-party sources and platforms (including data validation services, authentication service providers, social networking sites, online marketing and segmentation providers and ad targeting companies) to supplement the information we collect directly from you.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>If you provide us with Personal Data relating to a third-party by submitting such Personal Data to us, you represent to us that you have obtained the consent of the third-party to provide us with their Personal Data for the respective purposes.  </p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>By (1) clicking “Yes” on our Privacy Policy pop-up or any web form referring to this Privacy Policy on any of our online Platforms, (2) submitting your Personal Data to us when signing up for an account on the Website or Apps, (3) browsing our Website or Apps, or (4) ordering any of our products and services, you are agreeing to the terms of this Privacy Policy.</p>
						</div>
						{/* 3. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='methods'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>3. Methods of Data Collection</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We collect personal data directly from you when you provide it by filling out registration forms, placing orders, subscribing to newsletters, or contacting our customer support.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>In addition to direct interactions, some data is collected automatically while you browse our site through the use of cookies and tracking technologies.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>These tools allow us to analyze website usage patterns, improve navigation, and enhance your shopping experience by remembering your preferences and behavior.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Moreover, certain data may also be collected from trusted third parties such as payment processors (e.g., PayPal) or logistics partners, solely for the purpose of completing your order securely.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We collect personal data in the following ways:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Directly from you through forms, order checkouts, and customer support interactions.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Automatically through cookies, log files, and tracking technologies when you browse our site.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>From third-party service providers (e.g., payment gateways) for order processing.</p>
							</div>
						</div>
						{/* 4. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='use'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>4. Use of Personal Information</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We also use personal information to detect and prevent fraudulent activities, maintain website security, and comply with our legal obligations under Australian law.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>If you opt in for marketing communications, we may send you newsletters and special offers, but only with your explicit consent.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>CORALBAY uses the personal information you provide strictly for delivering the services you request, such as processing orders, sending order status notifications, and providing customer support.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Beyond transactional purposes, your data helps us improve our website by understanding how customers interact with it, which enables us to develop better functionalities and more tailored product recommendations.</p>
						</div>
						{/* 5. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='sharing'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>5. Sharing Personal Information</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-[14px]'>We do not sell or lease your personal information to third parties for marketing purposes.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-semibold mb-2'>However, in order to provide our services efficiently, your personal data may be shared with trusted third parties, such as:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Payment Processors (e.g., Stripe, PayPal) to process your payments securely.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Shipping Partners (e.g., Australia Post) to deliver your orders accurately.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Customer support service providers to assist in handling your inquiries.</p>
							</div>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>In cases where disclosure is legally mandated by government or regulatory authorities, we will only disclose the minimum necessary data.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We ensure all third parties comply with Australian privacy laws and safeguard your data appropriately.</p>
						</div>
						{/* 6. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='update-data'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>6. Accessing and Updating Your Data</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>CORALBAY respects your right to control your personal data.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>You can request access to the personal data we hold about you at any time. This allows you to review what information we have and ensure it is accurate and up-to-date.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>Additionally, if you discover that certain information is outdated, incomplete, or incorrect, you may request a correction.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>All requests should be sent to our support team at <span className='text-[#44506A] underline'> support@coralbay.com.au .</span></p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We strive to respond promptly, typically within 30 days, and make any appropriate changes.</p>
						</div>
						{/* 7. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='del-personal-info'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>7. Deleting Your Personal Information</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>If you wish to delete your personal information:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>We will process deletion requests unless retention is required by law or regulation.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Deletion will generally occur within 30 days of the request.</p>
							</div>
						</div>
						{/* 8. */}
						<div className='mb-[32px] scroll-mt-[80px]' id='security'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>8. Data Security Practices</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>We implement rigorous security measures to protect your personal data from unauthorized access, use, or disclosure. All data transfers are protected by industry-standard SSL encryption, and personal data is stored securely on servers with strong access controls. Only authorized personnel with strict confidentiality obligations have access to your data. We conduct regular security audits and update our systems to guard against new threats. Despite our best efforts, no system is perfectly secure, so we urge you to keep your login credentials confidential and immediately notify us if you suspect a breach.</p>
						</div>
						{/* 9. */}
						<div className='mb-[32px]' id='contact'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>9. Contact Information</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>For questions regarding this Privacy Policy or your personal data, please contact us:</p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A] underline'>support@coralbay.com.au</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A] underline'>+61 585 585 585</p>
							</div>
						</div>
						{/* 10. */}
						<div className='scroll-mt-[80px]' id='law'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>10. Applicable Law</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>This Privacy Policy is governed by Australian Privacy laws.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal'>Any dispute related to data privacy will be handled under the jurisdiction of Australian courts. </p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Privacy_policy
