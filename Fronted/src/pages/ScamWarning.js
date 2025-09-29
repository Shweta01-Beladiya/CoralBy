import React from 'react';
import { ChevronRight } from 'lucide-react';

function ScamWarning() {
  return (
    <div className="min-h-screen bg-white">
      <section>
        <div className="bg-[#F9FAFB]  py-5">
          <div className='main_container '>
          <h2 className="text-[26px] sm:text-[38px] font-semibold font-heading ">
            Scam Warning
          </h2>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h5 className="text-[16px] text-[#BABABA] font-medium">Home</h5>
              <ChevronRight className="w-4 h-4 text-[#BABABA]" />
              <h3 className="text-[16px] text-[#44506A] font-medium">Scam Warning</h3>
            </div>
          </div>
          </div>
        </div>
      </section>
      <section className="  px-6 py-8 main_container ">
        <div className="bg-white">
         
          <h1 className="text-2xl font-semibold text-gray-900 my-6">
            1. Stay Alert Against Scams
          </h1>
          <div className="mb-8">
            <p className="text-gray-700 text-xl  mb-6">
              At CORALBAY, your security is our top priority. Scammers often try to trick customers through fake websites, emails, messages, or phone calls claiming to be from us. Please remain cautious and follow these guidelines to protect yourself and your personal information.
            </p>
          </div>

          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              How Scams May Occur:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Requests for payments via unofficial platforms.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Fake customer service calls or messages.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Offers that seem "too good to be true" or limited-time rewards.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Attempts to collect login credentials or personal data.</p>
              </div>
            </div>
          </div>

          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Safety Tips:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Always check our official website or app for any offers or alerts.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Never share your password, credit card, or banking details with unknown sources.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Verify promotions or messages via official channels.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700">Report suspicious activity immediately.</p>
              </div>
            </div>
          </div>
            <div>
                <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
                    2. Our Verified Social Channels
                </h2>
                <p className='text-gray-700 text-xl'>Follow CORALBAY on social media for official updates. Look for the blue verification checkmark on all our accounts.</p>
                <p className='text-gray-700 text-xl'>We will never ask for personal information through social media messages.</p>
            </div>
            <div>
                <h2 className='text-2xl font-semibold text-gray-900 my-5'>Current Scam Alerts</h2>
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>
                1. Fake CORALBAY Deals Website
              </h2>
              <p className='text-lg mt-3'>Scammers have created websites that mimic CORALBAY’s official site. These sites may ask for your login details or payment information. Always check the URL and only shop through our official website: www.coralbay.com.au</p>
            </div>
            <div>
              <h2 className='text-xl my-3 font-semibold text-gray-900'>
                2. Google Ad Phishing Scams
              </h2>
              <p className='text-lg '>Beware of “special offer” ads claiming to be from CORALBAY. Only click ads from verified CORALBAY accounts. Suspicious ads should be reported immediately.</p>
            </div>
            <div>
             
                <h2 className='text-xl my-3 font-semibold text-gray-900'>
                3. Text & SMS Scams
              </h2>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700 mt-1">Always check our official website or app for any offers or alerts.</p>
              </div>
               <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700 mt-1">“Points Expiry Alert” – Scammers send fake points expiry messages asking for login information. Always verify in your account dashboard.</p>
              </div>
            </div>
              <div>
             
                <h2 className='text-xl my-3 font-semibold text-gray-900'>
              4. Email Scams
              </h2>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700 mt-1">Fake Gift Card Emails – Emails claiming you’ve won gift cards or vouchers asking for personal or payment information.</p>
              </div>
               <div className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">▶</span>
                <p className="text-gray-700 mt-1">Payment Verification Requests – Emails requesting payment verification or password reset that did not originate from CORALBAY.</p>
              </div>
            </div>
               <div>
             
                <h2 className='text-xl my-3 font-semibold text-gray-900'>
             5. Third-Party Fake Promotions
              </h2>
                <p className="text-gray-700 mt-1">Emails or messages claiming to offer CORALBAY rewards via third-party apps or websites. Always verify with official CORALBAY support.</p>
            </div>
        </div>
      </section>
    </div>
  );
}

export default ScamWarning;