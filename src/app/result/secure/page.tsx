"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';

export default function SecureResultPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
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
          Email Security Assessment
        </h1>
        
        <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Good News! Your Email Appears Secure</h2>
            {email && (
              <p className="text-gray-600 mb-2 font-medium">{email}</p>
            )}
            <p className="text-gray-600 mb-6">This email was not found in any known data breaches, but staying vigilant is still important!</p>
            
            <div className="w-full border-t border-gray-200 pt-6 mt-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For your continued digital safety, we recommend:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Regularly change passwords (every 3-6 months)</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Enable two-factor authentication for all important accounts</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Use a different password for each of your accounts</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Consider using a reputable password manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Stay Protected Online</h3>
          <p className="text-gray-600 mb-4">
            Even though your email hasn't been found in known breaches, it's important to maintain good security practices:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="bg-blue-50 p-3 rounded-md">
              <h4 className="font-medium text-blue-800">Be aware of phishing attempts</h4>
              <p className="text-sm text-gray-600">Don't click on suspicious links or provide personal information to unverified sources.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md">
              <h4 className="font-medium text-blue-800">Keep your software updated</h4>
              <p className="text-sm text-gray-600">Regular updates include important security patches that protect your devices.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md">
              <h4 className="font-medium text-blue-800">Check your accounts periodically</h4>
              <p className="text-sm text-gray-600">Regularly review your account activity for any unauthorized access or suspicious behavior.</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 justify-center mt-8">
          <Link href="/" className="bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors">
            Check Another Email
          </Link>
          <Link href="/digital-security-guides" className="bg-gray-700 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Digital Security Guides
          </Link>
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