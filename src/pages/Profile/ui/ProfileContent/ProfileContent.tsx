import { useProfileStore } from "../../store/store"
import s from "./ProfileContent.module.css"
import quote from "../../assets/quote.svg"
import Item from "../../../../shared/ui/Item/Item";

export const ProfileContent = () => {

    const { description, hobbies} = useProfileStore();

    return (
        <div className={s.wrapper}>
            {
                description &&
                <div className={s.about_me}>
                    <img src={quote} />
                    <div>{description}</div>
                </div>
            }
            <h3 className={s.interes}>Интересы</h3>
            <div className={s.hobbies}>
                {
                    hobbies.map(hobby => 
                    <Item
                        key={hobby.id}
                        className={s.hobby_item}
                        text={hobby.name}
                    />)
                }
            </div>
        </div>
    )
}