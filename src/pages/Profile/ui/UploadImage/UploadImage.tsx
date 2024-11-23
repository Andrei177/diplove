import s from "./UploadImage.module.css"
import plus from "../../assets/plus.svg"
import { ChangeEvent, FC, useState } from "react"
import cx from "classnames"

interface IPropsUploadImage {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    onClick?: () => void;
}

const UploadImage: FC<IPropsUploadImage> = ({ onChange, className, onClick }) => {

    const [foto, setFoto] = useState<File | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        if (e.target.files) setFoto(e.target.files[0]);
    }

    return (
        <>
            {
                foto
                    ? <div className={s.image}>
                        <img className={s.img} src={URL.createObjectURL(foto)} />
                    </div>
                    : <div className={cx(s.wrapper, className)} onClick={onClick}>
                        <img className={s.plus} src={plus} />
                        <input
                            className={s.upload}
                            type="file"
                            accept="image/*"
                            onChange={handleOnChange}
                        />
                    </div>
            }
        </>
    )
}

export default UploadImage
