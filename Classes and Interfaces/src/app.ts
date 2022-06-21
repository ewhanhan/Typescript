/*

  Why use interface vs custom type?
  - interface forces the structure of an object

*/

interface Person {
  name: string;
  readonly age: number;
  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'Ewhan',
  age: 28,
  greet(phrase: string): void {
    console.log('hello, ' + phrase);
  },
};

user1.greet('world!');
// user1.age = 5;

// Classes than implement interface must override all methods, variables
class User implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(phrase: string): void {
    console.log(phrase);
  }
}

let u1 = new User('Ewhan', 28);
u1.greet('hello world!');

// abstract class Person {
//   name: string;
//   abstract empCode: number;
//   constructor(name: string) {
//     this.name = name;
//   }

//   display(): void {
//     console.log(this.name);
//   }

//   abstract find(string: string): Person;
// }

// class Employee extends Person {
//   empCode: number; // must define any abstract member variables

//   constructor(name: string, code: number) {
//     super(name); // must call super()
//     this.empCode = code;
//   }
//   // must define any abstract methods
//   find(name: string): Person {
//     return new Employee(name, 1);
//   }
// }

// let emp: Person = new Employee('James', 100);
// emp.display(); //James

// let emp2: Person = emp.find('Steve');

// Chaining interfaces
interface Fruit {
  type: string;
  sound(): void;
}

interface Strawberry extends Fruit {
  diet?: string;
}

class Banana implements Strawberry {
  type: string;
  diet: string;

  constructor() {
    this.type = 'Banana';
    this.diet = 'Fruity';
  }

  sound(): void {
    console.log('wing');
  }
}

let strawberry: Strawberry = {
  type: 'banana',
  diet: 'fruity',
  sound() {
    console.log(this.type);
  },
};

// Interface as function type
interface Greeting {
  (name: string, num: number): void;
}

let hello: Greeting = (name: string = 'Ewhan', num: number = 1) =>
  console.log('hello ' + name + ' ID = ' + num);

hello('Ewhan', 2);

// optional member variables/parameters with `?`
interface Named {
  readonly name: string;
  outputName?: string;
}

let person: Named = {
  name: 'test',
  // dont need to pass in outputName
}