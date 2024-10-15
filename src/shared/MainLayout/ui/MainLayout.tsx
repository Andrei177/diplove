import { PropsWithChildren } from "react"
import s from "./MainLayout.module.css"

export const MainLayout = ({children} : PropsWithChildren) => {
  return (
    <div className={s.layout}>
        <div className={s.content}>
            {children}
        </div>
    </div>
  )
}
