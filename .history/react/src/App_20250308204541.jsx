import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="container-fluid p-0">
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/volunteer" element={<UsersPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
