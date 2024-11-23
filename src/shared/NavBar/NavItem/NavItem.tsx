import { NavLink } from "react-router-dom"
import s from "./NavItem.module.css"
import { FC, ReactNode } from "react"
import cx from "classnames"

interface IPropsNavItem {
    to?: string;
    img: string;
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

const NavItem: FC<IPropsNavItem> = ({ to, img, children, onClick, className }) => {
    return (
        <div className={s['navbar__list-item']} onClick={onClick}>
            <div className={cx(s.item_wrapper, className)}>
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
