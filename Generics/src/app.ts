/* 
  Table of Contents:
  1. Generics
  2. Creating Generic fns
  3. Working with Constraints
  4. keyof constraint
  5. Generic classes
  6. Generic Utility types
  8. Generic Types vs Union Types
*/
const names: Array<string> = [];
// const names: string[] = [] --> same as above

// promises return type of unknown
// we can let TS know what the promise returns
const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('done!');
  }, 1000);
});

promise.then((res) => {
  console.log(res);
});

/* 

function mergeObjects(A: object, B: object) {
  return Object.assign(A, B);
}

const mergeObj = mergeObjects({ name: 'Ewhan' }, { age: 28 }); 
merge.name --> will not work since type is object, doesnt have property name

we can cast such that -- const mergeObj = mergeObjects({ name: 'Ewhan' }, { age: 28 }) as {name: string, age: number}; 

*/

function mergeObjects<A extends object, B extends object>(objA: A, objB: B) {
  return Object.assign(objA, objB);
}

// using 'extends' keyword, we constrain the generic type to an object
// above return object of type A & B --> therefore a type with properties of both A and B

const mergeObj = mergeObjects({ name: 'Ewhan' }, { age: 28 });
console.log(mergeObj);

type hasLength = {
  length: number;
};

function countAndDescribe<T extends hasLength>(element: T): [T, string] {
  let descriptionText: string = 'Has no values!';
  if (element.length === 1) {
    descriptionText = 'Element has length 1';
  } else if (element.length > 1) {
    descriptionText = `Element has length ${element.length}`;
  }
  console.log(element, descriptionText);
  return [element, descriptionText];
}

countAndDescribe(['t a']);
countAndDescribe([1, 2]);

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

console.log(extractAndConvert({ age: 10 }, 'age'));

class DataServer<T extends string | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  remove(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  publishData() {
    console.log([...this.data]);
  }
}

let ds = new DataServer<string>();
ds.addItem('test');
ds.publishData();

interface CourseGoal {
  title: string;
  description: string;
  startDate: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  startDate: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.startDate = startDate;

  return courseGoal as CourseGoal;
}

const fullName: Readonly<string[]> = ['Ewhan', 'Han'];
// fullName.push('test'); //--> not allowed since fullName is readonly array
