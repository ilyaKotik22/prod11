import React from 'react';
import { Navigation } from '../../widgets/Immovables/navigation/Navigation';
import { ImmMenu } from '../../widgets/Immovables/ImmMenu/ImmMenu';

export const ComPro: React.FC = () => {
return (
    <main className='container'>
        <Navigation/>
        <ImmMenu/>
    </main>
);
};