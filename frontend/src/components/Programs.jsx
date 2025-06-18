import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const programs = [
  {
    title: "Computer Science & Information Technology",
    duration: "3 years / 6 semesters",
    benefits: [
      "Hands-on coding labs & real-world projects",
      "Strong demand in the tech industry",
      "Internships with software companies",
    ],
    description:
      "Focuses on software engineering, web development, data structures, and emerging technologies like AI and cybersecurity.",
  },
  {
    title: "Business Administration",
    duration: "3 years / 6 semesters",
    benefits: [
      "Develop leadership & management skills",
      "Opportunities in finance, marketing, HR",
      "Guest lectures from industry leaders",
    ],
    description:
      "Prepares students to manage and lead organizations by covering finance, entrepreneurship, marketing, and strategic planning.",
  },
  {
    title: "Electrical & Electronics Engineering",
    duration: "4 years / 8 semesters",
    benefits: [
      "Hands-on lab work and circuit design",
      "Collaboration with engineering companies",
      "Access to robotics and automation labs",
    ],
    description:
      "Covers electrical systems, signal processing, embedded systems, and power electronics, with a strong practical component.",
  },
  {
    title: "Law & Legal Studies",
    duration: "3 years / 6 semesters",
    benefits: [
      "Strong foundation in civil & criminal law",
      "Moot court competitions",
      "Path to legal consultancy or law practice",
    ],
    description:
      "Provides a detailed understanding of constitutional law, civil procedures, international law, and human rights legislation.",
  },
  {
    title: "Health Sciences & Nursing",
    duration: "3.5 years / 7 semesters",
    benefits: [
      "Clinical practice in hospitals",
      "Certifications in first aid & care",
      "High employability in the healthcare sector",
    ],
    description:
      "Combines medical theory and practical training for careers in patient care, nursing, and public health.",
  },
  {
    title: "Architecture & Urban Planning",
    duration: "4 years / 8 semesters",
    benefits: [
      "Studio-based design projects",
      "Field visits and design exhibitions",
      "Internships with design studios",
    ],
    description:
      "Teaches architectural design, sustainable development, CAD software, and urban planning principles.",
  },
];

const Programs = () => {
  return (
    <>
      <Header />

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Academic Programs
        </h1>

        <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-xl font-bold mb-2 text-indigo-600">
                {prog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4 font-medium">
                {prog.duration}
              </p>
              <p className="text-gray-700 mb-4">{prog.description}</p>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Key Benefits:
                </h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {prog.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Programs;
