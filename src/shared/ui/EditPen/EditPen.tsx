import { FC, ImgHTMLAttributes } from "react"
import edit from "./edit.svg"

export const EditPen: FC<ImgHTMLAttributes<HTMLImageElement>> = ({onClick}) => {
  return (
    <img src={edit} alt="ред." style={{ cursor: "pointer"}} onClick={onClick}/>
  )
}