/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export default function ProgressBar(): JSX.Element {
	const selectUserProgress = (state: RootState): number => {
		const currentTestResults = state.testsResults.testsResults;
		const latestTestResult = currentTestResults[currentTestResults.length - 1];
		return latestTestResult?.progressPercent || 0;
	};

	const userProgress = useAppSelector(selectUserProgress);

	return (
		<div>
			<progress value={userProgress} max="100"></progress>
			<p>{userProgress}%</p>
		</div>
	);
}
