import React from 'react';
import { HomeBlock1, HomeBlock2 } from '../../widgets';
import { HomeBlock3 } from '../../widgets/Home/homeBlock3/homeBlock3';
import { HomeBlock4 } from '../../widgets/Home/homeBlock4/homeBlock4';

export const HomePage: React.FC = () => {
return (
<main>
    <HomeBlock1/>
    <div className="container">
        <HomeBlock2/>
        <HomeBlock3/>
        <HomeBlock4/>
    </div>
 </main>
);
};