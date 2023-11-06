import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TestsState from './types/TestsState';
import * as api from './api';
import Test, { TestId } from './types/Test';

const initialState: TestsState = {
	tests: [],
	error: undefined,
};

export const createTest = createAsyncThunk(
	'tests/createTest',
	async ({ name, type, level }: { name: string; type: string; level: string }) => {
		console.log('createTest called with:', name, type, level);
		if (!name.trim() || !type.trim() || !level.trim()) {
			throw new Error('All fields should be filled in');
		}
		return api.createTest(name, type, level);
	}
);

export const loadTests = createAsyncThunk('tests/loadTests', () => api.getAllTests());

export const deleteTest = createAsyncThunk('tests/deleteTest', async (test_id: TestId) => {
	await api.deleteTest(test_id);
	return test_id;
});

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
				console.log('state.tests load', state.tests);
				state.tests = action.payload;
			})
			.addCase(loadTests.rejected, (state, action) => {
				console.log('state.tests load error', state.error);
				state.error = action.error.message;
			})
			.addCase(createTest.fulfilled, (state, action) => {
				console.log('state.tests before push', state.tests);
				state.tests.push(action.payload);
			})
			.addCase(createTest.rejected, (state, action) => {
				console.log('rejected action', action);
				state.error = action.error.message;
			})
			.addCase(deleteTest.fulfilled, (state, action) => {
				state.tests = state.tests.filter((test) => test.id !== action.payload);
			});
	},
});

export const { resetError } = testsSlice.actions;

export default testsSlice.reducer;
