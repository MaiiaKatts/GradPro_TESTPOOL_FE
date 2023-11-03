// eslint-disable-next-line import/default
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectError, selectTests } from './selectors';
import { createTest, loadTests, resetError } from './testsSlice';

export default function Tests(): JSX.Element {
	const tests = useAppSelector(selectTests);
	const error = useAppSelector(selectError);
	const [name, setName] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [level, setLevel] = useState<string>('');
	const dispatch = useAppDispatch();

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(createTest({ name, type, level }));
			if (createTest.fulfilled.match(dispatchResult)) {
				setLevel('');
				setType('');
				setName('');
			}
			if (createTest.fulfilled.match(dispatchResult)) {
				dispatch(resetError());
			}
		},
		[dispatch, level, type, name]
	);

	useEffect(() => {
		dispatch(loadTests());
	}, [dispatch]);

	return (
		<div>
			<h1>Tests</h1>
			<p>Добавить задачу</p>
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
						добавить
					</button>
				</div>
				{error && (
					<div className="invalid-feedback text-end" style={{ display: 'block' }}>
						{error}
					</div>
				)}
			</form>
			{tests.map((test) => (
				<li key={test.id}>
					{test.name}
					{test.type}
					{test.level}
				</li>
			))}
		</div>
	);
}
