import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyRoutes, type MyRoutesType } from './routes';

export const AppRouter: React.FC = () => {
  
return (
<Routes>
  {MyRoutes.map((el: MyRoutesType)=>{
     const Component = el.component;
    return <Route key={el.url} path={el.url} element={<Component/>} />
  })}
  
 </Routes>
);
};