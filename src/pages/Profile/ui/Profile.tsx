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
  }, [])

  const [image, setImage] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<(File)[]>([]);

  return (
    <MainLayout>
      <ProfileTop isEdit={isEdit} setIsEdit={setIsEdit} image={image} setImage={setImage} selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
      {
        isEdit
          ? <ProfileContentEdit setImage={setImage} selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
          : <ProfileContent />
      }
    </MainLayout>
  )
}

export default Profile;