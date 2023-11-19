/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UserId } from './../auth/types/User';
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TestResultsState from './type/TestResultsState';
import * as api from './api';
import { TestId } from '../tests/types/Test';
import { AnswerId } from '../answers/types/answer';

export const initialState: TestResultsState = {
	testsResults: [],
	error: undefined,
};

export const loadTestsResult = createAsyncThunk('testsResults/loadTestsResult', (userId: UserId) =>
	api.getTestsResult(userId)
);

export const saveTestResult = createAsyncThunk(
	'testsResults/saveTestResult',
	async ({ testId, userAnswers }: { testId: TestId; userAnswers: AnswerId[] }) => {
		const savedTestResult = await api.saveTestResult(testId, userAnswers);
		return savedTestResult;
	}
);

const testsResultsSlice = createSlice({
	name: 'testsResults',
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadTestsResult.fulfilled, (state, action) => {
				console.log('state.testsResults load', state.testsResults);
				state.testsResults = action.payload;
			})
			.addCase(loadTestsResult.rejected, (state, action) => {
				console.log('state.testsResults load error', state.error);
				state.error = action.error.message;
			})
			.addCase(saveTestResult.fulfilled, (state, action) => {
				state.testsResults.push(action.payload);
			})
			.addCase(saveTestResult.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export const { resetError } = testsResultsSlice.actions;

export default testsResultsSlice.reducer;
