import { FormEvent, useState } from 'react';
import Answer from './types/answer';
import { useAppDispatch } from '../../app/hooks';
import { updateAnswerDetails } from './answersSlice';
import styles from './AnswerEditForm.module.css';

interface Props {
	answer: Answer;
}

export default function AnswerEditForm(props: Props): JSX.Element {
	const { answer } = props;
	const [toggle, setToggle] = useState<boolean>(false);
	const [text, setText] = useState<string>(answer.answer);
	const [correct, setCorrect] = useState<boolean>(answer.correct);

	function handleToggle(): void {
		setToggle(!toggle);
	}

	const dispatch = useAppDispatch();

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		dispatch(
			updateAnswerDetails({
				id: answer.id,
				questionId: answer.questionId,
				answer: text,
				correct,
			})
		);
	}
	return (
		<div className={styles.containerHome}>
			<button
				className={styles.editButton}
				type="button"
				onClick={handleToggle}
			>
				Edit
			</button>
			<div className={styles.containerSave}>
				{toggle && (
					<form onSubmit={handleSubmit} className={styles.formInline}>
						<input
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<select
							value={String(correct)}
							onChange={(e) => setCorrect(Boolean(e.target.value))}
						>
							<option value="false">Incorrect</option>
							<option value="true">Correct</option>
						</select>
						<button className={styles.saveButton} type="submit">
							Save
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
