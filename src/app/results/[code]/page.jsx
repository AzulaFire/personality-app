// ResultPage.jsx
import { buildProfile } from '@/lib/personalityData';
import ResultPanel from '@/components/ResultPanel';

export default async function ResultPage({ params }) {
  const code = await params.code.toUpperCase();

  let profile;
  try {
    profile = buildProfile(code);
  } catch {
    return (
      <div className='px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto text-center'>
        <p className='text-lg mb-4 text-red-600'>Invalid personality code.</p>
        <a href='/' className='text-primary underline'>
          Take the quiz
        </a>
      </div>
    );
  }

  return <ResultPanel code={code} profile={profile} />;
}
