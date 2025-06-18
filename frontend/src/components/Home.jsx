import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HeroImage from "../assets/images/students.png";

const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[450px] flex items-center justify-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="text-center text-white z-10 px-4 max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to Our Faculty
          </h1>
          <p className="text-xl font-light">
            Empowering future leaders through knowledge, innovation, and
            collaboration.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Experienced Faculty",
                desc: "Our professors bring decades of academic and real-world experience to the classroom.",
              },
              {
                title: "Research & Innovation",
                desc: "We encourage scientific research, student projects, and international conferences.",
              },
              {
                title: "Global Exposure",
                desc: "Students can participate in exchange programs and internships abroad.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Academic Programs
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Computer Science & IT",
            "Business Administration",
            "Electrical Engineering",
            "Law & Public Policy",
            "Nursing & Health Sciences",
            "Architecture & Design",
          ].map((program, idx) => (
            <div
              key={idx}
              className="border rounded-2xl p-6 hover:bg-gray-100 transition text-center"
            >
              <h4 className="text-xl font-semibold">{program}</h4>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <a
            href="/programs"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition"
          >
            View More Details
          </a>
          <p className="text-sm text-gray-500 mt-2">
            Explore each program in depth and find what suits you best.
          </p>
        </div>
      </div>

      {/* Events & Conferences Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Events & Conferences
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                International Tech Conference 2024
              </h3>
              <p className="text-gray-600">
                Hosted at our main campus, with speakers from MIT, ETH Zurich,
                and Oxford. Focused on AI, cybersecurity, and sustainable
                innovation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                Student Research Symposium
              </h3>
              <p className="text-gray-600">
                Annual event showcasing top student projects. Participants
                present to a panel of faculty and industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* International Collaborations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            International Collaborations
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-1">
                Erasmus+ Exchange Program
              </h3>
              <p className="text-gray-700">
                Our students have studied in Italy, France, Poland, and Germany
                through Erasmus+ partnerships.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-1">
                Partnerships with 20+ Universities
              </h3>
              <p className="text-gray-700">
                Including University of Warsaw, University of Florence, and
                Technical University of Munich.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
