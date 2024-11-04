import { FC } from "react";
import s from "./Item.module.css"

interface IPropsItem {
    img?: string;
    text: string | undefined;
}

export const Item: FC<IPropsItem> = ({ img, text }) => {
    return (
        <div className={s.item}>
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
