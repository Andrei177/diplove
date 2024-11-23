import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { Gender, useQuestionsStore } from "../../../shared/questionsStore/store"
import Button, { VARIANT } from "../../../shared/ui/Button/Button"
import s from "./SearchGender.module.css"

export const SearchGender = () => {

  const {searchingGender, setSearchingGender} = useQuestionsStore();

  return (
    <QuestionLayout prevRoute={Routes.GENDER} nextRoute={searchingGender.length > 0 ? Routes.NAME : ""}>
      <div className={s.content}>
        <h1 className={s.title}>Кого же ты ищешь?</h1>
        <h2 className={s.subtitle}>Выберите пол кого ты хочешь искать</h2>
        <Button 
          variant={searchingGender === Gender.MALE ? VARIANT.black : VARIANT.transparent} 
          className={s.btn} 
          onClick={() => setSearchingGender(Gender.MALE)}
        >
          Мужчина
        </Button>
        <Button 
          variant={searchingGender === Gender.FEMALE ? VARIANT.black : VARIANT.transparent} 
          className={s.btn} 
          onClick={() => setSearchingGender(Gender.FEMALE)}
        >
          Девушка
        </Button>
      </div>
    </QuestionLayout>
  )
}