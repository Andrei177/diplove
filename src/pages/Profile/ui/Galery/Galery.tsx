import { FC } from "react";
import { getImageUrl } from "../../../../shared/helpers/getImageUrl"
import { IImage } from "../../../Forms/types/TypesResponseApi";
import s from "./Galery.module.css"
import { useMediaQuery } from "react-responsive";
import UploadImage from "../UploadImage/UploadImage";

interface IPropsGalery {
    myImages: IImage[];
    setShowQuestion: (bool: boolean) => void;
    selectedImages: File[];
    setSelectedImages: (newFiles: File[]) => void; 
}

const Galery: FC<IPropsGalery> = ({ myImages, setShowQuestion, selectedImages, setSelectedImages }) => {

    const isMobile = useMediaQuery({maxWidth: "490px"});

    const handleOnChangeOnUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowQuestion(true);
        if (e.target.files) {
            console.log(e.target.files);
            
            setSelectedImages([...selectedImages, e.target.files[0]])
        }
    }

  return (
    <div className={s.galery}>
                    <div className={s.one}>
                        {
                            myImages[0]
                                ? <div className={s.image}><img className={s.img} src={getImageUrl(myImages[0].image)} /></div>
                                : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                        }
                    </div>
                    <div className={s.two}>
                        {
                            myImages[1]
                                ? <div className={s.image}><img className={s.img} src={getImageUrl(myImages[1].image)} /></div>
                                : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                        }
                    </div>
                    <div className={s.three}>
                        <div className={s.inner_elements}>
                            {
                                myImages[isMobile ? 1 : 2]
                                    ? <div className={s.image}><img className={s.img} src={getImageUrl(myImages[isMobile ? 1 : 2].image)} /></div>
                                    : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                            }
                            {
                                myImages[isMobile ? 2 : 3]
                                    ? <div className={s.image}><img className={s.img} src={getImageUrl(myImages[isMobile ? 2 : 3].image)} /></div>
                                    : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                            }
                        </div>
                    </div>
                    <div className={s.four}>
                        <div className={s.inner_elements}>
                            {
                                myImages[4]
                                    ? <div className={s.image}><img className={s.img} src={getImageUrl(myImages[4].image)} /></div>
                                    : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                            }
                            {
                                myImages[5]
                                    ? <div className={s.image}><img className={s.img} src={getImageUrl(myImages[5].image)} /></div>
                                    : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                            }
                        </div>
                    </div>
                </div>
  )
}

export default Galery
