import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import tasksSlice from '../features/tasks/tasksSlice';
import modalSlice from '../features/auth/modalSlice';
import answerSlice from '../features/answers/answerSlice';
import questionsSlice from '../features/questions/questionsSlice';
import testsSlice from '../features/tests/testsSlice';
import testsResultsSlice from '../features/testsResults/testsResultsSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		tasks: tasksSlice,
		tests: testsSlice,
		modal: modalSlice,
		questions: questionsSlice,
		answers: answerSlice,
		testsResults: testsResultsSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
