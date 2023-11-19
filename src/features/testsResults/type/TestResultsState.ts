import TestResult from './TestResult';

export default interface TestsResultsState {
	testsResults: TestResult[];
	error?: string;
}
