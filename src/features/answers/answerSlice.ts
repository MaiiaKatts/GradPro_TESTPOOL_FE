import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AnswerState from './types/AnswerState';
import * as api from './answerApi';

const initialState: AnswerState = {
	answers: [],
	error: undefined,
};

export const loadAllAnswers = createAsyncThunk('answers/fetchAll', async () => {
	const response = await api.getAllAnswers();
	return response;
});

export const createAnswer = createAsyncThunk(
	'answers/createAnswer',
	async ({
		questionId,
		answer,
		isCorrect,
	}: {
		questionId: number;
		answer: string;
		isCorrect: boolean;
	}) => {
		const response = await api.addAnswer(questionId, answer, isCorrect);
		return response;
	}
);

export const updateAnswerDetails = createAsyncThunk(
	'answers/updateAnswer',
	async ({
		questionId,
		answerId,
		answer,
		isCorrect,
	}: {
		questionId: number;
		answerId: number;
		answer: string;
		isCorrect: boolean;
	}) => {
		await api.updateAnswer(questionId, answerId, answer, isCorrect);
		return { answerId, answer, isCorrect };
	}
);

export const removeAnswer = createAsyncThunk(
	'answers/deleteAnswer',
	async ({
		questionId,
		answerId,
	}: {
		questionId: number;
		answerId: number;
	}) => {
		await api.deleteAnswer(questionId, answerId);
		return answerId;
	}
);

const answersSlice = createSlice({
	name: 'answers',
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadAllAnswers.fulfilled, (state, action) => {
				state.answers = action.payload;
			})
			.addCase(loadAllAnswers.rejected, (state, action) => {
				state.error = action.error.message ?? 'Не удалось загрузить ответы.';
			})
			.addCase(createAnswer.fulfilled, (state, action) => {
				state.answers.push(action.payload);
			})
			.addCase(createAnswer.rejected, (state, action) => {
				state.error = action.error.message ?? 'Ошибка при создании ответа.';
			})
			.addCase(updateAnswerDetails.fulfilled, (state, action) => {
				const { answerId, answer } = action.payload;
				const index = state.answers.findIndex((a) => a.id === answerId);
				if (index !== -1) {
					state.answers[index].answer = answer;
				}
			})

			.addCase(updateAnswerDetails.rejected, (state, action) => {
				state.error = action.error.message ?? 'Ошибка при обновлении ответа.';
			})
			.addCase(removeAnswer.fulfilled, (state, action) => {
				state.answers = state.answers.filter(
					(answer) => answer.id !== action.payload
				);
			})
			.addCase(removeAnswer.rejected, (state, action) => {
				state.error = action.error.message ?? 'Ошибка при удалении ответа.';
			});
	},
});

export const { resetError } = answersSlice.actions;
export default answersSlice.reducer;
