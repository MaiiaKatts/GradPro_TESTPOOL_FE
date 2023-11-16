import { FormEvent, useState } from 'react';
import Question from './types/Question';
import { useAppDispatch } from '../../app/hooks';
import { updateQuestion } from './questionsSlice';

interface Props {
	question: Question;
}

export default function QuestionEditForm(props: Props): JSX.Element {
	const { question } = props;
	const [toggle, setToggle] = useState<boolean>(false);
	const [text, setText] = useState<string>(question.question);

	const dispatch = useAppDispatch();

	function handleToggle(): void {
		setToggle(!toggle);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		dispatch(
			updateQuestion({
				//id: question.id,
				testId: question.testId,
				question: {
					id: 0,
					question: '',
					testId: 0,
				},
			})
		);
	}
	return (
		<div>
			<button type="button" onClick={handleToggle}>
				Edit
			</button>
			{toggle && (
				<form onSubmit={handleSubmit}>
					<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
					<button type="submit">Save</button>
				</form>
			)}
		</div>
	);
}
