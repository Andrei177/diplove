import Input from "../../../shared/ui/Input/Input";
import Select from "../../../shared/ui/Select/Select";
import { gendersOptions, interestOptions } from "../constants/gendersAndInterests";
import { useProfileStore } from "../store/store"
import s from "./ProfileContentEdit.module.css"

export const ProfileContentEdit = () => {

    const { first_name, gender, birthday, dating_purpose, setFirstName, setBirthday, setGender, setDatingPurpose } = useProfileStore();

    return (
        <div className={s.wrapper}>
            <div className={s.main_info}>
                <div className={s.name_birth}>
                    <div className={s.name}>
                        <h3>Имя</h3>
                        <Input 
                            placeholder="Введите имя" 
                            className={s.inp}
                            value={first_name}
                            onChange={e => setFirstName(e.target.value)}
                            />
                    </div>
                    <div>
                        <h3>Дата рождения</h3>
                        <Input 
                            type="date" 
                            className={s.inp}
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                        />
                    </div>
                </div>
                <div className={s.gender_search}>
                    <div className={s.gender}>
                        <h3>Пол</h3>
                        <Select 
                            value={gender}
                            options={gendersOptions} 
                            className={s.slct}
                            onChange={e => setGender(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Я ищу</h3>
                        <Select 
                            value={dating_purpose}
                            options={interestOptions} 
                            className={s.slct}
                            onChange={e => setDatingPurpose(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <h3 className={s.about}>Обо мне</h3>
            <h3 className={s.interes}>Интересы</h3>
        </div>
    )
}