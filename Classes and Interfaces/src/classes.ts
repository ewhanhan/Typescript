class Department {
  name: string; // member variable
  protected employees: string[] = []; // only accessible within the class or inherited classes
  private readonly id: number; // only accessible within the class

  private static readonly _departmentList: Department[] = [];

  // constructor(private id: string, public name: string){
  // } // short form to create private id and public name variables etc...

  constructor(name: string) {
    this.name = name;
    this.id = this.generateID();
    Department._departmentList.push(this);
  }

  describe(): void {
    console.log('Department: ' + this.name);
  }

  describeV2(this: Department): void {
    console.log('Department: ' + this.name);
  } // tie `this` to this instance of the class

  addEmployee(employee: string): void {
    this.employees.push(employee);
  }

  getEmployees(this: Department): void {
    console.log("Employee's of this department: ");
    for (let employee of this.employees) {
      console.log(employee);
    }
  }

  getDepartmentID(this: Department): void {
    console.log('Department ID: ' + this.id);
  }

  private generateID(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  static getDepartmentList(): Department[] {
    return Department._departmentList;
  }

  static get departmentList(): Department[] {
    return Department._departmentList;
  }
}

const accounting = new Department('Accounting');
const legal = new Department('Legal');

accounting.describe();

accounting.addEmployee('Ewhan');
accounting.addEmployee('Rufus');
// accounting.employees[2] = 'Test'; // not allowed since employees in private member variable
accounting.getEmployees();
accounting.getDepartmentID();

class ITDeparment extends Department {
  private _admins: string[] = [];

  constructor(name: string, admins: string[] = ['Ewhan']) {
    super(name);
    this._admins = admins;
  }

  addEmployee(s: string): void {
    this.employees.push(s);
  }

  get admins() {
    if (this._admins) {
      return this._admins;
    } else {
      throw new Error('No admins found');
    }
  }

  set admins(admins: string[]) {
    if (!admins) {
      throw new Error('Pass a valid input');
    } else {
      this._admins = admins;
    }
  }
}

const it = new ITDeparment('IT', ['Ewhan', 'Rufus']);
let admins = ['adminA', 'adminB'];
it.admins = admins;
console.log(it.admins);

console.log(Department.getDepartmentList());
console.log(Department.departmentList);

abstract class Animal {
  protected _name: string;

  abstract _abstractVariable: string;

  constructor(name: string) {
    if (!name) {
      throw new Error('Give a proper name!');
    } else {
      this._name = name;
    }
  }

  // abstract methods cannot describe the implementation
  // all classes that derive Animal, must override methods
  public abstract sound(): void;

  display(): void {
    console.log(this._name);
  }
}

class Dog extends Animal {
  _abstractVariable: string;

  constructor(name: string) {
    super(name);
    this._abstractVariable = 'test';
  }

  override sound(): void {
    console.log('RUFF');
  }
}

class Fish extends Animal {
  _abstractVariable: string;

  constructor(name: string) {
    super(name);
    this._abstractVariable = 'test';
  }

  override sound(): void {
    console.log('GRRGLL');
  }
}

let Rufus = new Dog('Rufus');
let Nemo = new Fish('Nemo');
Rufus.display();
Rufus.sound();
Nemo.sound();

class Singleton {
  private static _instance: Singleton;

  private constructor() {}

  static getInstance(): Singleton {
    if (!this._instance) {
      Singleton._instance = new Singleton();
    }

    return Singleton._instance;
  }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
