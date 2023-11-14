export default interface Answer {
	id?: number | null;
	answer: string;
	correct: boolean;
	questionId: number;
	question?: string;
	difficultyLevel?: string;
}
