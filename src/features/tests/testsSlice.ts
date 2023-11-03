import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TestsState from './types/TestsState';
import * as api from './api';

const initialState: TestsState = {
	tests: [],
	error: undefined,
};

export const createTest = createAsyncThunk(
	'tests/createTest',
	async ({ name, type, level }: { name: string; type: string; level: string }) => {
		if (!name.trim() || !type.trim() || !level.trim()) {
			throw new Error('All fields should be filled in');
		}
		return api.createTest(name, type, level);
	}
);

export const loadTests = createAsyncThunk('tests/loadTests', () => api.getAllTests());

const testsSlice = createSlice({
	name: 'tests',
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadTests.fulfilled, (state, action) => {
				state.tests = action.payload.tests;
			})
			.addCase(loadTests.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(createTest.fulfilled, (state, action) => {
				state.tests.push(action.payload);
			})
			.addCase(createTest.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export const { resetError } = testsSlice.actions;

export default testsSlice.reducer;
