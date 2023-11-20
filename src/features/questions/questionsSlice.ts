/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import QuestionsState from './types/QuestionsState';
import { TestId } from '../tests/types/Test';
import * as api from './api';
import Question, { QuestionId } from './types/Question';

const initialState: QuestionsState = {
	questions: [],
	randomQuestions: [],
	error: undefined,
};

export const createQuestion = createAsyncThunk(
	'questions/createQuestion',
	async ({ testId, question }: { testId: TestId; question: string }) => {
		if (!testId || !question.trim()) {
			throw new Error('All fields should be filled in');
		}
		const newQuestion = await api.createQuestion(testId, question);
		return newQuestion;
	}
);

export const loadQuestions = createAsyncThunk('questions/loadQuestions', () =>
	api.getAllQuestions()
);

export const loadRandomQuestions = createAsyncThunk(
	'questions/loadRandomQuestions',
	async (testId: TestId, { rejectWithValue }) => {
		try {
			const res = await api.getRandomQuestions(testId);
			return res;
		} catch (err) {
			return rejectWithValue(
				err instanceof Error ? err.message : 'An unknown error occurred'
			);
		}
	}
);

export const updateQuestion = createAsyncThunk(
	'questions/updateQuestion',
	async ({ testId, question }: { testId: TestId; question: Question }) => {
		const updatedQuestion = await api.updateQuestion(testId, question);
		return updatedQuestion;
	}
);

export const deleteQuestion = createAsyncThunk(
	'questions/deleteQuestion',
	async ({ testId, id }: { testId: TestId; id: QuestionId }) => {
		await api.deleteQuestion(testId, id);
		return { testId, id };
	}
);

const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadQuestions.fulfilled, (state, action) => {
				state.questions = action.payload;
			})
			.addCase(loadQuestions.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				state.questions.push(action.payload);
			})
			.addCase(createQuestion.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(updateQuestion.fulfilled, (state, action) => {
				state.questions = state.questions.map((question) => {
					if (question.id === action.payload.id) {
						return action.payload;
					} else {
						return question;
					}
				});
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				const { testId, id } = action.payload;
				state.questions = state.questions.filter(
					(question) => question.id !== id || question.testId === testId
				);
			})
			.addCase(loadRandomQuestions.fulfilled, (state, action) => {
				state.randomQuestions = action.payload;
			})
			.addCase(loadRandomQuestions.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export const { resetError } = questionsSlice.actions;

export default questionsSlice.reducer;
