import React from 'react';

import img from '../../../public/BezfonaLogo 2.png'
export const BuyPage: React.FC = () => {
return (
    <main style={{width:'88vw',height:'100vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}} className='container'>
        <div className="">
            <h1 style={{fontSize:'28px'}} >Спасобо за заявку, мы вам перезвоним в течении 10 минут!</h1>
            <div style={{width: '100%', display: 'flex',justifyContent: 'center'}} className=""><img src={img} alt="" /></div>
        </div>
        
    </main>
);
};