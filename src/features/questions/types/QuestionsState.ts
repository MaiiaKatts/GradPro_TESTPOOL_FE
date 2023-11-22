import { CorrectAnswerResponse } from '../api';
import Question from './Question';

export default interface QuestionsState {
	questions: Question[];
	randomQuestions: Question[];
	questionWithCorrectAnswer: CorrectAnswerResponse | null;
	error?: string;
}
