import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import { getMyProfile } from "../api/api"
import { ProfileTop } from "./ProfileTop"
import { ProfileContent } from "./ProfileContent/ProfileContent"
import { ProfileContentEdit } from "./ProfileContent/ProfileContentEdit"
import { useProfileStore } from "../store/store"
import { useNavigate } from "react-router-dom"
import { Routes } from "../../../app/router/router.config"
import { useAuthStore } from "../../../app/store/store"

export const Profile = () => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id, setAll } = useProfileStore();
  const setHasRefreshed = useAuthStore(state => state.setHasRefreshed);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      getMyProfile()
        .then(res => {
          setAll(res)
        })
        .catch(err => {
          if (err.status === 404) {
            navigate(Routes.GENDER);
          }
          if (err.status === 401) {
            setHasRefreshed(false)
          }
        })
    }

    // if (imageUrl.length === 0) {
    //   getImages()
    //     .then(res => {
    //       setImageUrl(res.filter(img => img.is_main_image).sort((a, b) => b.id - a.id)[0].image)

    //     }) 
    //     .catch(err => {
    //       console.log(err, "Ошибка при получении фото")
    //       setImageUrl("");
    //       if(err.status === 401){
    //         setHasRefreshed(false)
    //       }
    //     })
    // }
  }, [])

  return (
    <MainLayout>
      <ProfileTop isEdit={isEdit} setIsEdit={setIsEdit} />
      {
        isEdit
          ? <ProfileContentEdit />
          : <ProfileContent />
      }
    </MainLayout>
  )
}

export default Profile;