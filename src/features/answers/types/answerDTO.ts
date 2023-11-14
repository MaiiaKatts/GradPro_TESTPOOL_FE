export default interface AnswerDTO {
	id?: number;
	answer: string;
	correct: boolean;
	questionText?: string;
	difficultyLevel?: string;
}
