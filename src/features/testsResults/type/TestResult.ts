import { TestId } from '../../tests/types/Test';

export default interface TestResult {
	id: number;
	userId: number;
	testId: TestId;
	score: number;
	date: string;
	progressPercent: number;
}
