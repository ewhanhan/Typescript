/*  
  Table of Contents:
  1. first class decorators
  2. decorator factories
  3. multiple decorators
  4. property decorators
  5. accessor and parameter decorators
  6. 
*/

// Decorator factory
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target: any) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}

function Logger(logString: string) {
  console.log('logger decorator before return');
  return function (constructor: Function) {
    console.log('logging decorator...');
    console.log('\t' + logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('with template decorator before return');
  return function (constructor: any) {
    console.log('with template decorator...');
    const hookEl = document.getElementById(hookId);
    const person1 = new constructor(); // create an instance of a Person by calling constructor
    if (hookEl) {
      hookEl.innerHTML = template;
      const title = document.querySelector('h1');
      title!.textContent = person1.name;
    }
  };
}

@Logger('log string')
@WithTemplate('<h1>test</h1>', 'app')
// creation of decorators happens top down
// execution of decorators run bottom up
class Person {
  name = 'Ewhan';

  constructor() {
    console.log('Creating a Person object...');
  }
}

const p1 = new Person();

function Log(target: any, propertyName: string | Symbol) {
  console.log('Log decorator!');
  console.log(target, propertyName);
}
function Log2(
  target: any,
  propertyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('accessor decorator!');
  console.log(target, propertyName, descriptor);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log2
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

const p = new Product('Coke', -1.99);
p.price = 5;

// Method Decorators
// declared just before a method declaration
// decorator is applied to the property descriptor
// has 3 arguments
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

@classDecorator()
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

// Returning class decorators
// { new (...args: any[]): { greeting: string } --> object that can be 'new'ed, returns { greeting: string}
function classDecorator() {
  console.log('decorator factory');
  return function <T extends { new (...args: any[]): { greeting: string } }>(
    constructor: T
  ) {
    return class extends constructor {
      constructor(...args: any[]) {
        super();
        this.greeting = 'test';
      }
    };
  };
}

const g = new Greeter('test');
console.log(g);

class Print {
  message: string = 'test';
  constructor() {
    console.log('Print created');
  }
  @Auotbind
  showMessage() {
    console.log(this.message);
  }
}

function Auotbind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; //this returns the original method
  console.log(originalMethod);
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

let newP = new Print();
const button = document.querySelector('button')!;
button.addEventListener('click', newP.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatorProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive',
    ],
  };
}

function Validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          return !!obj[prop];
        case 'positive':
          return obj[prop] > 0;
      }
    }
  }
  return true;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(s: string, n: number) {
    this.title = s;
    this.price = n;
  }
}

const courseForm = document.querySelector('form')! as HTMLFormElement;
console.log(courseForm);

courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const courseInputEl = document.querySelector('#course')! as HTMLInputElement;
  const amountInputEl = document.querySelector('#amount')! as HTMLInputElement;

  const title = courseInputEl.value;
  const price = +amountInputEl.value;

  const newCourse = new Course(title, price);
  if (!Validate(newCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(newCourse);
});
