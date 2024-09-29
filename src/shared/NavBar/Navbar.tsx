import Button from "../Button/Button"
import s from "./Navbar.module.css"
import butterfly from "../../assets/butterfly.svg" 
import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className={s.navbar}>
      <div className={s['navbar__logo-box']} onClick={() => navigate("/")}><img src={butterfly} alt="butterfly" /><h1 className={s.title}>Morphyx</h1></div>
      <div className={s.navbar__list}>
        <h2 className={s['navbar__list-item']}>Поддержка</h2>
        <h2 className={s['navbar__list-item']}>О нас</h2>
        <Button className={s['navbar__list-item']} onClick={() => navigate("/auth")}>Войти</Button>
      </div>
    </div>
  )
}

export default Navbar
