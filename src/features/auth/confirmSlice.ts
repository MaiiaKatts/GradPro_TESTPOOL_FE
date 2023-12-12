import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ConfirmState from './types/ConfirmState';

export const confirmRegistration = createAsyncThunk(
	'registration/confirm',
	async (confirmCode: string) => {
		const response = await fetch(`/api/users/confirm/${confirmCode}`);
		const data = await response.json();
		return data;
	}
);

const initialState: ConfirmState = {
	user: null,
	error: null,
	status: 'idle',
};

const confirmSlice = createSlice({
	name: 'confirm',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(confirmRegistration.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = 'succeeded';
			})
			.addCase(confirmRegistration.rejected, (state, action) => {
				state.error = action.error.message || null;
				state.status = 'failed';
			});
	},
});

export default confirmSlice.reducer;
