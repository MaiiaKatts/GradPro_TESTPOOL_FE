import { AnswerId } from '../../answers/types/answer';
import { TestId } from './../../tests/types/Test';
export default interface Question {
	id: number;
	question: string;
	testId: TestId;
	answers?: string[];
	answerObjects: {
		id: AnswerId;
		answer: string;
	}[];
	correctAnswerText?: string;
	questionText?: string;
}

export type QuestionId = Question['id'];
