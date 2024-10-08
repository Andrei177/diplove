import { Link } from "react-router-dom"
import { Routes } from "../../../app/router/router.config"

export const Chats = () => {
  return (
    <div>
      <h1>Чаты</h1>
      <Link to={Routes.PROFILE}>Профиль</Link>
    </div>
  )
}
