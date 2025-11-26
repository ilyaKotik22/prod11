import React, { useEffect, useState } from 'react';
import { getPathSegments } from '../../../shared/getParams/getParams';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { fetchApartments } from '../ImmMenu/store/store';
import styles from './NBCcomponent.module.scss'
import { ImmItem } from '../ImmItem/ImmItem';
import { ItemNBC } from './itemNBC/ItemNBC';
export interface MyComponentProps {
  any: string
}

const getPropertySlug = (type?: string): string => {
  if (!type) return 'properties' // или '' — как тебе удобнее

  switch (type) {
    case 'commercialProperty':
      return 'commercial-properties'
    case 'readyApartment':
      return 'ready-apartments'
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
  const [Category,setCategory] = useState<string[]>([])
  const [chooseCategory, setChooseCategory] = useState<string>()
  const dispatch = useDispatch()
  const apartamentsSelector = useSelector((state:RootState)=> state.complexes)
  useEffect(() => {
      const params = getPathSegments();
      const finalUrl = `${import.meta.env.VITE_API_URL}/${params.type}/${params.id}`
      console.log(finalUrl)
      dispatch(fetchApartments(finalUrl) as any);

    }, []);
    useEffect(()=>{
      const mas = []
      apartamentsSelector.items?.apartments?.map((el)=>{
        if (!mas.includes(el.type)){
            mas.push(el.type)
        }
      })
      setCategory(mas)
      
    },[apartamentsSelector])
    const params = getPathSegments()
  return (
      <div className='container'>
          <section className={styles.NBCc}>
      <h1>{apartamentsSelector.items?.name || 'Загрузка...'}</h1>

      <ul className={styles.grid}>
        {Category.map(el=>(
          <li onClick={()=> setChooseCategory(el)}>
            {el}
          </li>
        ))}
      </ul>
      <ul className={styles.grid}>
        {apartamentsSelector.items?.apartments?.map((apartment)=>{
          
          if (apartment.type === chooseCategory){
            return(
            <ItemNBC
                    path={getPropertySlug(chooseCategory)}
                    id={apartment.id} 
                    title={apartment.title ?? apartment.name} 
                    foto={apartment.images[0].url}
                    pricePerMonth={apartment.pricePerMonth} 
                    area={apartment.area} 
                    bedrooms={apartment.bedrooms} 
                    floor={apartment.floor} 
                    totalFloors={apartment.totalFloors} metro={apartment.metro} key={apartment.id}   />
          )
          }
          
        })}
      </ul>
    </section>
      </div>
      
  );
};