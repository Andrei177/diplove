import { NavLink } from "react-router-dom"
import s from "./NavItem.module.css"
import { FC, ReactNode } from "react";

interface IPropsNavItem {
    to?: string;
    img: string;
    children: ReactNode;
    onClick?: () => void;
}

const NavItem: FC<IPropsNavItem> = ({ to, img, children, onClick }) => {
    return (
        <div className={s['navbar__list-item']} onClick={onClick}>
            <div className={s.item_wrapper}>
                {
                    to
                        ? <NavLink to={to} className={s.title_link}>
                            <img src={img} alt="ankets" />
                            <div>{children}</div>
                        </NavLink>
                        : <div className={s.title_link}>
                            <img src={img} alt="ankets" />
                            <div className={s.title_text}>{children}</div>
                        </div>
                }
            </div>
        </div>
    )
}

export default NavItem
