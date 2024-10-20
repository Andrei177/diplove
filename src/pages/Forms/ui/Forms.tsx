import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import s from "./Forms.module.css"
import { getProfiles } from "../api/api";
import { Form } from "./Form";
import { IProfileResponse } from "../types/TypesResponseApi";

export const Forms = () => {

  const [profiles, setProfiles] = useState<Array<IProfileResponse>>([]);
  const [index, setIndex] = useState<number>(0);

  const incrementIndex = () => {
    if (index + 1 < profiles.length) {
      setIndex(prev => prev + 1);
    } else {
      alert("Анкеты кончились(") // тут надо будет делать опять запрос за новыми анкетами
    }
  }

  useEffect(() => {
    getProfiles(5, 5)
      .then(res => setProfiles(res))
      .catch(err => console.log(err, "Ошибка при получении анкет"))
  }, [])

  return (
    <MainLayout>
      <div>
        {profiles.length !== 0 && <Form profile={profiles[index]} incrementIndex={incrementIndex}/>}
      </div>
    </MainLayout>
  )
}
