"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { FaCheckCircle, FaShieldAlt, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa';

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
        router.push('/result/at-risk');
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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center pt-16">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Email Security Assessment Card */}
          <div className="mb-10 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg mb-4">
                <div className="text-blue-500 mb-4">
                  <FaCheckCircle size={80}/>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Good News! Your Email Appears Secure</h1>
                
                <p className="text-gray-600 mb-4 text-center">
                  {maskEmail(emailData.email)}
                </p>
                
                <p className="text-gray-600 mb-4 text-center">
                  We didn't find any records of your email address in known data breaches.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 w-full">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaShieldAlt className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Safety Recommendations</h3>
                      <div className="mt-2 text-sm text-blue-700">
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
                  href="/education-center"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Learn How to Further Protect Your Digital Identity
                </Link>
              </div>
            </div>
          </div>
          
          {/* Digital Citizenship Quiz Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaQuestionCircle className="mr-2 text-blue-500" />
                  <span>Digital Citizenship Quiz</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Test your knowledge about online safety and digital citizenship with our interactive quiz.
                </p>
                <Link
                  href="/knowledge-quiz"
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take the Quiz
                </Link>
              </div>
            </div>
            
            {/* Common Security Risks Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaExclamationTriangle className="mr-2 text-amber-500" />
                  <span>Common Security Risks</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Learn about common online security risks and how to protect yourself from them.
                </p>
                <Link
                  href="/data-breach-education"
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Common Risks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="flex justify-center space-x-8 pb-6">
        <Link 
          href="/"
          className="w-56 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Check Another Email
        </Link>
        <Link
          href="/digital-security-guides"
          className="w-56 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Digital Security Guides
        </Link>
      </div>
      
      <Footer />
    </div>
  );
} 