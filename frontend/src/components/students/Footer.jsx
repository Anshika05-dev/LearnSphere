import React from "react";
import colored_logo from "../../assets/favicon.png";
import "../../styles/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="sub_footer">
        <div className="upper_part1">
          <div className="part1">
            <img src={colored_logo}></img>
            <h1>LearnSphere</h1>
          </div>
          <p>
            Unlock your potential with our e-learning platform. Learn at your
            own pace, connect with mentors, and gain the skills you need to
            succeed in today’s competitive world. Start learning, growing, and
            achieving today.
          </p>
        </div>
        <div className="part2">
          <h2>
            Company
          </h2>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="part3">
          <h5>
          Subscribe to our newsletter
          </h5>
          <p>
          The latest news, articles, and resources,<br></br> sent to your inbox weekly.
          </p>
          <input type="text" placeholder="Enter your Email" className="letter_input"></input>
          <button className="sub_btn">Subscribe</button>
        </div>
      </div>
      <p>Copyright 2025 © LearnSphere. All Right Reserved.</p>
    </footer>
  );
};

export default Footer;
