import Input from "../../../../shared/ui/Input/Input"
import Select from "../../../../shared/ui/Select/Select"
import { Textarea } from "../../../../shared/ui/Textarea/Textarea"
import { gendersOptions, interestOptions } from "../../constants/gendersAndInterests"
import { useProfileStore } from "../../store/store"
import s from "./ProfileContentEdit.module.css"
import cx from "classnames"
import { FC, useEffect, useState } from "react"
import Modal from "../../../../shared/ui/Modal/Modal"
import { EditPen } from "../../../../shared/ui/EditPen/EditPen"
import Hobbies from "../Hobbies/Hobbies"
import Item from "../../../../shared/ui/Item/Item"
import Button from "../../../../shared/ui/Button/Button"
import { IImage } from "../../../Forms/types/TypesResponseApi"
import Galery from "../Galery/Galery"
import { getImages } from "../../api/api"

interface IPropsProfileContentEdit {
    setImage: (newImg: File | null) => void;
    selectedImages: File[];
    setSelectedImages: (newFiles: File[]) => void; 
}

export const ProfileContentEdit: FC<IPropsProfileContentEdit> = ({ setImage, selectedImages, setSelectedImages }) => {

    const { first_name, gender, birthday, job, dating_purpose, education, description, setFirstName, setBirthday, setGender, setDatingPurpose, setDescription, setEducation, setJob, hobbies, images } = useProfileStore();
    const [showHobby, setShowHobby] = useState<boolean>(false);
    const [showQuestion, setShowQuestion] = useState<boolean>(false);

    const [myImages, setMyImages] = useState<IImage[]>([])

    useEffect(() => {
        getImages()
        .then(res => {
            setMyImages(res.filter(img => img.is_main_image == false))
        })
        .catch(err => console.log(err, "Ошибка при получении фотографий в редактировании"))
    }, [images])

    const handlePositiveAnswer = () => {
        setImage(selectedImages[selectedImages.length - 1])
        setSelectedImages([...selectedImages.filter((_, i) => i !== (selectedImages.length - 1))]) // удалаю аватарку из выбранных фоток
        setShowQuestion(false);
    }

    return (
        <>
            <div className={s.wrapper}>
                <Galery myImages={myImages} selectedImages={selectedImages} setSelectedImages={setSelectedImages} setShowQuestion={setShowQuestion}/>
                <div className={s.about_me}>
                    <h3>О себе</h3>
                    <Textarea
                        className={s.about_me_text}
                        placeholder="Расскажите о себе"
                        value={description || ''}
                        onChange={e => e.target.value.length <= 60 &&  setDescription(e.target.value)}
                    />
                </div>
                <div className={s.main_info}>
                    <div className={s.name}>
                        <h3>Имя</h3>
                        <Input
                            placeholder="Введите имя"
                            className={s.inp}
                            value={first_name || ''}
                            onChange={e => e.target.value.length <=25 && setFirstName(e.target.value)}
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
                            onChange={e => (new Date().getFullYear() - new Date(e.target.value).getFullYear()) >= 18 ? setBirthday(e.target.value) : alert("Возраст должен быть не менее 18 лет")}
                        />
                    </div>
                    <div>
                        <h3>Я ищу</h3>
                        <div className={s.interes}>
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
                            value={education || ''}
                            onChange={e => setEducation(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Работа</h3>
                        <Input
                            placeholder="Укажите проффесию"
                            className={s.inp}
                            value={job || ''}
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
                <Hobbies setShowHobby={setShowHobby} />
            </Modal>
            <Modal className={s.modal_border} showModal={showQuestion} setShowModal={setShowQuestion}>
                <div className={s.question}>
                    <h3 className={s.q_title}>Сделать фотографией профиля?</h3>
                    <Button className={s.btn} onClick={handlePositiveAnswer}>Да</Button>
                    <Button className={s.btn} onClick={() => setShowQuestion(false)}>Нет</Button>
                </div>
            </Modal>
        </>
    )
}