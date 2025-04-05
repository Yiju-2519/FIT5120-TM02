"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { FaExclamationTriangle, FaLock, FaShieldAlt, FaQuestionCircle, FaChevronDown, FaChevronUp, FaUserShield } from 'react-icons/fa';
import { MdPhishing } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';

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
          {/* Email Risk Assessment Card */}
          <div className="mb-10 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              
              <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg mb-6">
                <div className="text-red-400 mb-4">
                  <FaExclamationTriangle size={80} color='#fe4859'/>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Warning! This Email May Be at Risk</h1>
                
                <p className="text-gray-600 mb-2 font-medium text-center">
                  {maskEmail(emailData.email)}
                </p>
                
                <p className="text-gray-700 mb-4 text-center">
                  This email was found in known data breaches, please take immediate action!
                </p>
                
                <Link 
                  href="/recovery-steps"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  View Detailed Recovery Steps
                </Link>
              </div>
              
              {/* Recommended Actions */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended Actions</h3>
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
                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                  >
                    <h3 className="text-xl font-bold text-gray-800">Breach Details</h3>
                    <span className="text-gray-500">
                      {showBreachDetails ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>
                  
                  {showBreachDetails && (
                    <div className="p-4 space-y-4">
                      {emailData.breaches.map((breach, index) => (
                        <div 
                          key={index} 
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => toggleBreachDetails(`breach-${index}`)}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="text-lg font-semibold text-gray-900">{breach.title || breach.name}</h4>
                            <div className="flex items-center">
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2">
                                {breach.breachDate ? formatDate(breach.breachDate) : 'Unknown date'}
                              </span>
                              <span className="text-gray-500">
                                {expandedBreaches[`breach-${index}`] ? <FaChevronUp /> : <FaChevronDown />}
                              </span>
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
                                <div className="text-sm text-gray-700 mt-2">
                                  <div 
                                    dangerouslySetInnerHTML={{ __html: renderDescription(breach.description) }} 
                                    className="breach-description"
                                  />
                                </div>
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
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Recovery Steps and Educational Resources */}
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaExclamationTriangle className="mr-2 text-red-500" />
                  <span>Learn More About Risks</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Your information may be used for:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-600">
                    <div className="flex-shrink-0 text-red-500 mr-2">
                      <FaUserShield size={18} />
                    </div>
                    Identity theft
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="flex-shrink-0 text-red-500 mr-2">
                      <MdPhishing size={18} />
                    </div>
                    Phishing attacks
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="flex-shrink-0 text-red-500 mr-2">
                      <AiOutlineMail size={18} />
                    </div>
                    Spam and unwanted communications
                  </li>
                </ul>
                <Link
                  href="/digital-security-risks"
                  className="inline-flex items-center px-4 py-2 border border-red-500 text-base font-medium rounded-md text-red-500 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Learn More About Digital Security Risks <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaShieldAlt className="mr-2 text-blue-500" />
                  <span>Protect Your Other Accounts</span>
                </h2>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-600">
                    <span className="text-blue-500 mr-2">✓</span>
                    Review and update passwords for all your accounts
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="text-blue-500 mr-2">✓</span>
                    Use a password manager to generate and store strong passwords
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="text-blue-500 mr-2">✓</span>
                    Set up regular security checkups for your accounts
                  </li>
                </ul>
                <Link
                  href="/password-manager-guide"
                  className="inline-flex items-center px-4 py-2 border border-blue-500 text-base font-medium rounded-md text-blue-500 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Password Manager Guide <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="flex justify-center space-x-8 pb-6">
        <Link
          href="/"
          className="w-56 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Check Another Email
        </Link>
        <Link
          href="/digital-security-risks"
          className="w-56 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Digital Security Guides
        </Link>
      </div>
      
      <Footer />
    </div>
  );
} 