import Button from "../../ui/Button/Button"
import s from "../Navbar.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import { Routes } from "../../../app/router/router.config"
import { useAuthStore } from "../../../app/store/store"
import cx from "classnames"
import likes from "../assets/likes.svg"
import chats from "../assets/chats.svg"
import profile from "../assets/profile.svg"
import filters from "../assets/filters.svg"
import ankets from "../assets/ankets.svg"
import { useFiltersStore } from "../../Filters/store/store"
import NavItem from "../NavItem/NavItem"
import { useUnseenChats } from "../../../pages/Chats/store/store"

export const NavbarDekstop = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);
  const setShowFilters = useFiltersStore(state => state.setShowFilters);

  const unseenChats = useUnseenChats(state => state.unseenChats);

  return (
    <div className={isAuth ? cx(s.navbar, s.auth) : s.navbar}>
      <div className={isAuth ? s.nav_frame : s.nav_frame_public}>
        <div className={s['navbar__logo-box']} onClick={() => isAuth ? navigate(Routes.PROFILE) : navigate(Routes.START_PAGE)}>
          <h1 className={s.title}>DipLove</h1>
        </div>
        {
          !isAuth && pathname === Routes.START_PAGE && <div className={s.navbar__list}>
            <h2 className={s['navbar__list-item']}>Поддержка</h2>
            <h2 className={s['navbar__list-item']}>О нас</h2>
            <Button className={s['navbar__list-item']} onClick={() => navigate(Routes.LOGIN)}>Войти</Button>
          </div>
        }
        {
          isAuth && <>
            <div className={s.main_nav_items}>
              <NavItem to={Routes.FORMS} img={ankets}>
                Анкеты
              </NavItem>
              <NavItem to={Routes.LIKES} img={likes}>
                Лайки
              </NavItem>
              <NavItem to={Routes.CHATS} img={chats} className={s.nav_item_chats}>
                Чаты
                {unseenChats > 0 && <div className={s.unseen_chats}>{unseenChats}</div>}
              </NavItem>
              <NavItem to={Routes.PROFILE} img={profile}>
                Профиль
              </NavItem>
            </div>
            <NavItem onClick={() => setShowFilters(true)} img={filters}>
              Фильтры
            </NavItem>
          </>
        }
      </div>
    </div>
  )
}