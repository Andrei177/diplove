import { FC, useState } from "react";
import { getImageUrl } from "../../../../shared/helpers/getImageUrl"
import { IImage } from "../../../Forms/types/TypesResponseApi";
import s from "./Galery.module.css"
import { useMediaQuery } from "react-responsive";
import UploadImage from "../UploadImage/UploadImage";
import Modal from "../../../../shared/ui/Modal/Modal";
import FullDisplayImages from "./FullDisplayImages/FullDisplayImages";
import { useProfileStore } from "../../store/store";
import imageCompression from "browser-image-compression";

interface IPropsGalery {
    myImages: IImage[];
    setShowQuestion: (bool: boolean) => void;
    selectedImages: File[];
    setSelectedImages: (newFiles: File[]) => void;
}

const Galery: FC<IPropsGalery> = ({ myImages, setShowQuestion, selectedImages, setSelectedImages }) => {

    const isMobile = useMediaQuery({ maxWidth: "490px" });

    const handleOnChangeOnUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowQuestion(true);
        if (e.target.files) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
        
            try {
                const compressedFile = await imageCompression(e.target.files[0], options);
                setSelectedImages([...selectedImages, compressedFile])
            } catch (error) {
                console.error(error);
                setSelectedImages([...selectedImages, e.target.files[0]])
            }
        }
    }

    const images = useProfileStore(state => state.images)

    const [showFullDisplayImages, setShowFullDisplayImages] = useState<boolean>(false)
    const [indexOpenPhoto, setIndexOpenPhoto] = useState(0)
    const [sortedImages, setSortedImages] = useState<IImage[]>([])

    const handleClickImage = (clickedImage: IImage) => {
        const ava = images.find(img => img.is_main_image == true);
        if(ava){
            setSortedImages([ava, ...myImages]);
        }
        else setSortedImages(myImages);
        const indexOpenPhotoInArray = sortedImages.findIndex(img => img?.id == clickedImage.id);

        setIndexOpenPhoto(indexOpenPhotoInArray == -1 ? 0 : indexOpenPhotoInArray);
        setShowFullDisplayImages(true);
    };

    return (
        <>
            <div className={s.galery}>
                <div className={s.one}>
                    {
                        myImages[0]
                            ? <div className={s.image} onClick={() => handleClickImage(myImages[0])}>
                                <img className={s.img} src={getImageUrl(myImages[0].image)} />
                            </div>
                            : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                    }
                </div>
                <div className={s.two}>
                    {
                        myImages[1]
                            ? <div className={s.image} onClick={() => handleClickImage(myImages[1])}>
                                <img className={s.img} src={getImageUrl(myImages[1].image)} />
                            </div>
                            : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                    }
                </div>
                <div className={s.three}>
                    <div className={s.inner_elements}>
                        {
                            myImages[isMobile ? 1 : 2]
                                ? <div className={s.image} onClick={() => handleClickImage(myImages[isMobile ? 1 : 2])}>
                                    <img className={s.img} src={getImageUrl(myImages[isMobile ? 1 : 2].image)} />
                                </div>
                                : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                        }
                        {
                            myImages[isMobile ? 2 : 3]
                                ? <div className={s.image} onClick={() => handleClickImage(myImages[isMobile ? 2 : 3])}>
                                    <img className={s.img} src={getImageUrl(myImages[isMobile ? 2 : 3].image)} />
                                </div>
                                : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                        }
                    </div>
                </div>
                <div className={s.four}>
                    <div className={s.inner_elements}>
                        {
                            myImages[4]
                                ? <div className={s.image} onClick={() => handleClickImage(myImages[4])}>
                                    <img className={s.img} src={getImageUrl(myImages[4].image)} />
                                </div>
                                : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                        }
                        {
                            myImages[5]
                                ? <div className={s.image} onClick={() => handleClickImage(myImages[5])}>
                                    <img className={s.img} src={getImageUrl(myImages[5].image)} />
                                </div>
                                : <UploadImage className={s.wrap} onChange={handleOnChangeOnUpload} />
                        }
                    </div>
                </div>
            </div>
            <Modal
                showModal={showFullDisplayImages}
                setShowModal={setShowFullDisplayImages}
                className={s.none_padding}
            >
                {showFullDisplayImages && <FullDisplayImages images={sortedImages} setShowFullDisplayImages={setShowFullDisplayImages} indexOpenPhoto={indexOpenPhoto}/>}
            </Modal>
        </>
    )
}

export default Galery
