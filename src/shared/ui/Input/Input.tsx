import { FC, InputHTMLAttributes } from "react"
import s from "./Input.module.css"
import cx from "classnames"

interface IPropsInput extends InputHTMLAttributes<HTMLInputElement>{
  className?: string
}

const Input: FC<IPropsInput> = ({className, ...otherProps}) => {
  return (
    <input className={cx(s.inp, className)} {...otherProps}/>
  )
}

export default Input
