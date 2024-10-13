import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import Button from "../../../shared/ui/Button/Button"
import s from "./Interes.module.css"

export const Interes = () => {
    //nextRoute поправить
  return (
    <QuestionLayout prevRoute={Routes.BIRTHDAY}> 
      <div className={s.content}>
        <h1 className={s.title}>Что тебя интересует?</h1>
        <h2 className={s.subtitle}>Это поможет нам предложить вам<br />подходящих партнеров.</h2>
        <Button className={s.btn} variant="transparent">Серьёзные отношения</Button>
        <Button className={s.btn} variant="transparent">Серьёзные отношения</Button>
        <Button className={s.btn} variant="transparent">Серьёзные отношения</Button>
        <Button className={s.btn} variant="transparent">Серьёзные отношения</Button>
      </div>
    </QuestionLayout>
  )
}