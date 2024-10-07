import { Routes } from "../../../router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"

export const Interes = () => {
    //nextRoute поправить
  return (
    <QuestionLayout prevRoute={Routes.BIRTHDAY} nextRoute="/"> 
      <div>Что тебя интересует?</div>
    </QuestionLayout>
  )
}