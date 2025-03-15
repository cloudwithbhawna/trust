import React, { useContext } from 'react';
import { HomepageContext } from '../context/HomepageContext';
import { formatText } from '../utils/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const { content, loading } = useContext(HomepageContext);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!content) return <div className="text-center mt-5">No homepage content available.</div>;

  // Function to format text with numbered points
  const formatWithNumbers = (text) => {
    return text
      .split('\n') // Split content into lines
      .map((line, index) => (
        <div key={index}>
          <b>{index + 1}. </b>
          {line}
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
    </div>
  );
};

export default HomePage;
