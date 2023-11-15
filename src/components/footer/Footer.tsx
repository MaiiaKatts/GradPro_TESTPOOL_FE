import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';

import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';

function Footer(): JSX.Element {
	const currentYear = new Date().getFullYear();

	return (
		<div className={styles.mainContainer}>
			<footer className={styles.footer}>
				<div className={styles.footerContainer}>
					<NavLink to="/about-us" className={`${styles.footerLink} ${styles.about}`}>
						About Us
					</NavLink>
					<div className={styles.footerContainer}>
						<div className={styles.centerContent}>
							<span>© {currentYear} Testpool. All rights reserved.</span>
						</div>
						<div className={styles.centerContent2}>
							<NavLink to="/termOfUse" className={`${styles.footerLink} ${styles.about}`}>
								Terms of Use
							</NavLink>
							<NavLink to="/policy" className={`${styles.footerLink} ${styles.about}`}>
								Privacy Policy
							</NavLink>
						</div>
					</div>
					<div className={styles.support_socials}>
						<div className={styles.support}>
							<NavLink to="/support" className={`${styles.footerLink} ${styles.support}`}>
								Support
							</NavLink>
							<NavLink to="/faq" className={`${styles.footerLink} ${styles.support}`}>
								FAQ
							</NavLink>
						</div>
						<div className={styles.socials}>
							<a
								href="https://facebook.com"
								className={styles.socialIcon}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FacebookIcon />
							</a>

							<a
								href="https://telegram.org"
								className={styles.socialIcon}
								target="_blank"
								rel="noopener noreferrer"
							>
								<TelegramIcon />
							</a>
							<a
								href="https://instagram.com"
								className={styles.socialIcon}
								target="_blank"
								rel="noopener noreferrer"
							>
								<InstagramIcon />
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
