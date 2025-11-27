import React, { useEffect, useState } from 'react';
import { getPathSegments } from '../../../shared/getParams/getParams';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { fetchApartments } from '../ImmMenu/store/store';
import styles from './NBCcomponent.module.scss'
import { ImmItem } from '../ImmItem/ImmItem';
import { ItemNBC } from './itemNBC/ItemNBC';
import { NavNBC } from './navigationNBC/NavNBC';
export interface MyComponentProps {
  any: string
}

const getPropertySlug = (type?: string): string => {
  if (!type) return 'properties' // или '' — как тебе удобнее

  switch (type) {
    case 'commercialProperty':
      return 'commercial-properties'
    case 'readyApartment':
      return 'new-building-apartments'
    case 'newBuilding':
      return 'new-buildings'
    case 'land':
      return 'lands'
    // добавляй сколько угодно
    default:
      return 'properties' // fallback
  }
}

export const NBCcomponent: React.FC = () => {
  const [Category, setCategory] = useState<string[]>([]);
  const [chooseCategory, setChooseCategory] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.complexes);
  const  filter = useSelector((state:RootState) => state.filterNBC)
  useEffect(() => {
    const params = getPathSegments();
    const finalUrl = `${import.meta.env.VITE_API_URL}/${params.type}/${params.id}`;
    dispatch(fetchApartments(finalUrl) as any);
  }, [dispatch]);

  // ←←← ВОТ ЭТОТ useEffect — теперь выбирает первую категорию автоматически
  useEffect(() => {
    const types = [...new Set(items?.apartments?.map(el => el.type).filter(Boolean))];
    setCategory(types);

    // Автоматически выбираем первую категорию, если ещё ничего не выбрано
    if (types.length > 0 && !chooseCategory) {
      setChooseCategory(types[0]);
    }
  }, [items, chooseCategory]); // ← важно: следим и за chooseCategory

  return (
    <div className="container">
      <section className={styles.NBCc}>
        <h1>{items?.name || 'Загрузка...'}</h1>
        <NavNBC/>
        
        <ul className={styles.grid}>
        


          {items?.apartments
  ?.filter(apartment => {
    // buyType: "Купить" или "Снять"
    if (filter.buyType && apartment.action !== filter.buyType) {
      return false;
    }

    // bedrooms: "1", "2", "Студия", "4+"
    if (filter.bedrooms) {
      const beds = apartment.bedrooms;

      if (filter.bedrooms === 'Студия' && beds !== 0) return false;
      if (filter.bedrooms === '4+' && beds < 4) return false;
      if (filter.bedrooms !== 'Студия' && filter.bedrooms !== '4+' && beds.toString() !== filter.bedrooms) {
        return false;
      }
    }

    // Цена: minPrice и maxPrice
    if (filter.minPrice !== undefined && apartment.price < filter.minPrice) {
      return false;
    }
    if (filter.maxPrice !== undefined && apartment.price > filter.maxPrice) {
      return false;
    }

    // Категория (если есть)
    if (chooseCategory && apartment.type !== chooseCategory) {
      return false;
    }

    // Если все проверки пройдены — показываем квартиру
    return true;
  })
  .map(apartment => (
    <ItemNBC
      key={apartment.id}
      price={apartment.price}
      path={getPropertySlug(apartment.type)}
      id={apartment.id}
      title={apartment.title ?? apartment.name}
      foto={apartment.images[0]?.url}
      pricePerMonth={apartment.pricePerMonth}
      area={apartment.area}
      bedrooms={apartment.bedrooms}
      floor={apartment.floor}
      totalFloors={apartment.totalFloors}
      metro={apartment.metro}
    />
  ))}
        </ul>
      </section>
    </div>
  );
};