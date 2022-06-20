function add(
  num1: number,
  num2: number,
  showResult: boolean,
  phrase: string
): any {
  let result = num1 + num2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

const number1 = 5;
const number2 = 2.8;
const showResult = true;
const resultPhrase = 'The result is: ';

let result: number;
result = add(number1, number2, showResult, resultPhrase);

const person: object = {
  name: 'Ewhan',
  age: '28',
};

console.log(person.nickname); // will have compile-error

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
} // enum type

const newPerson: {
  name: string;
  age: number;
  hobbies: string[];
  cars: [number, string]; //tuple type, fixed length 2
  role: 'READ ONLY USER'; // literal type
  roles: Role;
} = {
  name: 'Ewhan',
  age: 28,
  hobbies: ['developing', 'cooking'],
  cars: [2, 'accord'],
  role: 'READ ONLY USER',
  roles: Role.ADMIN,
};

newPerson.cars[0] = '1'; // does not work since first array item should be a number
newPerson.cars.push('corolla'); // works since we use 'push', and last accepted variable type is string
newPerson.cars.push(true);
newPerson.cars = [1, 'test', 'test2']; // does not match tuple type described

let education: string[];
education = ['high school', 'university'];

for (let edu of education) {
  console.log(edu); //infers each value of string[] is a string (obviously)
}

console.log(newPerson.name);
