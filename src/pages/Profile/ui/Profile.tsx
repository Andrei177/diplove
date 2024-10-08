import { Link } from "react-router-dom"
import { Routes } from "../../../app/router/router.config"

export const Profile = () => {
  return (
    <div>
      <h1>Профиль</h1>
      <Link to={Routes.CHATS}>Чаты</Link>
    </div>
  )
}
