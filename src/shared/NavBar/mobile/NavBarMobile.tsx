import s from "../Navbar.module.css"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Routes } from "../../../app/router/router.config"
import { useAuthStore } from "../../../app/store/store"
import cx from "classnames"
import ankets from "../assets/ankets.svg"
import chats from "../assets/chats.svg"
import profile from "../assets/profile.svg"
import menu from "../assets/menu.svg"
import { useProfileStore } from "../../../pages/Profile/store/store"

export const NavbarMobile = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);
  const { first_name } = useProfileStore();

  return (
    <div className={isAuth ? cx(s.navbar, s.auth, s.mobile) : s.navbar}>
      {
        !isAuth && pathname === Routes.START_PAGE && <div className={s.burger_menu}><img src={menu} /></div>
        //   !isAuth && pathname === Routes.START_PAGE && <div className={s.navbar__list}>
        //     <h2 className={s['navbar__list-item']}>Поддержка</h2>
        //     <h2 className={s['navbar__list-item']}>О нас</h2>
        //     <Button className={s['navbar__list-item']} onClick={() => navigate(Routes.LOGIN)}>Войти</Button>
        //   </div>
      }
      {
        isAuth && <ul className={cx(s.navbar__list, s.mobile)}>
          <li className={s['navbar__list-item']}>
            <div className={s.item_wrapper}>
              <NavLink to={Routes.FORMS} className={s.title_link}>
                <img src={ankets} alt="ankets" /> <br />
                Анкеты
              </NavLink>
            </div>
          </li>
          <li className={s['navbar__list-item']}>
            <div className={s.item_wrapper}>
              <NavLink to={Routes.CHATS} className={s.title_link}>
                <img src={chats} alt="chats" /> <br />
                Чаты
              </NavLink>
            </div>
          </li>
          <li className={s['navbar__list-item']}>
            <div className={s.item_wrapper}>
              <NavLink to={Routes.PROFILE} className={s.title_link}>
                <img src={profile} alt="chats" /> <br />
                {
                  first_name.length > 15
                    ? first_name.substring(0, 15) + "..."
                    : first_name
                }
              </NavLink>
            </div>
          </li>
        </ul>
      }
    </div>
  )
}
