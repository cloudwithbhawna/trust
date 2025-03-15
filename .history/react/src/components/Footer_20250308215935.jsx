import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-1">© 2025 Bhawna Angrex. All Rights Reserved.</p>
        <p className="mb-1">
          <a href="mailto:info@bhawnaangrex.com" className="text-white text-decoration-none">
            info@bhawnaangrex.com
          </a>{" "}
          | +91 9876543210
        </p>
        <div>
          <a href="#" className="text-white mx-2">
            Privacy Policy
          </a>
          |
          <a href="#" className="text-white mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
