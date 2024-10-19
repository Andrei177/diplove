import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import { getImages, getProfile } from "../api/api"
import { useProfileStore } from "../store/store"
import { ProfileTop } from "./ProfileTop"
import { ProfileContent } from "./ProfileContent"
import { ProfileContentEdit } from "./ProfileContentEdit"

export const Profile = () => {

  const { setAll } = useProfileStore();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    getProfile()
    .then(res => {
      setAll(res)
    })
    .catch(err => console.log(err))

    getImages()
    .then(res => setImageUrl(res.filter(img => img.is_main_image).sort((a, b) => b.id - a.id)[0].image)) // тут сортирую по убыванию id чтобы взять потом последнюю фотку
    .catch(err => console.log(err, "Ошибка при получении фото"))
  }, [])

  return (
    <MainLayout>
      <ProfileTop isEdit={isEdit} setIsEdit={setIsEdit} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
      {
        isEdit
        ?<ProfileContentEdit/>
        :<ProfileContent/>
      }
    </MainLayout>
  )
}
