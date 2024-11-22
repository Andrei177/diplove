import Input from "../../../../shared/ui/Input/Input"
import Select from "../../../../shared/ui/Select/Select"
import { Textarea } from "../../../../shared/ui/Textarea/Textarea"
import { gendersOptions, interestOptions } from "../../constants/gendersAndInterests"
import { useProfileStore } from "../../store/store"
import UploadImage from "../UploadImage/UploadImage"
import s from "./ProfileContentEdit.module.css"
import heart from "../../assets/heart.svg"
import cx from "classnames"
import { useState } from "react"
import Modal from "../../../../shared/ui/Modal/Modal"
import { EditPen } from "../../../../shared/ui/EditPen/EditPen"
import Hobbies from "../Hobbies/Hobbies"
import Item from "../../../../shared/ui/Item/Item"

export const ProfileContentEdit = () => {

    const { first_name, gender, birthday, job, dating_purpose, education, description, setFirstName, setBirthday, setGender, setDatingPurpose, setDescription, setEducation, setJob, hobbies } = useProfileStore();
    const [showHobby, setShowHobby] = useState<boolean>(false);

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.galery}>
                    <div className={s.one}>
                        <UploadImage className={s.wrap} />
                    </div>
                    <div className={s.two}>
                        <UploadImage className={s.wrap}/>
                    </div>
                    <div className={s.three}>
                        <div className={s.inner_elements}>
                            <UploadImage className={s.wrap} />
                            <UploadImage className={s.wrap} />
                        </div>
                    </div>
                    <div className={s.four}>
                        <div className={s.inner_elements}>
                            <UploadImage className={s.wrap} />
                            <UploadImage className={s.wrap} />
                        </div>
                    </div>
                </div>
                <div className={s.about_me}>
                    <h3>О себе</h3>
                    <Textarea
                        className={s.about_me_text}
                        placeholder="Расскажите о себе"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className={s.main_info}>
                    <div className={s.name}>
                        <h3>Имя</h3>
                        <Input
                            placeholder="Введите имя"
                            className={s.inp}
                            value={first_name}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
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
                        <h3>Дата рождения</h3>
                        <Input
                            type="date"
                            className={s.inp}
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Я ищу</h3>
                        <div className={s.interes}>
                            <img src={heart} className={s.heart_img} />
                            <Select
                                value={dating_purpose}
                                options={interestOptions}
                                className={cx(s.slct, s.bg)}
                                onChange={e => setDatingPurpose(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={s.education}>
                        <h3>Образование</h3>
                        <Input
                            placeholder="Укажите образование"
                            className={s.inp}
                            value={education}
                            onChange={e => setEducation(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Работа</h3>
                        <Input
                            placeholder="Укажите проффесию"
                            className={s.inp}
                            value={job}
                            onChange={e => setJob(e.target.value)}
                        />
                    </div>
                </div>
                <div className={s.interests}>
                    <div className={s.interests_title}>
                        <h4 className={s.subtitle}>Интересы</h4>
                        <EditPen onClick={() => setShowHobby(true)} />
                    </div>
                    <div className={s.hobbies}>
                        {
                            hobbies.map(hobby =>
                                <Item
                                    key={hobby.id}
                                    className={cx(s.hobby_item, s.selected)}
                                    text={hobby.name}
                                />)
                        }
                    </div>
                </div>
            </div>
            <Modal className={s.modal_border} showModal={showHobby} setShowModal={setShowHobby}>
                <Hobbies setShowHobby={setShowHobby}/>
            </Modal>
        </>
    )
}

{/* <div className={s.name_birth}>
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
                <div className={s.education_job}>
                    <div className={s.education}>
                        <h3>Образование</h3>
                        <Input
                            placeholder="Укажите образование"
                            className={s.inp}
                            value={education}
                            onChange={e => setEducation(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Работа</h3>
                        <Input
                            placeholder="Укажите проффесию"
                            className={s.inp}
                            value={job}
                            onChange={e => setJob(e.target.value)}
                        />
                    </div>
                </div> */}