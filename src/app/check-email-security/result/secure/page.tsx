"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { FaCheckCircle, FaShieldAlt, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa';

// 莫兰迪蓝灰色系 - 与主页保持一致
const morandiColors = {
  lightest: "#e3edf3", // 最浅蓝灰色
  light: "#d3e1ea",    // 浅蓝灰色
  mild: "#c0d2de",     // 中蓝灰色
  medium: "#b2c6d4",   // 深蓝灰色
  text: "#374b54",     // 文本蓝灰色
  hover: "#97afc1"     // 悬停蓝灰色
};

type EmailCheckData = {
  email: string;
  status: string;
  breachCount?: number;
  affectedSites?: string;
  breaches?: any[];
};

export default function SecureResultPage() {
  const router = useRouter();
  const [emailData, setEmailData] = useState<EmailCheckData | null>(null);
  
  useEffect(() => {
    // Read data from sessionStorage
    const storedData = sessionStorage.getItem('emailCheck');
    
    if (!storedData) {
      // If no data, redirect to homepage
      router.push('/');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData) as EmailCheckData;
      
      // Confirm this is secure data
      if (parsedData.status !== 'secure') {
        router.push('/check-email-security/result/at-risk');
        return;
      }
      
      setEmailData(parsedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      router.push('/');
    }
  }, [router]);
  
  // Add email masking function
  const maskEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    
    const [username, domain] = parts;
    // Ensure username exists and has enough length
    if (!username || username.length < 3) return email;
    
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };
  
  if (!emailData) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
        <NavBar showTitle={true} />
        <div className="flex-grow flex items-center justify-center pt-16">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
      <NavBar showTitle={true} />
      
      <main className="flex-grow container mx-auto px-6 pt-24 pb-10">
        {/* Email Security Assessment Card */}
        <div className="mb-10 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg mb-4">
              <div className="text-green-500 mb-6">
                <FaCheckCircle size={80}/>
              </div>
              
              <h1 className="text-2xl font-bold text-[#374b54] mb-4 text-center">Good News! Your Email Appears Secure</h1>
              
              <p className="text-gray-600 mb-4 text-center">
                {maskEmail(emailData.email)}
              </p>
              
              <p className="text-gray-600 mb-6 text-center">
                We didn't find any records of your email address in known data breaches.
              </p>
              
              <div className="bg-[#e3edf3] border-l-4 border-[#b2c6d4] p-4 mb-6 w-full">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaShieldAlt className="h-5 w-5 text-[#374b54]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-[#374b54]">Safety Recommendations</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Continue to use strong, unique passwords for all your accounts</li>
                        <li>Enable two-factor authentication where available</li>
                        <li>Regularly monitor your accounts for suspicious activity</li>
                        <li>Be cautious when sharing personal information online</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/digital-security-risks"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#374b54] hover:bg-[#97afc1] transition-colors duration-300"
              >
                Learn How to Further Protect Your Digital Identity
              </Link>
            </div>
          </div>
        </div>
        
        {/* Digital Citizenship Quiz and Common Security Risks Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#374b54] mb-4 flex items-center">
                <FaQuestionCircle className="mr-2 text-[#b2c6d4]" />
                <span>Digital Citizenship Quiz</span>
              </h2>
              <p className="text-gray-600 mb-4">
                Test your knowledge about online safety and digital citizenship with our interactive quiz.
              </p>
              <Link
                href="/security-quiz"
                className="inline-flex items-center px-4 py-2 border border-[#374b54] text-base font-medium rounded-md text-[#374b54] bg-white hover:bg-[#e3edf3] transition-colors duration-300"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
          
          {/* Common Security Risks Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#374b54] mb-4 flex items-center">
                <FaExclamationTriangle className="mr-2 text-amber-500" />
                <span>Common Security Risks</span>
              </h2>
              <p className="text-gray-600 mb-4">
                Learn about common online security risks and how to protect yourself from them.
              </p>
              <Link
                href="/digital-security-risks"
                className="inline-flex items-center px-4 py-2 border border-[#374b54] text-base font-medium rounded-md text-[#374b54] bg-white hover:bg-[#e3edf3] transition-colors duration-300"
              >
                View Common Risks
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-10">
          <Link 
            href="/check-email-security"
            className="w-full sm:w-56 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#374b54] hover:bg-[#97afc1] transition-colors duration-300"
          >
            Check Another Email
          </Link>
          <Link
            href="/digital-security-risks"
            className="w-full sm:w-56 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-[#374b54] bg-white hover:bg-[#e3edf3] transition-colors duration-300"
          >
            Digital Security Guides
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 