import { useProfileStore } from "../store/store"
import s from "./ProfileTop.module.css"
import editPen from "../assets/edit.svg"
import done from "../assets/done.svg"
import { FC, useState } from "react";
import { addImage, updateProfile } from "../api/api"
import { Loader } from "../../../shared/ui/Loader"
import UploadImage from "./UploadImage/UploadImage"
import ava from "../../../assets/ava.svg"

interface IPropsProfileTop {
    isEdit: boolean;
    setIsEdit: (bool: boolean) => void;
    imageUrl: string;
    setImageUrl: (url: string) => void;
}

export const ProfileTop: FC<IPropsProfileTop> = ({imageUrl, isEdit, setIsEdit, setImageUrl}) => {

    const profileInfo = useProfileStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const handleClick = () => {
        if(isEdit){
            setIsLoading(true);

            updateProfile({...profileInfo})
            .then(res => profileInfo.setAll(res))
            .catch(err => console.log(err, "Ошибка при обновлении профиля"))
            .finally(() => {
                setIsEdit(!isEdit)
                setIsLoading(false);
            })

            if(image){
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
        <div className={s.wrapper}>
            <div className={s.info}>
                <div className={s.image}>
                    {isEdit 
                        ? image 
                            ? <img className={s.img} src={URL.createObjectURL(image)}/> 
                            : <UploadImage onChange={(e) => {e.target.files && setImage(e.target.files[0]); console.log(e.target.files, "прикрепленное фото");}}/>
                        : <img className={s.img} src={imageUrl ? imageUrl : ava} />}
                </div>
                <h2 className={s.name}>{profileInfo.first_name}, {profileInfo.age}</h2>
            </div>
            <div 
                className={s.edit} 
                onClick={handleClick}
            >
                {!isEdit ? <img src={editPen} alt="ред." /> : <img src={done} alt="сохранить" />}
            </div>
            {
                isLoading && <Loader className={s.loader} positionAbsolute={true}/>
            }
        </div>
    )
}