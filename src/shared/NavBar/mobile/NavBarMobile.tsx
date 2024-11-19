import s from "../Navbar.module.css"
import { Routes } from "../../../app/router/router.config"
import { useAuthStore } from "../../../app/store/store"
import cx from "classnames"
import likes from "../assets/likes.svg"
import chats from "../assets/chats.svg"
import profile from "../assets/profile.svg"
import ankets from "../assets/ankets.svg"
import { useProfileStore } from "../../../pages/Profile/store/store"
import NavItem from "../NavItem/NavItem"

export const NavbarMobile = () => {

  //тут const { pathname } = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);
  const { first_name } = useProfileStore();

  return (
    <div className={isAuth ? cx(s.navbar, s.auth, s.mobile) : s.navbar}>
      {
        //тут !isAuth && pathname === Routes.START_PAGE && <div className={s.burger_menu}><img src={menu} /></div>
        //   !isAuth && pathname === Routes.START_PAGE && <div className={s.navbar__list}>
        //     <h2 className={s['navbar__list-item']}>Поддержка</h2>
        //     <h2 className={s['navbar__list-item']}>О нас</h2>
        //     <Button className={s['navbar__list-item']} onClick={() => navigate(Routes.LOGIN)}>Войти</Button>
        //   </div>
      }
      {
        isAuth && <ul className={cx(s.navbar__list, s.mobile)}>
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
        </ul>
      }
    </div>
  )
}
