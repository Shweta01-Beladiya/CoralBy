import React from 'react'
import newsletter_bg from "../images/newsletter-bg.png";

const Newsletter = () => {
	return (
		<>
			<section className='w-full bg-cover bg-center py-16'
				style={{ backgroundImage: `url(${newsletter_bg})` }}
			>
				{/* Main Container */}
				<div
					className="main_container"

				>
					<div className="max-w-3xl mx-auto text-center text-[#111827]">
						{/* Title */}
						<h2 className="text-[28px] md:text-[32px] font-extrabold mb-2">
							JOIN THE CORALBAY
						</h2>
						<p className="title1 text-[18px] md:text-[24px] font-semibold mb-4">
							Stay Updated with Exclusive Deals
						</p>

						{/* Subtitle */}
						<p className="title2 text-[#6B7280] mb-8 text-[16px] font-medium md:text-[18px] max-w-[520px] mx-auto">
							Join our newsletter to get the latest arrivals, offers, and style
							inspiration straight to your inbox.
						</p>

						{/* Input + Button */}
						<div className="flex justify-center gap-[6px] sm:gap-[8px]">
							<input
								type="email"
								placeholder="Enter your email"
								className="w-[70%] md:w-[60%] px-4 py-2 sm:py-3 rounded-md border border-gray-300 focus:outline-none text-[16px]"
							/>
							<button className="bg-[#F97316] text-white px-4 md:px-8 py-2 sm:py-3 rounded-md font-medium text-[14px] sm:text-[16px] uppercase">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Newsletter;