// import React from 'react';
// import Header from '../Header';
// import Footer from '../Footer';
// import Student from '../../assets/images/students.png';

// const AboutUs = () => {
//   return (
//     <>
//       <Header />
      
//       {/* Hero Section with background image */}
//       <div
//         className="relative bg-cover bg-center h-[450px] flex items-center justify-center"
      
//          style={{ backgroundImage: `url(${Student})` }}

      
//       >
//         <div className="text-center text-white z-10 px-4 max-w-3xl">
//           <h1 className="text-5xl font-extrabold mb-2">About Us</h1>
//           <p className="text-xl font-light">For explorers everywhere.</p>
//         </div>
//         {/* Overlay for darkening background */}
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//       </div>

//       {/* Main Content Section */}
//       <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto">
//           We believe that travel is for everyone. It helps us learn about ourselves and the world around us.
//         </p>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default AboutUs;
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Student from '../../assets/images/students.png';
import { Link } from 'react-router-dom';


const AboutUs = () => {
  return (
    <>
      <Header />

      {/* Hero Section (unchanged) */}
      <div
        className="relative bg-cover bg-center h-[450px] flex items-center justify-center"
        style={{ backgroundImage: `url(${Student})` }}
      >
        <div className="text-center text-white z-10 px-4 max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-2">About Us</h1>
          <p className="text-xl font-light">For students, for the future.</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Info Cards Section */}
      <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: Our History */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-3 text-blue-800">Our History</h3>
            <p className="text-gray-700 text-justify">
              Founded in 1995, our faculty has grown into a leading institution in the region, empowering thousands of students with knowledge and critical thinking skills for over two decades.
            </p>
          </div>

          {/* Card 2: Academic Conferences */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-3 text-blue-800">Academic Conferences</h3>
            <p className="text-gray-700 text-justify">
              We’ve hosted over 50 national and international conferences focused on digital transformation, education, innovation, and sustainability, with speakers from Europe and the USA.
            </p>
          </div>

          {/* Card 3: Distinguished Visitors */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-3 text-blue-800">Distinguished Visitors</h3>
            <p className="text-gray-700 text-justify">
              Our faculty has been honored to welcome ambassadors, university rectors, international researchers, and tech entrepreneurs who share knowledge and inspire our students.
            </p>
          </div>

          {/* Card 4: International Programs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-3 text-blue-800">International Programs</h3>
            <p className="text-gray-700 text-justify">
              Through Erasmus+ and other partnerships, our students have studied in countries like France, Germany, Poland, and Italy, gaining global perspectives and professional skills.
            </p>
          </div>

          {/* Card 5: Innovation & Research */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-3 text-blue-800">Innovation & Research</h3>
            <p className="text-gray-700 text-justify">
              We support groundbreaking research in computer science, health tech, and social sciences. Our students and faculty collaborate on projects that solve real-world problems.
            </p>
          </div>

          {/* Card 6: Student Life */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-3 text-blue-800">Student Life</h3>
            <p className="text-gray-700 text-justify">
              From tech clubs and hackathons to volunteering and cultural exchange, our students enjoy a vibrant campus life that fosters friendships, growth, and leadership.
            </p>
          </div>
        </div>
      </div>

  <div className="bg-blue-800 text-white py-12 px-6 text-center">
  <h2 className="text-3xl font-semibold mb-4">Discover Your Potential with Us</h2>
  <p className="max-w-2xl mx-auto mb-6 text-lg">
    Join a community where learning meets opportunity. Whether you're looking to explore academic excellence, research innovation, or global engagement—our faculty is your launchpad.
  </p>
  <Link
    to="/programs"
    className="inline-block bg-white text-blue-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition"
  >
    Explore Programs
  </Link>
</div>


      <Footer />
    </>
  );
};

export default AboutUs;
