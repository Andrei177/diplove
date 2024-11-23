import { PropsWithChildren } from "react"
import s from "./MainLayout.module.css"
import { useFiltersStore } from "../../Filters/store/store"
import Modal from "../../ui/Modal/Modal"
import { Filters } from "../../Filters"
import { useMediaQuery } from "react-responsive"
import cx from "classnames"

export const MainLayout = ({children} : PropsWithChildren) => {

  const {showFilters, setShowFilters} = useFiltersStore();
  const isMobile = useMediaQuery({maxWidth: "625px"});

  return (
    <div className={cx(s.layout, !isMobile && s.background)}>
        <div className={s.content}>
            {children}
        </div>
        {
          <Modal showModal={showFilters} setShowModal={setShowFilters}>
            <Filters/>
          </Modal>
        }
    </div>
  )
}
