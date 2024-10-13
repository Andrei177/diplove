import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import Input from "../../../shared/ui/Input/Input"
import s from "./Birthday.module.css"

export const Birthday = () => {
  return (
    <QuestionLayout prevRoute={Routes.NAME} nextRoute={Routes.INTERES}>
      <div className={s.content}>
        <h1 className={s.title}>'Имя с прошлого вопроса', укажи дату рождения</h1>
        <h2 className={s.subtitle}>Вам должно быть не менее 18 лет для<br/>регистрации на Morfix.</h2>
        <Input type="date" className={s.inp}/>
      </div>
    </QuestionLayout>
  )
}