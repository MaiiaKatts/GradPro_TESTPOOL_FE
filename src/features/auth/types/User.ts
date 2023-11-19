export default interface User {
	id: number;
	firstName?: string;
	lastName?: string;
	email: string;
	role?: string;
}

export type UserId = User['id'];
