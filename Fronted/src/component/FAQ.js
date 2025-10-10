import React, { use, useEffect, useState } from 'react'
import { fetchfaqCategory, fetchfaqQuestions, fetchfaqQuestionsByCategory } from '../Store/Slices/helpsupportSlice'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqCategory, fetchFaqQuestionsByCategory } from '../Store/Slices/faqCategorySlice'


export const FAQ = () => {

	const dispatch = useDispatch();

	const [activeFaqCategory, setActiveFaqCategory] = useState("General Questions");
	const [openIndex, setOpenIndex] = useState(null);
	const [activeFaqCategoryId, setActiveFaqCategoryId] = useState(null);

	// Reset openIndex when category changes
	useEffect(() => {
		setOpenIndex(null);
	}, [activeFaqCategory]);

	// const faqCategories = [
	// 	"General Questions",
	// 	"Two-step Verification",
	// 	"CORALBAY Info",
	// 	"Credit Card",
	// 	"Contact Us",
	// 	"Sustainability",
	// 	"Scam Warning",
	// 	"Offers & Coupons",
	// ];

	useEffect(() => {
		dispatch(fetchFaqCategory());
	}, [dispatch]);

	const { faqCategories, faqQuestionsByCategory } = useSelector((state) => state.faqCategory);

	const normalizedCategories = Array.isArray(faqCategories)
		? faqCategories.map((category) => ({
			_id: category._id,
			name: category.similarFaqCategoryName,
		}))
		: [];

	// const faqData = {
	// 	"General Questions": [
	// 		{
	// 			question: "What are the must-have accessories for a home office setup?",
	// 			answer:
	// 				"The essentials include a wireless charging pad, noise-canceling headphones, ergonomic keyboard and mouse, USB hub, adjustable monitor stand, and cable management tools. These accessories improve comfort, productivity, and organization.",
	// 		},
	// 		{
	// 			question: " How do I choose the best charging pad for my devices?",
	// 			answer:
	// 				"Look for a pad that supports fast charging, is compatible with multiple devices like smartphones, earbuds, and smartwatches, and has an anti-slip surface. Compact designs with LED indicators are also helpful.",
	// 		},
	// 		{
	// 			question: "Are ergonomic keyboards and mice really necessary?",
	// 			answer:
	// 				"Yes, they help reduce strain on your wrists and shoulders, especially if you spend long hours typing or navigating on a computer. Ergonomic setups can prevent injuries and improve posture.",
	// 		},
	// 		{
	// 			question: "How can I keep my cables organized on my desk?",
	// 			answer:
	// 				"Cable management solutions like velcro ties, magnetic clips, cable sleeves, and under-desk trays help keep wires neat and accessible. Labeling cables also makes troubleshooting easier.",
	// 		},
	// 		{
	// 			question: "Can I connect multiple devices using a USB hub?",
	// 			answer:
	// 				"Absolutely! A multi-port USB hub allows you to connect peripherals such as hard drives, monitors, printers, and more — all from one central device. Some hubs also support HDMI output and Ethernet connections.",
	// 		},
	// 		{
	// 			question: "What should I consider when selecting a monitor stand?",
	// 			answer:
	// 				"Adjustable stands with height, tilt, and swivel options are ideal. They help align the screen at eye level to reduce neck strain. Built-in compartments can also offer extra storage for cables and documents.",
	// 		},
	// 		{
	// 			question: "How do I reduce eye strain while working long hours?",
	// 			answer:
	// 				"Use an adjustable monitor stand to set the screen at the correct height, pair it with anti-glare screen protectors, and take regular breaks. Additionally, ensuring proper lighting and maintaining a clutter-free workspace can help.",
	// 		},
	// 		{
	// 			question: "Are wireless accessories better than wired ones?",
	// 			answer:
	// 				"Wireless accessories offer mobility, less clutter, and easier access to devices. However, they may require frequent charging. Wired devices can be more reliable for uninterrupted use, depending on your needs.",
	// 		},
	// 		{
	// 			question: "How can I make my workspace more productive?",
	// 			answer:
	// 				"Investing in ergonomic tools, using cable management solutions, setting up efficient charging stations, and organizing your desk with storage solutions can boost focus and reduce distractions.",
	// 		},
	// 		{
	// 			question: "Still Have Questions?",
	// 			answer:
	// 				"If you have more questions or need personalized advice on building your tech setup, contact our support team anytime. We're here to help you create the perfect workspace tailored to your lifestyle!",
	// 		},
	// 	],
	// 	"Two-step Verification": [
	// 		{
	// 			question: "How does two-step verification work?",
	// 			answer:
	// 				"It adds an extra layer of security by requiring both your password and a one-time code.",
	// 		},
	// 		{
	// 			question: "Can I disable two-step verification later?",
	// 			answer:
	// 				"Yes, but it’s not recommended as it reduces your account security.",
	// 		},
	// 	],
	// 	"CORALBAY Info": [
	// 		{
	// 			question: "Where is CORALBAY based?",
	// 			answer:
	// 				"CORALBAY is headquartered in XYZ city and operates globally through online channels.",
	// 		},
	// 	],
	// 	"Credit Card": [
	// 		{
	// 			question: " How do I choose the best charging pad for my devices?",
	// 			answer:
	// 				"Look for a pad that supports fast charging, is compatible with multiple devices like smartphones, earbuds, and smartwatches, and has an anti-slip surface. Compact designs with LED indicators are also helpful.",
	// 		},
	// 		{
	// 			question: "Are ergonomic keyboards and mice really necessary?",
	// 			answer:
	// 				"Yes, they help reduce strain on your wrists and shoulders, especially if you spend long hours typing or navigating on a computer. Ergonomic setups can prevent injuries and improve posture.",
	// 		},
	// 		{
	// 			question: "How can I keep my cables organized on my desk?",
	// 			answer:
	// 				"Cable management solutions like velcro ties, magnetic clips, cable sleeves, and under-desk trays help keep wires neat and accessible. Labeling cables also makes troubleshooting easier.",
	// 		},
	// 	],
	// 	"Contact Us": [
	// 		{
	// 			question: "What should I consider when selecting a monitor stand?",
	// 			answer:
	// 				"Adjustable stands with height, tilt, and swivel options are ideal. They help align the screen at eye level to reduce neck strain. Built-in compartments can also offer extra storage for cables and documents.",
	// 		},
	// 		{
	// 			question: "How do I reduce eye strain while working long hours?",
	// 			answer:
	// 				"Use an adjustable monitor stand to set the screen at the correct height, pair it with anti-glare screen protectors, and take regular breaks. Additionally, ensuring proper lighting and maintaining a clutter-free workspace can help.",
	// 		},
	// 		{
	// 			question: "Are wireless accessories better than wired ones?",
	// 			answer:
	// 				"Wireless accessories offer mobility, less clutter, and easier access to devices. However, they may require frequent charging. Wired devices can be more reliable for uninterrupted use, depending on your needs.",
	// 		},
	// 		{
	// 			question: "How can I make my workspace more productive?",
	// 			answer:
	// 				"Investing in ergonomic tools, using cable management solutions, setting up efficient charging stations, and organizing your desk with storage solutions can boost focus and reduce distractions.",
	// 		},
	// 	],
	// 	"Sustainability": [
	// 		{
	// 			question: "Can I connect multiple devices using a USB hub?",
	// 			answer:
	// 				"Absolutely! A multi-port USB hub allows you to connect peripherals such as hard drives, monitors, printers, and more — all from one central device. Some hubs also support HDMI output and Ethernet connections.",
	// 		},
	// 		{
	// 			question: "Can I disable two-step verification later?",
	// 			answer:
	// 				"Yes, but it’s not recommended as it reduces your account security.",
	// 		},
	// 		{
	// 			question: "How can I make my workspace more productive?",
	// 			answer:
	// 				"Investing in ergonomic tools, using cable management solutions, setting up efficient charging stations, and organizing your desk with storage solutions can boost focus and reduce distractions.",
	// 		},
	// 	],
	// 	"Scam Warning": [
	// 		{
	// 			question: "How does two-step verification work?",
	// 			answer:
	// 				"It adds an extra layer of security by requiring both your password and a one-time code.",
	// 		},
	// 		{
	// 			question: "Can I disable two-step verification later?",
	// 			answer:
	// 				"Yes, but it’s not recommended as it reduces your account security.",
	// 		},
	// 	],
	// 	"Offers & Coupons": [
	// 		{
	// 			question: "Still Have Questions?",
	// 			answer:
	// 				"If you have more questions or need personalized advice on building your tech setup, contact our support team anytime. We're here to help you create the perfect workspace tailored to your lifestyle!",
	// 		},
	// 	],
	// };

	// Reset openIndex when category changes
	useEffect(() => {
		setOpenIndex(null);
	}, [activeFaqCategory]);

	// Automatically set default category (General Questions or first)
	useEffect(() => {
		if (normalizedCategories.length > 0 && (!activeFaqCategory || !activeFaqCategoryId)) {
			// First try to find "General Questions"
			const generalQuestions = normalizedCategories.find(cat =>
				cat.name.toLowerCase().includes('general')
			);

			const selectedCategory = generalQuestions || normalizedCategories[0];
			setActiveFaqCategory(selectedCategory.name);
			setActiveFaqCategoryId(selectedCategory._id);
		}
	}, [normalizedCategories, activeFaqCategory, activeFaqCategoryId]);


	useEffect(() => {
		if (activeFaqCategoryId) {
			// console.log('Fetching questions for category ID:', activeFaqCategoryId);
			dispatch(fetchFaqQuestionsByCategory(activeFaqCategoryId));
		}
	}, [dispatch, activeFaqCategoryId]);

	// Additional effect to ensure questions are fetched when categories are loaded
	useEffect(() => {
		if (normalizedCategories.length > 0 && activeFaqCategoryId && faqQuestionsByCategory.length === 0) {
			// console.log('Categories loaded, fetching questions for:', activeFaqCategoryId);
			dispatch(fetchFaqQuestionsByCategory(activeFaqCategoryId));
		}
	}, [normalizedCategories.length, activeFaqCategoryId, faqQuestionsByCategory.length, dispatch]);

	const normalizedFaqById = Array.isArray(faqQuestionsByCategory
	) ? faqQuestionsByCategory.map((faq) => ({
		_id: faq._id,
		question: faq.similarFaqQuestion,
		answer: faq.similarFaqAnswer,
	})) : [];


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

						{/* Sidebar Categories */}
						<div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 bg-[#F9FAFB]">
							{normalizedCategories.map((cat) => (
								<button
									key={cat._id}
									onClick={() => {
										setActiveFaqCategory(cat.name);
										setActiveFaqCategoryId(cat._id);
									}}
									className={`flex-shrink-0 px-4 py-3 text-[14px] font-semibold whitespace-nowrap transition-colors ${activeFaqCategory === cat.name
										? "bg-[#F9731633] text-[#F97316] border-b-2 border-[#F97316]"
										: "text-[#44506A] hover:bg-[#F9731633] hover:text-[#F97316]"
										}`}
								>
									{cat.name}
								</button>
							))}
						</div>

						{/* FAQ Questions for Mobile */}
						<div className="lg:px-4 py-4">
							<div className="space-y-4">
								{normalizedFaqById.map((faq, index) => (
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
							{normalizedCategories.map((cat) => (
								<div key={cat._id} className="bg-[#F9FAFB]">
									<div
										onClick={() => {
											setActiveFaqCategory(cat.name);
											setActiveFaqCategoryId(cat._id);
										}}
										className={`sm:px-[10px] lg:px-[18px] xl:px-[28px] md:py-[12px] lg:py-[20px] xl:py-[22px] cursor-pointer text-[14px] xl:text-[16px] text-[#44506A] border-y-[1px] border-y-[#E5E7EB] font-semibold ${activeFaqCategory === cat.name
											? "bg-[#F9731633] text-[#F97316]"
											: "hover:bg-[#F9731633] hover:text-[#F97316]"
											}`}
									>
										{cat.name}
									</div>
								</div>
							))}
						</div>

						{/* FAQ Questions */}
						<div className="w-4/5 px-6">
							<div className="space-y-4">
								{normalizedFaqById.map((faq, index) => (
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



export const FAQ2 = ({ category }) => {
	const [activeFaq2Category, setActiveFaq2Category] = useState("");
	const [openfaqIndex, setOpenfaqIndex] = useState(null);

	const dispatch = useDispatch();
	const { faqcategory, faqquestionsByCategory, loading, error } = useSelector(
		(state) => state.helpSupport
	);

	useEffect(() => {
		dispatch(fetchfaqCategory());
	}, [dispatch]);

	// Filter FAQ categories based on the selected main category
	const filteredFaqCategories = Array.isArray(faqcategory) && category?.id ? faqcategory.filter(
		(faq) => faq?.mainFaqCategoryId?._id === category.id
	)
		: [];
	// console.log("Filtered FAQ Categories:", filteredFaqCategories);

	// Set the first category as active when filtered categories change
	// useEffect(() => {
	// 	if (faqcategory.length > 0) {
	// 		// const firstCat = faqcategory[0];
	// 		// setActiveFaq2Category(firstCat.faqCategoryName);
	// 		// dispatch(fetchfaqQuestionsByCategory(firstCat._id));
	// 	}
	// }, [faqcategory, dispatch]);

	// Reset openIndex when category changes
	// useEffect(() => {
	// 	setOpenfaqIndex(null);
	// }, [activeFaq2Category]);

	const selectFirstID = filteredFaqCategories[0]?._id;
	const selectFirstName = filteredFaqCategories[0]?.faqCategoryName;

	useEffect(() => {
		if (!selectFirstID) return;

		setActiveFaq2Category(selectFirstName);

		const fetchQuestions = async () => {
			try {
				await dispatch(fetchfaqQuestionsByCategory(selectFirstID));
			} catch (err) {
				console.error("Error fetching questions:", err);
			}
		};

		fetchQuestions();
	}, [dispatch, selectFirstID, selectFirstName]);


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
							{filteredFaqCategories.length > 0 ? (
								filteredFaqCategories.map((cat) => (
									<button
										key={cat._id}
										onClick={() => {
											// alert("SFDgc")
											setActiveFaq2Category(cat.faqCategoryName);
											dispatch(fetchfaqQuestionsByCategory(cat._id));
										}}
										className={`flex-shrink-0 px-4 py-3 text-[14px] font-semibold whitespace-nowrap transition-colors ${activeFaq2Category === cat.faqCategoryName
											? "bg-[#F9731633] text-[#F97316] border-b-2 border-[#F97316]"
											: "text-[#44506A] hover:bg-[#F9731633] hover:text-[#F97316]"
											}`}
									>
										{cat.faqCategoryName}
									</button>
								))
							) : (
								<p className="px-4 py-3 text-[14px] text-[#44506A]">No categories available</p>
							)}
						</div>

						{/* FAQ Questions for Mobile */}
						<div className="lg:px-4 py-4">
							<div className="space-y-4">
								{faqquestionsByCategory.length > 0 ? (
									faqquestionsByCategory.map((faq, index) => (
										<div
											key={faq._id}
											className="border-y-[1px] border-y-[#E5E7EB] py-6 cursor-pointer"
											onClick={() => setOpenfaqIndex(openfaqIndex === index ? null : index)}
										>
											<div className="flex justify-between items-center">
												<span className="text-[16px] font-semibold text-[#44506A]">
													{faq.faqQuestion}
												</span>
												<button className="text-[20px] font-bold text-[#44506A] border-[2px] border-[#44506A] rounded-full leading-[13px] p-[3px]">
													{openfaqIndex === index ? "-" : "+"}
												</button>
											</div>
											{openfaqIndex === index && (
												<p className="mt-2 text-[16px] font-medium text-[#6B7280]">
													{faq.faqAnswer}
												</p>
											)}
										</div>
									))
								) : (
									<p className="text-[16px] text-[#44506A] py-6">No frequently asked questions available for this category.</p>
								)}
							</div>
						</div>
					</div>

					{/* Desktop Layout (768px+) */}
					<div className="hidden lg:flex">

						{/* Sidebar Categories */}
						<div className="w-1/5 bg-[#F9FAFB]">
							{filteredFaqCategories.length > 0 ? (
								filteredFaqCategories.map((cat) => (
									<div
										key={cat._id}
										onClick={() => {
											// alert("SFDgc")
											setActiveFaq2Category(cat.faqCategoryName);
											dispatch(fetchfaqQuestionsByCategory(cat._id));
										}}
										className={`sm:px-[10px] lg:px-[18px] xl:px-[28px] md:py-[12px] lg:py-[20px] xl:py-[22px] cursor-pointer text-[14px] xl:text-[16px] text-[#44506A] border-y-[1px] border-y-[#E5E7EB] font-semibold ${activeFaq2Category === cat.faqCategoryName
											? "bg-[#F9731633] text-[#F97316]"
											: "hover:bg-[#F9731633] hover:text-[#F97316]"
											}`}
									>
										{cat.faqCategoryName}
									</div>
								))
							) : (
								<div className="sm:px-[10px] lg:px-[18px] xl:px-[28px] md:py-[12px] lg:py-[20px] xl:py-[22px] text-[14px] xl:text-[16px] text-[#44506A] border-y-[1px] border-y-[#E5E7EB] font-semibold">
									No categories available
								</div>
							)}
						</div>

						{/* FAQ Questions */}
						<div className="w-4/5 px-6">
							<div className="space-y-4">
								{faqquestionsByCategory.length > 0 ? (
									faqquestionsByCategory.map((faq, index) => (
										<div
											key={faq._id}
											className="border-y-[1px] border-y-[#E5E7EB] py-6 cursor-pointer"
											onClick={() => setOpenfaqIndex(openfaqIndex === index ? null : index)}
										>
											<div className="flex justify-between items-center">
												<span className="text-[16px] font-semibold text-[#44506A]">
													{faq.faqQuestion}
												</span>
												<button className="text-[20px] font-bold text-[#44506A] border-[2px] border-[#44506A] rounded-full leading-[13px] p-[3px]">
													{openfaqIndex === index ? "-" : "+"}
												</button>
											</div>
											{openfaqIndex === index && (
												<p className="mt-2 text-[16px] font-medium text-[#6B7280]">
													{faq.faqAnswer}
												</p>
											)}
										</div>
									))
								) : (
									<p className="text-[16px] text-[#44506A] py-6">No frequently asked questions available for this category.</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
