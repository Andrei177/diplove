import { useEffect, useState } from "react";
import { MainLayout } from "../../../shared/MainLayout";
import s from "./Likes.module.css";
import { getLikes, ILikesResponse } from "../api/api";
import { FormMobile } from "../../Forms/mobile/FormMobile";

export const Likes = () => {

    const [ankets, setAnkets] = useState<ILikesResponse[]>([]);

    useEffect(() => {
        getLikes()
        .then(res => {
            setAnkets(res)
        })
    }, [])

    return (
        <MainLayout>
            <div className={s.likes}>
                <div className={s.top}>
                    Вы нравитесь им
                </div>
                <div className={s.ankets}>
                    {
                        ankets.length > 0
                        ? ankets.map(anket => <FormMobile key={anket.profile.id} profile={anket.profile} inLikesPage={true}/>)
                        : <h3 className={s.nothing}>Всё взаимно</h3>
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default Likes;