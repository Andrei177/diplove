import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { Genders, useQuestionsStore } from "../../../shared/questionsStore/store"
import Button from "../../../shared/ui/Button/Button"
import s from "./SearchGender.module.css"

export const SearchGender = () => {

  const {searchingGender, setSearchingGender} = useQuestionsStore();

  return (
    <QuestionLayout prevRoute={Routes.GENDER} nextRoute={Routes.NAME}>
      <div className={s.content}>
        <h1 className={s.title}>Кого же ты ищешь?</h1>
        <h2 className={s.subtitle}>Выберите пол кого ты хочешь искать</h2>
        <Button 
          variant={searchingGender === Genders.MALE ? "black" : "transparent"} 
          className={s.btn} 
          onClick={() => setSearchingGender(Genders.MALE)}
        >
          Мужчина
        </Button>
        <Button 
          variant={searchingGender === Genders.FEMALE ? "black" : "transparent"} 
          className={s.btn} 
          onClick={() => setSearchingGender(Genders.FEMALE)}
        >
          Девушка
        </Button>
      </div>
    </QuestionLayout>
  )
}