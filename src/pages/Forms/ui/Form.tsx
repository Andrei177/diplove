import s from "./Form.module.css"
import dislike from "../assets/dislike.svg"
import like from "../assets/like.svg"
import { FC, useEffect } from "react";
import { IProfileResponse } from "../types/TypesResponseApi";
import { createLike } from "../api/createLikeApi";
import Item from "../../../shared/ui/Item/Item";
import { getInterest } from "../../Profile/helpers/getInterest";
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BACKEND_URL } from "../../../app/api/privateApi";

interface IPropsForm {
    profile: IProfileResponse;
    incrementIndex: () => void;
    isVisible: boolean;
}

export const Form: FC<IPropsForm> = ({ profile, incrementIndex, isVisible }) => {

    //В ЭТОМ КОМПОНЕНТЕ ПЕРЕДЕЛАТЬ, ЧТОБЫ БЫЛО НЕ ОДНО ФОТО А ВСЕ ФОТО ПОЛЬЗОВАТЕЛЯ В АНКЕТЕ МОЖНО БЫЛО ЛИСТАТЬ
    // const imageUrl: string = profile.images.length
    //     ? "http://localhost:8000" + profile.images.filter(img => img.is_main_image)?.sort((a, b) => b.id - a.id)[0]?.image
    //     : "";

    useEffect(() => {
        console.log(profile, "чья то анкета");
    }, [])

    const handleLike = () => {
        incrementIndex();

        if (profile.id) createLike(profile.id)
            .then(res => console.log(res.detail, "ответ при создании лайка"))
            .catch(err => console.log(err, "Ошибка при создании лайка"))
    }

    return (
        <>{isVisible &&
            <div className={s.wrapper}>
                <div className={s.avatar}>
                    <div className={s.avatar_img}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            navigation={{
                                nextEl: `.swiper-button-next`, // Селектор для кнопки "next"
                                prevEl: `.swiper-button-prev`, // Селектор для кнопки "prev"
                            }}
                            modules={[Navigation]} // Включаем Navigation в модули
                            className={s.swiper}
                        >
                            {profile.images.map((img) => (
                                <SwiperSlide className={s.slide} key={img.id}>
                                    <img className={s.image} src={BACKEND_URL + img.image} alt="Profile" />
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-prev" />
                            <div className="swiper-button-next" />
                        </Swiper>

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
                    <h2 className={s.desc}>{profile.description}</h2>
                    <h3 className={s.subtitle}>Основное</h3>
                    <div className={s.main_info}>
                        <Item text={getInterest(profile.dating_purpose)} />
                    </div>
                    {
                        profile.hobbies.length !== 0 &&
                        <>
                            <h3 className={s.subtitle}>Обо мне</h3>
                            <div className={s.about_profile}>
                                {
                                    profile.hobbies.map(hobby => <Item text={hobby.name} key={hobby.id} />)
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        }</>
    )
}