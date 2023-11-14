import Answer from './types/answer';

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

export async function correctAnswer(answer: Answer): Promise<void> {
	if (typeof answer.id === 'number' && typeof answer.questionId === 'number') {
		const response = await fetch(`/api/questions/${answer.questionId}/answers/${answer.id}`, {
			method: 'POST',
			body: JSON.stringify({
				answer: answer.answer,
				correct: answer.correct,
				questionId: answer.questionId,
			}),
			headers: {
				accept: 'application/json',
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText);
		}
	} else {
		throw new Error('Answer id or questionId is undefined');
	}
}

export async function updateAnswer(
	questionId: number,
	answerId: number,
	answerText: string,
	correct: boolean
): Promise<Answer> {
	const response = await fetch(`/api/questions/${questionId}/answers/${answerId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		body: JSON.stringify({ answer: answerText, questionId, correct }),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText);
	}

	return response.json();
}

export async function deleteAnswer(questionId: number, answerId: number): Promise<void> {
	const res = await fetch(`/api/questions/${questionId}/answers/${answerId}`, {
		method: 'DELETE',
	});

	if (res.status >= 400) {
		const errorText = await res.text();
		throw new Error(errorText);
	}
}
