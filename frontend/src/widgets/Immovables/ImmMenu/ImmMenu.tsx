import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { fetchApartments } from './store/store';
import { ImmItem } from '../ImmItem/ImmItem';
import styles from './ImmMenu.module.scss'
type ape ={
            id: 10,
            title: string,
            address: string,
            area: number,
            pricePerMonth: number,
            bedrooms: number,
            floor: number,
            totalFloors: number,
            metro: string,
            metroDistance: number,
            description: string,
            createdAt: "2025-11-24T19:00:55.528Z",
            updatedAt: "2025-11-24T19:00:55.528Z",
            images?: []
}
export const ImmMenu: React.FC = () => {


  const { items, loading } = useSelector((state: RootState) => state.complexes);

  console.log(items)

  if (loading) return <p>Загрузка...</p>;

  return (
    <ul>
      
      {items.data && items.data.map((apartment:ape) => (
        <ImmItem 
        foto={apartment.images[0]?.url}
        id={apartment.id} 
        title={apartment.title ?? apartment.name} 
        address={apartment.address ?? apartment.complex.address} 
        pricePerMonth={apartment.pricePerMonth} 
        area={apartment.area} 
        bedrooms={apartment.bedrooms} 
        floor={apartment.floor} 
        totalFloors={apartment.totalFloors} metro={apartment.metro} key={apartment.id}   />
      ))}
    </ul>
  );
};