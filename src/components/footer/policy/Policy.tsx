import React from 'react';
import styles from './Policy.module.css'; // Ensure this path matches your file structure

export default function PrivacyPolicy(): JSX.Element {
	return (
		<div className={styles.supportContainer}>
			<div className={styles.policyContainer}>
				<h1 className={styles.header}>Privacy Policy</h1>
				<p className={styles.lastUpdated}>Last Updated: 19.12.2023</p>

				<h3 className={styles.sectionTitle}>1. Introduction</h3>
				<p className={styles.paragraph}>
					At DevInterviewPrep, your privacy is of great importance to us. This
					Privacy Policy outlines the types of personal information we collect,
					how it is used, and the steps we take to ensure it is protected.
				</p>

				<h3 className={styles.sectionTitle}>2. Information We Collect</h3>
				<p className={styles.paragraph}>
					We collect personal information such as your name, email address, and
					contact details when you register for an account, participate in
					quizzes, or submit code for review. We also collect performance data
					to track your progress and tailor your learning experience.
				</p>

				<h3 className={styles.sectionTitle}>3. How We Use Your Information</h3>
				<p className={styles.paragraph}>
					The information collected is used to personalize your experience,
					provide customer support, improve our resources, and, with your
					consent, share success stories with potential employers.
				</p>

				<h3 className={styles.sectionTitle}>4. Sharing Your Information</h3>
				<p className={styles.paragraph}>
					Your personal information is not shared with third parties for
					marketing purposes. We may share anonymized performance data with
					partners for research and analysis. Any sharing of information is
					conducted in compliance with data protection laws.
				</p>

				<h3 className={styles.sectionTitle}>5. Security of Your Information</h3>
				<p className={styles.paragraph}>
					We employ robust security measures to protect your data from
					unauthorized access, alteration, disclosure, or destruction. These
					include internal reviews of our data collection, storage, processing
					practices, and security measures, as well as physical security
					measures.
				</p>

				<h3 className={styles.sectionTitle}>6. Your Rights</h3>
				<p className={styles.paragraph}>
					You have the right to view, edit, or delete your personal information
					at any time. Please contact us directly to request access to or
					modification of your data.
				</p>

				<h3 className={styles.sectionTitle}>
					7. Changes to Our Privacy Policy
				</h3>
				<p className={styles.paragraph}>
					We may update this Privacy Policy to reflect changes to our
					information practices. If we make any material changes, we will notify
					you by email (sent to the e-mail address specified in your account) or
					by means of a notice on this Site prior to the change becoming
					effective.
				</p>

				<h3 className={styles.sectionTitle}>8. Contact Us</h3>
				<p className={styles.paragraph}>
					If you have any questions or concerns regarding our Privacy Policy or
					data processing, please contact us at
					<span className={styles.moreInfoLink}> testpool@contact.com.</span>
				</p>
			</div>
		</div>
	);
}
