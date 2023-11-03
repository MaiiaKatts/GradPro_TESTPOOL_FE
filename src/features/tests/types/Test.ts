export default interface Test {
	id: number;
	name: string;
	type: string;
	level: string;
}

export type TestId = Test['id'];
