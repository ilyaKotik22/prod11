import React, { useEffect } from 'react';
import { Navigation } from '../../widgets/Immovables/navigation/Navigation';
import { ImmMenu } from '../../widgets/Immovables/ImmMenu/ImmMenu';
import { useDispatch } from 'react-redux';
import { setDefaultTake } from '../../widgets/Immovables/ImmMenu/store/store';

export const NewBuild: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setDefaultTake())
    },[])
return (
    <main className='container'>
        <div style={{display:'none'}}>
            <Navigation />
        </div>
        <br /><br /><br /><br />
        <h1>Новостройки</h1>
        <ImmMenu/>
    </main>
);
};