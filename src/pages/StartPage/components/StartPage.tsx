import { useNavigate } from "react-router-dom"
import Button from "../../../shared/Button/Button"
import s from "../styles/StartPage.module.css"

const StartPage = () => {

  const navigate = useNavigate();

  return (
    <div className={s['start-page']}>
      <h1 className={s.title}>Morphyx</h1>
      <Button className={s.btn} onClick={() => navigate("/auth")}>Создать профиль</Button>
      <p className={s.description}>
        Osertad pov plamiment. Säbel<br/>
        vovis. Hypov nesk, pyrade.<br/>
        Pseudosere dalig. Operastat åbas.
      </p>
    </div>
  )
}

export default StartPage
