/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Test, { TestId } from './types/Test';

export async function getAllTests(): Promise<Test[]> {
	const result = await fetch('/api/tests');

	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (result.status >= 400) {
		const { errors }: { errors: Error[] } = await result.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}

	return result.json();
}

export async function createTest(
	name: string,
	type: string,
	level: string
): Promise<Test> {
	const res = await fetch('/api/tests', {
		method: 'POST',
		body: JSON.stringify({ name, type, level }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return res.json();
}

export async function updateTest(test: Test): Promise<Test> {
	const res = await fetch(`/api/tests/${test.id}`, {
		method: 'PUT',
		body: JSON.stringify({
			name: test.name,
			type: test.type,
			level: test.level,
		}),
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}

	return res.json();
}

export async function deleteTest(test_id: TestId): Promise<Test> {
	const res = await fetch(`/api/tests/${test_id}`, {
		method: 'DELETE',
	});

	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (res.status >= 400) {
		const { errors }: { errors: Error[] } = await res.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return res.json();
}
