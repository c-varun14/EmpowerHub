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
    placeholder="Enter the facility or technology you require resources for..."
    className="w-full p-4 mb-6 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md h-22 focus:outline-none focus:border-blue-500"
  />
);

// Card-like format for displaying group information
const GroupCard = ({ groupName, description, link, members }) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {groupName}
      </a>
    </h3>
    <p className="mb-2 text-gray-300">{description}</p>
    <p className="text-gray-400">Members: {members}</p>
  </div>
);

// Card-like format for displaying material information
const MaterialCard = ({ name, link, details, type }) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </h3>
    <p className="mb-2 text-gray-300">{details}</p>
    <p className="text-gray-400">Type: {type}</p>
  </div>
);

const ResourceFinder = () => {
  const [exam, setExam] = useState("");
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExamChange = (e) => setExam(e.target.value);

  const handleExamSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/resource", {
        // Update this URL as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ frontendinput: exam }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.groups.length === 0 && data.materials.length === 0) {
        setError("No resources found for the provided input.");
      } else {
        setResources(data);
      }
    } catch (error) {
      setError("Failed to fetch resources.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setExam("");
    setResources(null);
    setError(null);
  };

  return (
    <div className="p-6">
      <div className="">
        <h2 className="max-w-4xl mb-8 title">Resource Finder</h2>
        <form
          onSubmit={handleExamSubmit}
          className="max-w-4xl mx-auto mb-6 text-left"
        >
          <div className="mb-4">
            <label className="hidden block mb-2 text-gray-400" htmlFor="exam">
              Enter Exam or Technology
            </label>
            <InputBox value={exam} onChange={handleExamChange} />
          </div>
          <button className="gradient-btn" type="submit">
            Find Resources
          </button>
          {resources && (
            <button
              onClick={handleReset}
              className="px-4 py-2 ml-4 font-bold text-white transition-transform duration-300 bg-gray-700 rounded-lg hover:scale-105"
            >
              Reset
            </button>
          )}
        </form>

        {loading && <p className="mt-4 text-gray-400">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {resources && !loading && !error && (
          <div className="grid grid-cols-1 gap-6 p-4 mt-10 border-2 rounded-lg border-zinc-500">
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Groups</h3>
              {resources.groups.map((group, index) => (
                <GroupCard
                  key={index}
                  groupName={group.name}
                  description={group.description}
                  link={group.link}
                  members={group.members}
                />
              ))}
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Materials</h3>
              {resources.materials.map((material, index) => (
                <MaterialCard
                  key={index}
                  name={material.name}
                  link={material.link}
                  details={material.description}
                  type={material.type}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl mx-auto mt-10 text-left"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the Resource Finder?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-200">
              The{" "}
              <span className="font-semibold text-white">Resource Finder</span>{" "}
              is a valuable tool designed to assist you in locating educational
              resources, discussion groups, and study materials relevant to your
              exams or interests. By providing comprehensive information about
              various resources, this tool helps you find the best options to
              support your learning journey.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Why Use the Resource Finder?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-400">
              Whether you’re preparing for an upcoming exam or exploring new
              study materials, the{" "}
              <span className="font-semibold">Resource Finder</span> offers
              tailored information based on your specific needs. It helps you
              discover <span className="font-semibold">discussion groups</span>,{" "}
              <span className="font-semibold">study materials</span>, and other
              resources that can enhance your learning experience.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            How Does It Assist in Finding Resources?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-400">
              The Resource Finder uses a structured approach to present various
              resources and groups related to your exam or field of interest. It
              categorizes information into easily accessible cards, making it
              simpler for you to identify and access the resources you need.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResourceFinder;
