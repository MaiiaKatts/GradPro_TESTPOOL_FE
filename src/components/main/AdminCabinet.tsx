/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCallback, useEffect, useState } from 'react';
import { selectTasks } from '../../features/tasks/selectors';
import { loadTasksOfAll, deleteTask } from '../../features/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TaskId } from '../../features/tasks/types/Task';
import { selectError, selectTests } from '../../features/tests/selectors';
import {
	createTest,
	deleteTest,
	loadTests,
	resetError,
	updateTest,
} from '../../features/tests/testsSlice';
import Test, { TestId } from '../../features/tests/types/Test';

export default function AdminCabinet(): JSX.Element {
	const tasks = useAppSelector(selectTasks);
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
		[dispatch, editName, editType, editLevel, currentTest, setIsEditing, resetError]
	);

	return (
		<>
			<div>Admin cabinet</div>
			<h1>Tests</h1>
			<p>Add test</p>
			<form className="mb-3" onSubmit={handleCreateTest}>
				<div className="input-group">
					<input
						type="text"
						className={`form-control ${error ? 'is-invalid' : ''}`}
						placeholder="Title..."
						aria-label="Title..."
						name="testTitle"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						className={`form-control ${error ? 'is-invalid' : ''}`}
						placeholder="Type..."
						aria-label="Type..."
						name="testType"
						value={type}
						onChange={(e) => setType(e.target.value)}
					/>
					<input
						type="text"
						className={`form-control ${error ? 'is-invalid' : ''}`}
						placeholder="Level..."
						aria-label="Level..."
						name="testLevel"
						value={level}
						onChange={(e) => setLevel(e.target.value)}
					/>
					<button type="submit" className="btn btn-primary">
						Add
					</button>
				</div>
				{error && (
					<div className="invalid-feedback text-end" style={{ display: 'block' }}>
						{error}
					</div>
				)}
			</form>
			{isEditing && (
				<form className="mb-3" onSubmit={handleUpdateTest}>
					<div className="input-group">
						<input
							type="text"
							className={`form-control ${error ? 'is-invalid' : ''}`}
							placeholder="Title..."
							aria-label="Title..."
							name="testTitle"
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
						/>
						<input
							type="text"
							className={`form-control ${error ? 'is-invalid' : ''}`}
							placeholder="Type..."
							aria-label="Type..."
							name="testType"
							value={editType}
							onChange={(e) => setEditType(e.target.value)}
						/>
						<input
							type="text"
							className={`form-control ${error ? 'is-invalid' : ''}`}
							placeholder="Level..."
							aria-label="Level..."
							name="testLevel"
							value={editLevel}
							onChange={(e) => setEditLevel(e.target.value)}
						/>
						<button type="submit" className="btn btn-primary">
							{isEditing ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			)}
			{tests?.map((test) => (
				<li key={test.id}>
					{test.name + ' '}
					{test.type + ' '}
					{test.level + ' '}
					<span
						className="badge bg-primary rounded-pill edit-test"
						role="button"
						onClick={() => startEditing(test)}
						tabIndex={0}
					>
						Edit
					</span>
					<span
						className="badge bg-danger rounded-pill remove-test"
						role="button"
						onClick={() => handleTestRemove(test.id)}
						tabIndex={0}
					>
						Delete
					</span>
				</li>
			))}
		</>
	);
}
