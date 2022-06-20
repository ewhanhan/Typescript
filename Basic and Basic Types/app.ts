let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'testing';

// need a typecheck to determine how to assign Unknown variable
if (typeof userInput === 'string') {
  userName = userInput;
}
