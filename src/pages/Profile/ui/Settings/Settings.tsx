import Button, { VARIANT } from "../../../../shared/ui/Button/Button"
import s from "./Settings.module.css"
import back from "../../../../assets/back.svg"
import cx from "classnames"
import { FC } from "react"
import { deleteProfile, logout } from "../../api/api"
import { useAuthStore } from "../../../../app/store/store"
import { useNavigate } from "react-router-dom"
import { Routes } from "../../../../app/router/router.config"
import { useProfileStore } from "../../store/store"
import { emptyStore } from "../../helpers/emptyStore"
import { useChatsListStore, useChatStore } from "../../../Chats/store/store"

interface IPropsSettings {
    setShowSettings: (bool: boolean) => void
}

export const Settings: FC<IPropsSettings> = ({ setShowSettings }) => {

    const setIsAuth = useAuthStore(state => state.setIsAuth);
    const { is_active, setIsActive, setAll} = useProfileStore();
    const setEmty = useChatStore(state => state.setEmpty);
    const setChats = useChatsListStore(state => state.setChats);
    const navigate = useNavigate();

    const exitAndDelFunc = () => {
        localStorage.removeItem("token")
        setIsAuth(false)
        setEmty();
        setAll(emptyStore)
        setChats([])
        navigate(Routes.START_PAGE)
    }

    const exit = () => {
        logout()
            .then(() => {
                exitAndDelFunc()
            })
            .catch(err => {
                console.log(err, "Не удалось выйти из аккаунта")
            })
    }
    const del = () => {
        deleteProfile()
            .then(() => {
                exitAndDelFunc()
            })
            .catch(err => {
                console.log(err, "Не удалось удалить аккаунт")
            })
    }

    return (
        <div className={s.settings}>
            <div className={s.top}>
                <div className={s.back} onClick={() => setShowSettings(false)}>
                    <img src={back} />
                </div>
                <h2 className={s.title}>Настройки</h2>
            </div>
            <div className={s.main_settings}>
                <div className={s.main_item}>
                    <div>
                        <h3 className={s.subtitle}>Статус анкеты</h3>
                        <h4 className={s.dop_info}>Отключите анкету, если нехотите больше знакомиться</h4>
                    </div>
                    <div className={s.toggle_wrapper}>
                        <input
                            className={s.checkbox}
                            type="checkbox"
                            checked={is_active}
                            onChange={() => setIsActive(!is_active)}
                        />
                        <div
                            className={s.toggle_back}
                            onClick={() => setIsActive(!is_active)}
                        >
                            <div className={s.toggle_ball} />
                        </div>

                    </div>
                </div>
                <div className={s.main_item}>
                    <div>
                        <h3 className={s.subtitle}>Тема интерфейса</h3>
                        <h4 className={s.dop_info}>Выберите цвет интерфейса</h4>
                    </div>
                    <div className={s.switch}>
                        <div className={cx(s.color_item, s.white)} />
                        <div className={cx(s.color_item, s.green)} />
                        <div className={cx(s.color_item, s.red)} />
                        <div className={cx(s.color_item, s.blue)} />
                    </div>
                </div>
                <div className={s.main_item}>
                    <div>
                        <h3 className={s.subtitle}>Поддержка</h3>
                    </div>
                    <div className={s.support_icon}>
                        <img src={back} />
                    </div>
                </div>
            </div>
            <Button
                variant={VARIANT.transparent}
                className={cx(s.btn, s.exit)}
                onClick={exit}
            >
                Выйти
            </Button>
            <Button
                variant={VARIANT.red}
                className={cx(s.btn, s.del)}
                onClick={del}
            >
                Удалить анкету
            </Button>
        </div>
    )
}