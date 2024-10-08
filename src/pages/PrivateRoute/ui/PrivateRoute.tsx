import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { checkRefreshValidity } from "../../../app/api/AuthService/AuthService";
import { Routes } from "../../../app/router/router.config";
import { useAuthStore } from "../../../app/store/store";
import Navbar from "../../../shared/NavBar/Navbar";

export const PrivateRoute = () => {

  const {isAuth, setIsAuth, hasRefreshed, setHasRefreshed} = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if(!hasRefreshed){
      setHasRefreshed(true);
      setIsLoading(true);

      checkRefreshValidity()
      .then(() => setIsAuth(true))
      .catch((err) => {
        console.log(err, "ошибка при загрузке прайват роутов");

        setIsAuth(false)
      })
      .finally(() => setIsLoading(false))
    }
  }, [])


  if (isLoading && !isAuth) {
    return (
      <>
        <Navbar/>
        <h1>Загрузка...</h1>
      </>
    );
  } else if (!isLoading && !isAuth) {
    localStorage.removeItem('accessToken');
    return (
      <Navigate
        to={Routes.START_PAGE}
        replace
      />
    );
  }

  return isAuth ? (
    <div className='app'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate
      to={Routes.START_PAGE}
      replace
    />
  );
}