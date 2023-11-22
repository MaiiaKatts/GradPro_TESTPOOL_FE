import TestResult from './TestResult';

export default interface TestsResultsState {
	testsResults: TestResult[];
	latestTestResult: TestResult;
	error?: string;
}
