import React, { useEffect, useState } from 'react'


export const FAQ = () => {

	const [activeFaqCategory, setActiveFaqCategory] = useState("General Questions");
	const [openIndex, setOpenIndex] = useState(null);

	// Reset openIndex when category changes
	useEffect(() => {
		setOpenIndex(null);
	}, [activeFaqCategory]);

	const faqCategories = [
		"General Questions",
		"Two-step Verification",
		"CORALBAY Info",
		"Credit Card",
		"Contact Us",
		"Sustainability",
		"Scam Warning",
		"Offers & Coupons",
	];

	const faqData = {
		"General Questions": [
			{
				question: "What are the must-have accessories for a home office setup?",
				answer:
					"The essentials include a wireless charging pad, noise-canceling headphones, ergonomic keyboard and mouse, USB hub, adjustable monitor stand, and cable management tools. These accessories improve comfort, productivity, and organization.",
			},
			{
				question: " How do I choose the best charging pad for my devices?",
				answer:
					"Look for a pad that supports fast charging, is compatible with multiple devices like smartphones, earbuds, and smartwatches, and has an anti-slip surface. Compact designs with LED indicators are also helpful.",
			},
			{
				question: "Are ergonomic keyboards and mice really necessary?",
				answer:
					"Yes, they help reduce strain on your wrists and shoulders, especially if you spend long hours typing or navigating on a computer. Ergonomic setups can prevent injuries and improve posture.",
			},
			{
				question: "How can I keep my cables organized on my desk?",
				answer:
					"Cable management solutions like velcro ties, magnetic clips, cable sleeves, and under-desk trays help keep wires neat and accessible. Labeling cables also makes troubleshooting easier.",
			},
			{
				question: "Can I connect multiple devices using a USB hub?",
				answer:
					"Absolutely! A multi-port USB hub allows you to connect peripherals such as hard drives, monitors, printers, and more — all from one central device. Some hubs also support HDMI output and Ethernet connections.",
			},
			{
				question: "What should I consider when selecting a monitor stand?",
				answer:
					"Adjustable stands with height, tilt, and swivel options are ideal. They help align the screen at eye level to reduce neck strain. Built-in compartments can also offer extra storage for cables and documents.",
			},
			{
				question: "How do I reduce eye strain while working long hours?",
				answer:
					"Use an adjustable monitor stand to set the screen at the correct height, pair it with anti-glare screen protectors, and take regular breaks. Additionally, ensuring proper lighting and maintaining a clutter-free workspace can help.",
			},
			{
				question: "Are wireless accessories better than wired ones?",
				answer:
					"Wireless accessories offer mobility, less clutter, and easier access to devices. However, they may require frequent charging. Wired devices can be more reliable for uninterrupted use, depending on your needs.",
			},
			{
				question: "How can I make my workspace more productive?",
				answer:
					"Investing in ergonomic tools, using cable management solutions, setting up efficient charging stations, and organizing your desk with storage solutions can boost focus and reduce distractions.",
			},
			{
				question: "Still Have Questions?",
				answer:
					"If you have more questions or need personalized advice on building your tech setup, contact our support team anytime. We're here to help you create the perfect workspace tailored to your lifestyle!",
			},
		],
		"Two-step Verification": [
			{
				question: "How does two-step verification work?",
				answer:
					"It adds an extra layer of security by requiring both your password and a one-time code.",
			},
			{
				question: "Can I disable two-step verification later?",
				answer:
					"Yes, but it’s not recommended as it reduces your account security.",
			},
		],
		"CORALBAY Info": [
			{
				question: "Where is CORALBAY based?",
				answer:
					"CORALBAY is headquartered in XYZ city and operates globally through online channels.",
			},
		],
		"Credit Card": [
			{
				question: " How do I choose the best charging pad for my devices?",
				answer:
					"Look for a pad that supports fast charging, is compatible with multiple devices like smartphones, earbuds, and smartwatches, and has an anti-slip surface. Compact designs with LED indicators are also helpful.",
			},
			{
				question: "Are ergonomic keyboards and mice really necessary?",
				answer:
					"Yes, they help reduce strain on your wrists and shoulders, especially if you spend long hours typing or navigating on a computer. Ergonomic setups can prevent injuries and improve posture.",
			},
			{
				question: "How can I keep my cables organized on my desk?",
				answer:
					"Cable management solutions like velcro ties, magnetic clips, cable sleeves, and under-desk trays help keep wires neat and accessible. Labeling cables also makes troubleshooting easier.",
			},
		],
		"Contact Us": [
			{
				question: "What should I consider when selecting a monitor stand?",
				answer:
					"Adjustable stands with height, tilt, and swivel options are ideal. They help align the screen at eye level to reduce neck strain. Built-in compartments can also offer extra storage for cables and documents.",
			},
			{
				question: "How do I reduce eye strain while working long hours?",
				answer:
					"Use an adjustable monitor stand to set the screen at the correct height, pair it with anti-glare screen protectors, and take regular breaks. Additionally, ensuring proper lighting and maintaining a clutter-free workspace can help.",
			},
			{
				question: "Are wireless accessories better than wired ones?",
				answer:
					"Wireless accessories offer mobility, less clutter, and easier access to devices. However, they may require frequent charging. Wired devices can be more reliable for uninterrupted use, depending on your needs.",
			},
			{
				question: "How can I make my workspace more productive?",
				answer:
					"Investing in ergonomic tools, using cable management solutions, setting up efficient charging stations, and organizing your desk with storage solutions can boost focus and reduce distractions.",
			},
		],
		"Sustainability": [
			{
				question: "Can I connect multiple devices using a USB hub?",
				answer:
					"Absolutely! A multi-port USB hub allows you to connect peripherals such as hard drives, monitors, printers, and more — all from one central device. Some hubs also support HDMI output and Ethernet connections.",
			},
			{
				question: "Can I disable two-step verification later?",
				answer:
					"Yes, but it’s not recommended as it reduces your account security.",
			},
			{
				question: "How can I make my workspace more productive?",
				answer:
					"Investing in ergonomic tools, using cable management solutions, setting up efficient charging stations, and organizing your desk with storage solutions can boost focus and reduce distractions.",
			},
		],
		"Scam Warning": [
			{
				question: "How does two-step verification work?",
				answer:
					"It adds an extra layer of security by requiring both your password and a one-time code.",
			},
			{
				question: "Can I disable two-step verification later?",
				answer:
					"Yes, but it’s not recommended as it reduces your account security.",
			},
		],
		"Offers & Coupons": [
			{
				question: "Still Have Questions?",
				answer:
					"If you have more questions or need personalized advice on building your tech setup, contact our support team anytime. We're here to help you create the perfect workspace tailored to your lifestyle!",
			},
		],
	};

	return (
		<>
			{/* FAQ section */}
			<div className="Faq_part pb-[16px] sm:pb-[62px]">
				{/* Intro Section */}
				<div className="pb-[24px] sm:pb-[62px]">
					<h1 className="text-[26px] sm:text-[42px] font-bold leading-tight">
						Frequently Asked Questions
					</h1>
					<p className="text-[14px] sm:text-[20px] font-medium mt-4 text-[#44506A]">
						We’re here to assist you every step of the way. Explore our guides, FAQs, and expert help to make your shopping experience smooth, safe, and enjoyable.
					</p>
				</div>
				{/* faq questions */}
				<div className="bg-white rounded-lg">
					{/* Mobile Horizontal Scrollable Categories (320px - 768px) */}
					<div className="lg:hidden">
						<div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 bg-[#F9FAFB]">
							{faqCategories.map((cat) => (
								<button
									key={cat}
									onClick={() => setActiveFaqCategory(cat)}
									className={`flex-shrink-0 px-4 py-3 text-[14px] font-semibold whitespace-nowrap transition-colors ${activeFaqCategory === cat
										? "bg-[#F9731633] text-[#F97316] border-b-2 border-[#F97316]"
										: "text-[#44506A] hover:bg-[#F9731633] hover:text-[#F97316]"
										}`}
								>
									{cat}
								</button>
							))}
						</div>

						{/* FAQ Questions for Mobile */}
						<div className="lg:px-4 py-4">
							<div className="space-y-4">
								{faqData[activeFaqCategory]?.map((faq, index) => (
									<div
										key={index}
										className="border-y-[1px] border-y-[#E5E7EB] py-6 cursor-pointer"
										onClick={() => setOpenIndex(openIndex === index ? null : index)}
									>
										<div className="flex justify-between items-center">
											<span className="text-[16px] font-semibold text-[#44506A]">
												{faq.question}
											</span>
											<button className="text-[20px] font-bold text-[#44506A] border-[2px] border-[#44506A] rounded-full leading-[13px] p-[3px]">
												{openIndex === index ? "-" : "+"}
											</button>
										</div>
										{openIndex === index && (
											<p className="mt-2 text-[16px] font-medium text-[#6B7280]">
												{faq.answer}
											</p>
										)}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Desktop Layout (768px+) */}
					<div className="hidden lg:flex">
						{/* Sidebar Categories */}
						<div className="w-1/5 ">
							{faqCategories.map((cat) => (
								<div className='bg-[#F9FAFB]'>
									<div
										key={cat}
										onClick={() => setActiveFaqCategory(cat)}
										className={`sm:px-[10px] lg:px-[18px] xl:px-[28px] md:py-[12px] lg:py-[20px] xl:py-[22px] cursor-pointer text-[14px] xl:text-[16px] text-[#44506A] border-y-[1px] border-y-[#E5E7EB] font-semibold ${activeFaqCategory === cat
											? "bg-[#F9731633] text-[#F97316]"
											: "hover:bg-[#F9731633] hover:text-[#F97316]"
											}`}
									>
										{cat}
									</div>
								</div>
							))}
						</div>

						{/* FAQ Questions */}
						<div className="w-4/5 px-6">
							<div className="space-y-4">
								{faqData[activeFaqCategory]?.map((faq, index) => (
									<div
										key={index}
										className="border-y-[1px] border-y-[#E5E7EB] py-6 cursor-pointer"
										onClick={() => setOpenIndex(openIndex === index ? null : index)}
									>
										<div className="flex justify-between items-center">
											<span className="text-[16px] font-semibold text-[#44506A]">
												{faq.question}
											</span>
											<button className="text-[20px] font-bold text-[#44506A] border-[2px] border-[#44506A] rounded-full leading-[13px] p-[3px]">
												{openIndex === index ? "-" : "+"}
											</button>
										</div>
										{openIndex === index && (
											<p className="mt-2 text-[16px] font-medium text-[#6B7280]">
												{faq.answer}
											</p>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}



export const FAQ2 = () => {
	const [activeFaq2Category, setActiveFaq2Category] = useState("Placing an Order");
	const [openfaqIndex, setOpenfaqIndex] = useState(null);

	// Reset openIndex when category changes
	useEffect(() => {
		setOpenfaqIndex(null);
	}, [activeFaq2Category]);

	const faq2Categories = [
		"Placing an Order",
		"Order Modifications",
		"Shipping & Delivery",
		"Order Tracking",
		"Returns & Exchanges",
		"Order Issues & Support",
	];

	const faq2Data = {
		"Placing an Order": [
			{
				question: " How can I place an order quickly?",
				answer:
					"Add the product to your cart and checkout.",
			},
			{
				question: "What payment methods do you support?",
				answer:
					"Credit/debit cards, net banking, UPI, wallets, and COD.",
			},
			{
				question: "Can I change the product quantity after placing an order?",
				answer:
					"Yes, but only within 2 hours of placing your order. After that, it may already be processed. Contact Customer Care immediately if you need to make changes.",
			},
			{
				question: "How do I apply a coupon or promo code?",
				answer:
					"Enter your coupon code in the “Promo Code” field during checkout. The discount will automatically apply before final payment. Some coupons may have conditions like minimum order value or specific products. ",
			},
			{
				question: "Will I get a confirmation after placing an order?",
				answer:
					"Yes, you will receive an email and/or SMS confirming your order with a unique Order ID and summary.",
			},
			{
				question: "Can I save items for later?",
				answer:
					"Most platforms allow you to save items in your wishlist or leave them in your cart to purchase later.",
			},
			{
				question: "What if the product I want is out of stock?",
				answer:
					"Out-of-stock items will show as unavailable on the product page. Some websites let you subscribe for restock notifications.",
			},
			{
				question: "Is scheduling delivery possible?",
				answer:
					" Some items may offer a delivery scheduling option at checkout. You can select a preferred date and time for delivery, subject to availability.",
			},
			{
				question: "Why did my payment fail?",
				answer:
					" Payments can fail due to network issues, incorrect card details, or insufficient funds. Try again or use another payment method. Failed transactions are not charged to your account.",
			},
			{
				question: " Can I place bulk orders?",
				answer:
					"Yes, for bulk or business orders, please contact our sales support team. Bulk orders may qualify for special discounts and shipping arrangements.",
			},
		],
		"Order Modifications": [
			{
				question: " How can I place an order quickly?",
				answer:
					"Add the product to your cart and checkout.",
			},
			{
				question: "What payment methods do you support?",
				answer:
					"Credit/debit cards, net banking, UPI, wallets, and COD.",
			},
			{
				question: "Can I change the product quantity after placing an order?",
				answer:
					"Yes, but only within 2 hours of placing your order. After that, it may already be processed. Contact Customer Care immediately if you need to make changes.",
			},
		],
		"Shipping & Delivery": [
			{
				question: "What if the product I want is out of stock?",
				answer:
					"Out-of-stock items will show as unavailable on the product page. Some websites let you subscribe for restock notifications.",
			},
			{
				question: "Is scheduling delivery possible?",
				answer:
					" Some items may offer a delivery scheduling option at checkout. You can select a preferred date and time for delivery, subject to availability.",
			},
		],
		"Order Tracking": [
			{
				question: "How do I apply a coupon or promo code?",
				answer:
					"Enter your coupon code in the “Promo Code” field during checkout. The discount will automatically apply before final payment. Some coupons may have conditions like minimum order value or specific products. ",
			},
			{
				question: "Can I save items for later?",
				answer:
					"Most platforms allow you to save items in your wishlist or leave them in your cart to purchase later.",
			},
			{
				question: "Is scheduling delivery possible?",
				answer:
					" Some items may offer a delivery scheduling option at checkout. You can select a preferred date and time for delivery, subject to availability.",
			},
		],
		"Returns & Exchanges": [
			{
				question: "Can I change the product quantity after placing an order?",
				answer:
					"Yes, but only within 2 hours of placing your order. After that, it may already be processed. Contact Customer Care immediately if you need to make changes.",
			},
			{
				question: " How can I place an order quickly?",
				answer:
					"Add the product to your cart and checkout.",
			},
			{
				question: "What if the product I want is out of stock?",
				answer:
					"Out-of-stock items will show as unavailable on the product page. Some websites let you subscribe for restock notifications.",
			},
			{
				question: "Can I save items for later?",
				answer:
					"Most platforms allow you to save items in your wishlist or leave them in your cart to purchase later.",
			},
		],
		"Order Issues & Support": [
			{
				question: "Is scheduling delivery possible?",
				answer:
					" Some items may offer a delivery scheduling option at checkout. You can select a preferred date and time for delivery, subject to availability.",
			},
			{
				question: "Will I get a confirmation after placing an order?",
				answer:
					"Yes, you will receive an email and/or SMS confirming your order with a unique Order ID and summary.",
			},
			{
				question: "What payment methods do you support?",
				answer:
					"Credit/debit cards, net banking, UPI, wallets, and COD.",
			},
			{
				question: "Why did my payment fail?",
				answer:
					" Payments can fail due to network issues, incorrect card details, or insufficient funds. Try again or use another payment method. Failed transactions are not charged to your account.",
			},
		],

	};
	return (
		<>
			{/* FAQ section */}
			<div className="Faq_part pb-[16px] sm:pb-[62px]">
				{/* Intro Section */}
				<div className="pb-[24px] sm:pb-[62px]">
					<h1 className="text-[26px] sm:text-[42px] font-bold leading-tight">
						Frequently Asked Questions
					</h1>
					<p className="text-[14px] sm:text-[20px] font-medium mt-4 text-[#44506A]">
						We’re here to assist you every step of the way. Explore our guides, FAQs, and expert help to make your shopping experience smooth, safe, and enjoyable.
					</p>
				</div>
				{/* faq questions */}
				<div className="bg-white rounded-lg">
					{/* Mobile Horizontal Scrollable Categories (320px - 768px) */}
					<div className="lg:hidden">
						<div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 bg-[#F9FAFB]">
							{faq2Categories.map((cat) => (
								<button
									key={cat}
									onClick={() => setActiveFaq2Category(cat)}
									className={`flex-shrink-0 px-4 py-3 text-[14px] font-semibold whitespace-nowrap transition-colors ${activeFaq2Category === cat
										? "bg-[#F9731633] text-[#F97316] border-b-2 border-[#F97316]"
										: "text-[#44506A] hover:bg-[#F9731633] hover:text-[#F97316]"
										}`}
								>
									{cat}
								</button>
							))}
						</div>

						{/* FAQ Questions for Mobile */}
						<div className="lg:px-4 py-4">
							<div className="space-y-4">
								{faq2Data[activeFaq2Category]?.map((faq, index) => (
									<div
										key={index}
										className="border-y-[1px] border-y-[#E5E7EB] py-6 cursor-pointer"
										onClick={() => setOpenfaqIndex(openfaqIndex === index ? null : index)}
									>
										<div className="flex justify-between items-center">
											<span className="text-[16px] font-semibold text-[#44506A]">
												{faq.question}
											</span>
											<button className="text-[20px] font-bold text-[#44506A] border-[2px] border-[#44506A] rounded-full leading-[13px] p-[3px]">
												{openfaqIndex === index ? "-" : "+"}
											</button>
										</div>
										{openfaqIndex === index && (
											<p className="mt-2 text-[16px] font-medium text-[#6B7280]">
												{faq.answer}
											</p>
										)}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Desktop Layout (768px+) */}
					<div className="hidden lg:flex">
						{/* Sidebar Categories */}
						<div className="w-1/5 bg-[#F9FAFB]">
							{faq2Categories.map((cat) => (
								<div
									key={cat}
									onClick={() => setActiveFaq2Category(cat)}
									className={`sm:px-[10px] lg:px-[18px] xl:px-[28px] md:py-[12px] lg:py-[20px] xl:py-[22px] cursor-pointer text-[14px] xl:text-[16px] text-[#44506A] border-y-[1px] border-y-[#E5E7EB] font-semibold ${activeFaq2Category === cat
										? "bg-[#F9731633] text-[#F97316]"
										: "hover:bg-[#F9731633] hover:text-[#F97316]"
										}`}
								>
									{cat}
								</div>
							))}
						</div>

						{/* FAQ Questions */}
						<div className="w-4/5 px-6">
							<div className="space-y-4">
								{faq2Data[activeFaq2Category]?.map((faq, index) => (
									<div
										key={index}
										className="border-y-[1px] border-y-[#E5E7EB] py-6 cursor-pointer"
										onClick={() => setOpenfaqIndex(openfaqIndex === index ? null : index)}
									>
										<div className="flex justify-between items-center">
											<span className="text-[16px] font-semibold text-[#44506A]">
												{faq.question}
											</span>
											<button className="text-[20px] font-bold text-[#44506A] border-[2px] border-[#44506A] rounded-full leading-[13px] p-[3px]">
												{openfaqIndex === index ? "-" : "+"}
											</button>
										</div>
										{openfaqIndex === index && (
											<p className="mt-2 text-[16px] font-medium text-[#6B7280]">
												{faq.answer}
											</p>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
