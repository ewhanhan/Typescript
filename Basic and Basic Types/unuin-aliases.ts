type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-string';

function combine(
  input1: Combinable,
  input2: Combinable,
  conversion: ConversionDescriptor // literal type
) {
  let result: Combinable;

  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (conversion === 'as-number') {
    return +result;
  } else {
    return result.toString();
  }
}

const combinedAges = combine(30, 28, 'as-string');
console.log(typeof combinedAges);
