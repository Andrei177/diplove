import { useProfileStore } from "../store/store"
import s from "./ProfileTop.module.css"
import done from "../assets/done.svg"
import { FC, useState } from "react";
import { addImage, updateProfile } from "../api/api"
import { Loader } from "../../../shared/ui/Loader"
import UploadImage from "./UploadImage/UploadImage"
import ava from "../../../assets/ava.svg"
import heart from "../assets/heart.svg"
import settings from "../assets/settings.svg"
import Item from "../../../shared/ui/Item/Item"
import { getInterest } from "../helpers/getInterest"
import Modal from "../../../shared/ui/Modal/Modal";
import { EditPen } from "../../../shared/ui/EditPen/EditPen";
import { Settings } from "./Settings/Settings";
import { useMediaQuery } from "react-responsive";

interface IPropsProfileTop {
    isEdit: boolean;
    setIsEdit: (bool: boolean) => void;
    imageUrl: string;
    setImageUrl: (url: string) => void;
}

export const ProfileTop: FC<IPropsProfileTop> = ({ imageUrl, isEdit, setIsEdit, setImageUrl }) => {

    const profileInfo = useProfileStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const [showSettings, setShowSettings] = useState<boolean>(false);

    const isMobile = useMediaQuery({ maxWidth: "625px" });

    const handleClick = () => {
        if (isEdit) {
            setIsLoading(true);

            updateProfile({ ...profileInfo })
                .then(res => profileInfo.setAll(res))
                .catch(err => console.log(err, "Ошибка при обновлении профиля"))
                .finally(() => {
                    setIsEdit(!isEdit)
                    setIsLoading(false);
                })

            if (image) {
                addImage(image, true)
                    .then((res) => {
                        setImage(null)
                        setImageUrl(res.image)
                        console.log(res, "ответ при добавлении фото профиля");
                    })
                    .catch(err => console.log(err, "Ошибка при добавлении фото"))
            }
        }
        else setIsEdit(!isEdit)
    }

    return (
        <>
            <div className={s.wrapper}>
                {
                    isMobile && <div className={s.top}>
                        <h3 className={s.top_title}>Профиль</h3>
                        <div
                            className={s.right}
                        >
                            <div
                                className={isEdit ? s.settings : s.none}
                                onClick={() => setShowSettings(true)}
                            >
                                <img src={settings} alt="настройки" />
                            </div>
                            <div
                                className={s.edit}
                                onClick={handleClick}
                            >
                                {isEdit
                                    ? <img src={done} alt="сохранить" />
                                    : <EditPen />}
                            </div>
                        </div>
                    </div>
                }
                <div className={s.info}>
                    <div className={s.image}>
                        {isEdit
                            ? image
                                ? <img className={s.img} src={URL.createObjectURL(image)} />
                                : <UploadImage onChange={(e) => { e.target.files && setImage(e.target.files[0]); console.log(e.target.files, "прикрепленное фото"); }} />
                            : <img className={s.img} src={imageUrl ? imageUrl : ava} />}
                    </div>
                    <div className={s.main_info}>
                        <h2 className={s.name}>{profileInfo.first_name}, {profileInfo.age}</h2>
                        <Item text={getInterest(profileInfo.dating_purpose)} img={heart} />
                    </div>
                </div>
                {
                    !isMobile && <div
                        className={s.right}
                    >
                        <div
                            className={isEdit ? s.settings : s.none}
                            onClick={() => setShowSettings(true)}
                        >
                            <img src={settings} alt="настройки" />
                        </div>
                        <div
                            className={s.edit}
                            onClick={handleClick}
                        >
                            {isEdit
                                ? <img src={done} alt="сохранить" />
                                : <EditPen />}
                        </div>
                    </div>
                }
                {
                    isLoading && <Loader className={s.loader} positionAbsolute={true} />
                }
            </div>
            <Modal
                showModal={showSettings}
                setShowModal={setShowSettings}
            >
                <Settings setShowSettings={setShowSettings} />
            </Modal>
        </>
    )
}