/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './TermOfUse.module.css';

export default function TermOfUse(): JSX.Element {
	return (
		<div className={styles.supportContainer}>
			<div className={styles.termsContainer}>
				<h1 className={styles.header}>Terms of Use</h1>
				<p className={styles.lastUpdated}>Last Updated: 19.11.2023</p>

				<h3 className={styles.sectionTitle}>1. Introduction</h3>
				<p className={styles.paragraph}>
					Welcome to DevInterviewPrep. These Terms of Use ("Terms") govern your
					access to and use of our website and services ("Services"), which are
					designed to assist in preparing for technical interviews in backend,
					frontend, and software testing. By accessing or using the Services,
					you agree to be bound by these Terms and our Privacy Policy. Please
					read them carefully.
				</p>

				<h3 className={styles.sectionTitle}>2. Educational Use Only</h3>
				<p className={styles.paragraph}>
					The Services are intended for educational purposes only.
					DevInterviewPrep provides various resources, including but not limited
					to coding challenges, mock interviews, and instructional content,
					which are to be used solely as study aids for personal career
					development. Commercial use or redistribution of any content provided
					by DevInterviewPrep is strictly prohibited unless expressly authorized
					by us.
				</p>

				<h3 className={styles.sectionTitle}>3. User Contributions</h3>
				<p className={styles.paragraph}>
					DevInterviewPrep may allow you to submit or post content, including
					code, answers, and personal insights. You retain any intellectual
					property rights in your contributions, but you grant us a perpetual,
					worldwide, non-exclusive, royalty-free license to use, copy, modify,
					and adapt any content provided by you for the purpose of delivering
					and improving the Services.
				</p>

				<h3 className={styles.sectionTitle}>4. Performance Tracking</h3>
				<p className={styles.paragraph}>
					Our Services may include performance tracking features that allow you
					to measure your progress against various educational milestones. Your
					performance data will be used to provide personalized learning
					experiences and may be shared with potential employers with your
					consent.
				</p>

				<h3 className={styles.sectionTitle}>5. Limitation of Liability</h3>
				<p className={styles.paragraph}>
					While DevInterviewPrep strives to provide high-quality resources to
					aid in interview preparation, we do not guarantee any specific
					outcomes from the use of our Services. We will not be liable for any
					decisions, job offers, or employment outcomes resulting from the use
					of our Services.
				</p>

				<h3 className={styles.sectionTitle}>4. Limitation of Liability</h3>
				<p className={styles.paragraph}>
					The Services are provided for your personal, non-commercial use only.
					You may not use the Services for any illegal or unauthorized purpose.
					You agree to comply with all laws, rules, and regulations applicable
					to your use of the Services.
				</p>

				<h3 className={styles.sectionTitle}>5. Intellectual Property Rights</h3>
				<p className={styles.paragraph}>
					The trademarks, service marks, and logos of Testpool used and
					displayed on the Services are registered and unregistered trademarks
					or service marks of Testpool. Nothing on the Services should be
					construed as granting, by implication, estoppel, or otherwise, any
					license or right to use any trademark displayed on the Services.
				</p>

				<h3 className={styles.sectionTitle}>6. Third-Party Links</h3>
				<p className={styles.paragraph}>
					The Services may contain links to third-party websites or resources.
					You acknowledge and agree that Testpool is not responsible or liable
					for the availability or accuracy of such websites or resources, or the
					content, products, or services on or available from such websites or
					resources.
				</p>

				<h3 className={styles.sectionTitle}>7. Privacy Policy</h3>
				<p className={styles.paragraph}>
					Your privacy is important to us. Our Privacy Policy explains how we
					collect, use, and protect your personal information. By using the
					Services, you agree to the collection and use of this information in
					accordance with our Privacy Policy.
				</p>

				<h3 className={styles.sectionTitle}>8. Modifications to Terms</h3>
				<p className={styles.paragraph}>
					Testpool reserves the right to modify or replace these Terms at any
					time at our sole discretion. We will provide notice of these changes
					by posting the updated Terms on the website and changing the "Last
					Updated" date.
				</p>

				<h3 className={styles.sectionTitle}>9. Governing Law</h3>
				<p className={styles.paragraph}>
					These Terms are governed by and construed in accordance with the laws
					of the jurisdiction in which [Your Company Name] is located, without
					regard to its conflict of law principles.
				</p>

				<h3 className={styles.sectionTitle}>10. Severability</h3>
				<p className={styles.paragraph}>
					If any provision of these Terms is found to be invalid or
					unenforceable by a court of competent jurisdiction, the remaining
					provisions will remain in full force and effect.
				</p>

				<h3 className={styles.sectionTitle}>11. Entire Agreement</h3>
				<p className={styles.paragraph}>
					These Terms constitute the entire agreement between you and Testpool
					regarding the use of the Services, superseding any prior agreements
					between you and Testpool regarding the use of the Services.
				</p>

				<h3 className={styles.sectionTitle}>12. Acknowledgement</h3>
				<p className={styles.paragraph}>
					BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS
					OF USE AND AGREE TO BE BOUND BY THEM.
				</p>

				<h3 className={styles.sectionTitle}>Contact Us</h3>
				<p className={styles.paragraph}>
					If you have any questions about these Terms, please contact us at{' '}
					<span className={styles.moreInfoLink}> testpool@contact.com.</span>
				</p>
			</div>
		</div>
	);
}
