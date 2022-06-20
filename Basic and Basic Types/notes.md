### Benefits of Typescript

1. Adds types, easier to avoid errors
2. Non-JS features such as Interfaces, Generics
3. Can next-gen JS features, which then gets compiled down for older browsers
4. Meta-programming features like Decorators
5. Rich configuration options
6. Modern tooling that helps on non-TS projects (a lot of extensions)

### Caveats:

- type system only helps during development. Code will still compile, but will show errors to fix.
  - Does not change run-time code
- TS does not support properties for generic objects
  - ex. person: object = {name: 'Ewhan'}
  - person.name does not exist on type 'object'
    - will still work, however

### TS vs JS

- JS is dynamically typed, TS is statically typed
- We can write code to avoid type issues in JS, but added code where we can avoid by using TS
  - TS types are checked during compilation
  - JS types are checked during run-time

### Core Types

- number
  - 1, 5.3, 10
    - `: number`
  - all numbers, no differentiation between integers or floats
- string
  - 'test'
    - `: string`
  - all text values
- boolean
  - true, false
    - `: boolean`
  - no 'truthy' or 'falsy' values
- object
  - {age: 30}
    - `: object`
  - Any JS object, more specific types are possible available to TS
- array
  - [1,2,3]
    - `: number[]`
  - Any JS array, type can be flexible or strict
- tuple
  - [1,2]
    - `: [number, number]`
  - New to TS, this type does not exist in JS
  - Fixed length vs traditional JS arrays
- Enum
  - enum {NEW, OLD}
  - New to TS
  - Automatically enumerated global constant identifiers
- any
  - Most flexible type
  - Can store any type
  - Avoid using as it takes away advantages of TS
- void
  - `: void`
  - Used where there is no data
  - void variables can only be assigned to void or undefined, but there is no point
  - any variable assigned void type returns `undefined`
- never
  - `: never`
  - indicates a value that will never occur
    - specifically, a function with never, will never reach an end point
      - functions that throw an error are of type never, since the script becomes broken, and does not finish execution
      - similarly, a never ending loop will never reach termination
  - never variables can never be assigned

### Union Types

- `const result: string | number`
- add flexibility to types available to a variable/parameter

### Literal Types

- `const number = 2.8`

### Type Aliases and Object Types

- Add readability + avoid repetition by creating type aliases
- Manage types centrally

  ```
  type Combinable = number | string;
  type ConversionDescriptor = 'as-number' | 'as-string';

  type person = { name: string, age: number }
  ```

### Function Type

- `: Function`
- Dictate what the parameters types and return type of a function

  ```
  let combineValues: Function; //not very precise
  let betterCombineValues: (a: number, b: number) => number; // returns a function which accepts 2 parameters and returns a number
  ```

### Unknown Type

- Preferred to `: any`
- Unknown variables should be type-checked before reassigned

### Type Inference

- TS does its best to understand the type that's assigned to a variable
  - `let str = 'string'` TS detects str is of type `string`
  - Good practice to assign type if variable is unassigned initially
    ```
    let result: number;
    result = 5;
    ```
