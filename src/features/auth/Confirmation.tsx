/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';

const Confirmation: React.FC = () => {
	const [confirm, setConfirm] = useState('');

	function handleConfirm(): void {
		fetch(`http://localhost:8080/api/users/confirm/${confirm}`, {
			headers: { accept: 'application/json' },
		});
	}

	return (
		<>
			<input type="text" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
			<button
				type="button"
				onClick={() => {
					handleConfirm();
				}}
			>
				Confirm
			</button>
		</>
	);
};

export default Confirmation;
