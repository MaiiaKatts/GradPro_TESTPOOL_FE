import { AnswerId } from './types/answer';
import { QuestionId } from './../questions/types/Question';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
		correct,
	}: {
		questionId: number;
		answer: string;
		correct: boolean;
		//isCorrect: boolean;
	}) => {
		const response = await api.addAnswer(questionId, answer, correct);
		console.log('Response from server:', response);
		return response;
	}
);

export const updateAnswerDetails = createAsyncThunk(
	'answers/updateAnswer',
	async ({
		questionId,
		id,
		answer,
		correct,
	}: {
		questionId: number;
		id: number;
		answer: string;
		correct: boolean;
	}) => {
		await api.updateAnswer(questionId, id, answer, correct);
		return { id, answer, correct };
	}
);

export const removeAnswer = createAsyncThunk(
	'answers/deleteAnswer',
	async ({ questionId, id }: { questionId: number; id: number }) => {
		await api.deleteAnswer(questionId, id);
		return id;
	}
);

export const correctAnswer = createAsyncThunk(
	'answers/correctAnswer',
	async ({ questionId, answerId }: { questionId: QuestionId; answerId: AnswerId }) => {
		console.log(`Sending correctAnswer for questionId: ${questionId}, answerId: ${answerId}`);
		//await api.correctAnswer(id, questionId);
		//return { id, questionId };
		const res = await api.correctAnswer(questionId, answerId);
		return res;
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
				console.log('Create answer payload:', action.payload);
				state.answers.push(action.payload);
			})
			.addCase(createAnswer.rejected, (state, action) => {
				state.error = action.error.message ?? 'Ошибка при создании ответа.';
			})
			.addCase(updateAnswerDetails.fulfilled, (state, action) => {
				const { id, answer } = action.payload;
				const index = state.answers.findIndex((a) => a.id === id);
				if (index !== -1) {
					state.answers[index].answer = answer;
				}
			})
			.addCase(updateAnswerDetails.rejected, (state, action) => {
				state.error = action.error.message ?? 'Ошибка при обновлении ответа.';
			})
			.addCase(removeAnswer.fulfilled, (state, action) => {
				state.answers = state.answers.filter((answer) => answer.id !== action.payload);
			})
			.addCase(removeAnswer.rejected, (state, action) => {
				state.error = action.error.message ?? 'Ошибка при удалении ответа.';
			})
			.addCase(correctAnswer.fulfilled, (state, action) => {
				state.answers.push(action.payload);
			});
	},
});

export const { resetError } = answersSlice.actions;
export default answersSlice.reducer;
