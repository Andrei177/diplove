import s from "./Filters.module.css";
import back from "../../../assets/back.svg";
import { useFiltersStore } from "../store/store";
import Button from "../../ui/Button/Button";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import './Ranges.css';
import { useState } from "react";

export const Filters = () => {

  const { setShowFilters, distance, setDistance, minAge, maxAge, setMinAge, setMaxAge } = useFiltersStore();
  const [localMinAge, setLocalMinAge] = useState(minAge);
  const [localMaxAge, setLocalMaxAge] = useState(maxAge);
  const [localDistance, setLocalDistance] = useState(distance);

  const handleClick = () => {
    setMinAge(localMinAge);
    setMaxAge(localMaxAge);
    setDistance(localDistance);
    setShowFilters(false);
  }

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
            <div className={s.value}>{localMinAge}-{localMaxAge}</div>
          </div>
          <div className={s.item_range}>
            <Slider
              range
              min={18}
              max={100}
              value={[localMinAge, localMaxAge]}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setLocalMinAge(value[0]);
                  setLocalMaxAge(value[1]);
                }
              }}
            />
          </div>
        </div>
        <div className={s.item}>
          <div className={s.item_top}>
            <h3 className={s.item_title}>Расстояние</h3>
            <div className={s.value}>{localDistance} км</div>
          </div>
          <div className={s.item_range}>
            <input className="range" type="range" min={0} max={1000} value={localDistance} onChange={e => setLocalDistance(+e.target.value)} />
          </div>
        </div>
      </div>
      <Button className={s.btn} onClick={handleClick}>Готово</Button>
    </div>
  )
}
