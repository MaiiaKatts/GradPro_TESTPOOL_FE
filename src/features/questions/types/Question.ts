import Answer, { AnswerId } from '../../answers/types/answer';
import { TestId } from './../../tests/types/Test';
export default interface Question {
	id: number;
	question: string;
	testId: TestId;
	answers?: string[];
	//answerObjects?: Answer[];
	answerObjects: {
		id: AnswerId;
		answer: string;
	}[];
}

export type QuestionId = Question['id'];
