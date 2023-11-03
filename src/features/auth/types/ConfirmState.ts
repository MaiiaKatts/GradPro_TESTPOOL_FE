export default interface ConfirmState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	user: any | null;
	error: string | null;
	status: 'idle' | 'succeeded' | 'failed';
}
