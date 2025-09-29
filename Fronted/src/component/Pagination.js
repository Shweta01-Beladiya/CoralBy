import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const renderPageNumbers = () => {
		const pages = [];
		const maxVisible = 3; // how many pages to show at once

		if (currentPage > 2) {
			pages.push(1);
			if (currentPage > 3) pages.push("...");
		}

		for (
			let i = Math.max(1, currentPage - 1);
			i <= Math.min(totalPages, currentPage + 1);
			i++
		) {
			pages.push(i);
		}

		if (currentPage < totalPages - 1) {
			if (currentPage < totalPages - 2) pages.push("...");
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			{/* Prev Button */}
			<button
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				className={`h-[42px] w-[42px] p-3 rounded-md ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 text-black"
					}`}
			>
				<FiArrowLeft />
			</button>

			{/* Page Numbers */}
			{renderPageNumbers().map((page, index) =>
				page === "..." ? (
					<span
						key={index}
						className="h-[42px] w-[42px] rounded-md bg-[#E5E7EB] text-gray-500"
					>
						...
					</span>
				) : (
					<button
						key={index}
						onClick={() => onPageChange(page)}
						className={`h-[42px] w-[42px] rounded-md font-medium ${currentPage === page
								? "bg-[#111827] text-white"
								: "bg-[#E5E7EB] text-[#111827] hover:bg-gray-200"
							}`}
					>
						{page.toString().padStart(2, "0")}
					</button>
				)
			)}

			{/* Next Button */}
			<button
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				className={`h-[42px] w-[42px] p-3 rounded-md ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#E5E7EB] text-[111827]"
					}`}
			>
				<FiArrowRight />
			</button>
		</div>
	);
};

export default Pagination;
