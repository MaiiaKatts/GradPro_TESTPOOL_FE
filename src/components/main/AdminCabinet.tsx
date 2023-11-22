/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectError, selectTests } from '../../features/tests/selectors';
import {
	createTest,
	deleteTest,
	loadTests,
	resetError,
	updateTest,
} from '../../features/tests/testsSlice';
import Test, { TestId } from '../../features/tests/types/Test';
import styles from './AdminCabinet.module.css';

export default function AdminCabinet(): JSX.Element {
	const dispatch = useAppDispatch();
	const tests = useAppSelector(selectTests);
	const error = useAppSelector(selectError);
	const [name, setName] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [level, setLevel] = useState<string>('');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentTest, setCurrentTest] = useState<Test | null>(null);
	const [editName, setEditName] = useState<string>('');
	const [editType, setEditType] = useState<string>('');
	const [editLevel, setEditLevel] = useState<string>('');

	useEffect(() => {
		dispatch(loadTests());
	}, [dispatch]);

	const handleTestRemove = useCallback(
		(id: TestId) => {
			dispatch(deleteTest(id));
		},
		[dispatch]
	);

	const startEditing = useCallback((test: Test) => {
		setIsEditing(true);
		setCurrentTest(test);
		setEditName(test.name);
		setEditType(test.type);
		setEditLevel(test.level);
	}, []);

	const handleCreateTest = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const dispatchResult = await dispatch(createTest({ name, type, level }));
			if (createTest.fulfilled.match(dispatchResult)) {
				setName('');
				setType('');
				setLevel('');
			} else if (createTest.rejected.match(dispatchResult)) {
				dispatch(resetError());
			}
		},
		[dispatch, name, type, level, resetError]
	);

	const handleUpdateTest = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			if (currentTest) {
				const dispatchResult = await dispatch(
					updateTest({
						...currentTest,
						name: editName,
						type: editType,
						level: editLevel,
					})
				);
				if (updateTest.fulfilled.match(dispatchResult)) {
					setIsEditing(false);
					setCurrentTest(null);
					setEditName('');
					setEditType('');
					setEditLevel('');
				} else if (updateTest.rejected.match(dispatchResult)) {
					dispatch(resetError());
				}
			}
		},
		[
			dispatch,
			editName,
			editType,
			editLevel,
			currentTest,
			setIsEditing,
			resetError,
		]
	);

	return (
		<div className={styles.containerHome}>
			<div className={styles.adminCabinet}>
				<h1 className={styles.testHeading}>Admin Cabinet</h1>
				<p className={styles.addTest}>Add test</p>
				<form className={styles.form} onSubmit={handleCreateTest}>
					<div className={styles.inputGroup}>
						<div className={styles.inputRow}>
							<input
								type="text"
								className={`${styles.formControl} ${
									error ? styles.isInvalid : ''
								}`}
								placeholder="Title..."
								aria-label="Title..."
								name="testTitle"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								type="text"
								className={`${styles.formControl} ${
									error ? styles.isInvalid : ''
								}`}
								placeholder="Type..."
								aria-label="Type..."
								name="testType"
								value={type}
								onChange={(e) => setType(e.target.value)}
							/>
							<input
								type="text"
								className={`${styles.formControl} ${
									error ? styles.isInvalid : ''
								}`}
								placeholder="Level..."
								aria-label="Level..."
								name="testLevel"
								value={level}
								onChange={(e) => setLevel(e.target.value)}
							/>
						</div>
						<div className={styles.buttonRow}>
							<button type="submit" className={styles.addButton}>
								Add
							</button>
						</div>
					</div>
					{error && (
						<div className={`${styles.invalidFeedback} ${styles.displayBlock}`}>
							{error}
						</div>
					)}
				</form>
				{isEditing && (
					<form className={styles.form} onSubmit={handleUpdateTest}>
						<div className={styles.inputGroup}>
							<div className={styles.inputRow}>
								<input
									type="text"
									className={`${styles.formControl} ${
										error ? styles.isInvalid : ''
									}`}
									placeholder="Title..."
									aria-label="Title..."
									name="testTitle"
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
								/>
								<input
									type="text"
									className={`${styles.formControl} ${
										error ? styles.isInvalid : ''
									}`}
									placeholder="Type..."
									aria-label="Type..."
									name="testType"
									value={editType}
									onChange={(e) => setEditType(e.target.value)}
								/>
								<input
									type="text"
									className={`${styles.formControl} ${
										error ? styles.isInvalid : ''
									}`}
									placeholder="Level..."
									aria-label="Level..."
									name="testLevel"
									value={editLevel}
									onChange={(e) => setEditLevel(e.target.value)}
								/>
							</div>
							<div className={styles.buttonRow}>
								<button type="submit" className={styles.addButton}>
									{isEditing ? 'Update' : 'Add'}
								</button>
							</div>
						</div>
					</form>
				)}
				{tests?.map((test) => (
					<li key={test.id} className={styles.testItem}>
						{test.name + ' '}
						{test.type + ' '}
						{test.level + ' '}
						<span
							className={styles.editTest}
							role="button"
							onClick={() => startEditing(test)}
							tabIndex={0}
						>
							Edit
						</span>
						<span
							className={styles.removeTest}
							role="button"
							onClick={() => handleTestRemove(test.id)}
							tabIndex={0}
						>
							Delete
						</span>
					</li>
				))}
			</div>
		</div>
	);
}
