/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Credentials from './types/Credentials';
import RegisterData from './types/RegisterData';
import User from './types/User';

export async function user(): Promise<{
	id: number;
	email: string;
	role: string;
}> {
	const res = await fetch('/api/users/profile');
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}

export async function login(credentials: Credentials): Promise<User> {
	const res = await fetch('/api/login', {
		method: 'POST',
		body: `username=${credentials.email}&password=${credentials.password}`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
	// реджектим промис если вернулся ошибочный статус
	if (res.status >= 400) {
		// достаем текст ошибки из ответа
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}

export async function register(
	data: RegisterData
): Promise<
	| { id: number; email: string; firstName: string; lastName: string }
	| { message: string }
> {
	const res = await fetch('/api/users/register', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	interface ApiError {
		message: string;
		field: string;
		rejectedValue: string;
	}

	const responseBody = await res.json();

	if (res.status === 400 || res.status === 409) {
		if (responseBody.errors && responseBody.errors.length > 0) {
			const errorMessage = (responseBody.errors as ApiError[])
				.map((err) => `${err.field} ${err.rejectedValue} ${err.message}`)
				.join('\n');
			return { message: errorMessage };
		} else if (
			responseBody.message &&
			responseBody.message.includes('already exists')
		) {
			return { message: responseBody.message };
		}
	}

	return responseBody;
}

export async function confirmRegistration(confirmCode: string): Promise<void> {
	const res = await fetch(`/api/users/confirm/${confirmCode}`);

	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}

	return;
}
// добавила фетч + метод POST вместо PUT
export async function logout(): Promise<void> {
	await fetch('/api/logout', {
		method: 'POST',
	});
}
