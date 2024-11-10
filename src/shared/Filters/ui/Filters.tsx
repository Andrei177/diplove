import s from "./Filters.module.css";
import back from "../../../assets/back.svg";
import { useFiltersStore } from "../store/store";
import Button from "../../ui/Button/Button";

export const Filters = () => {

  const { setShowFilters, distance, setDistance, minAge, maxAge } = useFiltersStore();

  return (
    <div className={s.filters}>
      <div className={s.top}>
        <div className={s.back} onClick={() => setShowFilters(false)}>
          <img src={back} />
        </div>
        <h2 className={s.title}>Фильтры</h2>
      </div>
      <div className={s.main}>
        <div className={s.item}>
          <div className={s.item_top}>
            <h3 className={s.item_title}>Возраст</h3>
            <div className={s.value}>{minAge}-{maxAge}</div>
          </div>
          <div className={s.item_range}>
            <input className={s.range} type="range" />
          </div>
        </div>
        <div className={s.item}>
          <div className={s.item_top}>
            <h3 className={s.item_title}>Расстояние</h3>
            <div className={s.value}>{distance} км</div>
          </div>
          <div className={s.item_range}>
            <input className={s.range} type="range" value={distance} onChange={e => setDistance(+e.target.value)} />
          </div>
        </div>
      </div>
      <Button className={s.btn} onClick={() => setShowFilters(false)}>Готово</Button>
    </div>
  )
}
