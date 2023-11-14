import Question from './Question';

export default interface QuestionsState {
	questions: Question[];
	randomQuestions: Question[];
	error?: string;
}
