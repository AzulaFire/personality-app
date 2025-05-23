import { create } from 'zustand';
import { QUESTIONS, scoreQuiz } from '@/lib/personalityData';

export const usePulseStore = create((set, get) => ({
  /* ---------- state ---------- */
  answers: {}, // { 1: 'A', 2: 'F', ... }
  code: null,
  profile: null,

  /* ---------- actions ---------- */
  answerQuestion: (id, choice) =>
    set((state) => ({
      answers: { ...state.answers, [id]: choice },
    })),

  submitQuiz: () => {
    const answers = get().answers;
    const profile = scoreQuiz(answers);
    set({ code: profile.code, profile });
    return { code: profile.code, profile }; // allows caller to redirect
  },

  resetQuiz: () => set({ answers: {}, code: null, profile: null }),

  /* ---------- selectors ---------- */
  totalQuestions: QUESTIONS.length,
}));
