"use client"

import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@mui/joy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";



const slides = [
  { type: "image-text", src: "color.png", alt: "Slide 1", content: "Welcome to Our Website!" },
  { type: "image-text", src: "form.png", alt: "Slide 2", content: "Discover Amazing Features" },
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


      <section className="relative w-full max-w-7xl mx-auto mt-8 mb-8 h-full">
        <div className="relative w-full h-[600px] bg-gray-900 rounded-lg shadow-lg flex items-center justify-center">
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl p-4">
            {slides[current].content}
          </div>
        </div>

        <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
          ◀
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
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
