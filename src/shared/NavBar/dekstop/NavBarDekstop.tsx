import Button from "../../ui/Button/Button"
import s from "../Navbar.module.css"
import butterfly from "../../../assets/butterfly.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { Routes } from "../../../app/router/router.config"
import { useAuthStore } from "../../../app/store/store"
import cx from "classnames"
import likes from "../assets/likes.svg"
import chats from "../assets/chats.svg"
import profile from "../assets/profile.svg"
import filters from "../assets/filters.svg"
import ankets from "../assets/ankets.svg"
import { useProfileStore } from "../../../pages/Profile/store/store"
import { useFiltersStore } from "../../Filters/store/store"
import NavItem from "../NavItem/NavItem"

export const NavbarDekstop = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);
  const { first_name } = useProfileStore();
  const setShowFilters = useFiltersStore(state => state.setShowFilters);

  return (
    <div className={isAuth ? cx(s.navbar, s.auth) : s.navbar}>
      <div className={isAuth ? s.nav_frame : s.nav_frame_public}>
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
          isAuth && <>
            <div className={s.main_nav_items}>
              <NavItem to={Routes.FORMS} img={ankets}>
                Анкеты
              </NavItem>
              <NavItem to={Routes.LIKES} img={likes}>
                Лайки
              </NavItem>
              <NavItem to={Routes.CHATS} img={chats}>
                Чаты
              </NavItem>
              <NavItem to={Routes.PROFILE} img={profile}>
                {
                  first_name.length > 15
                    ? first_name.substring(0, 15) + "..."
                    : first_name
                }
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