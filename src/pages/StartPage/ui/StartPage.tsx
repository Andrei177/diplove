import { useNavigate } from "react-router-dom"
import Button from "../../../shared/ui/Button/Button"
import s from "./StartPage.module.css"
import { Routes } from "../../../router/router.config";

const StartPage = () => {

  const navigate = useNavigate();

  return (
    <div className={s['start-page']}>
      <h1 className={s.title}>Morfix</h1>
      <Button className={s.btn} onClick={() => navigate(Routes.REGISTRATION)}>Создать профиль</Button>
      <p className={s.description}>
        Osertad pov plamiment. Säbel<br/>
        vovis. Hypov nesk, pyrade.<br/>
        Pseudosere dalig. Operastat åbas.
      </p>
    </div>
  )
}

export default StartPage
