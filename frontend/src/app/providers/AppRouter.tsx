import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyRoutes, type MyRoutesType } from './routes';
import { useAnalytics } from '../../shared/metrikx/analytics';

export const AppRouter: React.FC = () => {
    useAnalytics(); // ← ВСЁ! Теперь все метрики видят переходы
return (
<Routes>
  {MyRoutes.map((el: MyRoutesType)=>{
     const Component = el.component;
    return <Route key={el.url} path={el.url} element={<Component/>} />
  })}
  
 </Routes>
);
};