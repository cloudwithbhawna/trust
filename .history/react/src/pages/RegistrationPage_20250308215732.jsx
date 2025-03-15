import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationPage = () => {
  const [step, setStep] = useState(1); // Step 1 or Step 2
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Registration Successful! Your Volunteer ID will be sent to your Mobile/Email.");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Volunteer Registration</h2>
      <form onSubmit={handleSubmit} className="mt-4">

        {step === 1 && (
          <>
            <h4 className="text-center text-secondary">Step 1: Personal Details</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Full Name:</label>
                <input type="text" name="fullname" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Date of Birth:</label>
                <input type="date" name="dob" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
  <label>Gender:</label>
  <input type="text" name="gender" className="form-control" value="Female" readOnly />
</div>
              <div className="col-md-6 mb-3">
                <label>Mobile Number:</label>
                <input type="tel" name="mobilenumber" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Email:</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Address:</label>
                <input type="text" name="address" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>House No & Street:</label>
                <input type="text" name="house_no_street" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>City:</label>
                <input type="text" name="city" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>State:</label>
                <input type="text" name="state" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Pincode:</label>
                <input type="text" name="pincode" className="form-control" onChange={handleChange} required />
              </div>
            </div>

            <div className="text-center">
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h4 className="text-center text-secondary">Step 2: Emergency Contact & Agreement</h4>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Emergency Contact Name:</label>
                <input type="text" name="emergency_name" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Relationship:</label>
                <input type="text" name="emergency_relationship" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Emergency Mobile Number:</label>
                <input type="tel" name="emergency_mobile" className="form-control" onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-3">
              <input type="checkbox" name="consent" className="me-2" onChange={handleChange} required />
              <label>
                <b>I confirm that I am volunteering for <span className="text-primary">BHAWNA ANGREX</span> and understand the responsibilities.</b>
              </label>
            </div>

            <p className="text-center text-primary fw-bold">
              *Note: After verification, your Volunteer ID will be sent to your Mobile No. / Email.
            </p>

            <div className="text-center">
              <button type="button" className="btn btn-secondary me-2" onClick={() => setStep(1)}>Back</button>
              <button type="submit" className="btn btn-primary">Submit & Pay</button>
            </div>
          </>
        )}

      </form>
    </div>
  );
};

export default RegistrationPage;
