import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import ComicsPage from "../../pages/ComicsPage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SingleComicsPage from "../../pages/SingleComicsPage";
const App = () => {
  return (
    <Router>
      <div className='app'>
        <AppHeader />
        <main>
          <Routes>
            <Route exact path='/' element={<MainPage />} />
            <Route exact path='/comics' element={<ComicsPage />} />
            <Route
              exact
              path='/comics/:comicId'
              element={<SingleComicsPage />}
            />
            <Route exact path='*' element={<ErrorMessage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
