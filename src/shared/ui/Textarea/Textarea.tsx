import { FC, TextareaHTMLAttributes } from "react"
import s from "./Textarea.module.css"
import cx from "classnames"

interface IPropsTextarea extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    className?: string
}

export const Textarea: FC<IPropsTextarea> = ({className, ...otherProps}) => {
  return (
    <textarea className={cx(s.textarea, className)} {...otherProps}/>
  )
}
