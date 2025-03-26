import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);

    // Reset after a few seconds
    setTimeout(() => {
      setMessageSent(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center p-6 mt-24">
      {messageSent ? (
        // Success Message Page
        <div className="card w-full max-w-4xl mx-auto shadow-xl bg-white p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-green-600">Thank You!</h2>
          <p className="mt-4 text-lg">Your message has been sent successfully. We will get back to you soon.</p>
          <button className="btn btn-primary mt-6" onClick={() => setMessageSent(false)}>
            Go Back to Contact Page
          </button>
        </div>
      ) : (
        // Contact Form Page
        <div className="card w-full max-w-4xl mx-auto shadow-xl bg-white p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-primary">Contact Us</h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
            <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
            <textarea placeholder="Your Message" className="textarea textarea-bordered w-full" required></textarea>
            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      )}

      {/* Contact Info */}
      <div className="mt-8 text-center space-y-4">
        <p className="flex items-center gap-2 justify-center"><FaPhone /> +1 234 567 890</p>
        <p className="flex items-center gap-2 justify-center"><FaEnvelope /> contact@bookstore.com</p>
        <p className="flex items-center gap-2 justify-center"><FaMapMarkerAlt /> 123 Book St, Library City</p>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 flex gap-4 text-2xl">
        <a href="#" className="text-blue-600"><FaFacebook /></a>
        <a href="#" className="text-blue-400"><FaTwitter /></a>
        <a href="#" className="text-pink-600"><FaInstagram /></a>
      </div>
    </div>
  );
};

export default Contact;
