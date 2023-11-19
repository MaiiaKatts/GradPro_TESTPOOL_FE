/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RootState } from '../../app/store';
import TestResult from './type/TestResult';

export const selectTestsResults = (state: RootState): TestResult[] =>
	state.testsResults.testsResults;
/*export const selectLastSavedTestResult = (state: RootState): TestResult | null =>
	state.testsResults.lastSavedResult;*/
export const selectError = (state: RootState): string | undefined => state.testsResults.error;
