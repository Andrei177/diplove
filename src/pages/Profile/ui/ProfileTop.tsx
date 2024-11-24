import { useProfileStore } from "../store/store"
import s from "./ProfileTop.module.css"
import done from "../assets/done.svg"
import { FC, useEffect, useState } from "react"
import { addImages, updateProfile } from "../api/api"
import { Loader } from "../../../shared/ui/Loader"
import UploadImage from "./UploadImage/UploadImage"
import ava from "../assets/default_ava.svg"
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
import Button from "../../../shared/ui/Button/Button"
import cx from "classnames"
import imageCompression from "browser-image-compression";

interface IPropsProfileTop {
    isEdit: boolean;
    setIsEdit: (bool: boolean) => void;
    image: File | null;
    setImage: (newImg: File | null) => void;
    selectedImages: File[];
    setSelectedImages: (newFiles: File[]) => void;
}

export const ProfileTop: FC<IPropsProfileTop> = ({ isEdit, setIsEdit, image, setImage, selectedImages, setSelectedImages }) => {

    const profileInfo = useProfileStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [haveAvatar, setHaveAvatar] = useState(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [showQuestionLocation, setShowQuestionLocation] = useState<boolean>(false);

    const isMobile = useMediaQuery({ maxWidth: "625px" });

    const setAvatar = () => {
        if (profileInfo.images.length) {
            return getImageUrl(profileInfo.images.filter(img => img.is_main_image).sort((a, b) => b.id - a.id)[0]?.image)
        }
        return ava
    }

    const addImagesFn = (imgs: Blob[], withAva: boolean = false) => {
        addImages(imgs, withAva)
            .then((res) => {
                setImage(null)
                setSelectedImages([])
                profileInfo.setImages([...profileInfo.images, ...res]) //добавляю в стор новые фотки
            })
            .catch(() => {
                alert("Не удалось загрузить новые фото, вероятнее всего слишком большой размер фото")
            })
    }

    const handleClick = async () => {
        if (isEdit) {
            setIsLoading(true);

            updateProfile({ ...profileInfo })
                .then(res => profileInfo.setAll(res))
                .finally(() => {
                    setIsEdit(!isEdit)
                    setIsLoading(false);
                })

            if (image || selectedImages.length > 0) {
                if (image) {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };

                    try {
                        const compressedFile = await imageCompression(image, options);

                        addImagesFn([...selectedImages, compressedFile], true)
                    } catch (error) {
                        console.error(error);
                        setSelectedImages([...selectedImages, image])

                        addImagesFn([...selectedImages, image], true)
                    }
                }
                else {
                    addImagesFn([...selectedImages])
                }
            }
        }
        else setIsEdit(!isEdit)
    }

    const updateLocation = () => {
        const geo = navigator.geolocation;
        geo.getCurrentPosition((position) => {
            profileInfo.setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
            () => {
                alert("Возникла ошибка при получении позиции, возможно вы не включили её или не дали разрешение")
            }
        )
        setShowQuestionLocation(false);
    }

    useEffect(() => {
        setHaveAvatar(!!profileInfo.images.find(img => img.is_main_image));
    }, [isEdit, profileInfo])

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
                                : haveAvatar
                                    ? <img className={s.img} src={setAvatar()} />
                                    : <UploadImage onChange={(e) => { e.target.files && setImage(e.target.files[0]) }} />
                            : <img className={cx(s.img, !haveAvatar && s.default_ava)} src={setAvatar()} />}
                    </div>
                    <div className={s.main_info}>
                        <h2 className={s.name}>
                            {profileInfo.first_name.length > 20 && isMobile
                                ? profileInfo.first_name.substring(0, 20) + "..."
                                : profileInfo.first_name},
                            {" " + profileInfo.age}
                        </h2>
                        <h3 className={s.geo}>
                            <img src={point} />
                            {profileInfo.address.slice(profileInfo.address.lastIndexOf(',') + 1)}
                            {isEdit && <EditPen onClick={() => setShowQuestionLocation(true)} />}
                        </h3>
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
            <Modal
                showModal={showQuestionLocation}
                setShowModal={setShowQuestionLocation}
            >
                <div className={s.update_geo}>
                    <h3 className={s.title_geo}>Обновление местоположения</h3>
                    <h2 className={s.subtitle_geo}>Не забудьте сохранить изменения после обновления</h2>
                    <h2 className={s.subtitle_geo}>Перед обновлением проверьте <br /> включена ли геопозиция на вашем устройстве <br /> и дано ли разрешение <br /> на его определение нашему сайту</h2>
                    <Button className={s.btn} onClick={updateLocation}>Обновить местоположение</Button>
                </div>
            </Modal>
        </>
    )
}