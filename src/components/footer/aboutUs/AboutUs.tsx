/* eslint-disable react/no-unescaped-entities */
import styles from './AboutUs.module.css';

export default function AboutUs(): JSX.Element {
	return (
		<div className={styles.mainContainer}>
			<h1 className={styles.header}>About Us</h1>
			<div className={styles.teamSection}>
				<div className={styles.team}>
					<div className={styles.teamMember_1}>
						<div className={styles.person}>
							<div className={styles.memberPhoto}>
								<img
									className={styles.photo}
									src="/testpool-fe/images/maiia2.gif"
									alt="Maiia Katts"
								/>
							</div>
							<div className={styles.memberName}>Maiia Katts</div>
							<div className={styles.memberTitle}>Team Lead & QA Tester</div>
							<div className={styles.memberDescription}>
								As a co-founder and team lead, Maiia's strategic vision and
								leadership drive the team towards innovation and excellence.
								Maiia leads our quality assurance efforts, meticulously testing
								our products to maintain the highest standards.
							</div>
						</div>
						<div className={styles.person}>
							<div className={styles.memberPhoto}>
								<img
									className={styles.photo}
									src="/testpool-fe/images/irina.gif"
									alt="Irina Frank"
								/>
							</div>
							<div className={styles.memberName}>Irina Frank</div>
							<div className={styles.memberTitle}>Frontend Developer</div>
							<div className={styles.memberDescription}>
								Irina is dedicated to writing clean and efficient code, ensuring
								a seamless user experience across all platforms.
							</div>
						</div>
						<div className={styles.person}>
							<div className={styles.memberPhoto}>
								<img
									className={styles.photo}
									src="/testpool-fe/images/orchan.gif"
									alt="Anar Aliyev"
								/>
							</div>
							<div className={styles.memberName}>Anar Aliyev</div>
							<div className={styles.memberTitle}>QA Tester</div>
							<div className={styles.memberDescription}>
								Anar's attention to detail helps identify and solve critical
								issues, ensuring the reliability of our applications.
							</div>
						</div>
						<div className={styles.person}>
							<div className={styles.memberPhoto}>
								<img
									className={styles.photo}
									src="/testpool-fe/images/kristina.gif"
									alt="Kristina Romanova"
								/>
							</div>
							<div className={styles.memberName}>Kristina Romanova</div>
							<div className={styles.memberTitle}>Backend Developer</div>
							<div className={styles.memberDescription}>
								Kristina specializes in server-side logic and database
								management, ensuring data is handled efficiently and securely.
							</div>
						</div>

						<div className={styles.teamMember_2}>
							<div className={styles.person}>
								<div className={styles.memberPhoto}>
									<img
										className={styles.photo}
										src="/testpool-fe/images/jurgita.gif"
										alt="Jurgita Butiene"
									/>
								</div>
								<div className={styles.memberName}>Jurgita Butiene</div>
								<div className={styles.memberTitle}>QA Tester</div>
								<div className={styles.memberDescription}>
									Jurgita is an expert in automated testing frameworks,
									improving our test cycles with her expertise in automated
									script development.
								</div>
							</div>
							<div className={styles.person}>
								<div className={styles.memberPhoto}>
									<img
										className={styles.photo}
										src="/testpool-fe/images/natalia.gif"
										alt="Natali Hrytsenia"
									/>
								</div>
								<div className={styles.memberName}>Natali Hrytsenia</div>
								<div className={styles.memberTitle}>QA Tester</div>
								<div className={styles.memberDescription}>
									Natali's analytical skills are crucial in dissecting complex
									software systems, ensuring that every layer functions
									flawlessly.
								</div>
							</div>
							<div className={styles.person}>
								<div className={styles.memberPhoto}>
									<img
										className={styles.photo}
										src="/testpool-fe/images/irinaS.gif"
										alt="Iryna Sainozhenko"
									/>
								</div>
								<div className={styles.memberName}>Iryna Sainozhenko</div>
								<div className={styles.memberTitle}>Backend Developer</div>
								<div className={styles.memberDescription}>
									Irina focuses on API integration and server management,
									providing the backbone for our dynamic web applications.
								</div>
							</div>

							<div className={styles.person}>
								<div className={styles.memberPhoto}>
									<img
										className={styles.photo}
										src="/testpool-fe/images/sidan.gif"
										alt="Elena Sidanova"
									/>
								</div>
								<div className={styles.memberName}>Elena Sidanova</div>
								<div className={styles.memberTitle}>Frontend Developer</div>
								<div className={styles.memberDescription}>
									With an eye for design and usability, Elena brings our
									interfaces to life with responsive and user-friendly
									solutions.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.lower_container}>
				<h2>Our Story</h2>

				<div>
					<p>
						TESTPOOL was born from a shared vision to create a dynamic platform
						for IT professionals by IT professionals.
					</p>
					<p>
						Our journey began in 2023, when our founders noticed a gap in the
						market for a comprehensive and interactive testing service.
						Together, we've built a platform that not only assesses skills but
						also nurtures and develops talent, preparing candidates for not just
						any job, but the right job.
					</p>
					<p>
						We're proud to offer a service that empowers users to take control
						of their learning and career progression.
					</p>
					<p>
						Our interactive tests are designed to simulate real-world scenarios,
						offering users a practical and in-depth understanding of their
						field. With TESTPOOL, you're not just answering questions; you're
						gaining the knowledge and confidence needed to excel in your career.
					</p>
					<div>
						<h4 className={styles.connectHeading}>Connect with Us</h4>
					</div>
					<div>
						<p className={styles.connectHeading_p}>
							Follow our journey and join our community on social media for the
							latest updates, tips, and IT insights. We're more than just a
							platform; we're a movement towards better IT preparation. Let's
							navigate the future of IT together.
						</p>
						<div>
							<p className={styles.moreInfoLink}>testpool@contact.com</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
