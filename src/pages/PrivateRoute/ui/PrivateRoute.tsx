import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { checkRefreshValidity } from "../../../app/api/AuthService/AuthService";
import { Routes } from "../../../app/router/router.config";
import { useAuthStore } from "../../../app/store/store";
import Navbar from "../../../shared/NavBar/Navbar";
import { Loader } from "../../../shared/ui/Loader";
import { getMyProfile } from "../../Profile/api/api";
import { useProfileStore } from "../../Profile/store/store";

export const PrivateRoute = () => {

  const {isAuth, setIsAuth, hasRefreshed, setHasRefreshed} = useAuthStore();
  const { setAll } = useProfileStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("AAAAAAAAAAAAAAAAAAAA");
    
    if(!hasRefreshed){
      setHasRefreshed(true);
      setIsLoading(true);

      checkRefreshValidity()
      .then(() => {
        setIsAuth(true)
        if(pathname === Routes.ROOT) navigate(Routes.PROFILE)
        getMyProfile()
        .then(res => {
          setAll(res)
        })
        .catch(err => console.log(err, "Ошибка при получении профиля юзера"))
      })
      .catch((err) => {
        console.log(err, "ошибка при загрузке прайват роутов");
        setIsAuth(false)
      })
      .finally(() => setIsLoading(false))
    }
  }, [hasRefreshed])


  if (isLoading && !isAuth) {
    return (
      <div className='app'>
        <Navbar />
        <main>
          <Loader />
        </main>
      </div>
    );
  } else if (!isLoading && !isAuth) {
    localStorage.removeItem('token');
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