import Answer from './answer';

export default interface AnswerState {
	answers: Answer[];
	error?: string;
}
