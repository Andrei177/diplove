import { Routes } from "../../../router/router.config"
import { QuestionLayout } from "../../../shared/QuestionLayout"

export const Birthday = () => {
  return (
    <QuestionLayout prevRoute={Routes.NAME} nextRoute={Routes.INTERES}>
      <div>Укажи дату рождения</div>
    </QuestionLayout>
  )
}