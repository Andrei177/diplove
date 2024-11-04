import { useProfileStore } from "../../store/store"
import s from "./ProfileContent.module.css"
import quote from "../../assets/quote.svg"

export const ProfileContent = () => {

    const description = useProfileStore(state => state.description);

    return (
        <div className={s.wrapper}>
            {
            description && <div className={s.about_me}>
                <img src={quote}/><div>{description}</div>
            </div>
            }
            <h3 className={s.about}>Обо мне</h3>
            <h3 className={s.interes}>Интересы</h3>
        </div>
    )
}

// Вдруг понадобится при создании анкет
{/* <div className={s.main_info}>
<div className={s.name_birth}>
    <div className={s.name}>
        <h3>Имя</h3>
        <h2>{first_name}</h2>
    </div>
    <div>
        <h3>Дата рождения</h3>
        <h2>{dateFormate(birthday)}</h2>
    </div>
</div>
<div className={s.gender_search}>
    <div className={s.gender}>
        <h3>Пол</h3>
        {
            gender === Gender.MALE
                ? <h2>Мужской</h2>
                : <h2>Женский</h2>
        }
    </div>
    <div>
        <h3>Я ищу</h3>
        <h2>{getInterest(dating_purpose)}</h2>
    </div>
</div>
</div> */}