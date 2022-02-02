import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import FavoritesPage from "./pages/Favorites";
import WeathersPage from "./pages/Weather";
import Footer from "./components/Footer";
import { useSelector, useDispatch} from "react-redux";
import Modal from './components/generic/Modal';
import {ErrorActions} from './store/ErrorSlice';

function App() {
  const theme = useSelector(root => root.defaults.colorTheme);
  const error = useSelector(root => root.error.error);
  const dispatch = useDispatch();

  const ModalExitHandler = () => {
    dispatch(ErrorActions.setError(null));
  }
  
  return (
    <div className={`App ${theme}`}>
      <Header />
      {!error && <Switch>
        <Route path="/weather">
          <WeathersPage />
        </Route>

        <Route path="/favorites">
          <FavoritesPage />
        </Route>

        <Redirect to="/weather" />
      </Switch>}
      {error && <Modal onClose={ModalExitHandler}>
          <h2>Something Went Wrong!</h2>
          <p>{error.message}</p>
        </Modal>}
      <Footer />
    </div>
  );
}

export default App;
