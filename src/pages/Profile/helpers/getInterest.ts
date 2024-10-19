import { Interest } from "../../../shared/questionsStore/store"

export const getInterest = (interest: string) => {
    switch(interest){
        case Interest.FLIRT:
            return "Флирт и свидания"
        case Interest.FRIENDSHIP:
            return "Дружба"
        case Interest.RELATIONSHIP:
            return "Серьёзные отношения"
        case Interest.UNRESOLVED:
            return "Решу потом"
    }
}