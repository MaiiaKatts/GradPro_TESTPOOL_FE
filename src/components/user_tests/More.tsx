import styles from './More.module.css';

export default function More(): JSX.Element {
	return (
		<div className={styles.supportContainer}>
			<div className={styles.termsContainer}>
				<p className={styles.p}>How to Start Preparing:</p>
				<div className={styles.paragraph}>
					<p className={styles.p}>
						<span className={styles.boldText}>Choose Your Profile:</span>
						Determine in which area you want to undergo preparation - frontend,
						backend, or software testing.
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>Select Difficulty Level:</span>
						Assess your current level and choose the corresponding difficulty
						level for the test.
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>Take the Test:</span>
						Complete 20 questions, each randomly chosen, for a comprehensive
						assessment of your knowledge.
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>Analyze Results:</span>
						Receive feedback on each question, helping you to better understand
						your strengths and areas for improvement.
					</p>
				</div>
				<h4 className={styles.h4}>Prepare for Success with Testpool:</h4>
				<p>
					We believe that in-depth understanding and practical preparation are
					key to acing technical interviews. Our platform is designed to help
					you strengthen your knowledge, boost your confidence, and showcase
					your best qualities to potential employers. It's time to overcome
					interview jitters and prepare for success!
				</p>
				<div className={styles.paragraph}>
					<p className={styles.p}>
						<span className={styles.boldText}>
							Personalized Learning Pathways:
						</span>
						At Testpool, we understand that each individual has a unique
						learning style. That’s why we offer personalized learning pathways
						that adapt to your specific needs and pace. Whether you are a quick
						learner or need more time to absorb information, our platform is
						flexible enough to accommodate your learning style.
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>
							Interactive Learning Experience:{' '}
						</span>
						Our interactive platform keeps you engaged with a variety of
						learning formats, including video tutorials, interactive coding
						challenges, and real-world scenarios. This approach not only keeps
						the learning process interesting but also helps in retaining
						information more effectively.
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>
							Community Support and Mentorship:{' '}
						</span>
						Join our vibrant community of like-minded individuals who are also
						on their journey to mastering technical interviews. Share
						experiences, ask questions, and get insights from peers and industry
						experts. Our mentorship program connects you with experienced
						professionals who can provide guidance, tips, and moral support.
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>
							Regular Updates and New Content:{' '}
						</span>
						The tech industry is always evolving, and so is our content. We
						regularly update our question database and learning materials to
						ensure that you’re learning the most current and relevant
						information. This commitment keeps you in step with the latest
						industry trends and best practices.
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>Access Anytime, Anywhere: </span>
						Learn at your own pace and convenience with our mobile-friendly
						platform. Whether you’re on a break, commuting, or at your favorite
						coffee shop, you can access our content anywhere. This flexibility
						ensures that your learning journey continues uninterrupted, fitting
						seamlessly into your busy lifestyle.{' '}
					</p>
					<p className={styles.p}>
						<span className={styles.boldText}>
							Start Your Journey Today with Testpool:{' '}
						</span>
						Whether you’re just starting out or looking to polish your skills,
						[Your Website Name] is your partner in success for technical
						interviews. Our comprehensive approach and supportive environment
						are designed to build your confidence and knowledge, paving the way
						for your success. Sign up now and take the first step towards acing
						your technical interviews!{' '}
					</p>
				</div>
			</div>
		</div>
	);
}
