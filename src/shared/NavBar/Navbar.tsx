import Button from "../ui/Button/Button"
import s from "./Navbar.module.css"
import butterfly from "../../assets/butterfly.svg" 
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Routes } from "../../app/router/router.config"
import { useAuthStore } from "../../app/store/store"
import cx from "classnames"
import ankets from "./assets/ankets.svg"
import chats from "./assets/chats.svg"
import profile from "./assets/profile.svg"

const Navbar = () => {

  const navigate = useNavigate();
  const {pathname} = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);

  return (
    <div className={isAuth ? cx(s.navbar, s.auth) : s.navbar}>
      <div className={s['navbar__logo-box']} onClick={() => isAuth ? navigate(Routes.PROFILE) : navigate(Routes.START_PAGE)}>
        <img src={butterfly} alt="butterfly" />
        <h1 className={s.title}>Morfix</h1>
      </div>
      {
      !isAuth && pathname === Routes.START_PAGE && <div className={s.navbar__list}>
        <h2 className={s['navbar__list-item']}>Поддержка</h2>
        <h2 className={s['navbar__list-item']}>О нас</h2>
        <Button className={s['navbar__list-item']} onClick={() => navigate(Routes.LOGIN)}>Войти</Button>
      </div>
      }
      {
        isAuth && <ul className={s.navbar__list}>
        <li className={s['navbar__list-item']}>
          <div className={s.item_wrapper}>
            <img src={ankets} alt="ankets"/>
            <NavLink to={Routes.FORMS} className={s.title_link}>
              Анкеты
            </NavLink>
          </div>
        </li>
        <li className={s['navbar__list-item']}>
          <div className={s.item_wrapper}>
            <img src={chats} alt="chats"/>
            <NavLink to={Routes.CHATS} className={s.title_link}>
              Чаты
            </NavLink>
          </div>
        </li>
        <li className={s['navbar__list-item']}>
          <div className={s.item_wrapper}>
            <img src={profile} alt="chats"/>
              <NavLink to={Routes.PROFILE} className={s.title_link}>
                Имя юзера
              </NavLink>
          </div>
        </li>
      </ul>
      }
    </div>
  )
}

export default Navbar
