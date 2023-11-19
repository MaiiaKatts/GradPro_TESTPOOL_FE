import React from 'react';
import styles from './FAQ.module.css';

export default function FAQ(): JSX.Element {
	return (
		<div className={styles.supportContainer}>
			<div className={styles.termsContainer}>
				<h1 className={styles.header}>Frequently Asked Questions (FAQ)</h1>
				<span className={styles.emphasizedText}>Question 1:</span>
				<span className={styles.regularText}>
					{' '}
					How should I prepare for a technical interview?
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Practice coding,study
					algorithms, data structures, and system design. Also, prepare examples
					of projects you’ve worked on and problems you’ve solved.
				</p>
				<span className={styles.emphasizedText}>Question 2:</span>
				<span className={styles.regularText}>
					{' '}
					What questions should I ask in an interview?{' '}
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Ask about the company
					culture, specific responsibilities of the position, opportunities for
					growth and learning within the company.
				</p>
				<span className={styles.emphasizedText}>Question 3:</span>
				<span className={styles.regularText}>
					{' '}
					How should I behave in an interview?{' '}
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Be punctual, dress
					appropriately, maintain a positive attitude, be confident, and show
					openness to learning.
				</p>
				<span className={styles.emphasizedText}>Question 4:</span>
				<span className={styles.regularText}>
					{' '}
					How do I answer questions about salary?{' '}
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Try to learn the
					employer's offer first, then present your expectations based on market
					standards and your experience.
				</p>
				<span className={styles.emphasizedText}>Question 5:</span>
				<span className={styles.regularText}>
					{' '}
					What should I do if I am nervous before an interview?{' '}
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Practice your
					responses in advance, breathe deeply, try relaxation techniques, and
					remind yourself of your achievements and skills.
				</p>
				<span className={styles.emphasizedText}>Question 6:</span>
				<span className={styles.regularText}>
					{' '}
					How long do interviews usually last?
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> The length of an
					interview can vary, but most last between 30 to 60 minutes. Longer
					interviews might involve multiple rounds or include assessments.
				</p>
				<span className={styles.emphasizedText}>Question 7:</span>
				<span className={styles.regularText}>
					{' '}
					Should I send a follow-up email after the interview?
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Yes, it's a good
					practice to send a thank-you email within 24 hours of your interview.
					It shows your appreciation and interest in the position.
				</p>
				<span className={styles.emphasizedText}>Question 8:</span>
				<span className={styles.regularText}>
					{' '}
					How can I find out more about the company culture?
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Research the
					company’s website, read reviews on employer review sites, and ask
					about the company culture during the interview.
				</p>
				<span className={styles.emphasizedText}>Question 9:</span>
				<span className={styles.regularText}>
					{' '}
					What are some common mistakes to avoid in an interview?
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Common mistakes
					include arriving late, being unprepared, speaking negatively about
					previous employers, and failing to ask questions about the role.
				</p>
				<span className={styles.emphasizedText}>Question 10:</span>
				<span className={styles.regularText}>
					{' '}
					How can I demonstrate my problem-solving skills in an interview?
				</span>
				<p className={styles.paragraph}>
					<span className={styles.boldText}>Answer:</span> Provide specific
					examples of how you've solved problems in past roles. Use the STAR
					method (Situation, Task, Action, Result) to structure your response.
				</p>

				<p className={styles.paragraph_link}>
					If you have any questions, please contact us at{' '}
					<span className={styles.moreInfoLink}>testpool@contact.com.</span>
				</p>
			</div>
		</div>
	);
}
