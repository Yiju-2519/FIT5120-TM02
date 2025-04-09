"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FaShieldAlt, FaLock, FaUserShield, FaFileContract, FaBan, FaFish } from 'react-icons/fa';
import { MdPhishing } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';

// 莫兰迪蓝灰色系 - 与主页保持一致
const morandiColors = {
  lightest: "#e3edf3", // 最浅蓝灰色
  light: "#d3e1ea",    // 浅蓝灰色
  mild: "#c0d2de",     // 中蓝灰色
  medium: "#b2c6d4",   // 深蓝灰色
  text: "#374b54",     // 文本蓝灰色
  hover: "#97afc1"     // 悬停蓝灰色
};

export default function DigitalSecurityRisksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-6 py-10">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-4 text-[#374b54]">Digital Security Risks</h1>
          <p className="text-lg mb-6 text-[#374b54]">
            Learn about common security risks associated with digital communications and how to protect yourself.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-[#374b54]">Your information may be used for:</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 text-red-500">
                  <FaUserShield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1 text-[#374b54]">Identity Theft</h3>
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
                  <h3 className="text-xl font-medium mb-1 text-[#374b54]">Phishing Attacks</h3>
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
                  <h3 className="text-xl font-medium mb-1 text-[#374b54]">Spam and Unwanted Communications</h3>
                  <p className="text-gray-600">
                    Your email address may be added to spam lists, resulting in an increase of 
                    unwanted communications, advertisements, and potentially malicious messages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#374b54]">How We Protect Your Data</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-[#374b54]">Minimal Data Collection</h3>
            <p className="text-gray-600 mb-4">
              We only require your email address to verify potential breaches. 
              We don't store personal information beyond what's necessary for the service.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-[#374b54]">Real-time Processing</h3>
            <p className="text-gray-600 mb-4">
              Your email is processed in real-time to check against known data breaches. 
              We don't log user queries or maintain a database of checked emails.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-[#374b54]">Transparent Data Handling</h3>
            <p className="text-gray-600 mb-4">
              We're transparent about how your data is used. Your email is only used to check for breaches 
              and you can opt out of any future communications at any time.
            </p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#374b54]">Your Rights</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Know what personal data we process about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of breach alerts</li>
              <li>Object to the processing of your data</li>
            </ul>
            <p className="mt-4 text-gray-600">
              We comply with data protection regulations, including the Malaysian Personal Data Protection Act 
              (PDPA) and General Data Protection Regulation (GDPR) where applicable.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 