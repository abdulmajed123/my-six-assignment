## FAQ

#### Question 1. What is the difference between var, let, and const?

Answer 1.

var: Is function-scoped or global-scoped. It can be accessed from anywhere within its containing function.Allows both re-declaration and reassignment within the same scope.

let: Is block-scoped. A block is any part of the code within curly braces {}. This means a let variable is only accessible within the block where it was declared.Allows reassignment but not re-declaration within the same scope.

const: Is also block-scoped. Cannot be re-declared or re-assigned once initialized

#### Question 2. What is the difference between map(), forEach(), and filter()?

Answer 2: The primary difference between map(), forEach(), and filter() is their purpose and what they return

map(): transforms elements into a new array.

forEach():selects elements into a new array based on a condition.

filter(): iterates over the array without returning a new one.

#### Question 3. What are arrow functions in ES6?

Answer 3: Arrow functions, introduced in JavaScript's ES6 version, provide a shorter, more concise syntax for writing function expressions compared to traditional function declarations. They are particularly useful for creating anonymous functions and callbacks, and they resolve common issues with the this keyword by inheriting its binding from the surrounding scope.

#### Question 4.How does destructuring assignment work in ES6?

Answer 4: Destructuring assignment in ES6 is a JavaScript expression that allows for the extraction of values from arrays or properties from objects and their assignment to distinct variables in a concise and readable manner. It simplifies the process of accessing and utilizing data stored within these structures.

#### Question 5.Explain template literals in ES6. How are they different from string concatenation?

Answer 5: Template literals, introduced in ES6 (ECMAScript 2015), provide a more powerful and flexible way to create strings in JavaScript compared to traditional single or double-quoted strings. They are enclosed by backticks (`` ` ``) instead of quotation marks.

The difference lies in their function and how they handle data types.
concat() or + join strings.+ can also convert other data types (like numbers) to strings.String interpolation (${} etc.) or string.Format() are more flexible since they let you embed variables or expressions directly into strings.
