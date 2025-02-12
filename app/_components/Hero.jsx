"use client"

import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@mui/joy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Apple, Play, Store } from "lucide-react";



const slides = [
  { type: "image-text", src: "photo.png.png", alt: "Slide 1", content: "Drag & Drop Form Builder :- Easily create custom forms by dragging and dropping fields—no coding needed! Customize inputs, validations, and layouts in real time" },
  { type: "image-text", src: "photo2.png.png", alt: "Slide 2", content: "All form responses are saved in an Excel file for easy access and organization. Users can download their data anytime for analysis, record-keeping, or integration with other tools. Perfect for surveys, registrations, and feedback collection!" },
  { type: "image-text", src: "photo3.png.png", alt: "Slide 3", content: "See your form in action as you build it! Our live preview feature updates in real-time, letting you visualize changes instantly. Customize fields, layouts, and styles effortlessly before publishing. " },
  { type: "image-text", src: "photo4.png.png", alt: "Slide 3", content: "Effortlessly create smart forms with AI-generated layouts tailored to your needs. Customize form colors, backgrounds, and styles to match your brand. Get a live preview as you design, ensuring a seamless and visually appealing experience. " },
];
function Hero() {

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { text: "Jotform AI saved me hours of work by generating a perfect form in seconds!", author: "Sarah Thompson, Small Business Owner" },
    { text: "Super intuitive and easy to use. The AI-generated forms are a game-changer.", author: "James Carter, HR Manager" },
    { text: "I was amazed at how fast I could create a custom form with AI assistance!", author: "Emily Wilson, Freelancer" },
    { text: "This tool simplifies form building like never before. Highly recommended!", author: "Michael Brown, Project Manager" },
    { text: "AI-powered form creation is the future, and Jotform AI is leading the way!", author: "Sophia Lee, Marketing Specialist" }
  ];

  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };


  return (
    <div className="pt-5 bg-gradient-to-b from-gray-900 via-slate-950 to-black text-gray-100">

      <section className="py-44 text-center">
        <div className="flex justify-center items-center pt-0">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_CYM_Qpcl3zLppLDyqBFm2n7wMFBbCQcJQ&s"
            width={120}
            height={120}
            alt="logo"
            className="rounded-full animate-rotateStep"
          />
        </div>
        <div className="max-w-6xl mx-auto px-7 pt-16">

          <h1 className="text-6xl font-semibold bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent">
            Form-Craft&nbsp;
            <span className="bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent">
              AI Form Generator
            </span>
          </h1>


          <p className="mt-4 text-xl ">
            The way you create forms is about to change. Form-Craft AI form builder can design and customize your form, cutting out manual tasks and streamlining your workflows.
          </p>

          <div className="flex justify-center items-center gap-7 pt-4">
            <Button className="!text-xl !bg-teal-600" onClick={handleGetStarted}>Get Started</Button>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-10  ">
            <Button className="!text-xl !bg-slate-700 !text-white !h-14 !rounded-full">
              Registration Form
            </Button>
            <Button className="!text-xl !bg-slate-700 !rounded-full">Feedback Form</Button>
            <Button className="!text-xl !bg-slate-700 !rounded-full">Appointment Form</Button>
            <Button className="!text-xl !bg-slate-700 !rounded-full">Job Application Form</Button>
          </div>
        </div>
      </section>




      <section className="py-24 bg-black">
        <h2 className="text-5xl font-bold text-center">How the&nbsp;

          <span className="bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
            Form-Craft AI Form Generator&nbsp;
          </span>
          works
        </h2>

        <div className="flex justify-center gap-10 p-12">
          {/* Card 1 */}
          <div className=" p-6 rounded-xl text-white w-1/3 shadow-lg">
            <img src="create.png" alt="img" className="w-[550px] h-[350px]   rounded-lg" />
            <h1 className="mt-6 text-4xl font-semibold text-purple-400">Write a Prompt</h1>
            <p className="mt-2 text-xl text-purple-200">
              Ask AI Form Generator to create a form for you. Begin the form-building process with one simple inquiry.
            </p>
          </div>

          <div className=" p-6 rounded-xl text-white w-1/3 shadow-lg">
            <img src="form.png" alt="img" className="w-[550px] h-[350px]   rounded-lg" />
            <h1 className="mt-6 text-4xl font-semibold text-pink-400">Customize the Form</h1>
            <p className="mt-2 text-xl text-pink-100">
              Modify fields, layout, and branding to match your needs and personalize your form effortlessly.
            </p>
          </div>

          <div className="p-6 rounded-xl text-white w-1/3 shadow-lg">
            <img src="color.png" alt="img" className="w-[550px] h-[350px]  rounded-lg" />
            <h1 className="mt-6 text-4xl font-semibold text-blue-400">Theme & Color</h1>
            <p className="mt-2 text-xl text-blue-200">
              Personalize your form with custom themes, colors, and styles to match your brand.
            </p>
          </div>
        </div>


      </section>


      <section className="relative w-full max-w-7xl mx-auto mt-12 mb-12 h-full px-6">
        <div className="relative w-full h-[600px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-cover opacity-80 transition-all duration-500"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center  p-8 text-center">
            <div className="bg-black/70 text-purple-200 text-3xl font-semibold px-6 py-4 rounded-lg shadow-md">
              {slides[current].content}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white p-3 rounded-full transition-all duration-300"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white p-3 rounded-full transition-all duration-300"
        >
          ▶
        </button>
      </section>



      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
        <div className="mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">What Users Say</h2>
          <div className="mt-10 overflow-hidden">
            <motion.div
              className="flex space-x-6 w-max"
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ ease: "linear", duration: 10, repeat: Infinity }}
            >

              {[...testimonials, ...testimonials].map((item, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-xl w-80 text-white shadow-lg">
                  <p className="text-lg">"{item.text}"</p>
                  <h3 className="mt-4 font-semibold text-blue-300">{item.author}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-gradient-to-b from-gray-900 to-black">
        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-gray-300">
          Find answers to common questions about our AI-powered form builder.
        </p>

        <div className="mt-8 max-w-3xl mx-auto text-left space-y-6">
          {/* FAQ 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">How does the AI Form Builder work?</h3>
            <p className="mt-2 text-gray-300">
              Our AI analyzes your prompt and automatically generates a fully functional form tailored to your needs.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">Can I customize the generated form?</h3>
            <p className="mt-2 text-gray-300">
              Yes! You can modify fields, themes, colors, and branding to match your style.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">Is the AI Form Builder free to use?</h3>
            <p className="mt-2 text-gray-300">
              We offer a free plan with essential features, and premium plans for advanced customization and integrations.
            </p>
          </div>
        </div>
      </section>


      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 - Jotform */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Form-Craft</h3>
            <ul className="space-y-3 text-base">
              <li>Signup</li>
              <li>Create a Form</li>
              <li>My Forms</li>
              <li>Pricing</li>
              <li>From-Craft Enterprise</li>
              <li>Examples ⌄</li>
              <li>Products ⌄</li>
            </ul>
          </div>

          {/* Column 2 - Marketplace */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Marketplace</h3>
            <ul className="space-y-3 text-base">
              <li>Templates ⌄</li>
              <li>Form Themes</li>
              <li>Form Widgets</li>
              <li>Integrations ⌄</li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-base">
              <li>Contact Us</li>
              <li>User Guide</li>
              <li>Help ⌄</li>
              <li>Jotform Academy</li>
              <li>Webinars</li>
              <li>Professional Services</li>
              <li>Report Abuse</li>
            </ul>
          </div>

          {/* Column 4 - Company & Apps */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-base mb-6">
              <li>About Us</li>
              <li>Media Kit</li>
              <li>In the News</li>
              <li>Newsletters</li>
              <li>Partnerships ⌄</li>
              <li>Blog</li>
            </ul>
            <h3 className="text-white font-bold text-lg mb-4">Apps</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Play className="w-8 h-8 text-white" />
                <span className="text-white text-lg">Get it on Google Play</span>
              </div>
              <div className="flex items-center space-x-2">
                <Apple className="w-8 h-8 text-white" />
                <span className="text-white text-lg">Download on the App Store</span>
              </div>
              <div className="flex items-center space-x-2">
                <Store className="w-8 h-8 text-white" />
                <span className="text-white text-lg">Available on AppExchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-10 text-gray-500 text-lg">
          <p>&copy; {new Date().getFullYear()} Form-Craft. All rights reserved.</p>
        </div>
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
