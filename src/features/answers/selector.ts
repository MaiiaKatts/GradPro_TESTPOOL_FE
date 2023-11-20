/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RootState } from '../../app/store';
import Answer from './types/answer';

export const selectAnswers = (state: RootState): Answer[] =>
	state.answers.answers;
export const selectError = (state: RootState): string | undefined =>
	state.answers.error;
