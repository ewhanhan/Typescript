/*
  Table of contents:
  1. Intersection Types
  2. Type Guards
  3. Discriminating Unions
  4. Type casting
  5. Index properties
  6. Function overloading
  7. Optional chaining
  8. Nullish coalescing
*/

/*

type checking options:
- typeof 
- instanceof --> for classes
- discriminating union 
  - use a literal type i.e. state ='a'
  - type example = { state: 'a' }
--> used to check for a certain type before trying to do something with it at runtime

Casting is used to tell TS that a variable is of a specific type

*/

// Intersection Type
// Intersection of custom object types is the combination of both
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// can be achieved with interface
// interface ElevatedEmployee extends Employee, Admin {}

const user1: ElevatedEmployee = {
  name: 'Ewhan',
  privileges: ['db', 'server'],
  startDate: new Date(),
};

// with core types, intersection of multiple types is the only the one's that overlap
// i.e number
type Combination = string | number;
type Numeric = number | boolean;

type Universal = Combination & Numeric;

// Type Guards
// Function overloading

function add(a: string, b: string): string;
function add(num1: Combination, num2: Combination) {
  let result: Combination;
  if (typeof num1 === 'number' && typeof num2 === 'number') {
    result = num1 + num2;
    return result;
  } else {
    result = +num1 + +num2;
    return result.toString();
  }
}

let res = add('1', '2');
// console.log(res.split('')); since we have overloaded fn that returns a string, we can use string methods

type UnknownEmployee = Admin & Employee;

function printEmployeeInfo(employee: UnknownEmployee) {
  if ('privileges' in employee) {
    console.log(employee.privileges);
  }

  if ('startDate' in employee) {
    console.log(employee.startDate);
  }
}

printEmployeeInfo(user1);

abstract class Vehicle {
  abstract drive(): void;
}

class Truck extends Vehicle {
  override drive(): void {
    console.log('Driving a truck!');
  }

  loadCargo(): void {
    console.log('Loading truck');
  }
}

class Car extends Vehicle {
  override drive(): void {
    console.log('Driving a car!');
  }

  loadPassengers(): void {
    console.log('Loading car');
  }
}

let t1 = new Truck();
t1.drive();
t1.loadCargo();

type MovingVehicle = Truck | Car;

function doStuff(vehicle: MovingVehicle): MovingVehicle {
  console.log('Doing Stuff: ');
  if (vehicle instanceof Car) {
    vehicle.loadPassengers();
  } else if (vehicle instanceof Truck) {
    vehicle.loadCargo();
  }

  return vehicle;
}

let v = doStuff(t1);

// Discriminated Unions
interface Bird {
  type: 'bird';
  flySpeed: number;
}

interface Horse {
  type: 'horse';
  runSpeed: number;
}

type Animal = Bird | Horse;

let animal: Animal = {
  type: 'bird',
  flySpeed: 25,
};

function moveAnimal(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case 'bird':
      speed = animal.flySpeed;
      break;
    case 'horse':
      speed = animal.runSpeed;
      break;
  }
  console.log(speed);
}

moveAnimal(animal);

// Type casting
/*
  ! --> not null
  (__ as ___) --> type casting
*/
const userInputEl = document.querySelector('#user-input')! as HTMLInputElement;

userInputEl.addEventListener('input', (e: Event) => {
  let val = (e.target as HTMLInputElement).value;
  console.log(val);
});

// Index Properties
interface ErrorContainer {
  // 'string': 'string'
  // key is a string, value is a string
  [prop: string]: string;
}

const error: ErrorContainer = {
  email: 'Not a valid email',
  username: 'test',
};

// Optional chaining
const fetchUserData = {
  id: 'u1',
  name: 'Ewhan',
  job: {
    title: 'developer',
    company: 'freelance',
    salary: undefined,
  },
};

console.log(fetchUserData.job?.salary);
console.log(fetchUserData.job.salary ?? 'test');
