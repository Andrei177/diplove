import { useNavigate } from "react-router-dom"
import Button, { VARIANT } from "../../../../shared/ui/Button/Button"
import s from "../StartPage.module.css"
import { Routes } from "../../../../app/router/router.config";

export const StartPageDekstop = () => {

  const navigate = useNavigate();

  return (
    <div className={s['start-page']}>
      <h1 className={s.title}>Morfix</h1>
      <Button variant={VARIANT.black} className={s.btn} onClick={() => navigate(Routes.REGISTRATION)}>Создать профиль</Button>
      <p className={s.description}>
        Osertad pov plamiment. Säbel<br/>
        vovis. Hypov nesk, pyrade.<br/>
        Pseudosere dalig. Operastat åbas.
      </p>
    </div>
  )
}