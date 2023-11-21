/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

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
					<img
						src="/testpool-fe/images/image.gif"
						alt="main image"
						className={styles.mainImage}
					/>
				</div>

				<div className={styles.rightContainer}>
					<div className={styles.textContent}>
						<h4 className={styles.h4}>Unlock Your Potential – Start Today!</h4>
						<p>
							Testpool offers a unique experience in preparing for technical
							interviews in the fields of frontend, backend, and software
							testing. Our platform is equipped with everything you need for
							effective preparation and skill enhancement before your important
							interview.
						</p>
						<p className={styles.p}>Features of Our Site:</p>
						<div className={styles.paragraph}>
							<p className={styles.p}>
								<span className={styles.boldText}>
									Extensive Question Database:
								</span>
								Our site includes over 100 meticulously prepared questions for
								each profile, allowing you to fully immerse yourself in the
								specifics of your chosen field.
							</p>
							<p className={styles.p}>
								<span className={styles.boldText}>
									Three Levels of Difficulty:
								</span>
								Depending on your experience and knowledge level, you can choose
								from three difficulty levels: beginner, intermediate, or
								advanced.
							</p>
							<p className={styles.p}>
								<span className={styles.boldText}>Randomized Tests:</span>
								Each test consists of 20 randomly selected questions, ensuring a
								unique testing experience each time you take a test.
							</p>
							<Link to="/more-info" className={styles.moreInfoLink}>
								more ...{' '}
							</Link>
						</div>
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
							<img
								src="/testpool-fe/images/test_pageBE.png"
								alt="BE"
								className={styles.imageFullSize}
							/>
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
							<img
								src="/testpool-fe/images/test_pageFE.png"
								alt="FE"
								className={styles.imageFullSize}
							/>
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
							<img
								src="/testpool-fe/images/test_pageQA.png"
								alt="QA"
								className={styles.imageFullSize}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
