import { TestId } from './../../tests/types/Test';
export default interface Question {
	id: number;
	question: string;
	testId: TestId;
}

export type QuestionId = Question['id'];
