import { TestId } from './../../tests/types/Test';
export default interface Question {
	id: number;
	question: string;
	testId: TestId;
	answers?: string[];
}

export type QuestionId = Question['id'];
