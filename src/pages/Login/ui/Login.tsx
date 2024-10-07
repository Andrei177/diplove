import { useNavigate } from "react-router-dom"
import { AuthLayout } from "../../../shared/AuthLayout"
import Button from "../../../shared/ui/Button/Button"
import Input from "../../../shared/ui/Input/Input"
import s from "./Login.module.css"
import { Routes } from "../../../router/router.config"

export const Login = () => {

    const navigate = useNavigate();

  return (
    <AuthLayout>
      <div>
      <div className={s.content}>
        <h1 className={s.title}>Войти</h1>
        <Input type="text" placeholder="Введите номер телефона" className={s.inp}/>
        <Input type="password" placeholder="Введите пароль" className={s.inp}/>
        <p>Забыли пароль?</p>
        <Button className={s.btn}>Войти</Button>
        <Button className={s.btn} variant="black" onClick={() => navigate(Routes.REGISTRATION)}>Создать профиль</Button>
      </div>
      </div>
    </AuthLayout>
  )
}
