import { Routes } from "../../../router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"

export const Gender = () => {
  return (
    <QuestionLayout prevRoute={Routes.START_PAGE} nextRoute={Routes.NAME}>
      <div>Привет, давай знакомиться!</div>
    </QuestionLayout>
  )
}