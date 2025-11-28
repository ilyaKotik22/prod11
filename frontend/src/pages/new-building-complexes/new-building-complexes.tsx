import React from 'react';
import { Navigation } from '../../widgets/Immovables/navigation/Navigation';
import { ImmMenu } from '../../widgets/Immovables/ImmMenu/ImmMenu';

export const NewBuild: React.FC = () => {
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