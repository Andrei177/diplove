import { useEffect } from "react"
import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { Gender, useQuestionsStore } from "../../../shared/questionsStore/store"
import Button, { VARIANT } from "../../../shared/ui/Button/Button"
import s from "./Gender.module.css"
import { useProfileStore } from "../../Profile/store/store"

export const GenderComponent = () => {

  const { gender, setGender, setLocation } = useQuestionsStore();
  const setProfileLocation = useProfileStore(state => state.setLocation);

  useEffect(() => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setProfileLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    })
  }, [])

  return (
    <QuestionLayout prevRoute={Routes.START_PAGE} nextRoute={gender.length > 0 ? Routes.SEARCH_GENDER : ""}>
      <div className={s.content}>
        <h1 className={s.title}>Привет!<br />Давай знакомиться!</h1>
        <h2 className={s.subtitle}>Выберите свой пол, чтобы мы могли<br />правильно настроить ваш профиль.</h2>
        <Button
          variant={gender === Gender.MALE ? VARIANT.black : VARIANT.transparent}
          className={s.btn}
          onClick={() => setGender(Gender.MALE)}
        >
          Мужчина
        </Button>
        <Button
          variant={gender === Gender.FEMALE ? VARIANT.black : VARIANT.transparent}
          className={s.btn}
          onClick={() => setGender(Gender.FEMALE)}
        >
          Девушка
        </Button>
      </div>
    </QuestionLayout>
  )
}

export default GenderComponent