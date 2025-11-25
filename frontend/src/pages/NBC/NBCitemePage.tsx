import React from 'react';
import { NBCcomponent } from '../../widgets/Immovables/NBC/NBCcomponent';

export interface MyComponentProps {
  any: string
}
export const NBCitemPage: React.FC<MyComponentProps> = ({any}) => {
return (
  <main>
    <NBCcomponent/>
  </main>
);
};