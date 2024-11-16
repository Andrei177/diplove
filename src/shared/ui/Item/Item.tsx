import { FC } from "react";
import s from "./Item.module.css"
import cx from "classnames";

interface IPropsItem {
    img?: string;
    text: string | undefined;
    className?: string;
    onClick?: () => void;
}

export const Item: FC<IPropsItem> = ({ img, text, className, onClick}) => {
    return (
        <div className={cx(s.item, className && className)} onClick={onClick}>
            {
                img &&
                <div className={s.img}>
                    <img src={img} />
                </div>
            }
            <h4 className={s.text}>{text}</h4>
        </div>
    )
}

export default Item
