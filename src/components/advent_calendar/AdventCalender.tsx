/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import styles from './AdventCalender.module.css';

interface CalendarContent {
	type: 'question' | 'article';
	content: string;
	answer?: string;
	link?: string;
}

const questionsAndContents: { [key: string]: CalendarContent } = {
	'1': {
		type: 'question',
		content:
			'What is the name of the tool in Visual Studio used for systematically tracking source code changes? ',
		answer: 'git',
	},
	'2': {
		type: 'question',
		content:
			'What term is used for the process of checking the code back into the central repository?',
		answer: 'commit',
	},
	'3': {
		type: 'article',
		content: 'Understanding Closures in JavaScript" by MDN Web Docs: ',
		link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
	},
	'4': {
		type: 'question',
		content:
			'What would you use to describe the visual structure of an XML document? ',
		answer: 'tree',
	},
	'5': {
		type: 'question',
		content:
			'What term describes tests that validate individual units of source code?',
		answer: 'unittest',
	},
	'6': {
		type: 'article',
		content: 'Introducing Hooks" by React:',
		link: 'https://legacy.reactjs.org/docs/hooks-intro.html',
	},
	'7': {
		type: 'question',
		content:
			'Which protocol is commonly used for securing communication over the internet? ',
		answer: 'https',
	},
	'8': {
		type: 'question',
		content:
			'What is the term for a block of code that is passed as an argument to a function in JavaScript? ',
		answer: 'callback',
	},
	'9': {
		type: 'article',
		content: 'Redux Toolkit Quick Start" by Redux:',
		link: 'https://redux.js.org/tutorials/quick-start',
	},
	'10': {
		type: 'question',
		content:
			'Which HTML element is used for embedding a JavaScript file into a webpage? ',
		answer: 'script',
	},
	'11': {
		type: 'question',
		content:
			'What CSS property is used for changing the text color of an element? ',
		answer: 'color',
	},
	'12': {
		type: 'question',
		content:
			' What is the name of the process to ensure the application runs correctly in different environments? ',
		answer: 'testing',
	},
	'13': {
		type: 'article',
		content:
			'Discover the world of Git: Learn what Git is and how it revolutionizes version control in software development.',

		link: 'https://www.atlassian.com/git/tutorials/what-is-git',
	},
	'14': {
		type: 'question',
		content:
			'What acronym refers to the set of tools and services developers use to manage and automate software development processes?  ',
		answer: 'devops',
	},
	'15': {
		type: 'article',
		content: 'Redux Toolkit Tutorial" by Valentin Garcia: ',
		link: 'https://www.youtube.com/watch?v=9zySeP5vH9c',
	},

	'16': {
		type: 'question',
		content:
			'Which JavaScript data type is used for storing multiple values in a single variable? ',
		answer: 'array',
	},
	'17': {
		type: 'article',
		content: 'Exploring the Basics of Git Version Control',
		link: 'https://medium.com/@theenobledev/introduction-to-git-and-version-control-for-beginners-631a00d645a1',
	},
	'18': {
		type: 'question',
		content:
			'What is the standard interface for debugging scripts in Visual Studio? ',
		answer: 'debugger',
	},
	'19': {
		type: 'article',
		content:
			'Git and GitHub for Beginners - Crash Course" by freeCodeCamp.org: ',
		link: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
	},
	'20': {
		type: 'question',
		content:
			'What is the command to revert your working directory to the last commit in Git? ',
		answer: 'reset',
	},
	'21': {
		type: 'question',
		content:
			'What do we call a UI component that is controlled by JavaScript instead of traditional user input? ',
		answer: 'dynamic',
	},
	'22': {
		type: 'article',
		content: 'End-to-End Testing: A Detailed Guide" by BrowserStack:',
		link: 'https://www.browserstack.com/guide/end-to-end-testing',
	},
	'23': {
		type: 'question',
		content: 'JavaScript Arrays: Explained" by freeCodeCamp.org ',
		answer: 'dictionary',
	},
	'24': {
		type: 'article',
		content: 'REST API: Your Guide to Getting Started Quickly" by Stackify:',
		link: 'https://stackify.com/rest-api-tutorial/',
	},
};

const generateSnowflakes = (): JSX.Element[] => {
	const totalSnowflakes = 50;
	const snowflakes = [];
	for (let i = 0; i < totalSnowflakes; i++) {
		let size = 'small';
		if (i % 3 === 0) size = 'medium';
		if (i % 5 === 0) size = 'large';

		const style = {
			left: `${Math.random() * 100}%`,
			top: `${-10 + Math.random() * 120}vh`,
			animationDelay: `${Math.random() * 5}s`,
			animationDuration: `${Math.random() * 5 + 5}s`,
		};

		snowflakes.push(
			<div
				key={i}
				className={`${styles.snowflake} ${styles[size]}`}
				style={style}
			></div>
		);
	}

	return snowflakes;
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
		return questionsAndContents[day].type === 'question' &&
			answers[day] === questionsAndContents[day].answer
			? styles.correct
			: styles.incorrect;
	};

	const handleDayClick = (day: string): void => {
		setOpenedDays({ ...openedDays, [day]: true });
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.calenderContainer}>
				{generateSnowflakes()}
				<h1 className={styles.header}>Advent Calendar</h1>
				<div className={styles.calendar}>
					{Object.keys(questionsAndContents).map((day) => (
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
									{questionsAndContents[day].type === 'question' ? (
										<>
											<div className={`${styles.question} ${checkAnswer(day)}`}>
												{questionsAndContents[day].content}
											</div>
											<input
												type="text"
												className={styles.answer}
												onChange={(e) => handleInputChange(day, e.target.value)}
												value={answers[day] || ''}
											/>
										</>
									) : (
										<div className={styles.content}>
											<p className={styles.articleContent}>
												{questionsAndContents[day].content}
											</p>
											{questionsAndContents[day].link && (
												<a
													href={questionsAndContents[day].link}
													target="_blank"
													rel="noopener noreferrer"
												>
													Read Article
												</a>
											)}
										</div>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
