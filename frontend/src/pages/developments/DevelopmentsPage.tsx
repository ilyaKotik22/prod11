import React, { useEffect } from 'react';
import { Navigation } from '../../widgets/Immovables/navigation/Navigation';
import { ImmMenu } from '../../widgets/Immovables/ImmMenu/ImmMenu';
import { useDispatch } from 'react-redux';
import { setDefaultTake } from '../../widgets/Immovables/ImmMenu/store/store';

export const DevelPage: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setDefaultTake())
    },[])
return (
    <main className='container'>
        <Navigation/>
        <ImmMenu/>
    </main>
);
};