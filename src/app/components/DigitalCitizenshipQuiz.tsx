"use client";

import { useState } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the most secure way to store your passwords?",
    options: [
      "Write them down on a piece of paper",
      "Use the same password for all accounts",
      "Use a password manager",
      "Store them in a text file on your computer"
    ],
    correctOptionIndex: 2
  },
  {
    question: "Which of the following is a sign of a phishing email?",
    options: [
      "Comes from a known sender",
      "Contains urgent calls to action or threats",
      "Has a professional design",
      "Addresses you by your correct name"
    ],
    correctOptionIndex: 1
  },
  {
    question: "How often should you update your passwords?",
    options: [
      "Never, if they are strong enough",
      "Every 3-6 months",
      "Only after a breach",
      "Once a year"
    ],
    correctOptionIndex: 1
  },
  {
    question: "What is two-factor authentication?",
    options: [
      "Using two different passwords",
      "Logging in from two different devices",
      "Adding a second verification method beyond password",
      "Answering two security questions"
    ],
    correctOptionIndex: 2
  },
  {
    question: "Which of the following is the best practice for public Wi-Fi?",
    options: [
      "Use it freely for all online activities",
      "Only use it with a VPN enabled",
      "Only check email, never do banking",
      "Share the password with friends"
    ],
    correctOptionIndex: 1
  }
];

export default function DigitalCitizenshipQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showingScore, setShowingScore] = useState(false);

  // Progress percentage
  const progress = quizStarted && !showingScore 
    ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 
    : 0;

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowingScore(false);
    setQuizCompleted(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestion && selectedOptionIndex === currentQuestion.correctOptionIndex) {
      setScore(score + 1);
    }

    // Reset selected option
    setSelectedOptionIndex(null);

    // Move to next question or finish quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      setShowingScore(true);
    }
  };

  // 安全地获取当前问题
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Digital Citizenship Quiz</h2>
      <p className="text-gray-600 text-center mb-6">
        Test your digital security knowledge and improve your awareness!
      </p>

      {!quizStarted ? (
        <div className="text-center">
          <button
            onClick={startQuiz}
            className="bg-blue-500 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      ) : showingScore ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">{score}/{quizQuestions.length}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">
            {score === quizQuestions.length
              ? "Perfect Score! Excellent knowledge!"
              : score >= quizQuestions.length * 0.7
              ? "Great job! You know your digital security."
              : "Good attempt. Keep learning about digital security."}
          </h3>
          
          <button
            onClick={startQuiz}
            className="bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors mr-4"
          >
            Retake Quiz
          </button>
          
          <button
            onClick={() => setShowingScore(false)}
            className="bg-gray-700 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            View Resources
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Question {currentQuestionIndex + 1}/{quizQuestions.length}</span>
              <span>Score: {score}</span>
            </div>
          </div>

          {currentQuestion && (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-3 border rounded-md cursor-pointer transition-all ${
                        selectedOptionIndex === index
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOptionIndex === null}
                  className={`py-2 px-8 rounded-md font-medium transition-colors ${
                    selectedOptionIndex !== null
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 