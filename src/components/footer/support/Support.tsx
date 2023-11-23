/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import styles from './Support.module.css';

export default function Support(): JSX.Element {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// код для обработки данных формы
		console.log(name, email, message);
		//setName('');
		//setEmail('');
		//setMessage('');
	};

	return (
		<div className={styles.supportContainer}>
			<div className={styles.supportTitle}>Need Help?</div>
			<p className={styles.supportText}>
				Our team is here to help you with any questions or issues. Fill out the
				form below and we will get back to you as soon as possible.
			</p>
			<div className={styles.container}>
				<form onSubmit={handleSubmit} className={styles.authForm}>
					<div className={styles.formGroup}>
						<label htmlFor="name" className={styles.formLabel}>
							Name:
						</label>
						<input
							type="text"
							className={styles.inputField}
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="email" className={styles.formLabel}>
							email*:
						</label>
						<input
							type="email"
							id="email"
							className={styles.inputField}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="message" className={styles.formLabel}>
							Your Message*:
						</label>
						<textarea
							id="message"
							className={styles.inputField}
							//rows="4"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
						/>
					</div>
					<div className={styles.submitButtonContainer}>
						<button type="submit" className={styles.supportLink}></button>
					</div>
				</form>
			</div>
		</div>
	);
}
