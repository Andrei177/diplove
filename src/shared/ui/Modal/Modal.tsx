import { FC, ReactNode } from "react"
import s from "./Modal.module.css"
import cx from "classnames"
import { useMediaQuery } from "react-responsive";

interface IPropsModal {
  children: ReactNode;
  setShowModal: (bool: boolean) => void;
  showModal: boolean;
  className?: string;
}

export const Modal: FC<IPropsModal> = ({ children, setShowModal, showModal, className }) => {

  const isMobile = useMediaQuery({ maxWidth: "625px" });

  return (
    <div className={isMobile ? cx(s.modal, s.mobile, showModal ? s.show_modal : s.hide_modal) : cx(s.modal, showModal ? s.show_modal : s.hide_modal)} onClick={() => setShowModal(false)}>
      <div className={isMobile ? cx(s.content, s.mobile, className) : cx(s.content, className)} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
