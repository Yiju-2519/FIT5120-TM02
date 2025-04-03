"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

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

export default function RiskResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  
  const [breaches, setBreaches] = useState<Breach[]>([]);
  const [breachSummary, setBreachSummary] = useState({
    count: 0,
    affectedSites: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Format date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Fetch breach data if not provided in URL
  useEffect(() => {
    if (!email) {
      router.push('/');
      return;
    }

    // Check if breach data is passed in URL
    const breachCountParam = searchParams.get('breachCount');
    const breachesParam = searchParams.get('breaches');
    
    if (breachCountParam && breachesParam) {
      try {
        const parsedBreaches = JSON.parse(decodeURIComponent(breachesParam));
        setBreaches(parsedBreaches);
        setBreachSummary({
          count: parseInt(breachCountParam, 10),
          affectedSites: searchParams.get('affectedSites') || parsedBreaches.map((b: Breach) => b.title || b.name).join(", ")
        });
        setLoading(false);
      } catch (e) {
        // If parsing fails, fetch data from API
        fetchBreachData();
      }
    } else {
      // If data not available in URL, fetch it
      fetchBreachData();
    }
  }, [email, searchParams, router]);
  
  const fetchBreachData = async () => {
    setLoading(true);
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
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'secure') {
        // Redirect to secure page if email is actually secure
        router.push(`/result/secure?email=${encodeURIComponent(email)}`);
        return;
      }
      
      if (Array.isArray(data.breaches)) {
        setBreaches(data.breaches);
        setBreachSummary({
          count: data.breachCount || data.breaches.length,
          affectedSites: data.affectedSites || data.breaches.map((b: Breach) => b.title || b.name).join(", ")
        });
      } else {
        setBreaches([]);
      }
    } catch (err) {
      console.error("Error fetching breach data:", err);
      setError("Failed to retrieve breach details. Please try again later.");
    } finally {
      setLoading(false);
    }
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
            <Link href="/" className="text-xl font-medium text-gray-700">caKnak</Link>
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

      <section className="py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 max-w-4xl mx-auto">
          Email Security Risk Assessment
        </h1>
        
        {loading ? (
          <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-700">Loading risk assessment...</span>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => fetchBreachData()}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Try Again
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
                <p className="text-gray-700 mb-6">
                  {email ? `${email} was` : 'This email was'} found in known data breaches, please take immediate action!
                </p>
                
                <Link href="/recovery-steps" className="bg-red-500 text-white py-3 px-6 rounded-md font-medium hover:bg-red-600 transition-colors">
                  View Detailed Recovery Steps
                </Link>
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
            ) : (
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
            
            <div className="flex gap-6 justify-center mt-8">
              <Link href="/" className="bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors">
                Check Another Email
              </Link>
              <Link href="/digital-security-guides" className="bg-gray-700 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors">
                Digital Security Guides
              </Link>
            </div>
          </div>
        )}
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