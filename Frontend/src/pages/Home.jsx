import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaMotorcycle, FaHeartbeat, FaPlane, FaWhatsapp  } from "react-icons/fa";


const Home = () => {
  const [loadingCar, setLoadingCar] = useState(false);
  const [loadingBike, setLoadingBike] = useState(false);
  const navigate = useNavigate();

const handleCarClick = () => {
    setLoadingCar(true);
    setTimeout(() => {
      setLoadingCar(false);
      navigate("/step1"); // <-- yahan apna route
    }, 2000);
  };

  const handleBikeClick = () => {
    setLoadingBike(true);
    setTimeout(() => {
      setLoadingBike(false);
      navigate("/bike"); // <-- yahan apna route
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#005190]/70 via-[#005190]/50 to-[#4CC750]/70 text-white p-3"
>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4shadow-md">
        <div className="flex items-center gap-3">
          <img src="/wesecure-logo.png" alt="Logo" className="h-[70px]" />
          {/* <span className="text-xl font-bold text-[#005190]">smartchoice</span> */}
        </div>
        {/* <ul className="hidden md:flex items-center gap-6 text-[#005190] font-semibold">
          <li className="cursor-pointer hover:text-[#4CC750]">Car</li>
          <li className="cursor-pointer hover:text-[#4CC750]">Bike</li>
          <li className="cursor-pointer hover:text-[#4CC750]">Health</li>
          <li className="cursor-pointer hover:text-[#4CC750]">Travel</li>
        </ul> */}
        <div className="text-[#F5A623] font-bold"><a href="#">(021) 111-212-212</a></div>
      </nav>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923001234567" // यहाँ अपना WhatsApp नंबर डालो
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#005190] rounded-full p-2 shadow-lg animate-float hover:scale-110 transition-transform"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 font-manrope">
          Find The Best Insurance
        </h1>
        <p className="max-w-2xl text-lg mb-10 font-poppins">
          Search, compare, and buy the insurance plan in Pakistan that fits your
          need
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Car Button */}
           {/* Car Button */}
    {/* Car Button */}
{/* Car Button */}
<button
  onClick={handleCarClick}
  disabled={loadingCar}
  className="group relative text-white uppercase tracking-[0.1em] text-[1.2em] px-[30px] py-[10px] bg-[#005190] rounded-xl overflow-hidden transition-all duration-1000 min-w-[200px] flex items-center justify-center gap-2"
>
  {loadingCar ? (
    <>
      <span className="relative z-10">Processing</span>
      <img
        src="/loader.gif"
        alt="loading"
        className="w-6 h-6 relative z-10"
      />
    </>
  ) : (
    <span className="relative z-10 flex items-center gap-2">
      <FaCar /> Car Insurance
    </span>
  )}
  <span
    className={`absolute top-0 -right-[50px] h-full bg-[#4CC750] skew-x-[35deg] transition-all duration-1000 
    ${loadingCar ? "w-full" : "w-0 group-hover:w-full"}`}
  ></span>
</button>

{/* Bike Button */}
<button
  onClick={handleBikeClick}
  disabled={loadingBike}
  className="group relative text-white uppercase tracking-[0.1em] text-[1.2em] px-[30px] py-[10px] bg-[#005190] rounded-xl overflow-hidden transition-all duration-1000 min-w-[200px] flex items-center justify-center gap-2"
>
  {loadingBike ? (
    <>
      <span className="relative z-10">Processing</span>
      <img
        src="/loader.gif"
        alt="loading"
        className="w-6 h-6 relative z-10"
      />
    </>
  ) : (
    <span className="relative z-10 flex items-center gap-2">
      <FaMotorcycle /> Bike Insurance
    </span>
  )}
  <span
    className={`absolute top-0 -right-[50px] h-full bg-[#4CC750] skew-x-[35deg] transition-all duration-1000 
    ${loadingBike ? "w-full" : "w-0 group-hover:w-full"}`}
  ></span>
</button>



          {/* Health Button */}
          {/* <button
            className="group relative inline-block text-white uppercase tracking-[0.1em] text-[1.2em] px-[30px] py-[10px] bg-[#005190] rounded-xl overflow-hidden transition-all duration-1000"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaHeartbeat /> Health Insurance
            </span>
            <span className="absolute top-0 -right-[50px] w-0 h-full bg-[#4CC750] skew-x-[35deg] transition-all duration-1000 group-hover:w-full"></span>
          </button> */}

          {/* Travel Button */}
          {/* <button
            className="group relative inline-block text-white uppercase tracking-[0.1em] text-[1.2em] px-[30px] py-[10px] bg-[#005190] rounded-xl overflow-hidden transition-all duration-1000"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaPlane /> Travel Insurance
            </span>
            <span className="absolute top-0 -right-[50px] w-0 h-full bg-[#4CC750] skew-x-[35deg] transition-all duration-1000 group-hover:w-full"></span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
