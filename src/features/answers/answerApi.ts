import { QuestionId } from '../questions/types/Question';
import Answer, { AnswerId } from './types/answer';

interface Error {
	message: string;
	field: string;
	rejectedValue: string;
}

export async function getAllAnswers(): Promise<Answer[]> {
	const res = await fetch('/api/answers', {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	});

	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}

	return res.json();
}

export async function addAnswer(
	questionId: number,
	answerText: string,
	correct: boolean
): Promise<Answer> {
	const res = await fetch(`/api/questions/${questionId}/answers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		body: JSON.stringify({ answer: answerText, questionId, correct }),
	});

	if (!res.ok) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}

	return res.json();
}

/*export async function correctAnswer(questionId: QuestionId, answerId: AnswerId): Promise<Answer> {
	const res = await fetch(`/api/questions/${questionId}/answers/${answerId}`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
	});

	const { errors }: { errors: Error[] } = await res.json();
	errors.forEach((err) => {
		throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
	});
	return res.json();
}*/

export async function correctAnswer(
	questionId: QuestionId,
	answerId: AnswerId
): Promise<Answer> {
	const url = `/api/questions/${questionId}/answers/${answerId}?selectedAnswerId=${answerId}`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
	});

	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return res.json();
}

export async function updateAnswer(
	questionId: number,
	answerId: number,
	answerText: string,
	correct: boolean
): Promise<Answer> {
	console.log(
		`API request to /api/questions/${questionId}/answers/${answerId}`
	);
	const response = await fetch(
		`/api/questions/${questionId}/answers/${answerId}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify({ answer: answerText, questionId, correct }),
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText);
	}

	return response.json();
}

export async function deleteAnswer(
	questionId: number,
	answerId: number
): Promise<void> {
	const res = await fetch(`/api/questions/${questionId}/answers/${answerId}`, {
		method: 'DELETE',
	});

	if (res.status >= 400) {
		const errorText = await res.text();
		throw new Error(errorText);
	}
}
