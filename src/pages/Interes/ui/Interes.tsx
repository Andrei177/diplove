import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"
import { Interests, useQuestionsStore } from "../../../shared/questionsStore/store"
import Button from "../../../shared/ui/Button/Button"
import s from "./Interes.module.css"
import { useNavigate } from "react-router-dom"

const interests = [
  {text: "Серьёзные отношения", key: Interests.RELATIONSHIP},
  {text: "Общение и дружба", key: Interests.FRIENDSHIP},
  {text: "Флирт и свидания", key: Interests.FLIRT},
  {text: "Решу потом", key: Interests.UNRESOLVED},
]

export const Interes = () => {
  const { interes, setInteres, createAnket} = useQuestionsStore();
  const navigate = useNavigate();

  const handleClick = (interesItemKey: string) => {
    setInteres(interesItemKey);
    createAnket()
    .then(res => {
      console.log(res)
      navigate(Routes.PROFILE);
    })
    .catch(err => console.log(err, "Ошибка при создании анкеты"))
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
            variant={interesItem.key ===  interes ? "black" : "transparent"}
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