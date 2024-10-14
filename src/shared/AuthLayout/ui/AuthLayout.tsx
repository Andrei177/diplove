import { FC, ReactNode } from "react"
import s from "./AuthLayout.module.css"
import { Loader } from "../../ui/Loader";

interface IPropsAuthLayout {
  children: ReactNode;
  isLoading: boolean;
}

export const AuthLayout: FC<IPropsAuthLayout> = ({ children, isLoading }) => {
  return (
    <div className={s.layout}>
      <div className={s.form}>
        {isLoading && <Loader className={s.loader} />}
        <div className={s.form_content}>
          {children}
        </div>
      </div>
    </div>
  )
}