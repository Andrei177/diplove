import { FC, useEffect, useState } from "react";
import { IProfileResponse } from "../types/TypesResponseApi";
import { createLike } from "../api/createLikeApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import s from "./FormMobile.module.css"
import { getInterest } from "../../Profile/helpers/getInterest";
import Item from "../../../shared/ui/Item/Item";
import 'swiper/css/bundle';
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import heart from "../../Profile/assets/heart.svg";
import white_quote from "../assets/white_quote.svg";
import quote from "../../Profile/assets/quote.svg";
import cx from "classnames";
import { BACKEND_URL } from "../../../app/api/privateApi";
import { useSwipeable } from "react-swipeable";
import { deleteLike, ILikesResponse } from "../../Likes/api/api";

interface IPropsForm {
    profile: IProfileResponse;
    incrementIndex?: () => void;
    isVisible?: boolean;
    inLikesPage?: boolean;
    likeId?: number;
    ankets?: ILikesResponse[];
    setAnkets?: (newAnkets: ILikesResponse[]) => void;
}

export const FormMobile: FC<IPropsForm> = ({ profile, incrementIndex, isVisible = true, inLikesPage = false, likeId, ankets, setAnkets }) => {

    useEffect(() => {
        console.log(profile, "чья то анкета");
    }, [])

    const handleLike = () => {
        if(inLikesPage){
            if(setAnkets && ankets) setAnkets([...ankets.filter(anket => anket.like.id !== likeId)])
            return;
        }
        if (incrementIndex) incrementIndex();

        if (profile.id) createLike(profile.id)
            .then(res => console.log(res.detail, "ответ при создании лайка"))
            .catch(err => console.log(err, "Ошибка при создании лайка"))
    }

    const [isScrolling, setIsScrolling] = useState(false);

    const [showAnket, setShowAnket] = useState(true);
    const handleDislike = () => {
        if(inLikesPage){
            if(likeId){
                deleteLike(likeId)
                .then(res => console.log(res, "Ответ при удалении лайка"))
                .catch(err => console.log(err, "Ошибка при удалении лайка"))
                .finally(() => {if(setAnkets && ankets) setAnkets([...ankets.filter(anket => anket.like.id !== likeId)])})
            }
        }
        if (incrementIndex) incrementIndex();

        setShowAnket(false);
    }

    const [showInfo, setShowInfo] = useState<boolean>(false)
    const handlers = useSwipeable({
        onSwipedUp: () => !isScrolling && setShowInfo(true),
        onSwipedDown: () => !isScrolling && setShowInfo(false),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    const handleScrollStart = () => {
        setIsScrolling(true);
    };

    const handleScrollEnd = () => {
        setIsScrolling(false);
    };

    return (
        <>{isVisible &&
            <div className={inLikesPage ? (showAnket ? s.wrapper : s.none) : s.wrapper}>
                <div className={s.avatar} {...handlers} onDoubleClick={() => setShowInfo(!showInfo)}>
                    <div className={inLikesPage ? cx(s.avatar_img, s.small) : s.avatar_img}>
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
                            modules={[Navigation]}
                            className={s.swiper}
                        >
                            {profile.images.sort((a, b) => +(b.is_main_image === true) - +(a.is_main_image === true)).map((img) => (
                                <SwiperSlide className={s.slide} key={img.id}>
                                    <img className={s.image} src={BACKEND_URL + img.image} alt="profile" />
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
                        <div className={showInfo ? cx(s.all_info, s.show) : cx(s.all_info, s.hide)}
                            onTouchMove={handleScrollStart}
                            onScroll={handleScrollStart}
                            onMouseLeave={handleScrollEnd} // Для мыши
                            onTouchEnd={handleScrollEnd}
                        >
                            <div className={s.all_info_inner}>
                                <h2 className={cx(s.name, s.black)}>{profile.first_name}, {profile.age}</h2>
                                {profile.description !== null && <>
                                    <h2 className={cx(s.desc, s.black)}>
                                        <img src={quote} />
                                        {profile.description}
                                    </h2>
                                </>}
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