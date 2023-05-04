import AppHeader from '../appHeader/AppHeader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import ComicsPage from '../../pages/ComicsPage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
const App = () => {
	return (
		<Router>
			<div className='app'>
				<AppHeader />
				<main>
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/comics' element={<ComicsPage />} />
						<Route path='*' element={<ErrorMessage />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
