import { useSelector } from 'react-redux';
import { LoginPage, MainPage } from '../pages';
import { selectIsAuth } from './model/selectors';

import './App.css';

const App = () => {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <LoginPage />
  }
  return <MainPage />
}

export default App
