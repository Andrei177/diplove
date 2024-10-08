import { Routes } from "../../../app/router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"

export const Interes = () => {
    //nextRoute поправить
  return (
    <QuestionLayout prevRoute={Routes.BIRTHDAY} nextRoute={Routes.PROFILE}> 
      <div>Что тебя интересует?</div>
    </QuestionLayout>
  )
}