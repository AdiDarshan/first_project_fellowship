
import { Box } from './Box';
import { Greeting } from './Greeting';

type ProfileCardProps = {
  name: string;
  age: number;
  children: React.ReactNode;
};

export function ProfileCard({name, age, children}: ProfileCardProps){
    return (<Box>
  <Greeting name={name} age={age} />
  {children}
</Box>);
}