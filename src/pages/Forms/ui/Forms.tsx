import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import s from "./Forms.module.css"
import { getProfiles } from "../api/api";
import { Form } from "./Form";
import { IProfileResponse } from "../types/TypesResponseApi";
import { Loader } from "../../../shared/ui/Loader";
import { useAuthStore } from "../../../app/store/store";

export const Forms = () => {

  const [profiles, setProfiles] = useState<Array<IProfileResponse>>([]);
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setHasRefreshed = useAuthStore(state => state.setHasRefreshed);

  const incrementIndex = () => {
    if (index + 1 < profiles.length) {
      setIndex(prev => prev + 1);
    } else {
      alert("Анкеты кончились(") // тут надо будет делать опять запрос за новыми анкетами
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getProfiles(5, 5)
      .then(res => setProfiles(res))
      .catch(err => {
        console.log(err, "Ошибка при получении анкет")
        if(err.status === 401){
          setHasRefreshed(false)
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <MainLayout>
      <div>
        {
          isLoading
          ? <Loader/>
          : profiles.length !== 0 
          ? profiles.map((profile, i) => (
            <Form profile={profile} incrementIndex={incrementIndex} isVisible={index === i} key={profile.id}/>
          ))
          : <h3>Нет анкет</h3>
        }
      </div>
    </MainLayout>
  )
}
