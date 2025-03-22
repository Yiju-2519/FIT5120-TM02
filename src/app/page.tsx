"use client";

import Link from "next/link";
import { useState } from "react";

interface AnswerOption {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answerOptions: AnswerOption[];
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const questions: Question[] = [
    {
      questionText: "Which of the following is NOT a good password practice?",
      answerOptions: [
        { answerText: "Using different passwords for different accounts", isCorrect: false },
        { answerText: "Including special characters and numbers", isCorrect: false },
        { answerText: "Writing down your passwords on a sticky note on your monitor", isCorrect: true },
        { answerText: "Using a password manager", isCorrect: false },
      ],
    },
    {
      questionText: "What should you do before sharing information online?",
      answerOptions: [
        { answerText: "Share it as quickly as possible to be the first", isCorrect: false },
        { answerText: "Verify the source and accuracy of the information", isCorrect: true },
        { answerText: "Add more dramatic details to make it interesting", isCorrect: false },
        { answerText: "Tag as many friends as possible", isCorrect: false },
      ],
    },
    {
      questionText: "Which of these is an example of cyberbullying?",
      answerOptions: [
        { answerText: "Sending a friend a birthday message", isCorrect: false },
        { answerText: "Asking to borrow someone&apos;s notes", isCorrect: false },
        { answerText: "Posting embarrassing photos of someone without permission", isCorrect: true },
        { answerText: "Inviting classmates to an online study group", isCorrect: false },
      ],
    },
    {
      questionText: "What is &apos;digital footprint&apos;?",
      answerOptions: [
        { answerText: "A measurement of how much time you spend online", isCorrect: false },
        { answerText: "The trail of data you create while using the internet", isCorrect: true },
        { answerText: "A type of computer virus", isCorrect: false },
        { answerText: "The size of files on your computer", isCorrect: false },
      ],
    },
    {
      questionText: "What should you do if you receive a suspicious email asking for personal information?",
      answerOptions: [
        { answerText: "Reply with the information requested", isCorrect: false },
        { answerText: "Click on any links to see where they lead", isCorrect: false },
        { answerText: "Forward it to all your contacts to warn them", isCorrect: false },
        { answerText: "Delete it or report it as phishing", isCorrect: true },
      ],
    },
  ];

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setGameStarted(false);
  };

  // Get the current question safely
  const currentQuestionData = currentQuestion < questions.length ? questions[currentQuestion] : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      {/* Navigation bar */}
      <nav className="flex items-center justify-between p-6 bg-blue-800/50 backdrop-blur-sm">
        <div className="text-2xl font-bold">Digital Citizenship</div>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
          <Link href="#about" className="hover:text-blue-200 transition-colors">About Us</Link>
          <Link href="#resources" className="hover:text-blue-200 transition-colors">Resources</Link>
          <Link href="#game" className="hover:text-blue-200 transition-colors">Quiz Game</Link>
          <Link href="#contact" className="hover:text-blue-200 transition-colors">Contact Us</Link>
        </div>
      </nav>

      {/* Hero section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Fostering <span className="text-blue-300">Digital Citizens</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-10">
          Guide the next generation to be responsible, ethical, and empathetic digital world citizens
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#resources"
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors"
          >
            Explore Resources
          </Link>
          <Link
            href="#join"
            className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
          >
            Join Us
          </Link>
        </div>
      </section>

      {/* About us */}
      <section id="about" className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">About the Digital Citizenship Program</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-blue-800/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p>We are committed to helping young people and adults develop the necessary skills, knowledge, and attitudes to participate safely, ethically, and responsibly in the digital world.</p>
            </div>
            <div className="bg-blue-800/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Why It Matters</h3>
              <p>In an increasingly digital world, cultivating responsible digital citizens is essential for creating a safe, inclusive, and beneficial online environment.</p>
            </div>
            <div className="bg-blue-800/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
              <p>We foster critical thinking, digital literacy, and ethical decision-making through educational resources, workshops, and community engagement activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core elements */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Core Elements of Digital Citizenship</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Safety</h3>
              <p>Protecting personal information and device security, mitigating online risks</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Literacy</h3>
              <p>Critical evaluation of online information, identifying misinformation</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Ethics</h3>
              <p>Following ethical codes of conduct online, respecting others&apos; rights</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Participation</h3>
              <p>Actively engaging in online communities, contributing positively to the digital world</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources section */}
      <section id="resources" className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">Educational Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-800/30 rounded-lg overflow-hidden">
              <div className="h-48 bg-blue-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Teacher Resources</h3>
                <p className="mb-4">Lesson plans, activities, and teaching materials for educators to promote digital citizenship awareness in the classroom.</p>
                <Link href="#" className="text-blue-300 hover:text-blue-200">Learn More →</Link>
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg overflow-hidden">
              <div className="h-48 bg-blue-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Parent Guides</h3>
                <p className="mb-4">Help parents understand how to foster digital citizenship skills at home, including communication techniques and practical tools.</p>
                <Link href="#" className="text-blue-300 hover:text-blue-200">Learn More →</Link>
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg overflow-hidden">
              <div className="h-48 bg-blue-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Student Workshops</h3>
                <p className="mb-4">Interactive workshops designed for students of different age groups to learn digital citizenship skills through examples and activities.</p>
                <Link href="#" className="text-blue-300 hover:text-blue-200">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Game Section */}
      <section id="game" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">Test Your Digital Citizenship Knowledge</h2>
          <div className="bg-blue-800/30 p-8 rounded-lg backdrop-blur-sm">
            {!gameStarted ? (
              <div className="text-center">
                <p className="text-xl mb-8">
                  How well do you understand digital citizenship? Take this quick quiz to find out!
                </p>
                <button
                  onClick={() => setGameStarted(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            ) : showScore ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                <p className="text-xl mb-6">
                  You scored {score} out of {questions.length}
                </p>
                {score === questions.length ? (
                  <p className="mb-8 text-green-300">Perfect score! You&apos;re a digital citizenship expert!</p>
                ) : score >= questions.length / 2 ? (
                  <p className="mb-8 text-yellow-300">Good job! You have a solid understanding of digital citizenship.</p>
                ) : (
                  <p className="mb-8 text-red-300">There&apos;s room for improvement. Explore our resources to learn more!</p>
                )}
                <button
                  onClick={resetQuiz}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span>Question {currentQuestion + 1}/{questions.length}</span>
                    <span>Score: {score}</span>
                  </div>
                  <div className="w-full bg-blue-900/50 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full"
                      style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {currentQuestionData && (
                  <>
                    <h3 className="text-xl font-bold mb-6">{currentQuestionData.questionText}</h3>
                    <div className="grid gap-4">
                      {currentQuestionData.answerOptions.map((answerOption, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerClick(answerOption.isCorrect)}
                          className="text-left bg-blue-700/50 hover:bg-blue-700/80 p-4 rounded-lg transition-colors"
                        >
                          {answerOption.answerText}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Join us */}
      <section id="join" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Digital Citizenship Community</h2>
          <p className="text-xl mb-10">
            Work together to create a safer, more inclusive, and more ethical digital world
          </p>
          <form className="bg-blue-800/30 p-8 rounded-lg backdrop-blur-sm max-w-xl mx-auto">
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Your Name"
                className="w-full p-3 rounded bg-white/10 border border-blue-400 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <input 
                type="email" 
                placeholder="Your Email"
                className="w-full p-3 rounded bg-white/10 border border-blue-400 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-6">
              <select 
                defaultValue="" 
                className="w-full p-3 rounded bg-white/10 border border-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled className="text-gray-400">How did you hear about us?</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend Recommendation">Friend Recommendation</option>
                <option value="Search Engine">Search Engine</option>
                <option value="Educational Institution">Educational Institution</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors">
              Subscribe to Our Newsletter
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white/80 py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Digital Citizenship</h3>
            <p>Dedicated to fostering responsible, ethical, and empathetic digital citizens</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Home</Link></li>
              <li><Link href="#about" className="hover:text-white">About Us</Link></li>
              <li><Link href="#resources" className="hover:text-white">Resources</Link></li>
              <li><Link href="#join" className="hover:text-white">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>info@digitalcitizenship.org</li>
              <li>+1 (123) 456-7890</li>
              <li>Melbourne, Australia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Digital Citizenship Initiative. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
