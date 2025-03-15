import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationPage = () => {
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Volunteer Registration</h2>
      <form onSubmit={handleSubmit} className="mt-4">
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
            <select name="gender" className="form-control" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
