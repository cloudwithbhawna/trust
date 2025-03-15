// RegistrationPage.js
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

  // Validate required fields for each step
  const validateStep = () => {
    // Regex patterns for validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const currentDate = new Date();

    if (step === 1) {
      if (
        !formData.fullname.trim() ||
        !formData.dob ||
        !formData.mobilenumber.trim() ||
        !formData.email.trim() ||
        !formData.address.trim() ||
        !formData.house_no_street.trim() ||
        !formData.city.trim() ||
        !formData.state.trim() ||
        !formData.pincode.trim()
      ) {
        alert("Please fill in all personal details.");
        return false;
      }

      // Validate email format
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address.");
        return false;
      }

      // Validate mobile number (10 digits)
      if (!mobileRegex.test(formData.mobilenumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
      }

      // Validate pincode (6 digits)
      if (!pincodeRegex.test(formData.pincode)) {
        alert("Please enter a valid 6-digit pincode.");
        return false;
      }

      // Validate that DOB is not in the future
      const dobDate = new Date(formData.dob);
      if (dobDate > currentDate) {
        alert("Date of Birth cannot be in the future.");
        return false;
      }
    }

    if (step === 2) {
      if (
        !formData.emergency_name.trim() ||
        !formData.emergency_relationship.trim() ||
        !formData.emergency_mobile.trim() ||
        !formData.aadhar ||
        !formData.passport_photo
      ) {
        alert("Please fill in emergency contact details and upload required documents.");
        return false;
      }

      // Validate emergency mobile number (10 digits)
      if (!mobileRegex.test(formData.emergency_mobile)) {
        alert("Please enter a valid 10-digit emergency mobile number.");
        return false;
      }

      // Validate Aadhar file type and size (under 2MB)
      const aadharFile = formData.aadhar;
      const validAadharTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validAadharTypes.includes(aadharFile.type)) {
        alert("Aadhar file must be a JPEG, PNG, or PDF.");
        return false;
      }
      if (aadharFile.size > 2 * 1024 * 1024) {
        alert("Aadhar file size must be less than 2MB.");
        return false;
      }

      // Validate Passport Photo type and size (under 1MB)
      const passportPhoto = formData.passport_photo;
      const validPhotoTypes = ['image/jpeg', 'image/png'];
      if (!validPhotoTypes.includes(passportPhoto.type)) {
        alert("Passport photo must be a JPEG or PNG image.");
        return false;
      }
      if (passportPhoto.size > 1 * 1024 * 1024) {
        alert("Passport photo size must be less than 1MB.");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.consent) {
        alert("Consent is required.");
        return false;
      }
    }
    return true;
  };

  // Handle text and checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Navigation helpers
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

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
    await loadRazorpayScript(); // Ensure the Razorpay script is loaded
    try {
      const amount = 300; // Fixed amount of Rs 300
      // Use the correct backend port (here, port 3000)
      const response = await axios.post("http://localhost:3000/api/createOrder", {
        amount,
        currency: "INR",
      });
      const { order } = response.data;

      const options = {
        key: "rzp_live_b4EYdELZMb2OrT", // Replace with your actual Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Bhawna Angels",
        description: "Volunteer Registration Fee",
        order_id: order.id,
        handler: async function (paymentResponse) {
          console.log("Payment response:", paymentResponse);
          try {
            // Verify payment with the backend (ensure the port is correct)
            const verifyResponse = await axios.post("http://localhost:3000/api/verifyPayment", {
              ...paymentResponse,
            });
            if (verifyResponse.data.success) {
              alert("Payment Successful!");
              navigate("/"); // Navigate after successful payment
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
    if (!validateStep()) return;

    // Build FormData for registration
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await volunteerApi.createVolunteer(data);
      alert("Registration Successful! Your Volunteer ID is: " + response.volunteerId);
      // Trigger payment after successful registration
      handlePayment();
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h4>Step 1: Personal Details</h4>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="gender"
              className="form-control mb-2"
              value="Female"
              disabled
              required
            />
            <input
              type="tel"
              name="mobilenumber"
              placeholder="Mobile Number"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="house_no_street"
              placeholder="House No & Street"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4>Step 2: Emergency Contact & Documents</h4>
            <input
              type="text"
              name="emergency_name"
              placeholder="Emergency Contact Name"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="emergency_relationship"
              placeholder="Relationship"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="emergency_mobile"
              placeholder="Emergency Mobile"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <label>Aadhar Card Upload:</label>
            <input
              type="file"
              name="aadhar"
              className="form-control mb-2"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              required
            />
            <label>Passport Photo Upload:</label>
            <input
              type="file"
              name="passport_photo"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4>Step 3: Consent & Submit</h4>
            <label>
              <input
                type="checkbox"
                name="consent"
                className="me-2"
                onChange={handleChange}
                required
              />
              I confirm that I am volunteering for Bhawna Angels.
            </label>
            <div className="mt-3">
              <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="btn btn-success">
                Submit & Pay
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationPage;
