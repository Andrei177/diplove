import { useNavigate } from "react-router-dom"
import { AuthLayout } from "../../../shared/AuthLayout"
import Button from "../../../shared/ui/Button/Button"
import Input from "../../../shared/ui/Input/Input"
import s from "./Auth.module.css"
import { Routes } from "../../../router/router.config"

export const Auth = () => {

  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className={s.content}>
        <h1 className={s.title}>Создать аккаунт</h1>
        <Input type="text" placeholder="Введите номер телефона" className={s.inp}/>
        <Input type="password" placeholder="Введите пароль" className={s.inp}/>
        <p>Требования к паролю</p>
        <Button className={s.btn}>Зарегистрироваться</Button>
        <Button className={s.btn} variant="black" onClick={() => navigate(Routes.LOGIN)}>Уже есть аккаунт</Button>
      </div>
    </AuthLayout>
  )
}