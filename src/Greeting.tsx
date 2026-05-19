
type GreetingProps = {
    name: string;
    age: number;
};

export function Greeting ({name, age} : GreetingProps){
    return <p>hello, {name}! you are {age} years old</p>;
}
