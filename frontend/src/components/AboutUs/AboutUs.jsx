import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">About Us</h1>
        
        {/* Mission Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 mt-4">
            At the Faculty of [Faculty Name], our mission is to offer high-quality academic programs that equip students with the skills, knowledge, and experiences necessary to succeed in their professional lives.
          </p>
        </section>

        {/* Academic Excellence Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Academic Excellence</h2>
          <p className="text-lg text-gray-600 mt-4">
            Our faculty offers a wide range of programs across various disciplines, designed to provide students with a comprehensive understanding of their chosen field. We focus on both theoretical knowledge and practical skills.
          </p>
        </section>

        {/* Research and Innovation Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Research and Innovation</h2>
          <p className="text-lg text-gray-600 mt-4">
            We foster a culture of research and innovation at the Faculty of [Faculty Name]. Our faculty members and students are involved in cutting-edge research across multiple fields to contribute to advancements in science and society.
          </p>
        </section>

        {/* Student Experience Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Student Experience</h2>
          <p className="text-lg text-gray-600 mt-4">
            The student experience at the Faculty of [Faculty Name] is at the heart of everything we do. We offer a range of extracurricular activities, student organizations, and support services to ensure that students grow personally and professionally.
          </p>
        </section>

        {/* Faculty and Staff Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Faculty and Staff</h2>
          <p className="text-lg text-gray-600 mt-4">
            Our faculty and staff are the foundation of our success. We believe in fostering a supportive and collaborative atmosphere where every member of the faculty plays a key role in shaping the future of our students.
          </p>
        </section>

        {/* Future Outlook Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Future Outlook</h2>
          <p className="text-lg text-gray-600 mt-4">
            Looking ahead, the Faculty of [Faculty Name] continues to evolve and adapt to the ever-changing educational landscape. We are committed to expanding our academic offerings and strengthening our research capabilities.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
