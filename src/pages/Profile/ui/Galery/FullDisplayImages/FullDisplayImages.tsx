import { FC, useEffect, useState } from "react"
import s from "./FullDisplayImages.module.css"
import 'swiper/css/bundle'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { BACKEND_URL } from "../../../../../app/api/privateApi"
import x from "../../../assets/x.svg"
import basket from "../../../assets/basket.svg"
import { IImage } from "../../../../Forms/types/TypesResponseApi"
import { delImg } from "../api"
import { useProfileStore } from "../../../store/store"

interface IPropsFullDispalyImages {
  images: IImage[];
  setShowFullDisplayImages: (bool: boolean) => void;
  indexOpenPhoto: number;
}

const FullDisplayImages: FC<IPropsFullDispalyImages> = ({ images, setShowFullDisplayImages, indexOpenPhoto }) => {

  const [currentPhoto, setCurrentPhoto] = useState(indexOpenPhoto)

  const setImages = useProfileStore(state => state.setImages)

  console.log(currentPhoto, "а это в компоненте");

  useEffect(() => {
    setCurrentPhoto(indexOpenPhoto)
  }, [indexOpenPhoto])

  const deleteImg = () => {
    delImg(images[currentPhoto].id)
    .then(res => console.log(res, "ответ при удалении фото"))
    .catch(err => console.log(err, "ошибка при удалении фото"))

    setShowFullDisplayImages(false);

    setImages(images.filter((img) => img.id !== images[currentPhoto].id))
  }

  return (
    <div className={s.full_display_wrapper}>
      <div className={s.top_bar}>
        <img className={s.x} src={x} onClick={() => setShowFullDisplayImages(false)} />
        <div className={s.count_images}>
          {currentPhoto + 1} из {images.length}
        </div>
        <img className={s.basket} src={basket} onClick={deleteImg}/>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: `.swiper-button-next`,
          prevEl: `.swiper-button-prev`,
        }}
        modules={[Navigation]}
        className={s.swiper}
        initialSlide={currentPhoto}
      >
        {images.map((img) => (
          <SwiperSlide className={s.slide} key={img.id}>
            {<img className={s.image} src={BACKEND_URL + img.image} />}
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev" onClick={() => setCurrentPhoto(prev => prev - 1)} />
        <div className="swiper-button-next" onClick={() => setCurrentPhoto(prev => prev + 1)} />
      </Swiper>
    </div>
  )
}

export default FullDisplayImages
