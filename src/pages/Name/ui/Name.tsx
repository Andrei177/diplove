import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { useQuestionsStore } from "../../../shared/questionsStore/store"
import Input from "../../../shared/ui/Input/Input"
import s from "./Name.module.css"

export const Name = () => {

  const { firstName, setFirstName } = useQuestionsStore();

  return (
    <QuestionLayout prevRoute={Routes.GENDER} nextRoute={firstName.length > 0 && firstName.length <= 25 ? Routes.BIRTHDAY : ""}>
      <div className={s.content}>
        <h1 className={s.title}>Как тебя зовут?</h1>
        <h2 className={s.subtitle}>Введите своё имя. Это то, как вас будут<br/>видеть другие пользователи.</h2>
        <Input 
          type="text" 
          className={s.inp} 
          placeholder="Ваше имя"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          />
          {firstName.length > 25 && <div className={s.info}>Имя не должно превышать 25 символов</div>}
      </div>
    </QuestionLayout>
  )
}