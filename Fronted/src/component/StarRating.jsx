import { useState } from 'react';
import { FaStar, FaChevronDown, FaThumbsUp, FaThumbsDown, FaFlag } from 'react-icons/fa';
import { MdOutlineThumbDown, MdOutlineThumbUp } from 'react-icons/md';

const StarRating = () => {
    const [selectedFilter, setSelectedFilter] = useState('Star rating');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // New modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const ratingData = {
        averageRating: 4.5,
        totalReviews: 1395732,
        breakdown: [
            { stars: 5, count: 1018732, percentage: 73 },
            { stars: 4, count: 203456, percentage: 15 },
            { stars: 3, count: 41273, percentage: 3 },
            { stars: 2, count: 19875, percentage: 1 },
            { stars: 1, count: 16663, percentage: 1 }
        ]
    };

    const filterOptions = [
        'Star rating',
        '5 Star',
        '4 Star',
        '3 Star',
        '2 Star',
        '1 Star'
    ];

    // Sample reviews data
    const reviews = [
        {
            id: 1,
            author: "David F.",
            date: "14 Sep 2022",
            rating: 5,
            text: "I have been using these loafers daily for the past 3 months and I must say they are one of the best purchases I've made! The suede is soft yet durable, and the footbed gives amazing support throughout the day. Whether I'm dressing up for work or going out casually, these shoes match perfectly with every outfit. They are comfortable from morning until night, and I've even received several compliments on how stylish they look. Highly recommended for anyone looking for a blend of elegance and comfort!",
            likes: 47,
            dislikes: 3,
            verified: true
        },
        {
            id: 2,
            author: "Oliver H.",
            date: "4 Sep 2022",
            rating: 4,
            text: "Good design and comfort, but sizing is a bit narrow. Recommend ordering half a size up if you want more room.",
            likes: 13,
            dislikes: 364,
            verified: false
        },
        {
            id: 3,
            author: "Sam T.",
            date: "1 Sep 2022",
            rating: 5,
            text: "These loafers have a classic design that works with both formal and casual looks. The material feels premium and the craftsmanship is evident in every stitch. After a few weeks of wearing them I noticed they mold nicely to my feet. The only downside is that they require regular care because suede can be a bit high maintenance, but this was truly 100% as advertised providing good comfort for day-long wear.",
            likes: 42,
            dislikes: 18,
            verified: true,
            images: [
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=100&h=100&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=100&h=100&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=100&h=100&fit=crop&crop=center"
            ]
        },
        {
            id: 4,
            author: "Emily K.",
            date: "4 Sep 2022",
            rating: 5,
            text: "I absolutely love these loafers! I wear them to both work and weekend outings. The cushioning inside makes them super comfortable, and the premium suede gives a luxurious feel. They are lightweight yet sturdy and offer excellent arch support. After wearing them all day, my feet never felt sore, which is something I struggle with in other shoes. These are now my go-to footwear!",
            likes: 67,
            dislikes: 66,
            verified: true
        },
        {
            id: 5,
            author: "Ethan L.",
            date: "3 Sep 2022",
            rating: 3,
            text: "The loafers looked amazing in photos, but when I received them, the fit wasn't quite right. The shoes are snug in the toe area and feel tight after a few hours of wear. The material also started peeling after some outdoor use. I expected better durability for the price.",
            likes: 10,
            dislikes: 603,
            verified: true
        }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    };

    const renderStars = (rating) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <FaStar
                key={star}
                className={`w-3 h-3 ${star <= rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300 fill-gray-300'}`}
            />
        ));
    };

    return (
        <>
            <div className=" mx-auto">
                {/* Star Rating Section */}
                <div className="p-6 rounded-lg shadow-sm my-10">
                    {/* Header with dropdown */}
                    <div className="mb-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between w-48 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                            >
                                <span>{selectedFilter}</span>
                                <FaChevronDown className={`ml-2 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSelectedFilter(option);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='md:flex items-start gap-8 block'>
                        {/* Average Rating Display */}
                        <div className="flex-shrink-0">
                            <div className="text-5xl font-light mb-2">{ratingData.averageRating}</div>

                            {/* Stars */}
                            <div className="flex items-center mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.floor(ratingData.averageRating)
                                            ? 'text-orange-400 fill-orange-400'
                                            : star === Math.ceil(ratingData.averageRating) && ratingData.averageRating % 1 !== 0
                                                ? 'text-orange-400 fill-orange-400'
                                                : 'text-gray-300 fill-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="text-sm text-gray-600">
                                {formatNumber(ratingData.totalReviews)} Reviews
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="flex-1 space-y-3 md:mt-0 mt-3">
                            {ratingData.breakdown.map((rating) => (
                                <div key={rating.stars} className="flex items-center gap-3">
                                    {/* Star number */}
                                    <div className="w-4 text-sm text-gray-700 text-center">
                                        {rating.stars}
                                    </div>

                                    {/* Progress bar */}
                                    <div className="flex-1 min-w-0">
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                                                style={{ width: `${rating.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Count */}
                                    <div className="text-sm text-gray-600 w-12 text-right">
                                        {formatNumber(rating.count)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Customer Reviews Section */}
                <div className="md:px-10 py-5 px-5">
                    <h2 className="text-xl font-medium mb-6 text-gray-800">Customer Reviews (1.3M)</h2>

                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">

                                {/* Review Text */}
                                <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>

                                {/* Review Images */}
                                {review.images && (
                                    <div className="flex gap-4 mb-4 md:flex-nowrap	flex-wrap	">
                                        {review.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Review image ${index + 1}`}
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                                onClick={() => {
                                                    setSelectedReview(review);
                                                    setSelectedImage(image);
                                                    setIsModalOpen(true);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className='md:flex items-center justify-between block'>
                                    <div className='flex items-center'>
                                        <div className='w-10 h-5 bg-[var(--text-green)] rounded text-white flex items-center text-sm p-2'>{review.rating}<FaStar className='ms-1' /></div>
                                        <div className='text-sm text-[var(--bg-gray)] px-2 border-e-2  border-[var(--text-gray)]'>{review.author}</div>
                                        <div className='text-sm text-[var(--bg-gray)] mx-2'>{review.date}</div>
                                    </div>
                                    {/* Review Actions */}
                                    <div className="flex items-center space-x-4 text-sm text-[var(--text-gray)] md:mt-0 mt-3">
                                        <button className="flex items-center space-x-1 ">
                                            <MdOutlineThumbUp className='text-lg' />
                                            <span>{review.likes}</span>
                                        </button>
                                        <button className="flex items-center space-x-1">
                                            <MdOutlineThumbDown className='text-lg' />
                                            <span>{review.dislikes}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end items-center space-x-2 mt-8 pt-6 border-t border-gray-200">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
                            ←
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[var(--bg-dark)] text-white rounded">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
                            2
                        </button>
                        <span className="text-gray-500">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
                            67
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
                            →
                        </button>
                    </div>
                </div>


            </div>
            {/* Modal */}
            {isModalOpen && selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50  px-2 ">
                    <div className="bg-white rounded-lg w-[95%] max-w-3xl md:p-6 p-4 relative overflow-scroll h-80 md:h-auto">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row gap-6 mt-6">
                            {/* Large Image */}
                            <div className="flex-1">
                                <img
                                    src={selectedImage}
                                    alt="review large"
                                    className="w-full h-[200px] md:h-[300px] object-contain rounded-lg"
                                />
                            </div>

                            {/* Review Text */}
                            <div className="flex-1">
                                <p className="text-gray-700 leading-relaxed mb-4">{selectedReview.text}</p>
                                <div className="flex items-center text-sm text-gray-500 space-x-3">
                                    <span className="flex items-center gap-1">
                                        {renderStars(selectedReview.rating)}
                                    </span>
                                    <span>{selectedReview.author}</span>
                                    <span>{selectedReview.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail images */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {selectedReview.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="thumb"
                                    className={`w-16 h-16 object-cover rounded cursor-pointer border ${img === selectedImage ? 'border-orange-500' : 'border-gray-300'
                                        }`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StarRating;