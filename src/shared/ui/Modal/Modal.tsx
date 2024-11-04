import { FC, ReactNode } from "react"
import s from "./Modal.module.css"

interface IPropsModal{
    children: ReactNode;
}

export const Modal: FC<IPropsModal> = ({children}) => {
  return (
    <div className={s.modal}>
      <div className={s.content}>
        {children}
      </div>
    </div>
  )
}

export default Modal
