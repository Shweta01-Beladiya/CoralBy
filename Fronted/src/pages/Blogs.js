import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { LiaAngleRightSolid } from "react-icons/lia";
import blog1 from '../images/b-1.jpg'
import blog2 from '../images/b-2.jpg'
import blog3 from '../images/b-3.jpg'
import blog4 from '../images/b-4.jpg'
import blog5 from '../images/b-5.jpg'
import blog6 from '../images/b-6.jpg'
import blog7 from '../images/b-7.jpg'
import blog8 from '../images/b-8.jpg'
import blog9 from '../images/b-9.jpg'
import blog10 from '../images/b-10.jpg'
import blog11 from '../images/b-11.jpg'
import blog12 from '../images/b-12.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlog, fetchBlogAllCategories } from '../Store/Slices/blogcategorySlice';

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Articles');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Add navigation hook

  // const filterButtons = [
  //   'All Articles',
  //   'Lifestyle Trends',
  //   'Electronics',
  //   'Home & Furniture',
  //   'Sustainability',
  //   'Beauty & Personal Care',
  //   'Tech'
  // ];

  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.blogallcategory);

  useEffect(() => {
    dispatch(fetchBlogAllCategories());
  }, [dispatch]);


  // const blogPosts = [
  //   {
  //     id: 1,
  //     title: 'Essential Beauty Products for a Simple, Daily Self-Care Routine',
  //     category: 'Beauty & Personal Care',
  //     author: 'Beauty Expert',
  //     readTime: '5 min read',
  //     image: blog1,
  //     description: 'Find out which products are necessary for effective skin and hair care without overwhelming your routine.',
  //     date: '09 Sep 2025',
  //     featured: true
  //   },
  //   // {
  //   //   id: 2,
  //   //   title: 'Decorating Tips to Create a Cozy & Inviting Home Space',
  //   //   category: 'Home & Furniture',
  //   //   author: 'Interior Designer',
  //   //   readTime: '8 min read',
  //   //   image: blog2,
  //   //   description: 'Use colors, textures, and lighting to transform any room into a relaxing and personalized retreat.',
  //   //   date: '08 Sep 2025',
  //   //   featured: true
  //   // },
  //   // {
  //   //   id: 3,
  //   //   title: 'Seasonal Fashion Trends 2025: Style Guide & Must-Haves',
  //   //   category: 'Lifestyle Trends',
  //   //   author: 'Fashion Stylist',
  //   //   readTime: '6 min read',
  //   //   image: blog3,
  //   //   description: 'Stay ahead with fashion trends that define the season, including styling tips and wardrobe essentials.',
  //   //   date: '05 Sep 2025'
  //   // },
  //   // {
  //   //   id: 4,
  //   //   title: 'Top Smartphones to Watch in 2025: Features, Specs & Review',
  //   //   category: 'Electronics',
  //   //   author: 'Tech Reviewer',
  //   //   readTime: '10 min read',
  //   //   image: blog4,
  //   //   description: 'Explore the latest smartphones with cutting-edge features, from superior photography to lightning-fast 5G connectivity.',
  //   //   date: '02 Sep 2025'
  //   // },
  //   // {
  //   //   id: 5,
  //   //   title: 'Must-Have Gadgets for a Smarter Lifestyle in 2025',
  //   //   category: 'Tech',
  //   //   author: 'Tech Enthusiast',
  //   //   readTime: '7 min read',
  //   //   image: blog5,
  //   //   description: 'Explore devices that make everyday living more convenient, from smart home assistants to fitness trackers.',
  //   //   date: '30 Aug 2025'
  //   // },
  //   // {
  //   //   id: 6,
  //   //   title: 'How to Shop Responsibly: Support Sustainable Brands',
  //   //   category: 'Sustainability',
  //   //   author: 'Eco Expert',
  //   //   readTime: '9 min read',
  //   //   image: blog6,
  //   //   description: 'Make a difference with conscious consumption. Discover eco-friendly informed choices and support brands prioritizing sustainability.',
  //   //   date: '25 Aug 2025'
  //   // },
  //   // {
  //   //   id: 7,
  //   //   title: 'Personal Care Essentials You Can\'t Live Without',
  //   //   category: 'Beauty & Personal Care',
  //   //   author: 'Wellness Coach',
  //   //   readTime: '6 min read',
  //   //   image: blog7,
  //   //   description: 'Discover must-have items essential for professional wellness for everyday routines while prioritizing health and self-care.',
  //   //   date: '20 Aug 2025'
  //   // },
  //   // {
  //   //   id: 8,
  //   //   title: 'The Ultimate Guide to Sustainable Home Design Solutions',
  //   //   category: 'Home & Furniture',
  //   //   author: 'Sustainable Designer',
  //   //   readTime: '8 min read',
  //   //   image: blog8,
  //   //   description: 'Transform your home with sustainable, affordable design and second-hand furniture options that reduce waste and environmental impact.',
  //   //   date: '15 Aug 2025'
  //   // },
  //   // {
  //   //   id: 9,
  //   //   title: 'Protecting Your Devices: Essential Security Tips Everyone Should Know',
  //   //   category: 'Tech',
  //   //   author: 'Cybersecurity Expert',
  //   //   readTime: '12 min read',
  //   //   image: blog9,
  //   //   description: 'Learn how to safeguard your personal data with practical device and internet security tools and techniques.',
  //   //   date: '10 Aug 2025'
  //   // },
  //   // {
  //   //   id: 10,
  //   //   title: '10 Simple Habits That Improve Daily Life and Wellness',
  //   //   category: 'Lifestyle Trends',
  //   //   author: 'Life Coach',
  //   //   readTime: '7 min read',
  //   //   image: blog10,
  //   //   description: 'Discover small but impactful habits that boost energy levels and mental health while enhancing overall life satisfaction.',
  //   //   date: '05 Aug 2025'
  //   // },
  //   // {
  //   //   id: 11,
  //   //   title: 'A Beginner\'s Guide to Maintaining Your Electronic Devices for Peak Performance',
  //   //   category: 'Electronics',
  //   //   author: 'Tech Support',
  //   //   readTime: '9 min read',
  //   //   image: blog11,
  //   //   description: 'Avoid common pitfalls by following cleaning, updating, and maintenance techniques that will extend device lifespan.',
  //   //   date: '01 Aug 2025'
  //   // },
  //   // {
  //   //   id: 12,
  //   //   title: 'Must-Have Accessories That Complement Your Tech Setup',
  //   //   category: 'Tech',
  //   //   author: 'Tech Reviewer',
  //   //   readTime: '6 min read',
  //   //   image: blog12,
  //   //   description: 'From wireless chargers to ergonomic keyboards, discover tools that enhance comfort and productivity.',
  //   //   date: '28 Jul 2025'
  //   // }
  // ];

  const { allblog, error } = useSelector((state) => state.blogallcategory);

  useEffect(() => {
    dispatch(fetchAllBlog());
  }, [dispatch]);

  // Map API fields into UI format here
  const normalizedPosts = Array.isArray(allblog)
    ? allblog.map((blog) => ({
      id: blog._id,
      image: blog.heroImage,
      title: blog.blogTitle,
      description: blog.blogDesc,
      date: new Date(blog.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      category: blog.blogCategoryId?.blogCategoryName || "Uncategorized",
    }))
    : [];


  // Apply filter
  const filteredPosts =
    activeFilter === "All Articles"
      ? normalizedPosts
      : normalizedPosts.filter((post) => post.category === activeFilter);


  const postsPerPage = 16;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  console.log("Current Posts:", currentPosts);



  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const getCategoryColor = (category) => {
  //   const colors = {
  //     'Beauty & Personal Care': 'bg-pink-100 text-pink-700',
  //     'Home & Furniture': 'bg-blue-100 text-blue-700',
  //     'Lifestyle Trends': 'bg-purple-100 text-purple-700',
  //     'Electronics': 'bg-green-100 text-green-700',
  //     'Tech': 'bg-indigo-100 text-indigo-700',
  //     'Sustainability': 'bg-emerald-100 text-emerald-700',
  //   };
  //   return colors[category] || 'bg-gray-100 text-gray-700';
  // };

  // Create grid layout with featured posts
  const getGridLayout = () => {
    if (currentPosts.length === 0) return [];

    const layout = [];
    let index = 0;

    // Create rows in a repeating 2-3-3 pattern
    const pattern = [2, 3, 3];
    let patternIndex = 0;

    while (index < currentPosts.length) {
      const count = pattern[patternIndex];
      const rowPosts = [];

      for (let i = 0; i < count && index < currentPosts.length; i++) {
        rowPosts.push(currentPosts[index]);
        index++;
      }

      layout.push({
        type: rowPosts.length === 1 ? 'single' : (count === 2 ? 'mixed-row' : 'triple-row'),
        posts: rowPosts
      });

      patternIndex = (patternIndex + 1) % pattern.length;
    }

    return layout;
  };

  const gridLayout = getGridLayout();

  // Updated BlogCard component with navigation
  const BlogCard = ({ post, size = 'regular' }) => {
    const isLarge = size === 'large';

    const handleCardClick = () => {
      navigate(`/blog/${post.id}`); // Navigate to blog details page
      // alert(post.id,"Card Clicked");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    };

    const handleReadMoreClick = (e) => {
      e.stopPropagation(); // Prevent card click when clicking read more
      navigate(`/blog/${post.id}`);
    };

    return (

      // Single Blog Card
      <article
        className="bg-gray-50 rounded-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-orange-200 group cursor-pointer"
        onClick={handleCardClick} // Add click handler to entire card
      >
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full object-cover transition-transform duration-300 p-1 rounded-lg group-hover:scale-105"
          />
        </div>

        <div className={`p-${isLarge ? '6' : '5'}`}>
          {/* Category and Date */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-orange-500 text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{post.date}</span>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300 ${isLarge ? 'text-xl' : 'text-lg'
            }`}>
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </p>

          {/* Read More Button */}
          <div className="flex items-center">
            <button
              onClick={handleReadMoreClick}
              className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors duration-300 group-hover:gap-3"
            >
              Read more
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </article>

    );
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#F9FAFB] p-[22px] sm:p-[32px]">
        <div className='main_container'>
          <h2 className="text-[26px] sm:text-[38px] font-semibold font-heading">
            Blogs
          </h2>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h5 className="text-[16px] text-[#BABABA] font-medium">Home</h5>
              <LiaAngleRightSolid />
              <h3 className="text-[16px] text-[#44506A] font-medium">Blogs</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 main_container">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Helping you make informed<br />shopping choices
          </h2>
          <p className="text-gray-600 max-w-2xl mb-8">
            Find or list tools that will help designers build to last. Simplify design with our comprehensive and carefully vetted library from the start.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className='main_container'>
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 ">
              {/* Map backend categories */}
              {categories?.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleFilterChange(cat.blogCategoryName)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 border ${activeFilter === cat.blogCategoryName
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25"
                    : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:shadow-md"
                    }`}
                >
                  {cat.blogCategoryName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className='main_container'>
          <div className="space-y-12 mb-16">
            {gridLayout.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.type === 'mixed-row' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BlogCard post={row.posts[0]} size="large" />
                    <BlogCard post={row.posts[1]} />
                  </div>
                )}

                {row.type === 'triple-row' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {row.posts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}

                {row.type === 'single' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BlogCard post={row.posts[0]} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* No Posts Message */}
        {currentPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`w-12 h-12 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${currentPage === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50'
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-md transition-all duration-300 text-sm font-semibold ${currentPage === page
                  ? 'bg-[#111827] text-white '
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`w-12 h-12 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${currentPage === totalPages
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50'
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;