"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FaShieldAlt, FaLock, FaUserShield, FaFileContract, FaBan, FaFish } from 'react-icons/fa';
import { MdPhishing } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';

export default function DigitalSecurityRisksPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-blue-50 p-8 flex items-center justify-center">
              <div className="mr-6 text-blue-500">
                <FaShieldAlt size={60} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">How We Safeguard Your Data</h1>
            </div>
            
            <div className="bg-blue-50 p-8">
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction:</h2>
                <p className="text-gray-700 mb-4">
                  Thanks for your interest in our services.
                </p>
                <p className="text-gray-700 mb-4">
                  We use a reliable, external service to check if your email has been involved in data breaches. 
                  This service adheres to rigorous security standards and does not store your information.
                </p>
                <p className="text-gray-700 mb-4">
                  Your email is only used for the purpose of breach detection and is deleted immediately after processing.
                </p>
              </section>
            </div>
            
            <div className="p-8">  
              <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-3">1. Data Collection & Usage</h2>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">a. Minimal Input:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. We only require your email address to verify its exposure in data breaches.</li>
                    <li>ii. No other personal information is collected.</li>
                  </ul>
                </div>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">b. Third-Party Verification:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. We use a trusted, industry-leading service to check for breaches, ensuring results are accurate and up-to-date.</li>
                  </ul>
                </div>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">c. No Tracking:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. We do not log your IP address, browser details, or device information.</li>
                  </ul>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-3">2. Data Handling</h2>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">a. Zero Storage:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. Your email address is never stored in our systems or databases.</li>
                    <li>ii. We process it in real-time and discard it immediately.</li>
                  </ul>
                </div>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">b. Encrypted Transmission:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. All data is transmitted via HTTPS and protected with encryption during processing.</li>
                  </ul>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-3">3. User Rights</h2>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">a. Opt-Out:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. Choose not to receive optional breach alerts or updates.</li>
                  </ul>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-3">4. Security Standards</h2>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">a. Trusted Partnerships:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. Our third-party breach detection partner adheres to strict security protocols.</li>
                    <li>ii. No password hash storage, GDPR compliance.</li>
                  </ul>
                </div>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">b. Regular Audits:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. We independently verify the security of our systems and third-party integrations.</li>
                  </ul>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-3">5. Compliance</h2>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">a. Legal Adherence:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. We comply with Malaysian Personal Data Protection Act (PDPA) and global standards like GDPR.</li>
                  </ul>
                </div>
              </section>
              
              <section className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-3">6. Prohibited Uses</h2>
                <div className="ml-5 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">a. To protect privacy and maintain service integrity, we ask that you:</h3>
                  <ul className="list-roman ml-6 space-y-1 text-gray-700">
                    <li>i. No disrupte the normal operation of our Services or impairing other users' access.</li>
                    <li>ii. Not use our tool for third-party benefits (e.g., clients, affiliates) without written permission.</li>
                    <li>iii. No introduce malware (viruses, worms, etc.) into our Services.</li>
                    <li>iv. No attempte unauthorized access to our systems, networks, or data.</li>
                    <li>v. Avoid reselling, rebranding, or reverse-engineering our service.</li>
                    <li>vi. Refrain from actions that could disrupt our systems or harm other users.</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
          
          <div className="flex justify-center space-x-8 mt-8">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Email Check
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 