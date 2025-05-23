'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { usePulseStore } from '@/store/usePulseStore'; // ✅ Make sure this path is correct
import { FaFacebook, FaTwitter, FaCopy } from 'react-icons/fa';
import { toast } from 'sonner'; // optional, or use alert
import { getShareUrl } from '@/lib/shareUtils';
import { matchProfiles } from '@/lib/matchProfiles';
import { PULSE } from '@/lib/personalityData';
import dynamic from 'next/dynamic';
import Link from 'next/link';

export default function ResultPanel({ code, profile }) {
  const router = useRouter();
  const onRestart = usePulseStore((state) => state.resetQuiz); // ✅ Load the reset function from your store
  const shareUrl = getShareUrl(code);
  const shareText = `I got ${code} – ${profile.name} on the PULSE personality test!`;
  const matches = matchProfiles(code);
  const RadarChart = dynamic(() => import('@/components/RadarChart'), {
    ssr: false,
  });
  const radarData = [
    'You',
    ...matches.slice(0, 2).map((m, i) => `Match ${i + 1}`),
  ];
  const TRAITS = ['purpose', 'unity', 'logic', 'stress', 'engagement'];

  const chartData = TRAITS.map((traitKey, index) => {
    const userLetter = code[index];
    const match1Letter = matches[0]?.code[index];
    const match2Letter = matches[1]?.code[index];

    const traitMap = PULSE[traitKey];

    const you = traitMap[userLetter]?.score ?? 0;
    const match1 = match1Letter ? traitMap[match1Letter]?.score ?? 0 : 0;
    const match2 = match2Letter ? traitMap[match2Letter]?.score ?? 0 : 0;

    return {
      trait: traitKey.charAt(0).toUpperCase() + traitKey.slice(1), // Capitalize
      You: you,
      'Match 1': match1,
      'Match 2': match2,
    };
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!'); // or alert('Link copied!')
  };

  const handleRestart = () => {
    onRestart(); // Clear state
    router.push('/'); // Navigate to home
  };

  const listAnim = {
    hidden: { opacity: 0, y: 10 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 * i },
    }),
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key='results'
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className='p-8 max-w-3xl mx-auto text-white'
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className='text-3xl font-bold mb-4'
      >
        {code} – {profile.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='mb-6'
      >
        {profile.summary}
      </motion.p>

      {/* strengths */}
      <motion.div variants={listAnim} initial='hidden' animate='show'>
        <h2 className='text-xl font-semibold mt-4'>Strengths</h2>
        {profile.strengths.map((s, i) => (
          <motion.li key={i} variants={itemAnim} className='ml-5 list-disc'>
            {s}
          </motion.li>
        ))}
      </motion.div>

      {/* challenges */}
      <motion.div
        variants={listAnim}
        initial='hidden'
        animate='show'
        custom={2}
      >
        <h2 className='text-xl font-semibold mt-4'>Challenges</h2>
        {profile.challenges.map((c, i) => (
          <motion.li key={i} variants={itemAnim} className='ml-5 list-disc'>
            {c}
          </motion.li>
        ))}
      </motion.div>

      {/* jobs */}
      <motion.div
        variants={listAnim}
        initial='hidden'
        animate='show'
        custom={3}
      >
        <h2 className='text-xl font-semibold mt-4'>Ideal Jobs</h2>
        {profile.idealJobs.map((j, i) => (
          <motion.li key={i} variants={itemAnim} className='ml-5 list-disc'>
            {j}
          </motion.li>
        ))}
      </motion.div>

      {/* hobbies */}
      <motion.div
        variants={listAnim}
        initial='hidden'
        animate='show'
        custom={4}
      >
        <h2 className='text-xl font-semibold mt-4'>Suggested Hobbies</h2>
        {profile.hobbies.map((h, i) => (
          <motion.li key={i} variants={itemAnim} className='ml-5 list-disc'>
            {h}
          </motion.li>
        ))}
      </motion.div>

      <div className='mt-10'>
        <h2 className='text-xl font-semibold mb-2'>Compatibility Chart</h2>
        <RadarChart data={chartData} keys={radarData} />
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold'>Top Compatible Types</h2>
        <ul className='ml-5 list-disc'>
          {matches.map((m, i) => (
            <li key={i}>
              {m.code} – {PULSE.purpose[m.code[0]].name},{' '}
              {PULSE.unity[m.code[1]].name}, {PULSE.logic[m.code[2]].name},{' '}
              {PULSE.stress[m.code[3]].name}, {PULSE.engagement[m.code[4]].name}
              <span className='text-sm text-zinc-400'> (Score: {m.score})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-8'>
        <h3 className='text-lg font-semibold my-2'>Share your result:</h3>
        <div className='flex gap-3'>
          <Link
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}&url=${encodeURIComponent(shareUrl)}`}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-blue-500 hover:bg-blue-600 text-white px-2 rounded flex items-center gap-2'
          >
            <FaTwitter size={16} /> Twitter
          </Link>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-blue-700 hover:bg-blue-800 text-white px-2 rounded flex items-center gap-2'
          >
            <FaFacebook size={16} /> Facebook
          </Link>
          <Button
            onClick={handleCopyLink}
            className='bg-zinc-600 hover:bg-zinc-700 text-white px-2 rounded flex items-center gap-2 cursor-pointer'
          >
            <FaCopy size={16} /> Copy Link
          </Button>
        </div>
      </div>

      <div className='flex flex-col justify-between w-full mt-6 gap-4'>
        <Button
          onClick={handleRestart}
          className='mt-10 px-4 py-2 bg-zinc-700 hover:bg-zinc-800 text-white rounded cursor-pointer'
        >
          Restart Quiz
        </Button>
      </div>
    </motion.div>
  );
}
