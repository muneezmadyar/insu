import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { FiPhone, FiMail, FiMenu, FiX, FiHelpCircle, FiChevronUp, FiArrowUpRight} from "react-icons/fi";
import carImage from "/car.png";
import logo from "/black logo.png";
import "./../index.css"; // Import your global styles
import Footer from "./Footer";
import "./../App.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const QuoteFormStep2 = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const { carData, setUserData } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Blog", id: "blog" },
    { name: "Contact Us", id: "contact" },
  ];
    const faqs = [
      { question: "How does the claim process work?", answer: "The claim process involves submitting your claim online, reviewing documents, and receiving the decision within a few business days." },
      { question: "What factors affect my insurance premium?", answer: "Factors include your age, health status, type of coverage, and location." },
      { question: "Can I customize my coverage?", answer: "Yes, you can customize coverage based on your needs and budget." },
      { question: "How fast can I get coverage?", answer: "Coverage can start within 24 hours after application approval." },
    ];
    const [openIndex, setOpenIndex] = useState(null);
  
    const blogs = [
      { img: "/blog1.png", title: "Lorem Ipsum donor amit", user: "/user1.png", author: "Admin", date: "29 January 2025" },
      { img: "/blog2.png", title: "Lorem Ipsum donor amit", user: "/user2.png", author: "Admin", date: "29 January 2025" },
      { img: "/blog3.png", title: "Lorem Ipsum donor amit", user: "/user3.png", author: "Admin", date: "29 January 2025" },
    ];
 const handleClick = (id) => {
    setActive(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { name, phone, email } = form;
    if (!name || !phone || !email) return alert("Please fill all fields");

    const fullData = { ...carData, ...form };
    setUserData(fullData);
    localStorage.setItem("clientInfo", JSON.stringify(fullData));

    // Show loading animation
    setLoading(true);

    // await fetch("/api/clients/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(fullData),
    // });

    // Delay for animation effect
    setTimeout(() => {
      navigate(`/plans?value=${carData.currentValue}`);
    }, 4000);
  };

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#84B9E2]">
      <div className="p-6 sm:p-10 md:p-12 bg-[#84B9E2] rounded-xl flex flex-col items-center">
        {/* Lottie Loader */}
        <DotLottieReact
          src="https://lottie.host/e32b8068-fa92-4838-8345-7da8874def3a/sATkC3f4FB.lottie"
          loop={true}
  autoplay={true}
          className="w-[250px] h-[180px] sm:w-[350px] sm:h-[250px] md:w-[450px] md:h-[300px] lg:w-[550px] lg:h-[380px] xl:w-[600px] xl:h-[400px]"
        />
        <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-semibold font-manrope animate-pulse text-[#005190] text-center">
          Finding Best Car Plans...
        </p>

      </div>
    </div>
  );
}


  

  return (
    <div className="w-full">
      <nav className="bg-white shadow-sm fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Logo" className="h-12 w-auto" />
                  {/* <div>
                    <h1 className="font-bold text-sm">WESECURE</h1>
                    <p className="text-xs text-gray-500">Save. Secure. Protect.</p>
                  </div> */}
                </div>
      
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className={`${
                        active === item.id
                          ? "text-[#4CC750] font-semibold"
                          : "text-gray-800 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
      
                {/* Icons + Mobile Menu Button */}
                <div className="flex items-center gap-4">
                  <a
                    href="tel:+1234567890"
                    className="p-2 border rounded-full hover:bg-blue-50"
                  >
                    <FiPhone className="text-lg" />
                  </a>
                  <a
                    href="mailto:info@example.com"
                    className="p-2 border rounded-full hover:bg-blue-50"
                  >
                    <FiMail className="text-lg" />
                  </a>
                  {/* Mobile Menu Icon */}
                  <button
                    className="md:hidden p-2 border rounded-full hover:bg-gray-100"
                    onClick={() => setIsOpen(true)}
                  >
                    <FiMenu className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
      
            {/* Mobile Sidebar */}
            <div
              className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out z-50`}
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX className="text-lg" />
                </button>
              </div>
      
              {/* Sidebar Links */}
              <div className="flex flex-col items-start px-6 space-y-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className={`text-lg ${
                      active === item.id
                        ? "text-blue-600 font-semibold"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div id="home" className="bg-[#6bb8e9] py-10 h-[100%] sm:h-[90vh] flex justify-center items-center relative">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4">
                    {/* Left Column */}
                    <div>
                      <h2 className="text-2xl md:text-3xl lg:text-5xl  font-mulish font-bold md:leading-[45px] lg:leading-[68px] leading-[40px] mt-20 md:mt-0 text-[#005190] mb-4">
                        Save Up To 30% On Your Car Insurance In Minutes.
                      </h2>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 font-manrope ">
                {/* Button 1 */}
                <button
                 onClick={() => {
              const formElement = document.getElementById("insurance-form");
              if (formElement) {
                formElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
                 className="flex items-center lg:gap-3 md:gap-2 bg-[#004E88] rounded-lg px-6 py-2 md:px-2 lg:px-6 text-left text-white hover:bg-[#003e6d] transition">
                  <img src="/Time.png" alt="Save Icon" className="w-8 h-8 md:w-6 md:h-6" />
                  <div>
                    <p className="text-lg font-semibold md:text-sm lg:text-lg text-[#00B14F]">
                      Save up to 80%
                    </p>
                    <p className="text-sm md:text-xs lg:text-sm text-white">Lowest Car Premiums</p>
                  </div>
                </button>
          
                {/* Button 2 */}
                <button
                onClick={() => {
              const formElement = document.getElementById("insurance-form");
              if (formElement) {
                formElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
                 className="flex items-center lg:gap-3 md:gap-2 bg-[#004E88] rounded-lg px-6 py-2 lg:px-6 md:px-2 text-left text-white hover:bg-[#003e6d] transition">
                  <img src="/Protect.png" alt="Insurance Icon" className="w-8 h-8 md:w-6 md:h-6" />
                  <div>
                    <p className="text-lg font-semibold md:text-sm lg:text-lg text-[#00B14F]">
                      30+ Insurance
                    </p>
                    <p className="text-sm md:text-xs lg:text-sm text-white">To Choose from</p>
                  </div>
                </button>
              </div>
                    </div>
          
                    {/* Right Column - Car Image */}
                    <div className="flex justify-center">
                      <img src={carImage} alt="Car" className="w-full max-w-md" />
                    </div>
                  </div>
                </div>

   <div
  id="insurance-form"
  className="bg-white flex justify-center py-8 sm:py-10 min-h-screen sm:min-h-[300px] px-3"
>
  <div
    className="
      w-full max-w-4xl bg-[#FFF9F9] rounded-xl shadow-xl 
      p-4 sm:p-6 md:p-8 
      h-full sm:h-auto
      md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-28
    "
  >
    {/* Heading */}
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-800 mb-2">
      Get a Free Quote Now
    </h3>
    <p className="text-center text-gray-500 mb-5 sm:mb-6 text-sm sm:text-base">
      Stay home & renew car insurance in 2 minutes
    </p>

    {/* Input Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        className="border rounded p-3 sm:p-3 text-sm sm:text-base w-full"
      />
      <input
        name="phone"
        onChange={handleChange}
        placeholder="Phone"
        className="border rounded p-3 sm:p-3 text-sm sm:text-base w-full"
      />
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className="border rounded p-3 sm:p-3 text-sm sm:text-base w-full md:col-span-2"
      />
    </div>

    {/* Buttons */}
    <div className="flex flex-col md:flex-row gap-3">
      <button
        onClick={() => navigate("/")}
        className="w-full md:w-1/2 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded hover:opacity-90 transition"
      >
        ← Previous
      </button>
      <button
        onClick={handleSubmit}
        className="w-full md:w-1/2 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded hover:opacity-90 transition"
      >
        See Plans →
      </button>
    </div>
  </div>
</div>


 {/* 3 section */}
       <section
        id="about"
        className="relative bg-cover bg-center bg-no-repeat py-20 h-[400px] items-center flex justify-center"
        style={{ backgroundImage: "url('/sec-3-car.png')" }} // Public folder image
      >
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/70"></div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white z-20">
         <div className="flex justify-center gap-3 items-center mb-6">
            <img
              src="/left-arrow.png"
              alt="Previous"
              className="w-4 h-4 cursor-pointer hover:scale-110 transition"
            />
            <h2 className="text-lg md:text-3xl font-semibold font-mulish mb-2">
              Benefits of Car Insurance
            </h2>
            <img
              src="/right-arrow.png"
              alt="Next"
              className="w-4 h-4 cursor-pointer hover:scale-110 transition"
            />
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Car insurance offers essential protection against unexpected
            expenses arising from accidents, theft, or natural disasters. It not
            only covers the cost of repairs and medical bills but also shields
            you from third-party liabilities. Enjoy peace of mind, reliable
            support, and a hassle-free claims process.
          </p>
        </div>
      </section>

          {/* Section 2 - Testimonials */}
            <section id="testimonials" className="py-16 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                {/* Heading Row */}
                <div className="text-center mb-8">
                  <div className="flex justify-center gap-6 items-center">
                  <img
                    src="/left-arrow.png"
                    alt="Previous"
                    className="w-4 h-4 cursor-pointer hover:scale-110 transition"
                  />
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
                      Testimonials
                    </h2>
                  </div>
                  <img
                    src="/right-arrow.png"
                    alt="Next"
                    className="w-4 h-4 cursor-pointer hover:scale-110 transition"
                  />
                </div>
                   <p className="text-gray-600">
                      What our happy customers are talking about our insurance company
                    </p>
                </div>
      
                {/* Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card 1 */}
                  <div className="bg-[#005190] text-white text-center rounded-2xl p-6 shadow-xl relative overflow-hidden group md:h-[250px] h-[300px]">
                    <h3 className="font-semibold text-2xl mb-3 mt-3">Mr Jawad Ahmed</h3>
                    <p className="leading-relaxed text-base">
                      Pellentesque habitant morbi tristique senectus et malesuada
                      fames ac turpis egestas. Aliquam viverra arcu. Donec aliquet
                      blandit enim feugiat mattis.
                    </p>
                    <div className="absolute bottom-[-20px] right-0 lg:w-[250px] md:w-[200px] w-[200px] rounded-tl-[80%]">
                      <img src="/green.png" alt="" /></div>
                  </div>
      
                  {/* Card 2 */}
                  <div className="bg-white border border-gray-200 text-center rounded-2xl p-6 shadow-xl relative overflow-hidden group md:h-[250px] h-[300px]">
                    <h3 className="font-semibold text-2xl mb-3 mt-3">Ms Sarah Faraz</h3>
                    <p className="text-base leading-relaxed">
                      Choosing Wesecure was one of the best decisions I’ve made. Their
                      team provided me with comprehensive coverage tailored to my
                      needs, and their attention to detail has been outstanding.
                    </p>
                    <div className="absolute bottom-[-20px] right-0 lg:w-[200px] md:w-[150px] w-[150px] rounded-tl-[80%]">
                      <img src="/blue.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
      
            <section className="py-12">
              <div className="flex justify-center items-center gap-4 mb-2">
                <img src="/left-arrow.png" alt="left" className="w-6 cursor-pointer" />
                <h2 className="text-2xl font-bold">FAQ</h2>
                <img src="/right-arrow.png" alt="right" className="w-6 cursor-pointer" />
              </div>
              <p className="text-gray-500 text-center mb-6">Frequently Asked Questions</p>
      
              <div className="max-w-xl mx-auto space-y-4">
                {faqs.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    <div className="flex items-center gap-2">
                      {openIndex === idx ? (
                        <FiChevronUp className="text-blue-600 text-xl" />
                      ) : (
                        <FiHelpCircle className="text-blue-600 text-xl" />
                      )}
                      <span className="font-medium">{item.question}</span>
                    </div>
                    {openIndex === idx && (
                      <p className="text-gray-500 mt-2 ml-7">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
      
            {/* Blog Section */}
            <section id="blog" className="py-12 bg-gray-50">
        <div className="flex justify-center items-center gap-4 mb-2">
          <img src="/left-arrow.png" alt="left" className="w-6 cursor-pointer" />
          <h2 className="text-2xl font-bold">Blog</h2>
          <img src="/right-arrow.png" alt="right" className="w-6 cursor-pointer" />
        </div>
        <p className="text-gray-500 text-center mb-6">
          Latest News & Articles from Blog
        </p>
      
        <div className="flex flex-wrap justify-center gap-6">
          {blogs.map((b, idx) => (
            <div
              key={idx}
              className="w-72 bg-white rounded-lg shadow hover:shadow-lg overflow-hidden"
            >
              <div className="relative group">
                {/* Image */}
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-full h-48 object-cover"
                />
      
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-5 group-hover:opacity-100 
                                transition-opacity duration-300 flex justify-center items-center z-10">
                  <div className="border-2 border-white rounded-full p-3">
                    <FiArrowUpRight className="text-white text-xl" />
                  </div>
                </div>
              </div>
      
              <div className="p-4">
                <h4 className="font-semibold">{b.title}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={b.user}
                    alt={b.title}
                    className="w-[40px] h-[40px] object-cover"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    by {b.author} — {b.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      
            {/* Footer Section */}
            {/* <footer className="bg-center bg-no-repeat p-20 w-full items-center text-white" style={{ backgroundImage: "url('/Footer.png')" }}>
              <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              
                <div>
                  <h3 className="font-bold text-lg mb-3">About</h3>
                  <p className="text-sm mb-4">
                    WeSecure offers trusted, personalized insurance solutions with expert support, ensuring your financial security and peace of mind.
                  </p>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded text-black"
                  />
                </div>
      
            
           <Footer />
      
                <div>
                  <h3 className="font-bold text-lg mb-3">Explore</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Home</li>
                    <li>About</li>
                    <li>Service</li>
                    <li>Portfolio</li>
                    <li>Contact Us</li>
                  </ul>
                </div>
              </div>
            </footer> */}
            <section id="contact">
            <Footer />
            </section>
              <div className="bg-[#000f24] text-white text-center py-2 text-lg font-mulish">
                © All Copyright 2025 by wesecure.com
              </div>

    </div>
  );
};

export default QuoteFormStep2;
