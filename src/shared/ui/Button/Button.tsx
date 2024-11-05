import { ButtonHTMLAttributes, FC } from "react"
import s from "./Button.module.css"
import cx from "classnames"

export enum VARIANT{
  blue="blue",
  black="black",
  transparent="transparent",
  red="red"
}

interface IPropsButton extends ButtonHTMLAttributes<HTMLInputElement>{
  className?: string,
  onClick?: () => void,
  variant?: VARIANT 
}

const Button: FC<IPropsButton> = ({variant = VARIANT.blue, ...props}) => {
  return (
    <button 
      className={cx(s.btn, props.className, s[variant])} 
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
