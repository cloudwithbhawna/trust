import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import volunteerApi from "../api/volunteerApi"; // Adjust the path as needed
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

  // Update text/checkbox values
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Navigation helpers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit the form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side check for required fields
    if (!formData.consent || !formData.aadhar || !formData.passport_photo) {
      alert("Consent, Aadhar, and Passport Photo are required.");
      return;
    }

    // Build FormData object
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await volunteerApi.createVolunteer(data);
      alert("Registration Successful! Your Volunteer ID is: " + response.volunteerId);
      navigate("/");
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
            <input type="text" name="fullname" placeholder="Full Name" className="form-control mb-2" onChange={handleChange} required />
            <input type="date" name="dob" className="form-control mb-2" onChange={handleChange} required />
            <input type="tel" name="mobilenumber" placeholder="Mobile Number" className="form-control mb-2" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="house_no_street" placeholder="House No & Street" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="state" placeholder="State" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="pincode" placeholder="Pincode" className="form-control mb-2" onChange={handleChange} required />
            <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4>Step 2: Emergency Contact & Documents</h4>
            <input type="text" name="emergency_name" placeholder="Emergency Contact Name" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="emergency_relationship" placeholder="Relationship" className="form-control mb-2" onChange={handleChange} required />
            <input type="tel" name="emergency_mobile" placeholder="Emergency Mobile" className="form-control mb-2" onChange={handleChange} required />
            <label>Aadhar Card Upload:</label>
            <input type="file" name="aadhar" className="form-control mb-2" accept="image/*,.pdf" onChange={handleFileChange} required />
            <label>Passport Photo Upload:</label>
            <input type="file" name="passport_photo" className="form-control mb-2" accept="image/*" onChange={handleFileChange} required />
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>Back</button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4>Step 3: Consent & Submit</h4>
            <label>
              <input type="checkbox" name="consent" className="me-2" onChange={handleChange} required />
              I confirm that I am volunteering for Bhawna Angels.
            </label>
            <div className="mt-3">
              <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>Back</button>
              <button type="submit" className="btn btn-success">Submit & Pay</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationPage;
