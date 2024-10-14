import { FC } from "react";
import s from "./Loader.module.css"
import cx from "classnames";

interface IPropsLoader{
  className?: string;
}

export const Loader: FC<IPropsLoader> = ({className}) => {
  return (
    <div className={s.loader_wrapper}>
      <div className={cx(s.loader, className)}/>
    </div>
  )
}
