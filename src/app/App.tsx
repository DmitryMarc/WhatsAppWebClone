import { LoginPage, MainPage } from '../pages';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../widgets/model/auth/selectors';
import './App.css';

const App = () => {
  const isAuth = useSelector(selectIsAuth);

  if(!isAuth){
    return <LoginPage />
  }
  return <MainPage />
}

export default App
