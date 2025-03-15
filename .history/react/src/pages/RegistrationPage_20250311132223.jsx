import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import volunteerApi from "../api/volunteerApi"; // Adjust the path as needed
import axios from "axios"; // Ensure axios is installed: npm install axios
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "Female",
    mobilenumber: "",
    email: "",
    address: "",
    house_no_street: "",
    city: "",
    state: "",
    pincode: "",
    emergency_name: "",
    emergency_relationship: "",
    emergency_mobile: "",
    consent: false,
    aadhar: null,
    passport_photo: null,
  });

  // Validate required fields for each step...
  // (Your existing validation and input handling code)

  // Helper to dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        return resolve();
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve();
      };
      document.body.appendChild(script);
    });
  };

  // Function to initialize Razorpay payment
  const handlePayment = async () => {
    await loadRazorpayScript(); // Ensure script is loaded
    try {
      const amount = 300; // Fixed amount of Rs 300
      // Update URL to match your backend port (3000)
      const response = await axios.post("http://localhost:3000/api/createOrder", {
        amount,
        currency: "INR",
      });
      const { order } = response.data;

      const options = {
        key: "rzp_live_b4EYdELZMb2OrT", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Bhawna Angels",
        description: "Volunteer Registration Fee",
        order_id: order.id,
        handler: async function (paymentResponse) {
          console.log("Payment response:", paymentResponse);
          try {
            // Update URL for verification to port 3000 as well
            const verifyResponse = await axios.post("http://localhost:3000/api/verifyPayment", {
              ...paymentResponse,
            });
            if (verifyResponse.data.success) {
              alert("Payment Successful!");
              navigate("/"); // Navigate to home or success page after payment
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error", error);
            alert("Error verifying payment");
          }
        },
        prefill: {
          name: formData.fullname,
          email: formData.email,
          contact: formData.mobilenumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in payment creation", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  // Modified submit handler to register then trigger payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate and build formData as before...
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      // Ensure the volunteer API endpoint is also updated if needed
      const response = await volunteerApi.createVolunteer(data);
      alert("Registration Successful! Your Volunteer ID is: " + response.volunteerId);
      handlePayment(); // Trigger payment after registration
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Your multi-step form code remains the same */}
      </form>
    </div>
  );
};

export default RegistrationPage;
