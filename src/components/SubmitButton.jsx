import { useRouter } from 'next/navigation';
import { usePulseStore } from '@/store/usePulseStore';
import { Button } from '@/components/ui/button';

function SubmitButton() {
  const submitQuiz = usePulseStore((s) => s.submitQuiz);
  const router = useRouter();
  const answers = usePulseStore((s) => s.answers);
  const total = usePulseStore((s) => s.totalQuestions);

  const answered = Object.keys(answers).length;
  const canSubmit = answered === total;

  return (
    <Button
      disabled={!canSubmit}
      onClick={() => {
        const { code } = submitQuiz(); // ensure submitQuiz returns code/profile
        router.push(`/results/${code}`);
      }}
      className='bg-zinc-700 hover:bg-zinc-800 px-4 py-2 cursor-pointer'
    >
      See My Results
    </Button>
  );
}

export default SubmitButton;
