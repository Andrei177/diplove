import Button from "../ui/Button/Button"
import s from "./Navbar.module.css"
import butterfly from "../../assets/butterfly.svg" 
import { useLocation, useNavigate } from "react-router-dom"
import { Routes } from "../../app/router/router.config"
import { useAuthStore } from "../../app/store/store"

const Navbar = () => {

  const navigate = useNavigate();
  const {pathname} = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);

  return (
    <div className={s.navbar}>
      <div className={s['navbar__logo-box']} onClick={() => isAuth ? navigate(Routes.PROFILE) : navigate(Routes.START_PAGE)}>
        <img src={butterfly} alt="butterfly" />
        <h1 className={s.title}>Morfix</h1>
      </div>
      {
      pathname === Routes.START_PAGE && <div className={s.navbar__list}>
        <h2 className={s['navbar__list-item']}>Поддержка</h2>
        <h2 className={s['navbar__list-item']}>О нас</h2>
        <Button className={s['navbar__list-item']} onClick={() => navigate(Routes.LOGIN)}>Войти</Button>
      </div>
      }
    </div>
  )
}

export default Navbar
