import React from "react";
// import "./../index.css";
// import "./../App.css";
import Subtract from "/Subtract.png";
import Globe from "/Globe.png";
import Location from "/Location.png";
import Line3 from "/Line 3.png";
import Group15 from "/Group 15 (1).png";
import FooterImg from "/Footer.png"; // Adjust the path as necessary

export default function Footer() {
  return (
    <section className="bg-no-repeat bg-cover w-full mt-[5%] pb-[3%]"
  style={{ backgroundImage: `url(${FooterImg})` }}>
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="footer-1">
              <h1>About</h1>
              <p>
                WeSecure offers trusted, personalized insurance solutions with expert support, ensuring your financial security and peace of mind.
              </p>
              <input type="email" placeholder="Email Address" />
              <button>
                <a href="">
                  <i className="bi bi-arrow-up-right"></i>
                </a>
              </button>
            </div>
          </div>

          {/* Center Section */}
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="footer-2">
              <img src={Group15} alt="" className="ury" />
              <div className="innsol">
                <img src={Subtract} alt="subtract" />
              </div>
              <div className="ury-1">
                <img src={Globe} alt="" />
                <a href="">www.wesecure.com</a>
              </div>

              <div className="ury-2">
                <img src={Location} alt="" />
                <a href="">
                  Lorem Ipsum, Karachi
                </a>
              </div>
              <div className="ury-4">
                <img src={Line3} alt="" />
              </div>

              <div className="ury-3">
                <button>
                  <i className="bi bi-telephone-fill"></i>
                </button>
                <a href="">0300-1234567</a>
              </div>
            </div>
          </div>

          {/* Explore Section */}
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="footer-3">
              <h1>Explore</h1>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Service</a>
                </li>
                <li>
                  <a href="#">Portfolio</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
