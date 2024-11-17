import { FC, useEffect, useState } from "react"
import s from "./Hobbies.module.css"
import { addHobbies, getHobbiesList, IHobbiesProcessed } from "./api"
import { IHobbies } from "../../../Forms/types/TypesResponseApi"
import Item from "../../../../shared/ui/Item/Item"
import { useProfileStore } from "../../store/store"
import cx from "classnames"
import Button from "../../../../shared/ui/Button/Button"

interface IPropsHobbies {
    setShowHobby: (bool: boolean) => void;
}

const Hobbies: FC<IPropsHobbies> = ({ setShowHobby }) => {

    const { hobbies, setHobbies } = useProfileStore();
    const [hobbiesList, setHobbiesList] = useState<IHobbiesProcessed[]>([]);

    useEffect(() => {
        getHobbiesList()
            .then(res => {
                const processedArr: IHobbiesProcessed[] = [];
                for (let i = 0; i < res.length; i++) {
                    if (!hobbies.find(h => h.name == res[i].name)) {
                        processedArr.push(res[i])
                    }
                }
                setHobbiesList(processedArr)
            })
    }, [])

    const handleAddHobbies = (hobby: IHobbies) => {
        setHobbiesList(hobbiesList.map(h => {
            if (h.name == hobby.name) {
                h.selected = !h.selected
                return h
            }
            return h
        }))
    }

    const handleClick = () => {
        const addedHobbies = hobbiesList.filter(h => h.selected);

        if (addedHobbies.length) {
            addHobbies(addedHobbies)
                .then(res => setHobbies([...res, ...hobbies]))
                .catch(err => console.log(err, "Ошибка при добавлении хобби"))
        }

        setShowHobby(false)
    }


    return (
        <div className={s.hobbies_wrapper}>
            <h2 className={s.title}>То, что вам нравится</h2>
            <h2 className={s.subtitle}>Интересы помогают найти людей с похожими увлечениями</h2>
            <div className={s.hobbies}>
                {
                    hobbies.map(hobby =>
                        <Item
                            key={hobby.id}
                            className={cx(s.hobby_item, s.selected)}
                            text={hobby.name}
                        />)
                }
                {
                    hobbiesList.map(hobby =>
                        <Item
                            key={hobby.id}
                            className={hobby.selected ? cx(s.hobby_item, s.selected) : s.hobby_item}
                            text={hobby.name}
                            onClick={() => handleAddHobbies(hobby)}
                        />)
                }
            </div>
            <Button onClick={handleClick} className={s.btn}>Готово</Button>
        </div>
    )
}

export default Hobbies
