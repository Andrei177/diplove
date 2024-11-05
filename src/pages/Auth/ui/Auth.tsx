import { useNavigate } from "react-router-dom"
import { AuthLayout } from "../../../shared/AuthLayout"
import Button, { VARIANT } from "../../../shared/ui/Button/Button"
import Input from "../../../shared/ui/Input/Input"
import s from "./Auth.module.css"
import { Routes } from "../../../app/router/router.config"
import { useLoginStore } from "../../../shared/loginStore/loginStore"
import { register } from "../../../app/api/AuthService/AuthService"
import { useAuthStore } from "../../../app/store/store"
import { useState } from "react"
import { nanoid } from "nanoid"

export const Auth = () => {

  const navigate = useNavigate();
  const {login, password, setLogin, setPassword, isLoading, setIsLoading} = useLoginStore();
  const {setIsAuth} = useAuthStore();

  const [usernameMessages, setUsernameMessages] = useState<string[]>([])
  const [passwordMessages, setPasswordMessages] = useState<string[]>([])

  const handleRegister = () => {
    setIsLoading(true);
    register(login, password)
    .then(() => {
      setIsAuth(true);
      navigate(Routes.GENDER)
    })
    .catch((err) => {
      console.log(err, "ошибка при регистрации");
      if(err.response.data.username){
        setUsernameMessages([...err.response.data.username])
      }
      if(err.response.data.password){
        setPasswordMessages([...err.response.data.password])
      }
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <AuthLayout isLoading={isLoading}>
      <div className={s.content}>
        <h1 className={s.title}>Создать аккаунт</h1>
        <Input 
          type="text" 
          placeholder="Введите логин" 
          className={s.inp} 
          value={login} 
          onChange={e => setLogin(e.target.value)}/>
        <Input 
          type="password" 
          placeholder="Введите пароль" 
          className={s.inp}
          value={password} 
          onChange={e => setPassword(e.target.value)}/>
        <Button className={s.btn} onClick={handleRegister}>Зарегистрироваться</Button>
        <Button className={s.btn} variant={VARIANT.black} onClick={() => navigate(Routes.LOGIN)}>Уже есть аккаунт</Button>
        {usernameMessages.map(mess => <h5 key={nanoid()} style={{color: "red", width: "340px"}}>{mess}</h5>)}
        {passwordMessages.map(mess => <h5 key={nanoid()} style={{color: "red", width: "340px"}}>{mess}</h5>)}
      </div>
    </AuthLayout>
  )
}