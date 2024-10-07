import { FC, ReactNode } from "react"
import s from "./AuthLayout.module.css"

interface IPropsAuthLayout {
  children: ReactNode;
}

export const AuthLayout: FC<IPropsAuthLayout> = ({ children }) => {
  return (
    <div className={s.layout}>
      <div className={s.form}>
        <div className={s.form_content}>
          {children}
        </div>
      </div>
    </div>
  )
}