import s from "./Form.module.css"
import dislike from "../assets/dislike.svg"
import like from "../assets/like.svg"
import { FC, useEffect } from "react";
import { IProfileResponse } from "../types/TypesResponseApi";
import { createLike } from "../api/createLikeApi";

interface IPropsForm {
    profile: IProfileResponse;
    incrementIndex: () => void;
    isVisible: boolean;
}

export const Form: FC<IPropsForm> = ({ profile, incrementIndex, isVisible }) => {

    //В ЭТОМ КОМПОНЕНТЕ ПЕРЕДЕЛАТЬ, ЧТОБЫ БЫЛО НЕ ОДНО ФОТО А ВСЕ ФОТО ПОЛЬЗОВАТЕЛЯ В АНКЕТЕ МОЖНО БЫЛО ЛИСТАТЬ
    const imageUrl: string = profile.images.length
        ? "http://localhost:8000" + profile.images.filter(img => img.is_main_image)?.sort((a, b) => b.id - a.id)[0]?.image
        : "";

    useEffect(() => {
        console.log(profile, "чья то анкета");
    }, [])

    const handleLike = () => {
        incrementIndex();
        
        createLike(profile.id)
        .then(res => console.log(res.detail, "ответ при создании лайка"))
        .catch(err => console.log(err, "Ошибка при создании лайка"))
    }

    return (
        <>{isVisible &&
            <div className={s.wrapper}>
                <div className={s.avatar}>
                    <div className={s.avatar_img}>
                        <img className={s.image} src={imageUrl} loading="lazy" />
                        <div className={s.assessment}>
                            <div
                                className={s.dislike}
                                onClick={incrementIndex}
                            >
                                <img src={dislike} alt="dis" />
                            </div>
                            <div
                                className={s.like}
                                onClick={handleLike}
                            >
                                <img src={like} alt="like" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.info}>
                    <h2 className={s.name}>{profile.first_name}, {profile.age}</h2>
                    <h2>{profile.description}</h2>
                </div>
            </div>
        }</>
    )
}