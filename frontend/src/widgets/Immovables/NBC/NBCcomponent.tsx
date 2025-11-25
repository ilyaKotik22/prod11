import React, { useEffect, useState } from 'react';
import { getPathSegments } from '../../../shared/getParams/getParams';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { fetchApartments } from '../ImmMenu/store/store';
import { ImmMenu } from '../ImmMenu/ImmMenu';
import { ImmItem } from '../ImmItem/ImmItem';
import styles from './NBCcomponent.module.scss'
export interface MyComponentProps {
  any: string
}
export const NBCcomponent: React.FC = () => {

const dispatch = useDispatch()
const apartamentsSelector = useSelector((state:RootState)=> state.complexes)
useEffect(() => {
    const params = getPathSegments();
    const finalUrl = `${import.meta.env.VITE_API_URL}/${params.type}/${params.id}`
    console.log(finalUrl)
    dispatch(fetchApartments(finalUrl) as any);

  }, []);

return (
    <div className='container'>
        <section className={styles.NBCc}>
    <h1>{apartamentsSelector.items?.name || 'Загрузка...'}</h1>

    <ul className={styles.grid}>
      {apartamentsSelector.items?.apartments?.map((el: any) => (
        <ImmItem
          key={el.id}
          id={el.id}
          title={el.title ?? el.name}
          address={el.address ?? el.complex?.address}
          pricePerMonth={el.pricePerMonth}
          area={el.area}
          bedrooms={el.bedrooms}
          floor={el.floor}
          metro={el.metro}
          metroDistance={el.metroDistance}
        />
      ))}
    </ul>
  </section>
    </div>
    
);
};