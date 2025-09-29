import React from 'react'
import { FiMail } from 'react-icons/fi'
import { LiaAngleRightSolid } from 'react-icons/lia'
import { MdOutlineCall, MdOutlineLocationOn } from 'react-icons/md'
import { VscTriangleRight } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

const ReturnPolicy = () => {
	return (
		<>
			<div className='return_policy_page'>
				{/* Breadcrumb navigation */}
				<div className='bg-[#F9FAFB] py-[22px] sm:py-[32px]'>
					<div className=" main_container mx-0 h_breadcrumb">
						<h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
							Return Policy
						</h2>
						<div className="h_Breadcrumb_navigation flex items-center gap-2">
							<h5 className="text-[16px] text-[#BABABA] font-medium">
								<Link to={"/"}>
									Home
								</Link>
							</h5>
							<LiaAngleRightSolid />
							<h3 className="text-[16px] text-[#44506A] font-medium">
								Return Policy
							</h3>
						</div>
					</div>
				</div>
				
				{/* contents */}
				<div className='main_container'>
					<div className="py-[30px] sm:py-[60px]">
						<div className='welcome-profile-part mb-[32px]'>
							<h4 className='text-[24px] font-bold text-[#0A0E17] mb-[6px]'>CORALBAY Return Policy</h4>
							<p className='text-[16px] sm:text-[18px] font-medium text-[#44506A]'>At CORALBAY, we strive to provide you with high-quality products and a seamless shopping experience. However, if you are not completely satisfied with your purchase, we offer a simple and transparent return policy. You may request a return within 30 days of receiving your order. To be eligible for a return, the product must be unused, in its original packaging, and in the same condition as delivered. Please note that certain items, such as perishable goods or personalized products, are non-returnable unless damaged or defective. Once your return request is approved, we will provide detailed instructions on how to send the product back to us. Refunds will be processed within 7-10 business days after we receive the returned item, and the amount will be credited to the original payment method. Please be aware that return shipping costs are borne by the customer unless the product arrived damaged or defective.</p>
						</div>
						<div className='mb-[32px]'>
							<h2 className='text-[20px] text-[#44506A] font-bold mb-2'>Policy Points</h2>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>CORALBAY is committed to handling your personal data in a responsible and transparent manner.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>This Privacy Policy outlines how we collect, stores, and use your data while providing our products and services through our website.</p>
							<p className='text-[16px] sm:text-[18px] text-[#6B7280] font-normal mb-2'>By using our website, you agree to the terms started in this policy. </p>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>
									We only collect necessary personal information such as your name, email address, phone number, and delivery address.
								</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Your data is used solety for order processing, customer support, and improving our services.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[16px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>We do not share your personal information is important to us, and we apply strict security measures.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>We use cookies to enhance website functionality and improve user experience.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Protecting your personal information is important to us, and we apply strict security measures.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Our website may contain links to third-party websites, which we do not control.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>We do not knowingly collect personal information from users under the age of 13.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>Our Privacy Policy may be updated from time to time, and the latest version will always be available on our website.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>You have right to the access, correct, or request deletion of your personal data.</p>
							</div>
							<div className='flex justify-start items-start gap-2 mb-2'>
								<VscTriangleRight className='text-[#F97316] text-[14px] flex-shrink-0 sm:text-[18px] mt-1' />
								<p className='text-[16px] font-medium text-[#44506A]'>For any privacy-related questions, you can contact us directly.</p>
							</div>
						</div>
					</div>
				</div>

				{/* contact us */}
				<div className='bg-[#F9FAFB] py-[30px] sm:py-[60px]'>
					<div className=' main_container mb-[30px] sm:mb-[60px]'>
						<div className='grid sm:grid-cols-2'>
							<div className='contact-us-1'>
								<h1 className='text-[#0A0E17] text-[32px] sm:text-[38px] md:text-[42px] font-bold'>Contact Us</h1>
								<p className='text-[16px] sm:text-[18px] md:text-[20px] text-[#44506A] font-medium mb-[32px]'>We’re here to help - reach out anytime!</p>
								<div className='flex justify-start items-center mb-[20px] gap-2'>
									<MdOutlineLocationOn className='text-[#F97316] flex-shrink-0 text-[22px] md:text-[24px]' />
									<p className='text-[18px] lg:text-[20px] font-medium text-[#44506A]'>123 CoralBay Street, Sydney, Australia</p>
								</div>
								<div className='flex justify-start items-center mb-[20px] gap-2'>
									<MdOutlineCall className='text-[#F97316] flex-shrink-0 text-[22px] md:text-[24px]' />
									<p className='text-[18px] lg:text-[20px] font-medium text-[#44506A]'>+61 400 123 456</p>
								</div>
								<div className='flex justify-start items-center mb-[20px] gap-2'>
									<FiMail className='text-[#F97316] flex-shrink-0 text-[22px] md:text-[24px]' />
									<p className='text-[18px] lg:text-[20px] font-medium text-[#44506A]'>support@coralbay.com.au</p>
								</div>
							</div>
							<div className='contact-us-2'>
								<form className="py-4 sm:p-6 space-y-4">
									{/* Name */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6">
										<div>
											<label htmlFor="fname" className="block text-[#44506A] text-[16px] font-semibold mb-1">
												First Name <span className="text-[#DC2626]">*</span>
											</label>
											<input
												type="text"
												id="fname"
												name="fname"
												placeholder="Enter First Name"
												className="w-full border border-[#44506A33] rounded-[10px] bg-white text-[#44506A] text-[16px] font-medium p-[10px] focus:outline-none focus:border-[#44506A33]"
												required
											/>
										</div>
										<div>
											<label htmlFor="lname" className="block text-[#44506A] text-[16px] font-semibold mb-1">
												Last Name <span className="text-[#DC2626]">*</span>
											</label>
											<input
												type="text"
												id="lname"
												name="lname"
												placeholder="Enter Last Name"
												className="w-full border border-[#44506A33] rounded-[10px] bg-white text-[#44506A] text-[16px] font-medium p-[10px] focus:outline-none focus:border-[#44506A33]"
												required
											/>
										</div>
									</div>
									{/* Email */}
									<div>
										<label htmlFor="email" className="block text-[#44506A] text-[16px] font-semibold mb-1">
											Email <span className="text-[#DC2626]">*</span>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											placeholder="Enter Email Address"
											className="w-full border border-[#44506A33] rounded-[10px] bg-white text-[#44506A] text-[16px] font-medium p-[10px] focus:outline-none focus:border-[#44506A33]"
											required
										/>
									</div>
									{/* Phone */}
									<div>
										<label htmlFor="phone" className="block text-[#44506A] text-[16px] font-semibold mb-1">
											Phone Number
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											placeholder="Enter Phone Number"
											className="w-full border border-[#44506A33] rounded-[10px] bg-white text-[#44506A] text-[16px] font-medium p-[10px] focus:outline-none focus:border-[#44506A33]"
										/>
									</div>
									{/* Subject */}
									<div>
										<label htmlFor="subject" className="block text-[#44506A] text-[16px] font-semibold mb-1">
											Subject
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											placeholder="Enter Subject"
											className="w-full border border-[#44506A33] rounded-[10px] bg-white text-[#44506A] text-[16px] font-medium p-[10px] focus:outline-none focus:border-[#44506A33]"
										/>
									</div>
									{/* Message */}
									<div>
										<label htmlFor="message" className="block text-[#44506A] text-[16px] font-semibold mb-1">
											Message <span className="text-[#DC2626]">*</span>
										</label>
										<textarea
											id="message"
											name="message"
											placeholder="Write your message..."
											rows="5"
											className="w-full border border-[#44506A33] rounded-[10px] bg-white text-[#44506A] text-[16px] font-medium p-[10px] focus:outline-none focus:border-[#44506A33]"
											required
										></textarea>
									</div>
									{/* Submit */}
									<div className="flex justify-center">
										<button
											type="submit"
											className="bg-[#F97316] text-white w-full py-[10px] rounded-lg hover:bg-[#df6712] transition"
										>
											Send Message
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ReturnPolicy;