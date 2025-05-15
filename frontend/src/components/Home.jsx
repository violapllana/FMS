// import React from "react";
// import { Link } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const Home = () => {
//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 text-gray-800">
//         {/* Hero Section */}
//         <section className="text-center py-24 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md">
//           <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
//             Welcome to the Online Faculty Platform
//           </h1>
//           <p className="text-xl text-white max-w-2xl mx-auto opacity-90">
//             Access academic information, class schedules, staff profiles, and more.
//           </p>
//           <Link to="/departments">
//             <button className="mt-10 bg-white text-indigo-800 font-semibold px-8 py-3 rounded-full shadow hover:bg-indigo-100 transition duration-300">
//               Explore Departments
//             </button>
//           </Link>
//         </section>

//         {/* Highlight Programs */}
//         <section className="py-20 px-4 bg-white text-center">
//           <h2 className="text-4xl font-bold text-indigo-800 mb-12">Popular Programs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {["Computer Science", "Design & Arts", "Business Administration"].map((program, index) => (
//               <div key={index} className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg transition">
//                 <h3 className="text-xl font-semibold text-indigo-700 mb-2">{program}</h3>
//                 <p className="text-gray-600">Discover more about {program} and start building your future today.</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Student Clubs */}
//         <section className="py-20 px-4 bg-yellow-50 text-center">
//           <h2 className="text-4xl font-bold text-yellow-700 mb-12">Join Our Student Clubs</h2>
//           <p className="text-lg max-w-3xl mx-auto text-yellow-800 mb-8">
//             Get involved in a variety of clubs from coding to design to sports. Enhance your skills and make lifelong friends.
//           </p>
       
//            <a 
//   href="   https://blog.collegevine.com/50-clubs-and-activities-9th-graders-can-join" 
//   target="_blank" 
//   rel="noopener noreferrer"
// >
//   <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
//  Join Our 
//   </button>
// </a>
//         </section>

//         {/* Internship Opportunities */}
//         <section className="py-20 px-4 bg-gray-100 text-center">
//           <h2 className="text-4xl font-bold text-gray-800 mb-12">Internship Opportunities</h2>
//           <p className="text-lg max-w-3xl mx-auto text-gray-700 mb-8">
//             Collaborate with top companies and gain real-world experience while studying.
//           </p>
//        <a 
//   href="https://www.unicef.org/careers/internships" 
//   target="_blank" 
//   rel="noopener noreferrer"
// >
//   <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
//     Browse Internships
//   </button>
// </a>

//         </section>

//         {/* Student Achievements */}
//         <section className="py-20 px-4 bg-purple-100 text-center">
//           <h2 className="text-4xl font-bold text-purple-800 mb-12">Student Achievements</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//             {[
//               {
//                 title: "🏆 Hackathon Winners",
//                 desc: "Our students secured 1st place in the national hackathon 2024."
//               },
//               {
//                 title: "🎨 Art Showcase",
//                 desc: "Multimedia students exhibited their work in an international expo."
//               }
//             ].map((item, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-md text-left">
//                 <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
//                 <p className="text-gray-700">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="py-20 bg-blue-600 text-white text-center">
//           <h2 className="text-3xl font-semibold mb-6">Ready to Begin Your Journey?</h2>
//         <p className="text-lg mb-8">Apply today and step into your future with confidence.
// <br />
//           Apply in our offices or Cotact Us for questions!
//         </p>
      

//         </section>

//         {/* Contact Section */}
//         <section className="py-20 bg-indigo-900 text-white text-center">
//           <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
//           <p className="mb-4">Have questions? We're here to help.</p>
//           <div className="text-lg space-y-2">
//             <p>Email: <a href="mailto:info@faculty.edu" className="underline">info@faculty.edu</a></p>
//             <p>Phone: +383 44 456 789</p>
//             <p>Address: Rruga e Fakultetit, Prishtine, Kosove</p>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Home;
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroImage from '../assets/images/students.png'; // Adjust the path if your assets folder is inside src

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
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Faculty</h1>
          <p className="text-xl font-light">Empowering future leaders through knowledge, innovation, and collaboration.</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Experienced Faculty',
                desc: 'Our professors bring decades of academic and real-world experience to the classroom.',
              },
              {
                title: 'Research & Innovation',
                desc: 'We encourage scientific research, student projects, and international conferences.',
              },
              {
                title: 'Global Exposure',
                desc: 'Students can participate in exchange programs and internships abroad.',
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
  <h2 className="text-3xl font-bold text-center mb-10">Our Academic Programs</h2>

  <div className="grid gap-6 md:grid-cols-3">
    {[
      'Computer Science & IT',
      'Business Administration',
      'Electrical Engineering',
      'Law & Public Policy',
      'Nursing & Health Sciences',
      'Architecture & Design',
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
    <p className="text-sm text-gray-500 mt-2">Explore each program in depth and find what suits you best.</p>
  </div>
</div>


      {/* Events & Conferences Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Events & Conferences</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">International Tech Conference 2024</h3>
              <p className="text-gray-600">
                Hosted at our main campus, with speakers from MIT, ETH Zurich, and Oxford. Focused on AI, cybersecurity, and sustainable innovation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Student Research Symposium</h3>
              <p className="text-gray-600">
                Annual event showcasing top student projects. Participants present to a panel of faculty and industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* International Collaborations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">International Collaborations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-1">Erasmus+ Exchange Program</h3>
              <p className="text-gray-700">Our students have studied in Italy, France, Poland, and Germany through Erasmus+ partnerships.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-1">Partnerships with 20+ Universities</h3>
              <p className="text-gray-700">Including University of Warsaw, University of Florence, and Technical University of Munich.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
