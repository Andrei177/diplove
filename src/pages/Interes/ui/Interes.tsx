import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { Interest, useQuestionsStore } from "../../../shared/questionsStore/store"
import Button, { VARIANT } from "../../../shared/ui/Button/Button"
import { useProfileStore } from "../../Profile/store/store"
import s from "./Interes.module.css"
import { useNavigate } from "react-router-dom"

const interests = [
  {text: "Серьёзные отношения", key: Interest.RELATIONSHIP},
  {text: "Общение и дружба", key: Interest.FRIENDSHIP},
  {text: "Флирт и свидания", key: Interest.FLIRT},
  {text: "Решу потом", key: Interest.UNRESOLVED},
]

export const Interes = () => {
  const { interes, setInteres, createAnket} = useQuestionsStore();
  const { setAll } = useProfileStore();
  const navigate = useNavigate();

  const handleClick = (interesItemKey: string) => {
    setInteres(interesItemKey);
    createAnket()
    .then(res => {
      setAll(res.data);
      
      navigate(Routes.PROFILE);
    })
  }

  return (
    <QuestionLayout prevRoute={Routes.BIRTHDAY}> 
      <div className={s.content}>
        <h1 className={s.title}>Что тебя интересует?</h1>
        <h2 className={s.subtitle}>Это поможет нам предложить вам<br />подходящих партнеров.</h2>
        {
          interests.map(interesItem => 
          <Button 
            className={s.btn} 
            variant={interesItem.key ===  interes ? VARIANT.black : VARIANT.transparent}
            onClick={() => handleClick(interesItem.key)}
            key={interesItem.key}
          >
            {interesItem.text}
          </Button>)
        }
      </div>
    </QuestionLayout>
  )
}