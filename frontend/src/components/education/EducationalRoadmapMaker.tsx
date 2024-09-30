"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TreeDiagram from "./TreeDiagram/TreeDiagram";

const EducationalRoadmapMaker = () => {
  const [input, setInput] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previousPrompts, setPreviousPrompts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/tree-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ frontendinput: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRoadmapData(data); // Update state with the data received from the backend

      // Update previous prompts with the new prompt and roadmap data
      const updatedPrompts = [
        { prompt: input, roadmap: data },
        ...previousPrompts.slice(0, 9),
      ]; // Keep only the last 10 prompts
      setPreviousPrompts(updatedPrompts);
      localStorage.setItem("prompts", JSON.stringify(updatedPrompts));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setRoadmapData(null);
  };

  return (
    <div className="p-6 ">
      <h1 className="max-w-4xl mb-8 title ">AI Roadmap Maker</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mb-6 text-left"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter what sort of roadmap do you require. It can be of any type and can be very personalized or broad (career, technology, step-by-step process, tech stack, etc.)"
          className="w-full p-4 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md h-22 focus:outline-none focus:border-blue-500"
        />
        <div className="flex mt-4 space-x-4">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white transition-transform duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full loader animate-spin"></span>
                <span>Loading...</span>
              </div>
            ) : (
              "Generate Roadmap"
            )}
          </button>
          {roadmapData && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 font-bold text-white transition-transform duration-300 bg-gray-700 rounded-lg hover:scale-105"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {loading && (
        <p className="text-white">
          Please wait while we generate your roadmap...
        </p>
      )}
      {roadmapData && <TreeDiagram data={roadmapData} />}

      {/* Faq */}
      <div className="mt-10">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto text-left"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the Education Section?</AccordionTrigger>
            <AccordionContent>
              <p className="text-white">
                The{" "}
                <span className="font-semibold text-white">
                  Education Section
                </span>{" "}
                provides comprehensive guidance to help you navigate your
                educational journey. Whether you&apos;re seeking to explore
                career paths or refine your academic focus, our tools are
                designed to support you in making informed decisions.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How Does the Career Suggestor Work?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                The <span className="font-semibold">Career Suggestor</span>{" "}
                helps you discover potential career paths tailored to your
                interests and existing knowledge. Input your details to receive
                personalized career suggestions that align with your
                aspirations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is the Educational Roadmap Maker?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                The{" "}
                <span className="font-semibold">Educational Roadmap Maker</span>{" "}
                is a tool to assist you in planning your educational journey. It
                helps you map out your academic goals and strategies based on
                your career objectives and interests.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default EducationalRoadmapMaker;
