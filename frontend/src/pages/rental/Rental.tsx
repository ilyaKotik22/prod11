import React from 'react';
import { Navigation } from '../../widgets/Immovables/navigation/Navigation';
import { ImmMenu } from '../../widgets/Immovables/ImmMenu/ImmMenu';

export const Rental: React.FC = () => {
return (
    <main className='container'>
        <Navigation/>
        <ImmMenu/>
    </main>
);
};