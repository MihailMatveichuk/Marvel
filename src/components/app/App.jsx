import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
const MainPage = lazy(() => import("../../pages/MainPage"));
const SingleComicsPage = lazy(() => import("../../pages/SingleComicsPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const ErrorMessage = lazy(() => import("../ErrorMessage/ErrorMessage"));

const App = () => {
  return (
    <Router>
      <div className='app'>
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
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
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
