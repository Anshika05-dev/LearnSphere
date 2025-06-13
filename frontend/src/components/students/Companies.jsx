import React from "react";
import microsoft from "../../assets/microsoft.png";
import accenture from "../../assets/accenture.png";
import paypal from "../../assets/Paypal.png";
import adobe from "../../assets/Adobe.png";
import wallmart from "../../assets/wallmart.png";
import "../../styles/Companies.css";
const Companies = () => {
  return (
    <div className="companies_section">
      <p>Trusted By Learners From..</p>
      <div className="companies_images">
        <img src={accenture} alt="accenture_logo" className="company_logo" />
        <img src={microsoft} alt="microsoft_logo" className="company_logo" />
        <img src={paypal} alt="paypal_logo" className="company_logo" />
        <img src={adobe} alt="adobe_logo" className="company_logo" />
        <img src={wallmart} alt="wallmart_logo" className="company_logo" />
      </div>
    </div>
  );
};

export default Companies;
