"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const checkEmail = async () => {
    setIsLoading(true);
    setError("");
    
    // Validate email
    if (!email) {
      setError("Please enter an email address");
      setIsLoading(false);
      return;
    }
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'same-origin',
        cache: 'no-store',
      });
      
      if (response.status === 429) {
        setError("Too many requests. Please try again in a moment.");
        setIsLoading(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Use sessionStorage to store data, not passing through URL parameters
      sessionStorage.setItem('emailCheck', JSON.stringify({
        email: email,
        status: data.status,
        breachCount: data.breachCount || 0,
        affectedSites: data.affectedSites || '',
        breaches: data.breaches && Array.isArray(data.breaches) 
          ? data.breaches.map((breach: any) => ({
              name: breach.name,
              title: breach.title,
              domain: breach.domain,
              breachDate: breach.breachDate,
              description: breach.description || 'No description available',
              dataClasses: breach.dataClasses || [],
              pwnCount: breach.pwnCount
            }))
          : []
      }));
      
      // Redirect to appropriate result page without query parameters
      if (data.status === 'at-risk') {
        router.push('/check-email-security/result/at-risk');
    } else {
        router.push('/check-email-security/result/secure');
      }
    } catch (err) {
      console.error("Error checking email:", err);
      setError("Failed to check email. Please try again later.");
      setIsLoading(false);
    }
  };

  // Format date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f2f2f2]">
      {/* Navigation bar */}
      <NavBar />

      {/* Email Security Section */}
      <section id="emailSecurity" className="py-20 px-4 pt-36">
        <div className="max-w-4xl mx-auto py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">Check Your Email Security</h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Enter your email to check if it has been involved in any known data breaches. We'll help you understand the risks and steps to secure your digital identity.
          </p>
          
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="flex-grow w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
          <Link
                href="/email-check"
                onClick={(e) => {
                  e.preventDefault();
                  checkEmail();
                }}
                className={`w-full md:w-auto whitespace-nowrap px-8 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </span>
                ) : (
                  "Check Email Security"
                )}
          </Link>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                  {error}
                </span>
              </div>
            )}
            </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Your data is secured with encryption. 
            <Link href="/privacy-protection" className="text-blue-500 hover:text-blue-600"> Learn More</Link></p>
            <div className="flex justify-center gap-4">
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure
              </span>
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Private
              </span>
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                We don't store emails
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Stats Section */}
      <section className="py-12 px-4 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Malaysian Digital Security Snapshot</h2>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#eaf2ff] p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-gray-700 font-medium mb-2">Data Breach Growth Rate</h3>
            <p className="text-3xl font-bold text-blue-600">28%/Year</p>
              </div>
          
          <div className="bg-[#eaf2ff] p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-gray-700 font-medium mb-2">Identity Theft Cases Growth</h3>
            <p className="text-3xl font-bold text-blue-600">35%/Year</p>
              </div>
          
          <div className="bg-[#eaf2ff] p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-gray-700 font-medium mb-2">Weak Password Usage Rate</h3>
            <p className="text-3xl font-bold text-blue-600">73%</p>
          </div>
        </div>
      </section>

      {/* Why Digital Citizenship Matters */}
      <section className="py-12 px-4 bg-[#efefef]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Digital Citizenship Matters?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-gray-700">Over 42,000 cybersecurity incidents reported in Malaysia in 2022</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700">CyberSecurity Malaysia reports over 65% of personal data breaches involve weak passwords</p>
                  </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-gray-700">MCMC data shows 73% of Malaysian users use the same password across multiple accounts</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/data-breach-education"
              className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Learn More About Digital Security Risks
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Guide Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">Quick Guide to Digital Citizenship</h2>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-[#eef9ff] flex items-center justify-center p-4">
              <Image 
                src="/password-security.png" 
                alt="Password Security" 
                width={200} 
                height={150}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Password Security</h3>
              <p className="text-gray-600 text-sm">Learn how to create and manage strong passwords to protect your accounts</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-[#eef9ff] flex items-center justify-center p-4">
              <Image 
                src="/two-factor.png" 
                alt="Two-Factor Authentication" 
                width={200} 
                height={150}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Two-Factor Authentication</h3>
              <p className="text-gray-600 text-sm">Add an extra layer of security to your online accounts</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-[#eef9ff] flex items-center justify-center p-4">
              <Image 
                src="/phishing-defense.png" 
                alt="Phishing Defense" 
                width={200} 
                height={150}
                className="h-full w-auto object-contain"
              />
          </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Phishing Defense</h3>
              <p className="text-gray-600 text-sm">Recognize and avoid common phishing attempts</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/education-center" className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Explore Full Digital Citizenship Education
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
