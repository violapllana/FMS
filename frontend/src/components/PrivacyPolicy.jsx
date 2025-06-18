import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy outlines how the Faculty Management System
          collects, uses, stores, and protects user data. Your privacy is
          important to us.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect personal information such as your name, email address,
          faculty ID, and login credentials. Additional data may be collected
          based on your interactions with the system.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Information
        </h2>
        <p className="mb-4">
          The information we collect is used to manage faculty operations,
          provide access to resources, generate reports, and enhance system
          security and user experience.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We use security measures to protect your data, including encryption,
          access controls, and regular system audits. Your data will not be
          shared with third parties without your consent.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. User Rights</h2>
        <p className="mb-4">
          Users have the right to access, correct, or delete their personal
          data. You may contact the system administrator for data requests.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Changes will be
          reflected on this page with the revised date.
        </p>

        <p className="text-sm text-gray-500 mt-6">Last updated: June 2025</p>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
