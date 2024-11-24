import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './shared/NavBar/Navbar.tsx'
import { useEffect, useState } from 'react';
import { checkRefreshValidity } from './app/api/AuthService/AuthService.ts';
import { useAuthStore } from './app/store/store.ts';
import { Routes } from './app/router/router.config.ts';
import { Loader } from './shared/ui/Loader/index.ts';

function App() {

  const {isAuth, setIsAuth, hasRefreshed, setHasRefreshed} = useAuthStore();
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
      .catch(() => {
        setIsAuth(false)
      })
      .finally(() => setIsLoading(false))
    }
    if(isAuth) navigate(Routes.PROFILE)
  }, [])

  return (
    <div className='app'>
      <Navbar />
      {
        isLoading
        ?<Loader/>
        :<main>
          <Outlet />
        </main>
      }
    </div>
  )
}

export default App
