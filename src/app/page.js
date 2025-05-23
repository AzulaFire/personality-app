// Home.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizCard from '@/components/QuizCard';
import SubmitButton from '@/components/SubmitButton';
import { QUESTIONS } from '@/lib/personalityData';
import { usePulseStore } from '@/store/usePulseStore';
import ResultPanel from '@/components/ResultPanel';
import Image from 'next/image';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const profile = usePulseStore((s) => s.profile);
  const code = usePulseStore((s) => s.code);
  const resetQuiz = usePulseStore((s) => s.resetQuiz);
  const totalQuestions = QUESTIONS.length;
  const answers = usePulseStore((s) => s.answers);

  const next = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
  };
  const prev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const progressPercent = Math.round(
    (Object.keys(answers).length / totalQuestions) * 100
  );

  if (profile) {
    return (
      <ResultPanel
        code={code}
        profile={profile}
        onRestart={() => {
          resetQuiz();
          setCurrentIndex(0);
        }}
      />
    );
  }

  const question = QUESTIONS[currentIndex];

  return (
    <div className='px-4 sm:px-6 lg:px-8 pb-8 max-w-3xl mx-auto'>
      {/* Hero Banner */}
      <motion.div
        className='w-full mb-10 overflow-hidden rounded-xl shadow-lg'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src='/pulse.png'
          alt='PULSE Banner'
          width={1920}
          height={1080}
          className='w-full object-cover h-48 sm:h-64 md:h-72 lg:h-80'
        />
      </motion.div>

      {/* Progress Bar */}
      <div className='w-full h-4 bg-zinc-600 rounded mb-2 overflow-hidden'>
        <motion.div
          className='h-4 bg-rose-950'
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Animated question card */}
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className='w-full'
        >
          <QuizCard question={question} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className='flex flex-col sm:flex-row justify-between w-full mt-6 gap-4'>
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto cursor-pointer'
        >
          Previous
        </button>

        <button
          onClick={next}
          disabled={currentIndex === totalQuestions - 1}
          className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto cursor-pointer'
        >
          Next
        </button>
      </div>

      {/* Submit Button (only on last question) */}
      <div className='flex flex-col justify-between w-full mt-6 gap-4'>
        {currentIndex === totalQuestions - 1 && <SubmitButton />}
      </div>
    </div>
  );
}
