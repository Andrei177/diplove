import { useNavigate } from "react-router-dom"
import { AuthLayout } from "../../../shared/AuthLayout"
import Button, { VARIANT } from "../../../shared/ui/Button/Button"
import Input from "../../../shared/ui/Input/Input"
import s from "./Login.module.css"
import { Routes } from "../../../app/router/router.config"
import { useAuthStore } from "../../../app/store/store"
import { useLoginStore } from "../../../shared/loginStore/loginStore"
import { login as loginFn } from "../../../app/api/AuthService/AuthService"
import { useState } from "react"
import { nanoid } from "nanoid"
import { getMyProfile } from "../../Profile/api/api"
import { useProfileStore } from "../../Profile/store/store"

export const Login = () => {

  const navigate = useNavigate();
  const { login, password, setLogin, setPassword, isLoading, setIsLoading, setId } = useLoginStore();
  const { setIsAuth } = useAuthStore();
  
  const [usernameMessages, setUsernameMessages] = useState<string[]>([])
  const [passwordMessages, setPasswordMessages] = useState<string[]>([])
  const [detailMessage, setDetailMessage] = useState<string>("")
  const { setAll } = useProfileStore();

  const handleLogin = () => {
    setIsLoading(true);
    loginFn(login, password)
      .then((res) => {
        setId(res.user.id)
        setIsAuth(true)
        navigate(Routes.PROFILE)
        getMyProfile()
        .then(res => {
          setAll(res)
        })
      })
      .catch((err) => {
        setIsAuth(false)
        if(err.response.data.username){
          setUsernameMessages([...err.response.data.username])
        }
        if(err.response.data.password){
          setPasswordMessages([...err.response.data.password])
        }
        if(err.response.data.detail){
          setDetailMessage(err.response.data.detail)
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <AuthLayout isLoading={isLoading}>
      <div className={s.content}>
        <h1 className={s.title}>Войти</h1>
        <Input
          type="text"
          placeholder="Введите логин"
          className={s.inp}
          value={login}
          onChange={e => setLogin(e.target.value)} />
        <Input
          type="password"
          placeholder="Введите пароль"
          className={s.inp}
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <p>Забыли пароль?</p>
        <Button className={s.btn} onClick={handleLogin}>Войти</Button>
        <Button className={s.btn} variant={VARIANT.black} onClick={() => navigate(Routes.REGISTRATION)}>Создать профиль</Button>
        {usernameMessages.map(mess => <h5 key={nanoid()} style={{color: "red", width: "340px"}}>{mess}</h5>)}
        {passwordMessages.map(mess => <h5 key={nanoid()} style={{color: "red", width: "340px"}}>{mess}</h5>)}
        {detailMessage.length !== 0 && <h5 key={nanoid()} style={{color: "red", width: "340px"}}>{detailMessage}</h5>}
      </div>
    </AuthLayout >
  )
}
