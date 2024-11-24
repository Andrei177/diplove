import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import s from "./Forms.module.css"
import { getProfiles } from "../api/api";
import { Form } from "./Form";
import { IProfileResponse } from "../types/TypesResponseApi";
import { Loader } from "../../../shared/ui/Loader";
import { useAuthStore } from "../../../app/store/store";
import { useFiltersStore } from "../../../shared/Filters/store/store";
import { useMediaQuery } from "react-responsive";
import filters from "../../../shared/NavBar/assets/filters.svg"
import { FormMobile } from "../mobile/FormMobile";

export const Forms = () => {

  const [profiles, setProfiles] = useState<Array<IProfileResponse>>([]);
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { distance, minAge, maxAge, setShowFilters } = useFiltersStore();
  const setHasRefreshed = useAuthStore(state => state.setHasRefreshed);
  const isPlanshet = useMediaQuery({ maxWidth: "720px" });
  const isMobile = useMediaQuery({ maxWidth: "625px" });

  const incrementIndex = () => {
    if (index + 1 < profiles.length) {
      setIndex(prev => prev + 1);
    } else {
      alert("Анкеты кончились(") // тут надо будет делать опять запрос за новыми анкетами
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getProfiles(distance, minAge, maxAge)
      .then(res => setProfiles(res))
      .catch(err => {
        if (err.status === 401) {
          setHasRefreshed(false)
        }
      })
      .finally(() => setIsLoading(false))
  }, [distance, minAge, maxAge])

  return (
    <MainLayout>
      {
        isMobile &&
        <div className={s.top}>
          <h3>Знакомства</h3>
          <div className={s.top_img} onClick={() => setShowFilters(true)}><img src={filters}/></div>
        </div>
      }
      <div>
        {
          isLoading
            ? <Loader />
            : profiles.length !== 0
              ? profiles.map((profile, i) => (
                isPlanshet ? <FormMobile profile={profile} incrementIndex={incrementIndex} isVisible={index === i} key={profile.id} /> : <Form profile={profile} incrementIndex={incrementIndex} isVisible={index === i} key={profile.id} />
              ))
              : <h3 style={{ textAlign: "center" }}>Нет анкет</h3>
        }
      </div>
    </MainLayout>
  )
}

export default Forms;