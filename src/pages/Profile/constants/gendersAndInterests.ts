import { Gender, Interest } from "../../../shared/questionsStore/store";

export const gendersOptions = [
  { text: "Мужской", key: Gender.MALE },
  { text: "Женский", key: Gender.FEMALE },
];
export const interestOptions = [
  { text: "Серьёзные отношения", key: Interest.RELATIONSHIP },
  { text: "Дружба", key: Interest.FRIENDSHIP },
  { text: "Флирт и свидания", key: Interest.FLIRT },
  { text: "Решу потом", key: Interest.UNRESOLVED },
];
