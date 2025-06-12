import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../Header";
import Footer from "../Footer";

const ContactUs = ({ onMessageAdded }) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" ose "error"
  const [loading, setLoading] = useState(false);

  // Skema e validimit me Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string(),
    reason: Yup.string(),
    messageContent: Yup.string().required("Message is required"),
  });

  // Funksioni për dërgimin e mesazhit
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setResponseMessage("");
    setMessageType("");

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok && data.message) {
        setResponseMessage(data.message);
        setMessageType("success");
        onMessageAdded?.();
        resetForm();
      } else {
        setResponseMessage(
          data.error || "There was an error sending your message."
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("API error:", error);
      setResponseMessage("There was an error sending your message.");
      setMessageType("error");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="bg-gray-50 flex items-center justify-center py-12 min-h-screen">
        <div className="w-full max-w-lg">
          <section className="bg-blue-100 text-blue-800 p-6 rounded-t-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Need Assistance? FMS is Here to Help!
            </h3>
            <p>
              Fill out the form below to send us your questions, feedback, or
              support requests regarding the Faculty Management System (FMS).
              We'll respond as quickly as possible.
            </p>
          </section>

          <div className="bg-white p-8 rounded-b-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
              Contact Us
            </h2>

            {responseMessage && (
              <div
                className={`text-sm mt-2 text-center ${
                  messageType === "error" ? "text-red-500" : "text-green-500"
                }`}
              >
                {responseMessage}
              </div>
            )}

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                reason: "",
                messageContent: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mt-6">
                  <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="reason"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reason for Contact
                    </label>
                    <Field
                      as="select"
                      id="reason"
                      name="reason"
                      className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a reason</option>
                      <option value="Support">Support</option>
                      <option value="Feedback">Feedback</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </Field>
                    <ErrorMessage
                      name="reason"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="messageContent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="messageContent"
                      name="messageContent"
                      placeholder="Enter your message"
                      className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="messageContent"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
