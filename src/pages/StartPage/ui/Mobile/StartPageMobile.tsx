import { useNavigate } from "react-router-dom"
import Button, { VARIANT } from "../../../../shared/ui/Button/Button"
import s from "../StartPage.module.css"
import { Routes } from "../../../../app/router/router.config";

export const StartPageMobile = () => {

  const navigate = useNavigate();

  return (
    <div className={s['start-page']}>
      <h1 className={s.title}>DipLove</h1>
      <Button variant={VARIANT.blue} className={s.btn} onClick={() => navigate(Routes.REGISTRATION)}>Создать профиль</Button>
      <Button variant={VARIANT.transparent} className={s.btn} onClick={() => navigate(Routes.LOGIN)}>Войти</Button>
    </div>
  )
}