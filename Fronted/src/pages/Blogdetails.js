import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Share2 } from 'lucide-react';
import { TiSocialFacebook } from "react-icons/ti";
import { LiaAngleRightSolid } from "react-icons/lia";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { IoIosShareAlt } from "react-icons/io";
import blog3 from '../images/b-3.jpg'
import blog4 from '../images/b-4.jpg'
import blog5 from '../images/b-5.jpg'
import blog6 from '../images/b-6.jpg'
import { useParams } from 'react-router-dom';

const BlogDetailsPage = () => {

  const { id } = useParams();
  console.log("blog page::",id);
  

  const [currentSlide, setCurrentSlide] = useState(0);

  const latestBlogs = [
    {
      id: 1,
      title: 'Seasonal Fashion Trends 2025: Style, Colors & Must-Haves',
      category: 'Lifestyle Trends',
      date: '08 Sep 2025',
      image: blog3,
      description: 'Stay ahead with fashion trends that define the season, including styling tips and wardrobe essentials.'
    },
    {
      id: 2,
      title: 'Top Smartphones to Watch in 2025: Features, Specs & Reviews',
      category: 'Tech',
      date: '05 Sep 2025',
      image: blog4,
      description: 'Explore the latest smartphones with cutting-edge features, camera tech, and performance insights to help you make the right choice.'
    },
    {
      id: 3,
      title: 'Must-Have Gadgets for a Smarter Lifestyle in 2025',
      category: 'Electronics',
      date: '03 Sep 2025',
      image: blog5,
      description: 'Explore devices that make everyday living more convenient, from smart home assistants to wearable tech.'
    },
    {
      id: 4,
      title: 'Decorating Tips to Create a Cozy Home Space',
      category: 'Home & Furniture',
      date: '01 Sep 2025',
      image: blog6,
      description: 'Use colors, textures, and lighting to transform any room into a relaxing retreat.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(latestBlogs.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(latestBlogs.length / 3)) % Math.ceil(latestBlogs.length / 3));
  };

  const getVisibleBlogs = () => {
    const itemsPerSlide = 3;
    const startIndex = currentSlide * itemsPerSlide;
    return latestBlogs.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div className="min-h-screen bg-white">
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
              <h3 className="text-[16px] text-[#BABABA] font-medium">Blogs</h3>
              <LiaAngleRightSolid />
              <h3 className="text-[16px] text-[#44506A] font-medium">Must-Have Accessories That Complement Your Tech Setup</h3>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="main_container">
        {/* Hero Image */}
        <div className="relative mb-8 py-8">
          <img
            src={require("../images/b-17.jpg")}
            alt="Tech accessories on desk"
            className="w-full md:h-100 object-cover rounded-lg"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className='md:flex justify-between flex-none'>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-orange-500 text-sm font-medium">Electronics</span>
              <span className="text-gray-500 text-sm">|</span>
              <span className="text-gray-500 text-sm">04 Sep 2025</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <TiSocialFacebook className="w-6 h-6 text-black-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <IoLogoInstagram className="w-6 h-6 text-black-400 hover:text-pink-600 cursor-pointer transition-colors" />
              <RiTwitterXLine className="w-6 h-6 text-black-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <IoIosShareAlt className="w-6 h-6 text-black-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </div>
          </div>
          <h2 className="font-base  font-bold text-gray-900 mb-4">
            Must-Have Accessories That Complement Your Tech Setup
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            From wireless chargers to ergonomic keyboards, explore tools that increase comfort and productivity.
          </p>

          {/* Social Share */}
          <div className="flex items-center space-x-4">

          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">INTRODUCTION</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In today's fast-paced digital world, having a functional and efficient tech setup is more important than ever. Whether you're working from home, gaming, or streaming, the right accessories make a huge difference. They not only enhance the performance of your devices but also improve your comfort, productivity, and overall experience. A cluttered desk doesn't just look unprofessional—it can impact your focus, making it harder to enjoy your time using technology.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Choosing the right tech accessories doesn't mean buying everything on the market—it's about selecting tools that fit your lifestyle, preferences, and work habits. From charging solutions and sound-enhancing gadgets to ergonomic peripherals, these small additions can have a big impact on how you use your devices daily.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this article, we'll explore the essential accessories that complement your tech setup, making it smarter, more efficient, and tailored to your needs. Whether you're a student, entrepreneur, creative professional, or casual user, these accessories are game-changers.
            </p>
          </div>

          {/* Wireless Charging Pads */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Wireless Charging Pads</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              With more devices needing power throughout the day, wireless charging pads offer a practical and aesthetically pleasing way to keep your desk clean and efficient. Instead of multiple cables for phones, smartwatches, and earbuds, you can charge everything in one place without the hassle of unplugging or untangling cords.
            </p>

            <div className="mb-6">
              <div className="lg:w-1/4 mb-5">
                <img
                  src={require("../images/b-18.jpg")}
                  alt="Wireless charging pad"
                  className="w-full h-100 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-2 ml-4 ">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Supports fast charging for newer devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Works with multiple brands and models</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Compact, lightweight designs that suit any workspace</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Anti-slip surfaces to ensure devices stay in place while charging</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-500 mb-2">Where to Use:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                Keep a charging pad near your laptop or monitor so that you can easily recharge your phone between meetings. Some designs also feature LED indicators to show charging progress, making it simple to monitor at a glance.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-500 mb-2">Tip:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                Look for multi-device chargers if you regularly use more than one device at once. These help you power your gadgets without taking up extra space.
              </p>
            </div>
          </div>

          {/* Noise-Cancelling Headphones */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Noise-Cancelling Headphones</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Noise-cancelling headphones are an essential accessory for anyone who needs to block out distractions. Whether you're working from a noisy cafe, participating in virtual meetings, or simply listening to music, these headphones enhance audio quality and give you the focus you need.</p>
            <div className="mb-6">
              <div className="lg:w-1/4 mb-5">
                <img
                  src={require("../images/b-19.jpg")}
                  alt="Wireless charging pad"
                  className="w-full h-100 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">
                      Reduce background noise with advanced filtering technology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">
                      Enhance voice clarity during calls and meetings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Provide comfort during extended use with cushioned ear pads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Wireless models allow freedom of movement without the hassle of cords</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-500 mb-2">Pro Tip:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                Look for headphones with adjustable ear cups and customizable sound profiles to suit both music listening and voice communication. Some models also come with ambient modes to let you stay aware of your surroundings when needed.</p>
            </div>
          </div>

          {/* Ergonomic Keyboards & Mice */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Ergonomic Keyboards & Mice – Comfort Meets Productivity</h3>
            <p className="text-gray-700 leading-relaxed mb-6">Spending hours typing or navigating on your device can strain your wrists and shoulders. Ergonomic accessories help reduce discomfort, prevent long-term injuries, and boost your efficiency.</p>

            <div className="mb-6">
              <div className="lg:w-1/4 mb-5 md:flex  gap-3">
                <img
                  src={require("../images/b-20.jpg")}
                  alt="Wireless charging pad"
                  className="w-full h-100 object-cover rounded-lg md:mb-0 mb-5"
                />
                <img
                  src={require("../images/b-21.jpg")}
                  alt="Wireless charging pad"
                  className="w-full h-100 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-2 mr-5 ml-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Split-key designs that align hands naturally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Soft-touch buttons for silent operation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Adjustable height for correct wrist angles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Lightweight wireless options for clutter-free setups</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-500 mb-2">Additional Insights:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                A proper keyboard and mouse setup can improve posture, especially for remote workers or students attending online classes. Pair these accessories with wrist rests to enhance support further and avoid muscle fatigue.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-500 mb-2">Note:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                Ergonomic setups are particularly beneficial for those who suffer from repetitive strain injuries or spend extended periods at the desk.
              </p>
            </div>
          </div>

          {/* Multi-Port USB Hubs – Expand Your Connectivity */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Multi-Port USB Hubs – Expand Your Connectivity</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Modern devices often come with limited ports, forcing users to constantly switch cables. Multi-port USB hubs eliminate this frustration by offering multiple connections in a sleek, easy-to-use device. Instead of multiple cables for phones, smartwatches, and earbuds, you can charge everything in one place without the hassle of unplugging or untangling cords.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Connect all your devices without constantly plugging and unplugging cables. Multi-port USB hubs expand the functionality of laptops or tablets, letting you connect peripherals like external hard drives, monitors, and charging cables seamlessly.
            </p>

            <div className="mb-6">
              <div className="lg:w-1/4 mb-5">
                <img
                  src={require("../images/b-22.jpg")}
                  alt="Wireless charging pad"
                  className="w-full h-100 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">USB-C compatibility for faster data transfer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">HDMI outputs to connect to external displays</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">SD and microSD card slots for storage and file transfer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Ethernet ports for stable internet connectivity</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-500 mb-2">Usage Ideas:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                Ideal for creative professionals using cameras and external drives, students handling multiple devices, or remote teams needing seamless access to peripherals during video calls.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-500 mb-2">Tip:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">Choose hubs with power delivery to ensure your laptop stays charged while other devices are connected.              </p>
            </div>
          </div>

          {/* Cable Management Solutions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Cable Management Solutions</h3>
            <p className="text-gray-700 leading-relaxed">
              A cluttered desk with tangled wires isn’t just distracting — it’s inefficient and stressful. Cable management products help organize cords and prevent wear and tear.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              A neat workspace boosts productivity and helps maintain a clean aesthetic. Cable organizers, clips, and sleeves keep charging cables and wires tangle-free and easy to access.
            </p>

            <div className="mb-6">
              <div className="lg:w-1/4 mb-5">
                <img
                  src={require("../images/b-23.jpg")}
                  alt="Wireless charging pad"
                  className="w-full h-100 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Velcro cable ties for bundling wires</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Desk trays to hide cables out of sight</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Magnetic clips for fast access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Cable sleeves that give a clean, uniform appearance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-500 mb-2">Additional Advice:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                Label cables to quickly identify chargers, data cables, or connectors. This helps you maintain an orderly space without searching for specific wires in a pile.
              </p>
            </div>
          </div>

          {/*Adjustable Monitor Stands */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Adjustable Monitor Stands</h3>
            <p className="text-gray-700 leading-relaxed">
              A monitor placed at the wrong height can lead to neck pain and eye strain. Adjustable stands allow you to position your screen for optimal comfort.
            </p>

            <div className="mb-6">
              <div className="lg:w-1/4 mb-5">
                <img
                  src={require("../images/b-24.jpg")}
                  alt="Wireless charging pad"
                  className="w-full h-100 object-cover rounded-lg"
                />
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Align screens at eye level to prevent slouching</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Built-in storage options reduce desk clutter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Tilt, swivel, and height adjustments for personalized comfort</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">▶</span>
                    <span className="text-gray-700">Compatible with multiple monitor sizes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-500 mb-2">Tip:</h4>
              <p className="text-gray-500 text-md font-sans font-normal">
                Use anti-glare screen protectors along with stands for better viewing and less eye fatigue during long work sessions.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">CONCLUSION</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The right tech accessories are not just gadgets — they're tools that support a healthier, more productive lifestyle. A well-thought-out setup helps you work more efficiently, reduce workspace clutter, and enjoy enhanced comfort. Whether you're upgrading your home office or just looking for practical solutions that fit seamlessly into your daily routine.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Start by identifying your biggest pain points — whether that's clutter, poor posture, or device compatibility — and invest in accessories that address them. Over time, you'll build a workspace that's not only functional but also reflects your style and personality.
            </p>
          </div>
        </div>
      </div>


      {/* Keywords Section */}
      <div className='main_container'>
        <div className="mb-12">
          <h4 className="font-semibold text-gray-900 mb-4">Primary Keywords</h4>
          <div className="flex flex-wrap text-md">
            {[
              'tech accessories', 'workspace accessories', 'desk gadgets', 'wireless charging pad', 'noise-cancelling headphones',
              'ergonomic keyboard', 'USB hub', 'ergonomic mouse', 'cable management solutions', 'adjustable monitor stand',
              'productivity tools', 'home office gadgets', 'desk organization', 'fast charging devices', 'clutter-free workspace',
              'desk ergonomics', 'office productivity hacks', 'best accessories for work from home', 'laptop stands',
              'gaming desk setup', 'laptop stands', 'data transfer hub', 'comfort-focused tech', 'organized desk ideas',
              'how to organize cables on your desk', 'best wireless chargers for smartphones',
              'tips for setting up a home office workspace', 'ergonomic solutions for desk work',
              'must-have desk accessories for remote workers', 'how to reduce eye strain with monitor stands',
              'charging solutions for multiple devices', 'affordable tech accessories for professionals',
              'office setup ideas for better posture'
            ].map((keyword, index) => (
              <span key={index} className=" text-gray-700 mb-3">
                {keyword}<span className="ml-3 mr-3">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Blogs Slider Section */}
      <div className="main_container">
        <div className=" mx-auto mb-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Blogs</h2>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVisibleBlogs().map((blog) => (
                <div key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-orange-500 text-sm font-medium">{blog.category}</span>
                      <span className="text-gray-400 text-sm font-medium">|</span>
                      <span className="text-gray-400 text-sm">{blog.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {blog.description}
                    </p>
                    <button className="inline-flex items-center text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                      Read more
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Indicators */}
          {/* <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(latestBlogs.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-500 w-8' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;