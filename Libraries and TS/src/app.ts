/*

  Using declare --> telling TS that a variable will exist
  using class transformer --> 

*/
import _ from 'lodash';

import { Product } from './product.model';

console.log(_.shuffle([1, 2, 3, 4, 5, 6, 7]));

declare var GLOBAL: string; //will tell TS that this variable exists!
console.log(GLOBAL);

const prod = new Product('test', 123);
console.log(prod);
