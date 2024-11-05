import { FC, ReactNode } from "react"
import s from "./Modal.module.css"
import cx from "classnames"

interface IPropsModal{
    children: ReactNode;
    setShowModal: (bool: boolean) => void;
    showModal: boolean;
}

export const Modal: FC<IPropsModal> = ({children, setShowModal, showModal}) => {
  return (
    <div className={cx(s.modal, showModal ? s.show_modal : s.hide_modal)} onClick={() => setShowModal(false)}>
      <div className={s.content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
