import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import Button from "../../../shared/ui/Button/Button"
import s from "./Gender.module.css"

export const Gender = () => {
  return (
    <QuestionLayout prevRoute={Routes.START_PAGE} nextRoute={Routes.NAME}>
      <div className={s.content}>
        <h1 className={s.title}>Привет!<br/>давай знакомиться!</h1>
        <h2 className={s.subtitle}>Выберите свой пол, чтобы мы могли<br/>правильно настроить ваш профиль.</h2>
        <Button variant="black" className={s.btn}>Мужчина</Button>
        <Button variant="black" className={s.btn}>Девушка</Button>
      </div>
    </QuestionLayout>
  )
}