import Question from './types/Question';
import { RootState } from '../../app/store';

export const selectQuestions = (state: RootState): Question[] => state.questions.questions;
export const selectRandomQuestions = (state: RootState): Question[] =>
	state.questions.randomQuestions;
export const selectError = (state: RootState): string | undefined => state.questions.error;
