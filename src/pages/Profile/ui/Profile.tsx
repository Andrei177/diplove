import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import { getImages, getMyProfile } from "../api/api"
import { ProfileTop } from "./ProfileTop"
import { ProfileContent } from "./ProfileContent/ProfileContent"
import { ProfileContentEdit } from "./ProfileContent/ProfileContentEdit"
import { useProfileStore } from "../store/store"
import { useAuthStore } from "../../../app/store/store"

export const Profile = () => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("")
  const {id, setAll} = useProfileStore();
  const setHasRefreshed = useAuthStore(state => state.setHasRefreshed);

  useEffect(() => {
    if(!id){
      getMyProfile()
        .then(res => {
          setAll(res)
        })
        .catch(err => {
          console.log(err, "Ошибка при получении профиля юзера")
        })
    }
    if (imageUrl.length === 0) {
      getImages()
        .then(res => {
          console.log(res);

          setImageUrl(res.filter(img => img.is_main_image).sort((a, b) => b.id - a.id)[0].image)

        }) // тут сортирую по убыванию id чтобы взять потом последнюю фотку
        .catch(err => {
          console.log(err, "Ошибка при получении фото")
          setImageUrl("");
          if(err.status === 401){
            setHasRefreshed(false)
          }
        })
    }
  }, [])

  return (
    <MainLayout>
      <ProfileTop isEdit={isEdit} setIsEdit={setIsEdit} imageUrl={imageUrl} setImageUrl={setImageUrl} />
      {
        isEdit
          ? <ProfileContentEdit />
          : <ProfileContent />
      }
    </MainLayout>
  )
}
