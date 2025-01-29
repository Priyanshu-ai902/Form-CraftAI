import React from "react";

const Hero = () => {
  return (
    <div className="pt-16 bg-gradient-to-b from-gray-900 to-black text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold">Create Smart Forms with AI</h1>
          <p className="mt-4 text-lg">
            Jotform AI lets you generate fully customizable forms in seconds.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-200">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Why Use Jotform AI?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <FeatureCard
              title="Instant Form Generation"
              description="Describe your form needs, and AI generates it instantly."
            />
            <FeatureCard
              title="Drag-and-Drop Editing"
              description="Easily customize fields, styles, and integrations."
            />
            <FeatureCard
              title="Seamless Integrations"
              description="Connect with popular tools like Google Sheets, Zapier, and more."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">What Users Say</h2>
          <div className="mt-10 space-y-6">
            <Testimonial
              text="Jotform AI saved me hours of work by generating a perfect form in seconds!"
              author="Sarah Thompson, Small Business Owner"
            />
            <Testimonial
              text="Super intuitive and easy to use. The AI-generated forms are a game-changer."
              author="James Carter, HR Manager"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-b from-gray-900 to-black">
        <h2 className="text-3xl font-bold text-white">Start Building Forms with AI</h2>
        <p className="mt-4 text-lg text-gray-300">
          Sign up today and experience the power of Jotform AI.
        </p>
        <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700">
          Sign Up for Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <p>&copy; {new Date().getFullYear()} Jotform AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 shadow-lg rounded-lg text-center text-white">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
  );
};

const Testimonial = ({ text, author }) => {
  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-6 shadow-lg rounded-lg text-white">
      <p className="italic">"{text}"</p>
      <p className="mt-4 font-semibold">{author}</p>
    </div>
  );
};

export default Hero;
