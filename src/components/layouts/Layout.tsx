import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Main(): JSX.Element {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer /> {/* Это место, где Footer компонент добавлен */}
		</>
	);
}

export default Main;
