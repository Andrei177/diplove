import { Routes } from "../../../router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"

export const Name = () => {
  return (
    <QuestionLayout prevRoute={Routes.GENDER} nextRoute={Routes.BIRTHDAY}>
      <div>Как тебя зовут?</div>
    </QuestionLayout>
  )
}