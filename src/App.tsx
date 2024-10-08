import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './shared/NavBar/Navbar.tsx'
import { useEffect, useState } from 'react';
import { checkRefreshValidity } from './app/api/AuthService/AuthService.ts';
import { useAuthStore } from './app/store/store.ts';
import { Routes } from './app/router/router.config.ts';

function App() {

  const {setIsAuth, hasRefreshed, setHasRefreshed} = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!hasRefreshed){
      setHasRefreshed(true);
      setIsLoading(true);

      checkRefreshValidity()
      .then(() => {
        setIsAuth(true)
        navigate(Routes.PROFILE)
      })
      .catch((err) => {
        console.log(err, "Ошибка при загрузке страницы старт или логинов");
        //navigate(Routes.PROFILE) // убрать потом
        setIsAuth(false) // это тоже
      })
      .finally(() => setIsLoading(false))
    }
  }, [])

  return (
    <div className='app'>
      <Navbar />
      {
        isLoading
        ?<h1>Загрузка...</h1>
        :<main>
          <Outlet />
        </main>
      }
    </div>
  )
}

export default App
