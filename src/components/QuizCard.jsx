'use client';
import { usePulseStore } from '@/store/usePulseStore';
import { Button } from '@/components/ui/button';

export default function QuizCard({ question }) {
  const answerQuestion = usePulseStore((s) => s.answerQuestion);
  const selected = usePulseStore((s) => s.answers[question.id]);

  const optionLetters = Object.keys(question).filter((k) =>
    ['A', 'C', 'F', 'L', 'S', 'E', 'O', 'G', 'I', 'P', 'D', 'R'].includes(k)
  );

  return (
    <div className='flex flex-col w-full gap-2'>
      <h2 className='text-xl sm:text-2xl font-semibold text-center sm:text-left'>
        {question.text}
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
        {optionLetters.map((letter) => {
          const isSelected = selected === letter;
          const baseColor = isSelected
            ? 'bg-pink-950 hover:bg-pink-950'
            : 'bg-orange-700 hover:bg-orange-800';

          return (
            <Button
              key={letter}
              onClick={() => answerQuestion(question.id, letter)}
              className={`w-full text-white text-base p-8 cursor-pointer ${baseColor}`}
            >
              {question[letter]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
