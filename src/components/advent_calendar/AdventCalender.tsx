import React, { useState } from 'react';
import styles from './AdventCalender.module.css';

interface QuestionAndAnswer {
	question: string;
	answer: string;
}

const questionsAndAnswers: { [key: string]: QuestionAndAnswer } = {
	'1': {
		question:
			'What is the name of the tool in Visual Studio used for systematically tracking source code changes? ',
		answer: 'git',
	},
	'2': {
		question:
			'What term is used for the process of checking the code back into the central repository?',
		answer: 'commit',
	},
	'3': {
		question:
			'Which Redux middleware is used for handling asynchronous actions in a Redux store setup? ',
		answer: 'thunk',
	},
	'4': {
		question:
			'What would you use to describe the visual structure of an XML document? ',
		answer: 'tree',
	},
	'5': {
		question: 'What prefix is used in C# to handle exceptions?  ',
		answer: 'try',
	},
	'6': {
		question:
			'What is the term for a function that can refer to and modify variables outside of its current scope?',
		answer: 'yclosure',
	},
	'7': {
		question:
			'Which protocol is commonly used for securing communication over the internet? ',
		answer: 'https',
	},
	'8': {
		question:
			'What is the term for a block of code that is passed as an argument to a function in JavaScript? ',
		answer: 'callback',
	},
	'9': {
		question:
			'What do we call the Visual Studio tool that allows for a visual interface to manage SQL databases?  ',
		answer: 'server explorer',
	},
	'10': {
		question:
			'Which HTML element is used for embedding a JavaScript file into a webpage? ',
		answer: 'script',
	},
	'11': {
		question:
			'What CSS property is used for changing the text color of an element? ',
		answer: 'color',
	},
	'12': {
		question:
			' What is the name of the process to ensure the application runs correctly in different environments? ',
		answer: 'testing',
	},
	'13': {
		question:
			'Which command in Git is used to create a copy of a repository?  ',
		answer: 'clone',
	},
	'14': {
		question:
			'What acronym refers to the set of tools and services developers use to manage and automate software development processes?  ',
		answer: 'DevOps',
	},
	'15': {
		question:
			'What is the name of the RTK function used to create a Redux slice? ',
		answer: 'CreateSlice',
	},
	'16': {
		question:
			'What term describes the practice of writing tests for small pieces of functionality in the code? ',
		answer: ' unit testing',
	},
	'17': {
		question:
			'Which JavaScript data type is used for storing multiple values in a single variable? ',
		answer: 'array',
	},
	'18': {
		question:
			'What is the standard interface for debugging scripts in Visual Studio? ',
		answer: 'debugger',
	},
	'19': {
		question:
			'What is the name of the RTK API that generates action creators and reducers? ',
		answer: 'CreateAction',
	},
	'20': {
		question:
			'What is the command to revert your working directory to the last commit in Git? ',
		answer: 'reset',
	},
	'21': {
		question:
			'What do we call a UI component that is controlled by JavaScript instead of traditional user input? ',
		answer: 'dynamic',
	},
	'22': {
		question:
			' In CSS, what property is used to change the font size of an element?  ',
		answer: 'Font-size',
	},
	'23': {
		question:
			'What is the name of the RTK function used to create a Redux slice? ',
		answer: 'Dictionary',
	},
	'24': {
		question:
			'What type of testing evaluates the software from the perspective of a user? ',
		answer: 'user testing',
	},
};

export default function AdventCalendar(): JSX.Element {
	const [answers, setAnswers] = useState<{ [key: string]: string }>({});
	const [openedDays, setOpenedDays] = useState<{ [key: string]: boolean }>({});

	const handleInputChange = (day: string, userAnswer: string): void => {
		setAnswers({ ...answers, [day]: userAnswer.toLowerCase() });
	};

	const checkAnswer = (day: string): string => {
		if (answers[day] === undefined) {
			return '';
		}
		return answers[day] === questionsAndAnswers[parseInt(day)].answer
			? styles.correct
			: styles.incorrect;
	};

	const handleDayClick = (day: string): void => {
		setOpenedDays({ ...openedDays, [day]: true });
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.calenderContainer}>
				<h1 className={styles.header}>Advent Calendar</h1>
				<div className={styles.calendar}>
					{Object.keys(questionsAndAnswers).map((day) => (
						<div
							key={day}
							className={`${styles.day} ${styles['day' + day]} ${
								openedDays[day] ? styles.open : ''
							}`}
							onClick={() => handleDayClick(day)}
						>
							{!openedDays[day] ? (
								<div className={styles.dayNumber}>{day}</div>
							) : (
								<div className={styles.content}>
									<div className={`${styles.question} ${checkAnswer(day)}`}>
										{questionsAndAnswers[day].question}
									</div>
									<input
										type="text"
										className={styles.answer}
										onChange={(e) => handleInputChange(day, e.target.value)}
										value={answers[day] || ''}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
