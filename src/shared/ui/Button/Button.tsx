import { ButtonHTMLAttributes, FC } from "react"
import s from "./Button.module.css"
import cx from "classnames"

interface IPropsButton extends ButtonHTMLAttributes<HTMLInputElement>{
  className?: string,
  onClick?: () => void,
  variant?: string 
}

const Button: FC<IPropsButton> = ({variant = "blue", ...props}) => {
  return (
    <button 
      className={cx(s.btn, props.className, s[variant])} 
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
