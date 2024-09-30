"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Polished Input Box
const InputBox = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder="Enter your desired career here..."
    className="w-full p-4 mb-6 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md h-22 focus:outline-none focus:border-blue-500"
  />
);

// Card-like format for displaying data
const InfoCard = ({ name, description, website }) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={website} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

// Spinner
const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

// Main Component
const CareerGuidance = () => {
  const [career, setCareer] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCareerChange = (e) => setCareer(e.target.value);

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    if (!career.trim()) {
      setError("Please enter a desired career.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/career-guidance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ frontendinput: career }),
        }
      );
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      setError("Failed to fetch data.");
      console.error("Error fetching career guidance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCareer("");
    setDetails(null);
  };

  return (
    <div className="p-6">
      <h1 className="max-w-4xl mb-8 title">Career Guidance</h1>

      <form
        onSubmit={handleCareerSubmit}
        className="max-w-4xl mx-auto mb-6 text-left"
      >
        <InputBox value={career} onChange={handleCareerChange} />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="flex">
          <button className="gradient-btn" type="submit">
            Get Details
          </button>
          {details && (
            <button
              onClick={handleReset}
              className="px-4 py-2 ml-4 font-bold text-white transition-transform duration-300 bg-gray-700 rounded-lg hover:scale-105"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {loading && <Spinner />}

      {!loading && details && (
        <div className="grid grid-cols-1 gap-6 px-4 py-4 mt-10 border-2 rounded-lg border-zinc-500">
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Relevant Exams
            </h3>
            {details.relevantExams.map((exam, index) => (
              <InfoCard
                key={index}
                name={exam.examTitle}
                description={exam.description}
                website="#"
              />
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">Scholarships</h3>
            {details.scholarships.map((scholarship, index) => (
              <InfoCard
                key={index}
                name={scholarship.scholarshipTitle}
                description={scholarship.description}
                website="#"
              />
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">Prerequisites</h3>
            {details.prerequisites.map((prerequisite, index) => (
              <InfoCard
                key={index}
                name={prerequisite.prerequisiteTitle}
                description={prerequisite.description}
                website="#"
              />
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">Programs</h3>
            {details.programs.map((program, index) => (
              <InfoCard
                key={index}
                name={program.programTitle}
                description={program.description}
                website="#"
              />
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-10">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto text-left"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Career Guidance</AccordionTrigger>
            <AccordionContent>
              <p className="text-white">
                Enter your desired career name to receive detailed information
                about the relevant exams, scholarships, prerequisites, and
                programs. This tool helps you understand the steps needed to
                pursue your career goals effectively.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the Career Guidance Tool?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                This tool assists you in planning your educational journey by
                providing information on relevant exams and opportunities
                tailored to your career aspirations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How Can I Use This Tool?</AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                Simply enter the career you are interested in, and the tool will
                provide you with a comprehensive overview of what you need to
                succeed.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CareerGuidance;
