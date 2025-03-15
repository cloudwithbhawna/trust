import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const content = {
    objectives: [
      "Provide support to underprivileged communities.",
      "Promote education and skill development.",
      "Encourage volunteer participation in social work."
    ],
    how_we_work: [
      "Collaborate with local organizations and volunteers.",
      "Organize donation drives and awareness programs.",
      "Ensure transparency in fund allocation."
    ],
    responsibilities: [
      "Assist in fundraising and outreach activities.",
      "Help in organizing events and workshops.",
      "Spread awareness through social media and campaigns."
    ],
    why_volunteer: [
      "Make a meaningful impact in society.",
      "Gain valuable experience and skills.",
      "Meet like-minded people and expand your network."
    ]
  };

  const formatWithNumbers = (list) => {
    return list.map((item, index) => (
      <div key={index}>
        <b>{index + 1}. </b> {item}
      </div>
    ));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center">Our Objectives</h2>
            {formatWithNumbers(content.objectives)}
          </section>
        </div>
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center">How We Work</h2>
            {formatWithNumbers(content.how_we_work)}
          </section>
        </div>
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center">Responsibilities of Volunteers</h2>
            {formatWithNumbers(content.responsibilities)}
          </section>
        </div>
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center">Why Become a Volunteer?</h2>
            {formatWithNumbers(content.why_volunteer)}
          </section>
        </div>
      </div>

      {/* Join as Volunteer Button */}
      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
          Join as Volunteer
        </button>
      </div>
    </div>
  );
};

export default HomePage;
