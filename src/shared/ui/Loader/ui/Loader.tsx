import { FC } from "react";
import s from "./Loader.module.css"
import cx from "classnames";

interface IPropsLoader{
  className?: string;
  positionAbsolute?: boolean;
}

export const Loader: FC<IPropsLoader> = ({className, positionAbsolute}) => {
  return (
    <div className={cx(s.loader_wrapper, positionAbsolute && s.absolute)}>
      <div className={cx(s.loader, className)}/>
    </div>
  )
}
