/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { AnswerId } from '../answers/types/answer';
import { UserId } from '../auth/types/User';
import { TestId } from '../tests/types/Test';
import TestResult from './type/TestResult';

interface Error {
	message: string;
	field: string;
	rejectedValue: string;
}

export async function getTestsResult(userId: UserId): Promise<TestResult[]> {
	const res = await fetch(`/api/testResults/users/${userId}`);

	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}

	return res.json();
}

export async function saveTestResult(testId: TestId, userAnswers: AnswerId[]): Promise<TestResult> {
	const userAnswersQuery = userAnswers.map((answerId) => `userAnswers=${answerId}`).join('&');
	const url = `/api/tests/${testId}/saveResult?${userAnswersQuery}`;

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
