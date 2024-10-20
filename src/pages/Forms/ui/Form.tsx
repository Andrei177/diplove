import s from "./Form.module.css"
import dislike from "../assets/dislike.svg"
import like from "../assets/like.svg"
import { FC } from "react";
import { IProfileResponse } from "../types/TypesResponseApi";

interface IPropsForm {
    profile: IProfileResponse;
    incrementIndex: () => void;
}

export const Form: FC<IPropsForm> = ({ profile, incrementIndex }) => {

    const imageUrl: string = profile.images.length
        ? "http://localhost:8000" + profile.images.filter(img => img.is_main_image).sort((a, b) => b.id - a.id)[0].image
        : "";

    return (
        <div className={s.wrapper}>
            <div className={s.avatar}>
                <div className={s.avatar_img}>
                    <img className={s.image} src={imageUrl} alt="" />
                    <div className={s.assessment}>
                        <div
                            className={s.dislike}
                            onClick={incrementIndex}
                        >
                            <img src={dislike} alt="" />
                        </div>
                        <div
                            className={s.like}
                            onClick={incrementIndex}
                        >
                            <img src={like} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.info}>
                <h2 className={s.name}>{profile.first_name}, {profile.age}</h2>
            </div>
        </div>
    )
}