export default interface Answer {
	id: number;
	answer: string;
	correct: boolean;
	questionId: number;
	question?: string;
	difficultyLevel?: string;
}
