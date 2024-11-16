import { FC, useEffect, useState } from "react";
import { IProfileResponse } from "../types/TypesResponseApi";
import { createLike } from "../api/createLikeApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import s from "./FormMobile.module.css"
import { getInterest } from "../../Profile/helpers/getInterest";
import Item from "../../../shared/ui/Item/Item";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import heart from "../../Profile/assets/heart.svg";
import white_quote from "../assets/white_quote.svg";
import quote from "../../Profile/assets/quote.svg";
import cx from "classnames";

interface IPropsForm {
    profile: IProfileResponse;
    incrementIndex?: () => void;
    isVisible?: boolean;
    inLikesPage?: boolean;
}

export const FormMobile: FC<IPropsForm> = ({ profile, incrementIndex, isVisible = true, inLikesPage = false }) => {

    useEffect(() => {
        console.log(profile, "чья то анкета");
    }, [])

    const handleLike = () => {
        if(incrementIndex) incrementIndex();

        if (profile.id) createLike(profile.id)
            .then(res => console.log(res.detail, "ответ при создании лайка"))
            .catch(err => console.log(err, "Ошибка при создании лайка"))
    }

    const [showAnket, setShowAnket] = useState(true);
    const handleDislike = () => {
        if(incrementIndex) incrementIndex();

        setShowAnket(false);
    }

    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const minSwipeDistance = 70
    const onTouchStart = (e: any) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientY)
    }
    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientY)
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        if (distance > minSwipeDistance) setShowInfo(true)
        else if (distance < -minSwipeDistance) setShowInfo(false)
    }

    return (
        <>{isVisible &&
            <div className={inLikesPage ? (showAnket ? s.wrapper : s.none) : s.wrapper}>
                <div className={s.avatar}>
                    <div className={inLikesPage ? cx(s.avatar_img, s.small) : s.avatar_img} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onDoubleClick={() => setShowInfo(!showInfo)}>
                        {!showInfo && <div className={s.top}>
                            <h2 className={s.name}>{profile.first_name}, {profile.age}</h2>
                            <Item className={s.item} text={getInterest(profile.dating_purpose)} img={heart} />
                        </div>}
                        <Swiper
                            key={profile.user_id}
                            spaceBetween={10}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            modules={[Navigation]} // Включаем Navigation в модули
                            className={s.swiper}
                        >
                            {profile.images.map((img) => (
                                <SwiperSlide className={s.slide} key={img.id}>
                                    <img className={s.image} src={"http://localhost:8000" + img.image} alt="Profile" />
                                </SwiperSlide>
                            ))}
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                        </Swiper>
                        {
                            !showInfo && <div className={s.short_info}>
                                {profile.description !== null && <>
                                <h2 className={s.desc}>
                                    <img src={white_quote} />
                                    {profile.description}
                                </h2>
                                </>}
                            </div>
                        }
                        <div className={s.assessment}>
                            <div
                                className={s.dislike}
                                onClick={handleDislike}
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
                        <div className={showInfo ? cx(s.all_info, s.show) : cx(s.all_info, s.hide)}>
                            <div className={s.all_info_inner}>
                                <h2 className={cx(s.name, s.black)}>{profile.first_name}, {profile.age}</h2>
                                    <h2 className={cx(s.desc, s.black)}>
                                        <img src={quote} />
                                        {profile.description}
                                    </h2>
                                <div>
                                    <h3 className={s.subtitle}>Основное</h3>
                                    <div className={s.items}>
                                        <Item className={s.item} text={getInterest(profile.dating_purpose)} img={heart} />
                                    </div>
                                </div>
                                <div>
                                    {profile.hobbies.length !== 0 && <>
                                        <h3 className={s.subtitle}>Обо мне</h3>
                                        <div className={s.items}>
                                            {
                                                profile.hobbies.map((hobby) => <Item className={s.item} text={hobby.name} key={hobby.id} />)
                                            }
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }</>
    )
}