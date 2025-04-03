"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { FaExclamationTriangle, FaLock, FaShieldAlt, FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

type Breach = {
  name: string;
  title: string;
  domain: string;
  breachDate: string;
  description?: string;
  dataClasses?: string[];
  pwnCount?: number;
};

type EmailCheckData = {
  email: string;
  status: string;
  breachCount: number;
  affectedSites: string;
  breaches: Breach[];
};

export default function AtRiskResultPage() {
  const router = useRouter();
  const [emailData, setEmailData] = useState<EmailCheckData | null>(null);
  const [expandedBreaches, setExpandedBreaches] = useState<{[key: string]: boolean}>({});
  
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
      
      // Confirm this is at-risk data
      if (parsedData.status !== 'at-risk') {
        router.push('/result/secure');
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
  
  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Toggle function for expanding/collapsing breach details
  const toggleBreachDetails = (breachId: string) => {
    setExpandedBreaches(prev => ({
      ...prev,
      [breachId]: !prev[breachId]
    }));
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
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Email Risk Assessment Card */}
          <div className="mb-10 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg mb-6">
                <div className="text-red-400 mb-4">
                  <FaExclamationTriangle size={80} color='#fe4859'/>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Warning: Your Email Has Been Compromised</h1>
                
                <p className="text-gray-600 mb-2 font-medium text-center">
                  {maskEmail(emailData.email)}
                </p>
                
                <p className="text-gray-700 mb-4 text-center">
                  We found your email in <span className="font-bold text-red-600">{emailData.breachCount} data {emailData.breachCount === 1 ? 'breach' : 'breaches'}</span>.
                  {emailData.affectedSites && (
                    <span> Sites affected include: <span className="font-semibold">{emailData.affectedSites}</span>.</span>
                  )}
                </p>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 w-full">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaLock className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Immediate Actions Required</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Change your password immediately on all affected sites</li>
                          <li>Use a unique, strong password for each account</li>
                          <li>Enable two-factor authentication wherever possible</li>
                          <li>Monitor your accounts for suspicious activity</li>
                          <li>Be cautious of phishing attempts targeting this email</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Check Another Email
                </Link>
              </div>
              
              {/* Breaches Details */}
              {emailData.breaches && emailData.breaches.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Breach Details</h3>
                  <div className="space-y-4">
                    {emailData.breaches.map((breach, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-semibold text-gray-900">{breach.title || breach.name}</h4>
                          <div className="flex items-center">
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2">
                              {breach.breachDate ? formatDate(breach.breachDate) : 'Unknown date'}
                            </span>
                            <button 
                              onClick={() => toggleBreachDetails(`breach-${index}`)}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
                              aria-label={expandedBreaches[`breach-${index}`] ? "Collapse details" : "Expand details"}
                            >
                              {expandedBreaches[`breach-${index}`] ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                          </div>
                        </div>
                        
                        {expandedBreaches[`breach-${index}`] && (
                          <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                            {breach.domain && (
                              <p className="text-sm text-gray-600 mt-1">
                                Website: {breach.domain}
                              </p>
                            )}
                            {breach.description && (
                              <p className="text-sm text-gray-700 mt-2">
                                {breach.description}
                              </p>
                            )}
                            {breach.dataClasses && breach.dataClasses.length > 0 && (
                              <div className="mt-3">
                                <h5 className="text-sm font-medium text-gray-700">Exposed data:</h5>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {breach.dataClasses.map((dataClass, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                      {dataClass}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {breach.pwnCount && (
                              <p className="text-xs text-gray-500 mt-2">
                                Affected accounts: {breach.pwnCount.toLocaleString()}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Recovery Steps and Educational Resources */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaShieldAlt className="mr-2 text-teal-500" />
                  <span>Recovery Steps</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Follow our comprehensive guide to recover from a data breach and secure your online accounts.
                </p>
                <Link
                  href="/recovery-steps"
                  className="inline-flex items-center px-4 py-2 border border-teal-600 text-base font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  View Recovery Guide
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaQuestionCircle className="mr-2 text-amber-500" />
                  <span>Digital Citizenship Quiz</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Test your knowledge about online safety and improve your digital citizenship skills.
                </p>
                <Link
                  href="/citizenship-quiz"
                  className="inline-flex items-center px-4 py-2 border border-teal-600 text-base font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Take the Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 