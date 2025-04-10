"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { FaExclamationTriangle, FaLock, FaShieldAlt, FaQuestionCircle, FaChevronDown, FaChevronUp, FaUserShield } from 'react-icons/fa';
import { MdPhishing } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';

// Morandi blue-gray color scheme - consistent with the homepage
const morandiColors = {
  lightest: "#e3edf3", // lightest blue-gray
  light: "#d3e1ea",    // light blue-gray
  mild: "#c0d2de",     // medium blue-gray
  medium: "#b2c6d4",   // dark blue-gray
  text: "#374b54",     // text blue-gray
  hover: "#97afc1"     // hover blue-gray
};

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
  const [showBreachDetails, setShowBreachDetails] = useState(true);
  
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
        router.push('/check-email-security/result/secure');
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
  
  // Function to toggle the entire Breach Details section
  const toggleBreachesSection = () => {
    setShowBreachDetails(prev => !prev);
  };
  
  // Function to safely render HTML description, preserving links and formatting
  const renderDescription = (htmlDescription: string) => {
    // Return the HTML content directly for rendering with dangerouslySetInnerHTML
    return htmlDescription;
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
        {/* Email Risk Assessment Card */}
        <div className="mb-10 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg mb-6">
              <div className="text-red-500 mb-6">
                <FaExclamationTriangle size={80}/>
              </div>
              
              <h1 className="text-2xl font-bold text-[#374b54] mb-4 text-center">Warning! This Email May Be at Risk</h1>
              
              <p className="text-gray-600 mb-2 font-medium text-center">
                {maskEmail(emailData.email)}
              </p>
              
              <p className="text-gray-700 mb-6 text-center">
                This email was found in known data breaches, please take immediate action!
              </p>
              
              <Link 
                href="/recovery-steps"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
              >
                View Detailed Recovery Steps
              </Link>
            </div>
            
            {/* Recommended Actions */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#374b54] mb-4">Recommended Actions</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-500 font-medium">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Immediately change passwords for all accounts using this email</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-500 font-medium">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Enable two-factor authentication for important accounts</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-500 font-medium">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Check your accounts for suspicious activity</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Breaches Details with Section Toggle */}
            {emailData.breaches && emailData.breaches.length > 0 && (
              <div className="mt-6 border border-gray-200 rounded-lg">
                <button 
                  onClick={toggleBreachesSection}
                  className="w-full flex justify-between items-center p-4 bg-red-100 hover:bg-red-200 transition-colors rounded-t-lg"
                >
                  <h3 className="text-xl font-bold text-[#374b54]">Breach Details</h3>
                  <span className="text-[#374b54]">
                    {showBreachDetails ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                
                {showBreachDetails && (
                  <div className="p-4 space-y-4">
                    {emailData.breaches.map((breach, index) => (
                      <div 
                        key={index} 
                        onClick={() => toggleBreachDetails(breach.name)}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-lg font-medium text-[#374b54]">{breach.title || breach.name}</h4>
                            <p className="text-sm text-gray-500">Breach date: {formatDate(breach.breachDate)}</p>
                          </div>
                          <span className="text-gray-500">
                            {expandedBreaches[breach.name] ? <FaChevronUp /> : <FaChevronDown />}
                          </span>
                        </div>
                        
                        {expandedBreaches[breach.name] && (
                          <div className="mt-4">
                            {breach.description && (
                              <div className="mb-3">
                                <h5 className="text-sm font-medium text-gray-700 mb-1">Description:</h5>
                                <div 
                                  className="text-sm text-gray-600 breach-description" 
                                  dangerouslySetInnerHTML={{ __html: renderDescription(breach.description) }}
                                />
                              </div>
                            )}
                            
                            {breach.dataClasses && breach.dataClasses.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-1">Compromised data:</h5>
                                <div className="flex flex-wrap gap-1">
                                  {breach.dataClasses.map((dataClass, i) => (
                                    <span 
                                      key={i} 
                                      className="inline-block bg-red-50 text-red-600 text-xs px-2 py-1 rounded"
                                    >
                                      {dataClass}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Learn More About Risks Section */}
        <div className="mb-10 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#374b54] mb-4">Learn More About Risks</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 text-red-500">
                  <FaUserShield size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#374b54]">Identity Theft</h3>
                  <p className="text-gray-600">
                    Criminals can use your personal information to impersonate you, open new accounts, 
                    make purchases, or obtain loans in your name, causing financial damage and affecting your credit score.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-red-500">
                  <MdPhishing size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#374b54]">Phishing Attacks</h3>
                  <p className="text-gray-600">
                    Attackers may use your information to create convincing phishing emails or messages 
                    designed to steal more sensitive data like passwords or banking details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-red-500">
                  <AiOutlineMail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#374b54]">Spam and Unwanted Communications</h3>
                  <p className="text-gray-600">
                    Your email address may be added to spam lists, resulting in an increase of 
                    unwanted communications, advertisements, and potentially malicious messages.
                  </p>
                </div>
              </div>
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
            href="/security-guides"
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