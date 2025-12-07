import React, { useEffect } from 'react';
import { NBCcomponent } from '../../widgets/Immovables/NBC/NBCcomponent';
import { useDispatch } from 'react-redux';
import { setDefaultTake } from '../../widgets/Immovables/ImmMenu/store/store';

export interface MyComponentProps {
  any: string
}
export const NBCitemPage: React.FC<MyComponentProps> = ({any}) => {
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setDefaultTake())
    },[])
return (
  <main>
    <NBCcomponent/>
  </main>
);
};