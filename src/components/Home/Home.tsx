/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import styles from './Home.module.css';

export default function Home(): JSX.Element {
	const [hoveredImage, setHoveredImage] = useState('');

	const handleMouseEnter = (imageId: string): void => {
		setHoveredImage(imageId);
	};

	const handleMouseLeave = (): void => {
		setHoveredImage('');
	};

	return (
		<div className={styles.containerHome}>
			<div className={styles.mainContainer}>
				<div className={styles.leftContainer}>
					<img className={styles.mainImage} src="/images/image.jpg" alt="main image" />
				</div>
				<div className={styles.rightContainer}>
					<div className={styles.textContent}>
						<h4 className={styles.h4}>Unlock Your Potential – Start Today!</h4>
						<p>
							With over 100 questions in Frontend, Backend, and QA Testing, TESTPOOL turns your
							interview prep from daunting to confident. Our platform is designed to bring you //
							eslint-disable-next-line react/no-unescaped-entities closer to your IT career goals.
							With each question, you'll become more precise, compelling, and ready. Preparation is
							key, and TESTPOOL ensures it’s efficient and focused. We constantly update our
							questions to reflect the latest industry trends, helping you stay current and ahead of
							the curve. Our detailed explanations deepen your understanding, making your responses
							in the interview not just rehearsed answers but demonstrations of your problem-solving
							prowess. Join TESTPOOL and make the commitment that sets you apart in your next tech
							interview. Your potential awaits, and with TESTPOOL, you're one step closer to
							realizing it. Let’s begin this journey together, today.
						</p>
					</div>
				</div>
			</div>
			<div className={styles.demoButtonContainer}>
				<div className={styles.demoButtons}>
					<div
						className={`${styles.demoButton} ${styles.demoButtonBE}`}
						onMouseEnter={() => handleMouseEnter('BE')}
						onMouseLeave={handleMouseLeave}
					>
						<div
							className={`${styles.hoverImage} ${
								hoveredImage === 'BE' ? styles.hoverImageVisible : ''
							}`}
						>
							<img src="/images/test_page3.jpg" alt="BE" className={styles.imageFullSize} />
						</div>
					</div>

					<div
						className={`${styles.demoButton} ${styles.demoButtonFE}`}
						onMouseEnter={() => handleMouseEnter('FE')}
						onMouseLeave={handleMouseLeave}
					>
						<div
							className={`${styles.hoverImage} ${
								hoveredImage === 'FE' ? styles.hoverImageVisible : ''
							}`}
						>
							<img src="/images/test_page2.jpg" alt="FE" className={styles.imageFullSize} />
						</div>
					</div>

					<div
						className={`${styles.demoButton} ${styles.demoButtonQA}`}
						onMouseEnter={() => handleMouseEnter('QA')}
						onMouseLeave={handleMouseLeave}
					>
						<div
							className={`${styles.hoverImage} ${
								hoveredImage === 'QA' ? styles.hoverImageVisible : ''
							}`}
						>
							<img src="/images/test_page.jpg" alt="QA" className={styles.imageFullSize} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
