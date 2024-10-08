import { FC, ReactNode } from "react"
import s from "./AuthLayout.module.css"

interface IPropsAuthLayout {
  children: ReactNode;
  isLoading: boolean;
}

export const AuthLayout: FC<IPropsAuthLayout> = ({ children, isLoading }) => {
  return (
    <div className={s.layout}>
      <div className={s.form}>
        {isLoading && <h3>Загрузка...</h3>}
        <div className={s.form_content}>
          {children}
        </div>
      </div>
    </div>
  )
}