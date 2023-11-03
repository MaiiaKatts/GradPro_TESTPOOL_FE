import Test from './types/Test';

export async function getAllTests(): Promise<{ tests: Test[] }> {
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

export async function createTest(name: string, type: string, level: string): Promise<Test> {
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
