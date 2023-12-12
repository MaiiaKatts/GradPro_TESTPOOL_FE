/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Confirmation2(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();

	const confirmRegistration = async (confirmCode: string) => {
		console.log('Sending confirmation request for code:', confirmCode);
		try {
			const response = await fetch(
				`https://testpool-app-3g73f.ondigitalocean.app/confirm/${confirmCode}`
			);
			if (response.ok) {
				navigate('/auth/login');
			} else {
				throw new Error('Failed to confirm registration');
			}
		} catch (error) {
			console.error('Error confirming registration:', error);
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const confirmCode = params.get('id');
		console.log('Confirmation code from URL:', confirmCode);

		if (confirmCode) {
			confirmRegistration(confirmCode);
		}
	}, [navigate, confirmRegistration, location]);

	return (
		<div>
			{/* Здесь может быть индикатор загрузки или сообщение */}
			<p>Confirming your registration...</p>
		</div>
	);
}
