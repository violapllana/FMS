import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LibraryMain from '../../assets/images/library.png';
import StudentsStudying from '../../assets/images/LibraryStudent.png';
import StudentsWithProfessors from '../../assets/images/hero.png';

const Library = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{ backgroundImage: `url(${LibraryMain})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="z-10 text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-2">Faculty Library</h1>
          <p className="text-lg font-light">A quiet space to learn, explore, and grow</p>
        </div>
      </div>

      {/* Opening Hours */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Library Opening Hours</h2>
          <p className="text-lg text-gray-700">
            The library is open <strong>Monday to Friday</strong> from <strong>08:00 AM to 08:00 PM</strong>.
            On <strong>Saturday</strong>, it is open from <strong>09:00 AM to 02:00 PM</strong>.
          </p>
        </div>
      </section>

      {/* Free Access & Description */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Free Access for Students</h3>
            <p className="text-gray-700 text-lg mb-4">
              All enrolled students have full, free access to the library facilities. Whether you're studying Computer Science,
              Law, Business, or any other faculty – the library offers a wide range of materials to support your learning.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Thousands of books across all academic directions</li>
              <li>Digital materials and research archives</li>
              <li>Dedicated study zones and reading halls</li>
              <li>Friendly staff to assist with research</li>
            </ul>
          </div>
          <img
            src={StudentsStudying}
            alt="Students reading"
            className="rounded-xl shadow-md w-full object-cover h-72"
          />
        </div>
      </section>

      {/* Gallery: Students and Professors */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">Inside the Library</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <img
              src={StudentsStudying}
              alt="Students using computers"
              className="rounded-xl shadow-md w-full h-72 object-cover"
            />
            <img
              src={StudentsWithProfessors}
              alt="Discussion with professors"
              className="rounded-xl shadow-md w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Book Categories by Faculty */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Book Collections by Faculty</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Computer Science', desc: 'Books on algorithms, software, AI, cybersecurity.' },
              { title: 'Business & Economics', desc: 'Finance, entrepreneurship, marketing, statistics.' },
              { title: 'Law', desc: 'Civil, criminal, international and constitutional law volumes.' },
              { title: 'Health & Nursing', desc: 'Medical textbooks, anatomy, public health materials.' },
              { title: 'Engineering', desc: 'Electric circuits, mechanics, electronics, robotics.' },
              { title: 'Architecture', desc: 'Design principles, planning, CAD resources, sustainability.' },
            ].map((item, i) => (
              <div key={i} className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <h4 className="text-lg font-semibold text-indigo-600 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Library;
