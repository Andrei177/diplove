import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { useQuestionsStore } from "../../../shared/questionsStore/store"
import Input from "../../../shared/ui/Input/Input"
import s from "./Birthday.module.css"

export const Birthday = () => {

  const { firstName: name, birthday, setBirthday } = useQuestionsStore();

  //2024-10-04 такой формат строки с датой

  return (
    <QuestionLayout prevRoute={Routes.NAME} nextRoute={Routes.INTERES}>
      <div className={s.content}>
        <h1 className={s.title}>{name}, укажи дату рождения</h1>
        <h2 className={s.subtitle}>Вам должно быть не менее 18 лет для<br/>регистрации на Morfix.</h2>
        <Input type="date" className={s.inp} value={birthday} onChange={e => setBirthday(e.target.value)}/>
      </div>
    </QuestionLayout>
  )
}