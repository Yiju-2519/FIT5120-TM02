"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DigitalCitizenshipQuiz from "./components/DigitalCitizenshipQuiz";

// Define the data breach type
interface Breach {
  name: string;
  title: string;
  domain: string;
  breachDate: string;
  description: string;
  dataClasses: string[];
  pwnCount?: number;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | "secure" | "at-risk">(null);
  const [error, setError] = useState("");
  const [breaches, setBreaches] = useState<Breach[]>([]);
  const [breachSummary, setBreachSummary] = useState({
    count: 0,
    affectedSites: ""
  });

  const checkEmail = async () => {
    // Reset states
    setIsLoading(true);
    setError("");
    setResult(null);
    setBreaches([]);
    setBreachSummary({ count: 0, affectedSites: "" });

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Checking email:", email);
      
      // Call the server-side API route
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        // Add these options to help with Netlify
        credentials: 'same-origin',
        cache: 'no-store',
      });

      console.log("API response status:", response.status);

      if (response.status === 429) {
        setError("Too many requests. Please try again in a moment.");
        setIsLoading(false);
        return;
      }

      let data;
      try {
        data = await response.json();
        console.log("API Response data:", data);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        throw new Error("Failed to parse server response");
      }

      if (!response.ok) {
        const errorMessage = data.error || `Server error (${response.status})`;
        console.error("API error:", errorMessage);
        throw new Error(errorMessage);
      }
      
      if (data.status === 'at-risk') {
        setResult("at-risk");
        // Ensure breaches is always an array even if data.breaches is undefined
        if (Array.isArray(data.breaches)) {
          setBreaches(data.breaches);
          setBreachSummary({
            count: data.breachCount || data.breaches.length,
            affectedSites: data.affectedSites || data.breaches.map((b: Breach) => b.title || b.name).join(", ")
          });
        } else {
          console.error("Breaches data is not an array:", data.breaches);
          setBreaches([]);
        }
      } else {
        setResult("secure");
      }
    } catch (err) {
      console.error("Error checking email:", err);
      // Provide more specific error messages based on the error
      if (err instanceof Error) {
        setError(err.message || "Failed to check email security. Please try again later.");
      } else {
        setError("Failed to check email security. Please try again later.");
      }
    } finally {
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
    <main className="min-h-screen flex flex-col bg-[#eef6ff]">
      {/* Navigation bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12">
              <Image 
                src="/caknak-logo.png" 
                alt="caKnak" 
                width={48} 
                height={48}
                className="w-full h-auto"
                priority={true}
                unoptimized={true}
              />
            </div>
            <span className="text-xl font-medium text-gray-700">caKnak</span>
          </div>
          <div className="flex gap-10">
            <Link href="/data-breach" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Data Breach</Link>
            <Link href="/recovery-steps" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Recovery Steps</Link>
            <Link href="/education-center" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Education Center</Link>
            <Link href="/knowledge-quiz" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Knowledge Quiz</Link>
            <Link href="/faq" className="text-gray-600 hover:text-blue-600 text-sm font-medium">FAQ</Link>
          </div>
        </div>
      </nav>

      {/* Hero section with email checker */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 max-w-4xl mx-auto">
          Enhance Your Digital Citizenship, Starting with Email Security
        </h1>
        
        {!result ? (
          <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                onKeyPress={(e) => e.key === 'Enter' && checkEmail()}
              />
              {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
            </div>
            
            <button 
              className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-3 px-4 rounded-md font-medium transition-colors`}
              onClick={checkEmail}
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Email Security'}
            </button>
            
            <div className="mt-4 text-left">
              <p className="text-sm text-gray-600 mb-2">How We Protect Your Privacy? <Link href="/privacy" className="text-blue-500 hover:underline">Learn More</Link></p>
              
              <div className="flex items-start gap-2 text-sm text-gray-600 mb-1">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>We do not store your email address</span>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-gray-600 mb-1">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>All checks are hashed locally on your device</span>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Only encrypted hash values are sent for comparison</span>
              </div>
            </div>
          </div>
        ) : result === "secure" ? (
          <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Good News! Your Email Appears Secure</h2>
              <p className="text-gray-600 mb-6">This email was not found in known data breaches, but stay vigilant!</p>
              
              <div className="w-full border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">For your digital safety, we recommend:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Regularly change passwords</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Enable two-factor authentication</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Use different passwords for different accounts</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors">
                Learn How to Further Protect Your Digital Identity
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto mt-12">
            <div className="bg-red-50 rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Warning! This Email May Be at Risk</h2>
                <p className="text-gray-700 mb-6">This email was found in known data breaches, please take immediate action!</p>
                
                <button className="bg-red-500 text-white py-3 px-6 rounded-md font-medium hover:bg-red-600 transition-colors">
                  View Detailed Recovery Steps
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Breach Summary</h3>
              
              <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">Total Breaches Found:</span>
                  <span className="text-red-600 font-bold text-lg">{breachSummary.count}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium mb-1">Affected Services:</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{breachSummary.affectedSites}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-medium text-sm">
                    1
                  </div>
                  <span className="text-gray-700">Immediately change passwords for all accounts using this email</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-medium text-sm">
                    2
                  </div>
                  <span className="text-gray-700">Enable two-factor authentication for important accounts</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-medium text-sm">
                    3
                  </div>
                  <span className="text-gray-700">Check your accounts for suspicious activity</span>
                </div>
              </div>
            </div>
            
            {breaches && breaches.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Breach Details</h3>
                
                <div className="space-y-6">
                  {breaches.map((breach, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-medium text-gray-800">{breach.title || breach.name || 'Unknown Service'}</h4>
                        <span className="text-sm text-gray-500">{breach.breachDate ? formatDate(breach.breachDate) : 'Unknown date'}</span>
                      </div>
                      
                      {breach.domain && (
                        <div className="mb-2">
                          <span className="text-xs font-medium text-gray-500">Domain: </span>
                          <a href={`https://${breach.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">
                            {breach.domain}
                          </a>
                        </div>
                      )}
                      
                      {breach.pwnCount && breach.pwnCount > 0 && (
                        <div className="mb-2 text-sm">
                          <span className="text-gray-500">Affected accounts: </span>
                          <span className="font-medium text-red-600">{breach.pwnCount.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 mb-3">{breach.description || 'No description available'}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {breach.dataClasses && Array.isArray(breach.dataClasses) ? 
                          breach.dataClasses.map((dataClass, i) => (
                            <span key={i} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {dataClass}
                            </span>
                          )) : 
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            Data classes unavailable
                          </span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : result === "at-risk" && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Breach Alert</h3>
                <p className="text-gray-700 mb-4">
                  Your email was found in data breaches, but we couldn't retrieve detailed information about the specific breaches.
                  We still recommend taking immediate security actions to protect your accounts.
                </p>
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-yellow-700">
                      For security reasons, try checking your email at <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">haveibeenpwned.com</a> for more information.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Learn More About Risks</h3>
              
              <p className="text-gray-700 mb-4">Your information may be used for:</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-gray-700">Identity theft</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-gray-700">Phishing attacks</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">Spam and unwanted communications</span>
                </div>
              </div>
              
              <Link href="/digital-security-risks" className="text-red-500 hover:text-red-600 flex items-center gap-1 font-medium">
                Learn More About Digital Security Risks
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {result && (
          <div className="flex gap-6 justify-center mt-8">
            <button 
              onClick={() => {
                setResult(null);
                setEmail("");
                setBreaches([]);
              }}
              className="bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors"
            >
              Check Another Email
            </button>
            <Link 
              href="/digital-security-guides"
              className="bg-gray-700 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Digital Security Guides
            </Link>
          </div>
        )}
      </section>

      {/* Security Stats Section */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Malaysian Digital Security Snapshot</h2>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f5faff] p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-gray-700 font-medium mb-2">Data Breach Growth Rate</h3>
            <p className="text-3xl font-bold text-blue-600">28%/Year</p>
          </div>
          
          <div className="bg-[#f5faff] p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-gray-700 font-medium mb-2">Identity Theft Cases Growth</h3>
            <p className="text-3xl font-bold text-blue-600">35%/Year</p>
          </div>
          
          <div className="bg-[#f5faff] p-6 rounded-lg shadow-sm text-center">
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
      <section className="py-12 px-4 bg-white">
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
            <button className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Learn More About Digital Security Risks
            </button>
          </div>
        </div>
      </section>

      {/* Digital Citizenship Quiz Section */}
      <section className="py-16 px-4 bg-[#f5faff]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Digital Citizenship Quiz</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
          Test your digital security knowledge and improve your awareness! Take our interactive quiz to see how well you understand digital citizenship principles.
        </p>
        <div className="max-w-4xl mx-auto">
          <DigitalCitizenshipQuiz />
        </div>
      </section>

      {/* Quick Guide Section */}
      <section className="py-16 px-4">
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
          <button className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Explore Full Digital Citizenship Education
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 Digital Citizenship Guardian. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
