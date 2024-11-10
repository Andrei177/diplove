import { PropsWithChildren } from "react"
import s from "./MainLayout.module.css"
import { useFiltersStore } from "../../Filters/store/store"
import Modal from "../../ui/Modal/Modal";
import { Filters } from "../../Filters";

export const MainLayout = ({children} : PropsWithChildren) => {

  const {showFilters, setShowFilters} = useFiltersStore();

  return (
    <div className={s.layout}>
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
