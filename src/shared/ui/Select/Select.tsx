import { FC, InputHTMLAttributes } from "react"
import cx from "classnames"
import s from "./Select.module.css"

interface IPropsSelect extends InputHTMLAttributes<HTMLSelectElement> {
    className?: string,
    options: Array<IOption>
}

interface IOption{
    key: string;
    text: string;
}
  
const Select: FC<IPropsSelect> = ({className, options, ...otherProps}) => {
    return (
      <select className={cx(s.slct, className)} {...otherProps}>
        {
            options.map(option => (
                <option value={option.key} key={option.key}>{option.text}</option>
            ))
        }
      </select>
    )
  }

export default Select
