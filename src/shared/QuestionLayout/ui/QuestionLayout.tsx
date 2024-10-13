import { FC, ReactNode } from "react";
import s from "./QuestionLayout.module.css";
import backIcon from "../../../assets/back.svg"
import nextIcon from "../../../assets/next.svg"
import { Link } from "react-router-dom";

interface IPropsQuestionLayout {
    children: ReactNode;
    prevRoute: string;
    nextRoute?: string;
}

export const QuestionLayout: FC<IPropsQuestionLayout> = ({ children, prevRoute, nextRoute }) => {
    return (
        <div className={s.layout}>
            <div className={s.wrapper}>
                <Link to={prevRoute}><img src={backIcon} /></Link>
                <div className={s.question}>
                    {children}
                </div>
                <div className={s.next_link}>
                    {
                    nextRoute && 
                    <Link to={nextRoute}>
                        <img src={nextIcon} />
                    </Link>
                    }
                </div>
            </div>
        </div>
    )
}