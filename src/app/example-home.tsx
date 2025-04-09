"use client";

import React from 'react';
import Link from 'next/link';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SimpleCard from './components/SimpleCard';

export default function ExampleHome() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation bar */}
      <NavBar showTitle={true} />

      <div className="relative">
        {/* 蓝色背景区域 - 只占页面上半部分 */}
        <div className="absolute top-0 left-0 right-0 h-[65vh] bg-[#e3edf3] z-0"></div>
        
        {/* Hero Section */}
        <section className="relative z-10 pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto py-8">
            <img 
              src="/logo-removebg.png" 
              alt="caKnak" 
              className="w-1/2 mx-auto mb-6 opacity-70" 
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-[#374b54]">Welcome to caKnak</h1>
            <p className="text-xl text-gray-600 text-center mb-10">
              Your trusted resource for digital safety, security, and citizenship education.
            </p>
          </div>
        </section>
      </div>

      {/* Digital Security Resources Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-2xl font-bold text-center text-[#374b54] mb-12">Digital Security Resources</h2>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SimpleCard 
            title="Check Email Security"
            description="Verify if your email has been involved in any data breaches"
            imageSrc="/email-security.png"
            linkHref="/check-email-security"
            bgColor="#e3edf3"
          />
          
          <SimpleCard 
            title="Detect Phishing"
            description="Learn how to identify and avoid phishing attempts"
            imageSrc="/phishing-detection.png"
            linkHref="/phishing-detection"
            bgColor="#e3edf3"
          />
          
          <SimpleCard 
            title="Security Resources"
            description="Access educational materials about digital security"
            imageSrc="/security-resources.png"
            linkHref="/digital-security-risks"
            bgColor="#e3edf3"
          />
          
          <SimpleCard 
            title="Digital Citizenship Quiz"
            description="Test your knowledge about digital safety"
            imageSrc="/quiz.png"
            linkHref="/security-quiz"
            bgColor="#e3edf3"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
} 