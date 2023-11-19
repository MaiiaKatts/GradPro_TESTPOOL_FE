/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const Confirmation: React.FC = () => {
	const [confirm, setConfirm] = useState('');
	const navigate = useNavigate(); // Инициализируем useNavigate

	async function handleConfirm(): Promise<void> {
		try {
			const response = await fetch(
				`http://localhost:8080/api/users/confirm/${confirm}`,
				{
					headers: { accept: 'application/json' },
				}
			);
			if (!response.ok) {
				throw new Error('Network response was not ok.');
			}
			// Тут может быть дополнительная логика обработки ответа сервера, если это необходимо
			navigate('/'); // Переход на главную страницу после успешного выполнения запроса
		} catch (error) {
			console.error('Failed to confirm:', error);
		}
	}

	return (
		<>
			<input
				type="text"
				value={confirm}
				onChange={(e) => setConfirm(e.target.value)}
			/>
			<button
				type="button"
				onClick={handleConfirm} // Теперь здесь прямой вызов функции handleConfirm
			>
				Confirm
			</button>
		</>
	);
};

export default Confirmation;
