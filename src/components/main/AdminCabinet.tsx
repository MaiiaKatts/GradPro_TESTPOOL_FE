/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCallback, useEffect, useState } from 'react';
import { selectTasks } from '../../features/tasks/selectors';
import { loadTasksOfAll, deleteTask } from '../../features/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TaskId } from '../../features/tasks/types/Task';
import { selectError, selectTests } from '../../features/tests/selectors';
import { createTest, deleteTest, loadTests, resetError } from '../../features/tests/testsSlice';
import { TestId } from '../../features/tests/types/Test';

export default function AdminCabinet(): JSX.Element {
	const tasks = useAppSelector(selectTasks);
	const dispatch = useAppDispatch();
	const tests = useAppSelector(selectTests);
	const error = useAppSelector(selectError);
	const [name, setName] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [level, setLevel] = useState<string>('');

	useEffect(() => {
		dispatch(loadTasksOfAll());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadTests());
	}, [dispatch]);

	const handleTaskRemove = useCallback(
		(id: TaskId) => {
			dispatch(deleteTask(id));
		},
		[dispatch]
	);

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(createTest({ name, type, level }));
			if (createTest.fulfilled.match(dispatchResult)) {
				setLevel('');
				setType('');
				setName('');
			}
			if (createTest.rejected.match(dispatchResult)) {
				dispatch(resetError());
			}
		},
		[dispatch, level, type, name]
	);

	const handleTestRemove = useCallback(
		(id: TestId) => {
			dispatch(deleteTest(id));
		},
		[dispatch]
	);

	return (
		<>
			<div>Admin cabinet</div>
			<h3>Все таски, без привязки к юзерам</h3>
			<ul>
				{tasks?.map((element) => (
					<li key={element.id}>
						{element.name} {element.description}
						<span
							className="badge bg-danger rounded-pill remove-task"
							role="button"
							onClick={() => handleTaskRemove(element.id)}
							tabIndex={0}
						>
							удалить
						</span>
					</li>
				))}
			</ul>
			<h1>Tests</h1>
			<p>Add test</p>
			<form className="mb-3" onSubmit={handleSubmit}>
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
						add
					</button>
				</div>
				{error && (
					<div className="invalid-feedback text-end" style={{ display: 'block' }}>
						{error}
					</div>
				)}
			</form>
			{tests?.map((test) => (
				<li key={test.id}>
					{test.name + ' '}
					{test.type + ' '}
					{test.level + ' '}
					<span
						className="badge bg-danger rounded-pill remove-task"
						role="button"
						onClick={() => handleTestRemove(test.id)}
						tabIndex={0}
					>
						удалить
					</span>
				</li>
			))}
		</>
	);
}
