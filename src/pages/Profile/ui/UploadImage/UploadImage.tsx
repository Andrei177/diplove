import s from "./UploadImage.module.css"
import plus from "../../assets/plus.svg"
import { ChangeEvent, FC } from "react"
import cx from "classnames"

interface IPropsUploadImage {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string
}

const UploadImage: FC<IPropsUploadImage> = ({onChange, className}) => {
    return (
        <div className={cx(s.wrapper, className)}>
            <img className={s.plus} src={plus} />
            <input
                className={s.upload}
                type="file"
                accept="image/*"
                onChange={onChange} 
            />
        </div>
    )
}

export default UploadImage
