import { useProfileStore } from "../store/store"
import s from "./ProfileTop.module.css"
import done from "../assets/done.svg"
import { FC, useState } from "react"
import { addImage, updateProfile } from "../api/api"
import { Loader } from "../../../shared/ui/Loader"
import UploadImage from "./UploadImage/UploadImage"
import ava from "../../../assets/ava.svg"
import heart from "../assets/heart.svg"
import settings from "../assets/settings.svg"
import point from "../assets/point.svg"
import Item from "../../../shared/ui/Item/Item"
import { getInterest } from "../helpers/getInterest"
import Modal from "../../../shared/ui/Modal/Modal"
import { EditPen } from "../../../shared/ui/EditPen/EditPen"
import { Settings } from "./Settings/Settings"
import { useMediaQuery } from "react-responsive"
import { getImageUrl } from "../../../shared/helpers/getImageUrl"

interface IPropsProfileTop {
    isEdit: boolean;
    setIsEdit: (bool: boolean) => void;
}

export const ProfileTop: FC<IPropsProfileTop> = ({ isEdit, setIsEdit }) => {

    const profileInfo = useProfileStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const [showSettings, setShowSettings] = useState<boolean>(false);

    const isMobile = useMediaQuery({ maxWidth: "625px" });

    const setAvatar = () => {
        if(profileInfo.images.length){
            return getImageUrl(profileInfo.images.filter(img => img.is_main_image).sort((a, b) => b.id - a.id)[0]?.image)
        }
        return ava 
    }

    const handleClick = () => {
        if (isEdit) {
            setIsLoading(true);

            updateProfile({ ...profileInfo })
                .then(res => profileInfo.setAll(res))
                .finally(() => {
                    setIsEdit(!isEdit)
                    setIsLoading(false);
                })

            if (image) {
                addImage(image, true)
                    .then((res) => {
                        setImage(null)
                        profileInfo.setImages([...profileInfo.images, res[0]]) //добавляю в стор новую фотку
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
                                : <UploadImage onChange={(e) => { e.target.files && setImage(e.target.files[0])}} />
                            : <img className={s.img} src={setAvatar()} />}
                    </div>
                    <div className={s.main_info}>
                        <h2 className={s.name}>{profileInfo.first_name}, {profileInfo.age}</h2>
                        <h3 className={s.geo}><img src={point}/>{profileInfo.address.slice(profileInfo.address.lastIndexOf(',') + 1)}</h3>
                        <Item className={s.interes} text={getInterest(profileInfo.dating_purpose)} img={heart} />
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