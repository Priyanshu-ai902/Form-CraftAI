"use client"

import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wand2, 
  Palette, 
  LayoutGrid, 
  BarChart3, 
  Download, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Play, 
  Github, 
  X,
  RefreshCw,
  Terminal
} from "lucide-react";

export default function Hero() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  
  // Showcase Tab State
  const [activeTab, setActiveTab] = useState("dashboard");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Simulated Demo Modal State
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullPrompt = "Create a modern feedback form for a trendy espresso cafe with rating, comments, and visit frequency options...";

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  // Demo Simulation Typing & State progression
  useEffect(() => {
    if (!demoOpen) {
      setDemoStep(0);
      setTypedText("");
      return;
    }

    if (demoStep === 0) {
      let idx = 0;
      const interval = setInterval(() => {
        setTypedText(fullPrompt.slice(0, idx + 1));
        idx++;
        if (idx >= fullPrompt.length) {
          clearInterval(interval);
          setTimeout(() => setDemoStep(1), 1000); // Progress to "generating" state
        }
      }, 40);
      return () => clearInterval(interval);
    } else if (demoStep === 1) {
      const timeout = setTimeout(() => {
        setDemoStep(2); // Progress to "finished form" view
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [demoOpen, demoStep]);

  // Motion variants for scrolling fadeups
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#030712] text-[#F8FAFC] overflow-x-hidden font-sans relative">
      
      {/* Background Radial Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* SECTION 2 - HERO */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Column */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-start text-left"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ✨ AI Powered Form Builder
            </div>

            {/* Large headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
              Create Professional <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-emerald-400 to-[#06B6D4]">
                Forms
              </span> With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#06B6D4]">AI</span> In <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#06B6D4]">Seconds</span>
            </h1>

            {/* Subheading */}
            <p className="text-[#94A3B8] text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-xl">
              Generate, customize, publish, and collect responses without writing a single line of code.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#030712] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200 text-center"
              >
                Get Started Free
              </button>
              
              <button 
                onClick={() => setDemoOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-white hover:bg-slate-850 active:scale-95 transition-all duration-200"
              >
                <Play size={18} className="text-[#06B6D4] fill-[#06B6D4]" />
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#94A3B8]">
              <span className="flex items-center gap-2 font-medium">
                <Check size={16} className="text-[#10B981]" /> No Coding
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Check size={16} className="text-[#10B981]" /> AI Generated
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Check size={16} className="text-[#10B981]" /> Instant Publishing
              </span>
            </div>
          </motion.div>

          {/* Hero Right Column: Screenshot browser mockup + floating badges */}
          <motion.div 
            className="lg:col-span-7 relative w-full flex justify-center items-center"
            initial="hidden"
            animate="visible"
            variants={scaleInVariants}
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/20 to-[#06B6D4]/20 rounded-2xl blur-2xl -z-10" />

            {/* Premium Browser Mockup */}
            <div className="w-full bg-[#070c19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
              {/* Browser bar */}
              <div className="bg-[#0b1329] border-b border-slate-850 px-4 py-3.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto w-2/3 max-w-sm bg-[#030712] border border-slate-800 rounded-lg py-1 px-3 text-center text-xs text-[#94A3B8] font-medium flex items-center justify-center gap-1.5 truncate">
                  <span className="text-[#10B981]">🔒</span> formcraft.ai/dashboard
                </div>
              </div>
              
              {/* Content area containing dashboard screenshot */}
              <div className="relative p-2 bg-[#030712]">
                <Image
                  src="/dashboard.png"
                  width={900}
                  height={560}
                  alt="Form-Craft Dashboard Screenshot"
                  className="rounded-lg object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Floating Card 1: AI Generated */}
            <motion.div 
              className="absolute -top-6 -left-6 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-4 shadow-xl hidden sm:flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Wand2 size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8]">Form Status</div>
                <div className="text-sm font-extrabold text-white">✨ AI Generated</div>
              </div>
            </motion.div>

            {/* Floating Card 2: Responses Collected */}
            <motion.div 
              className="absolute -bottom-6 -right-4 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-4 shadow-xl hidden sm:flex items-center gap-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8]">Total Submissions</div>
                <div className="text-sm font-extrabold text-white">12,854 collected</div>
              </div>
            </motion.div>

            {/* Floating Card 3: Theme Customizer */}
            <motion.div 
              className="absolute top-1/2 -right-8 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-3.5 shadow-xl hidden md:flex flex-col gap-2"
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-[#06B6D4]" />
                <span className="text-xs font-bold text-white">Active Theme</span>
              </div>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-full bg-emerald-500 border border-slate-700" />
                <div className="w-4 h-4 rounded-full bg-cyan-500 border border-slate-700" />
                <div className="w-4 h-4 rounded-full bg-indigo-500 border border-slate-700" />
                <div className="w-4 h-4 rounded-full bg-[#030712] border border-slate-700" />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>



      {/* SECTION 4 - FEATURES */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-extrabold text-[#10B981] tracking-widest mb-3">Enterprise Power</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Everything you need to craft high-conversion forms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <motion.div 
            className="p-8 rounded-2xl border border-slate-800 bg-[#070c19]/30 hover:border-emerald-500/30 hover:bg-[#070c19]/50 transition-all duration-300 group hover:-translate-y-1"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Wand2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Form Generation</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Simply describe what you need in plain text, and watch our AI design the complete form layout.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="p-8 rounded-2xl border border-slate-800 bg-[#070c19]/30 hover:border-[#06B6D4]/30 hover:bg-[#070c19]/50 transition-all duration-300 group hover:-translate-y-1"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Palette size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Themes</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Instantly match your style with pre-made, high-conversion color themes and typography rules.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="p-8 rounded-2xl border border-slate-800 bg-[#070c19]/30 hover:border-emerald-500/30 hover:bg-[#070c19]/50 transition-all duration-300 group hover:-translate-y-1"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <LayoutGrid size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Drag & Drop Builder</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Refine layouts with our lightning-fast interface. Add, reorder, or edit fields with drag-and-drop ease.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            className="p-8 rounded-2xl border border-slate-800 bg-[#070c19]/30 hover:border-[#06B6D4]/30 hover:bg-[#070c19]/50 transition-all duration-300 group hover:-translate-y-1"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Response Analytics</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Analyze data insights with beautiful charts, conversion metrics, and submission tracking.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div 
            className="p-8 rounded-2xl border border-slate-800 bg-[#070c19]/30 hover:border-emerald-500/30 hover:bg-[#070c19]/50 transition-all duration-300 group hover:-translate-y-1"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Export Responses</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Download collected submissions directly as clean Excel files or standard CSV formats.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div 
            className="p-8 rounded-2xl border border-slate-800 bg-[#070c19]/30 hover:border-[#06B6D4]/30 hover:bg-[#070c19]/50 transition-all duration-300 group hover:-translate-y-1"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Custom Branding</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Make it truly yours by custom styling colors, logos, inputs, and submit button behaviors.
            </p>
          </motion.div>

        </div>
      </section>



      {/* SECTION 6 - PRODUCT SHOWCASE TABS */}
      <section id="showcase" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-extrabold text-[#10B981] tracking-widest mb-3">Product Tour</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Everything You Need <br />To Build Better Forms
          </p>
        </div>

        {/* Custom tabs selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-[#0b1329] border border-slate-800 rounded-xl flex-wrap justify-center gap-1 sm:gap-0">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "dashboard" 
                  ? "bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#030712] shadow-md shadow-emerald-500/10" 
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "builder" 
                  ? "bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#030712] shadow-md shadow-emerald-500/10" 
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Builder
            </button>
            <button
              onClick={() => setActiveTab("responses")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "responses" 
                  ? "bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#030712] shadow-md shadow-emerald-500/10" 
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Responses
            </button>
          </div>
        </div>

        {/* Tabs Display Content */}
        <div className="relative rounded-2xl border border-slate-800 bg-[#070c19]/50 overflow-hidden shadow-2xl p-3">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/5 to-[#06B6D4]/5 pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && (
                <Image 
                  src="/dashboard.png" 
                  width={1200} 
                  height={750} 
                  alt="Dashboard View" 
                  className="rounded-xl w-full h-auto object-cover"
                />
              )}
              {activeTab === "builder" && (
                <Image 
                  src="/custom.png" 
                  width={1200} 
                  height={750} 
                  alt="Builder View" 
                  className="rounded-xl w-full h-auto object-cover"
                />
              )}
              {activeTab === "responses" && (
                <Image 
                  src="/response.png" 
                  width={1200} 
                  height={750} 
                  alt="Responses View" 
                  className="rounded-xl w-full h-auto object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>



      {/* SECTION 8 - BENEFITS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bullet List */}
          <motion.div 
            className="lg:col-span-6"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <h2 className="text-xs uppercase font-extrabold text-[#10B981] tracking-widest mb-3">Why Form-Craft</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">
              Create and Deploy Forms in Seconds, Not Hours
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Save Hours",
                "No Coding Needed",
                "AI Powered",
                "Custom Themes",
                "Unlimited Creativity",
                "Fast Publishing"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-slate-850 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-100 text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Statistics Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Stat Card 1 */}
            <motion.div 
              className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 to-[#070c19]/80 flex justify-between items-center group hover:border-[#10B981]/30 transition-all"
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <div>
                <h4 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Creation Speed</h4>
                <p className="text-slate-350 text-xs">Build customized grids instantly</p>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">10x Faster</span>
              </div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 to-[#070c19]/80 flex justify-between items-center group hover:border-[#06B6D4]/30 transition-all"
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <div>
                <h4 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Manual Effort</h4>
                <p className="text-slate-350 text-xs">Let the AI draft input fields & labels</p>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">95% Less Work</span>
              </div>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 to-[#070c19]/80 flex justify-between items-center group hover:border-[#10B981]/30 transition-all"
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <div>
                <h4 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Time to Live</h4>
                <p className="text-slate-350 text-xs">Publish to web or embed inside sites</p>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">Instant</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 9 - TESTIMONIALS */}
      <section className="py-24 bg-[#040918]/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold text-[#10B981] tracking-widest mb-3">Wall of Love</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Trusted by creators worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <motion.div 
              className="p-8 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group"
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <p className="text-slate-300 text-base italic leading-relaxed mb-8">
                "Form-Craft AI form generation has saved me days of manual mockup building. It produces high-quality layout results in seconds."
              </p>
              
              <div className="flex items-center gap-4">
                {/* Custom Gradient Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-green-300 flex items-center justify-center font-bold text-slate-950 uppercase select-none">
                  SJ
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Sarah Jenkins</h4>
                  <p className="text-xs text-[#94A3B8]">Product Designer at Linear</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              className="p-8 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 group"
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <p className="text-slate-300 text-base italic leading-relaxed mb-8">
                "The theme customizer is incredibly fluid. Being able to go from prompt to live published form in less than a minute is a complete game changer."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-300 flex items-center justify-center font-bold text-slate-950 uppercase select-none">
                  AR
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Alex Rivera</h4>
                  <p className="text-xs text-[#94A3B8]">Founder of SupaLaunch</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              className="p-8 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group"
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <p className="text-slate-300 text-base italic leading-relaxed mb-8">
                "Analytics dashboard provides clean, actionable data. Exporting submissions directly to Excel works perfectly every single time."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-300 flex items-center justify-center font-bold text-slate-950 uppercase select-none">
                  ER
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Elena Rostova</h4>
                  <p className="text-xs text-[#94A3B8]">Growth Specialist at Vercel</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 10 - FAQ ACCORDION */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6 scroll-mt-24">
        
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase font-extrabold text-[#06B6D4] tracking-widest mb-3">Support FAQ</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does AI form generation work?",
              a: "Simply type a prompt describing the form you want (e.g., 'a feedback form for my bakery'). Our AI analyzes the fields needed, generates clear labels, configures matching field validation types, and drafts a beautifully designed layout instantly."
            },
            {
              q: "Can I customize generated forms?",
              a: "Absolutely! The AI-generated draft is fully customizable. Using our designer canvas, you can add, rearrange, or delete input blocks, tweak styles, fonts, borders, and choose from multiple color themes."
            },
            {
              q: "Can I export responses?",
              a: "Yes, you can. You can view all submissions in the responses dashboard and export them directly to Microsoft Excel (.xlsx) files or standard CSVs for external reporting and analysis."
            },
            {
              q: "Can I use custom themes?",
              a: "Yes, Form-Craft has built-in custom branding tools. Choose from sleek predefined dark & light designs or configure custom color variables to match your personal brand."
            },
            {
              q: "Is there a free plan?",
              a: "Yes, we offer a robust free plan. It includes full access to AI form generation, core theme styles, and response collections so you can get started right away."
            }
          ].map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="border border-slate-800 bg-[#070c19]/30 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-100 hover:text-[#10B981] transition-colors duration-200"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[#06B6D4] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-[#94A3B8] text-sm leading-relaxed border-t border-slate-900/60 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 11 - FINAL CTA */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-to-tr from-[#06b6d4]/10 via-slate-950 to-[#10b981]/10 border border-slate-800 p-12 md:p-16 text-center overflow-hidden shadow-2xl">
          {/* Light glowing halos inside card */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />

          <motion.div 
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="relative z-10"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
              Start Building Forms Smarter
            </h2>
            <p className="text-[#94A3B8] text-lg sm:text-xl font-medium leading-relaxed max-w-xl mx-auto mb-10">
              Create professional forms in minutes with AI-powered generation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#030712] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200 text-center w-full sm:w-auto"
              >
                Get Started Free
              </button>
              
              <button 
                onClick={() => setDemoOpen(true)}
                className="px-8 py-4 rounded-xl font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-white hover:bg-slate-850 active:scale-95 transition-all duration-200 w-full sm:w-auto"
              >
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 12 - FOOTER */}
      <footer className="border-t border-slate-900 bg-[#02050c] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/10 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    width={24}
                    height={24}
                    alt="logo"
                    className="rounded bg-[#030712] p-0.5"
                  />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Form-Craft
                </span>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 max-w-xs">
                Build smart forms with AI in seconds. No code required.
              </p>
            </div>

            {/* Col 1 */}
            <div>
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Features</a></li>
                <li><a href="#showcase" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Templates</a></li>
                <li><a href="#faq" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><span className="text-slate-500 cursor-not-allowed text-sm">Documentation</span></li>
                <li><span className="text-slate-500 cursor-not-allowed text-sm">Support</span></li>
                <li><span className="text-slate-500 cursor-not-allowed text-sm">Blog</span></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Company</h4>
              <ul className="space-y-3">
                <li><span className="text-slate-500 cursor-not-allowed text-sm">About</span></li>
                <li><span className="text-slate-500 cursor-not-allowed text-sm">Contact</span></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-[#94A3B8] text-sm font-medium">
              &copy; {new Date().getFullYear()} Form-Craft.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/Priyanshu-ai902/Form-CraftAI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <Github size={16} />
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* WATCH DEMO SIMULATION MODAL */}
      <AnimatePresence>
        {demoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDemoOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#070c19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              {/* Modal header */}
              <div className="bg-[#0b1329] border-b border-slate-850 px-4 py-3.5 flex items-center justify-between">
                <div className="flex gap-1.5 items-center">
                  <Terminal size={14} className="text-emerald-400" />
                  <span className="text-xs font-bold text-slate-300">Live AI Simulator</span>
                </div>
                <button 
                  onClick={() => setDemoOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Simulation view */}
              <div className="p-6 min-h-[360px] flex flex-col justify-between bg-[#030712]">
                
                {demoStep === 0 && (
                  <div className="flex flex-col gap-6">
                    <div className="text-xs font-semibold text-slate-400 tracking-wider">PROMPT INPUT SIMULATION</div>
                    <div className="p-5 rounded-xl border border-slate-800 bg-[#070c19]/60 font-mono text-sm text-slate-200 min-h-[90px] relative shadow-inner">
                      {typedText}
                      <span className="w-2 h-4 ml-0.5 bg-[#10B981] inline-block animate-pulse" />
                    </div>
                    <div className="flex justify-end">
                      <button className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-slate-100 flex items-center gap-2 pointer-events-none opacity-50">
                        <RefreshCw size={14} className="animate-spin" />
                        Generating Form...
                      </button>
                    </div>
                  </div>
                )}

                {demoStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="text-xs font-semibold text-slate-400 tracking-wider">AI COMPILING AGENT</div>
                    <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-400 space-y-2.5 max-h-[220px] overflow-y-auto">
                      <div className="flex gap-2"><span className="text-cyan-400">[INFO]</span> Analyzing natural language instruction...</div>
                      <div className="flex gap-2"><span className="text-emerald-400">[SUCCESS]</span> Context match: "Cafe Espresso Feedback Form"</div>
                      <div className="flex gap-2"><span className="text-cyan-400">[INFO]</span> Resolving fields: Full Name (text), Email (email), Rating (number), Comments (textarea), Visit Frequency (radio)</div>
                      <div className="flex gap-2"><span className="text-cyan-400">[INFO]</span> Building layout structure & responsive grids...</div>
                      <div className="flex gap-2"><span className="text-emerald-400">[SUCCESS]</span> Applied theme: "Emerald Oasis Gradient"</div>
                      <div className="flex gap-2 items-center text-white"><RefreshCw size={12} className="animate-spin text-emerald-400" /> Compiling live visual node preview...</div>
                    </div>
                  </div>
                )}

                {demoStep === 2 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="text-xs font-semibold text-[#10B981] tracking-wider flex items-center gap-1.5">
                      <span>✓</span> LIVE FORM GENERATED
                    </div>

                    {/* Simulated Generated Form Preview */}
                    <div className="p-6 rounded-xl border border-emerald-500/20 bg-slate-950/80 max-w-md mx-auto w-full space-y-4 shadow-xl">
                      <div className="text-center pb-2">
                        <h4 className="text-lg font-bold text-white">Espresso Cafe Feedback</h4>
                        <p className="text-xs text-[#94A3B8]">Let us know how your coffee was!</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-350 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Jane Doe" 
                          disabled
                          className="w-full bg-[#030712] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-350 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="jane@example.com" 
                          disabled
                          className="w-full bg-[#030712] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-350 mb-1">How would you rate your visit?</label>
                        <div className="flex gap-1.5 text-emerald-400">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-slate-700">★</span>
                        </div>
                      </div>

                      <button 
                        disabled
                        className="w-full py-2.5 rounded-lg text-xs font-bold bg-[#10B981] text-[#030712] hover:bg-emerald-400 transition-colors"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Bottom CTA within modal */}
                <div className="mt-8 pt-4 border-t border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xs font-medium text-slate-450">
                    Form created entirely by AI prompt interpreter.
                  </div>
                  <button
                    onClick={() => {
                      setDemoOpen(false);
                      handleGetStarted();
                    }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#10B981] text-[#030712] hover:bg-emerald-400 transition-colors"
                  >
                    Try It Free <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
