import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { Genders, useQuestionsStore } from "../../../shared/questionsStore/store"
import Button from "../../../shared/ui/Button/Button"
import s from "./Gender.module.css"

export const Gender = () => {

  const {gender, setGender} = useQuestionsStore();

  return (
    <QuestionLayout prevRoute={Routes.START_PAGE} nextRoute={Routes.NAME}>
      <div className={s.content}>
        <h1 className={s.title}>Привет!<br/>Давай знакомиться!</h1>
        <h2 className={s.subtitle}>Выберите свой пол, чтобы мы могли<br/>правильно настроить ваш профиль.</h2>
        <Button 
          variant={gender === Genders.MALE ? "black" : "transparent"} 
          className={s.btn} 
          onClick={() => setGender(Genders.MALE)}
        >
          Мужчина
        </Button>
        <Button 
          variant={gender === Genders.FEMALE ? "black" : "transparent"} 
          className={s.btn} 
          onClick={() => setGender(Genders.FEMALE)}
        >
          Девушка
        </Button>
      </div>
    </QuestionLayout>
  )
}