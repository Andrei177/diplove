import { FC, ReactNode } from "react"
import s from "./Button.module.css"

interface IPropsButton{
  children: ReactNode,
  className?: string,
  onClick?: () => void
}

const Button: FC<IPropsButton> = (props) => {
  return (
    <button className={s.btn + ` ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
