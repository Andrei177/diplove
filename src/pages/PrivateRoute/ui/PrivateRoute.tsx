import { Suspense, useEffect, useRef, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { checkRefreshValidity } from "../../../app/api/AuthService/AuthService";
import { Routes } from "../../../app/router/router.config";
import { useAuthStore } from "../../../app/store/store";
import Navbar from "../../../shared/NavBar/Navbar";
import { Loader } from "../../../shared/ui/Loader";
import { getMyProfile } from "../../Profile/api/api";
import { useProfileStore } from "../../Profile/store/store";
import { useMediaQuery } from "react-responsive";
import { updateMyActivity } from "../api/api";

export const PrivateRoute = () => {

  const { isAuth, setIsAuth, hasRefreshed, setHasRefreshed } = useAuthStore();
  const { setAll, id } = useProfileStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ maxWidth: "625px" });

  useEffect(() => {

    if (!hasRefreshed) {
      setHasRefreshed(true);
      setIsLoading(true);

      checkRefreshValidity()
        .then(() => {
          setIsAuth(true)
          if (pathname === Routes.ROOT) navigate(Routes.PROFILE)
          getMyProfile()
            .then(res => {
              console.log(res);

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

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    
    timerRef.current = setInterval(() => {
      updateMyActivity()
        .then(res => console.log(res, "Ответ при обновлении своей активности"))
        .catch(err => console.log(err, "Ошибка при обновлении своей активности"));
    }, 10000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);


  if (isLoading && !isAuth) {
    return (
      <div className='app'>
        {!isMobile && <Navbar />}
        <main>
          <Loader />
        </main>
        {isMobile && <Navbar />}
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
      {(!isMobile && id) && <Navbar />}
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      {(isMobile && id) && <Navbar />}

    </div>
  ) : (
    <Navigate
      to={Routes.START_PAGE}
      replace
    />
  );
}