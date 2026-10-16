# ⚙️ TypeScript Operators — Day 2

> **Learning Goal:** Understand all major TypeScript/JavaScript operators with typed examples and real-world automation use cases.

---

## 📌 What is an Operator?

An **operator** is a symbol that performs an operation on one or more values (called **operands**) and produces a result.

```typescript
let result = 100 + 200; // '+' is the operator, 100 and 200 are operands
```

---

## 1. 🔢 Arithmetic Operators

Used to perform mathematical calculations.

| Operator | Name           | Example      | Result  |
|----------|----------------|--------------|---------|
| `+`      | Addition       | `100 + 200`  | `300`   |
| `-`      | Subtraction    | `200 - 100`  | `100`   |
| `*`      | Multiplication | `100 * 200`  | `20000` |
| `/`      | Division       | `200 / 100`  | `2`     |
| `%`      | Modulus        | `200 % 2`    | `0`     |
| `**`     | Exponentiation | `2 ** 3`     | `8`     |

### Code Example

```typescript
let a: number = 100;
let b: number = 200;

console.log(a + b);   // 300
console.log(b - a);   // 100
console.log(b / a);   // 2
console.log(b % 2);   // 0  (even number check)
console.log(b * a);   // 20000
console.log(a ** b);  // 100^200 (huge number)

let x: number = 2;
let y: number = 3;
console.log(x ** y);  // 8  (2 to the power of 3)
```

### + with Strings (Concatenation)

```typescript
let fName = 'Sushil';
let lName = 'Iyer';

console.log(fName + ' ' + lName); // Sushil Iyer  (old style)
console.log(`${fName} ${lName}`); // Sushil Iyer  (template literal - preferred)
```

> **Tip:** Always use template literals `${}` for string interpolation in modern TypeScript — it's cleaner and more readable.

---

## 2. 🔍 Comparison Operators (== vs ===)

Used to compare two values and return a **boolean** (`true` or `false`).

| Operator | Name                    | Checks           | Example              |
|----------|-------------------------|------------------|----------------------|
| `==`     | Loose Equality          | Value only       | `"5" == 5 → true`   |
| `===`    | Strict Equality         | Value + Type     | `"5" === 5 → false` |
| `!=`     | Loose Inequality        | Value only       | `"5" != 5 → false`  |
| `!==`    | Strict Inequality       | Value + Type     | `"5" !== 5 → true`  |

### Code Example

```typescript
let city1: string = 'Pune';
let city2: string = 'pune';

console.log(city1 == city2);  // false (case-sensitive value check)
console.log(city1 === city2); // false (same type, different value)

let num: number = 5;

console.log(num === 5);   // true
// TypeScript will flag: num === '5'  → type mismatch error
```

### Key Rule in TypeScript

> **Always use `===` in TypeScript.** TypeScript's compiler will flag `==` comparisons between different types as errors. `===` checks **both value and type** — making your code safer and more predictable.

---

## 3. 📏 Relational Operators

Used to compare the **magnitude** (size) of two values.

| Operator | Name                     | Example         | Result  |
|----------|--------------------------|-----------------|---------|
| `>`      | Greater than             | `500 > 600`     | `false` |
| `<`      | Less than                | `500 < 600`     | `true`  |
| `>=`     | Greater than or equal to | `500 >= 500`    | `true`  |
| `<=`     | Less than or equal to    | `600 <= 500`    | `false` |

### Code Example

```typescript
let a1: number = 500;
let a2: number = 600;

console.log(a1 > a2);   // false
console.log(a1 < a2);   // true
console.log(a1 >= 500); // true
console.log(a2 <= 500); // false

if (a1 < a2) {
  console.log(`${a1} is less than ${a2}`);
}
```

### Automation Context

```typescript
let expectedCount: number = 5;
let actualCount: number = 3;

if (actualCount < expectedCount) {
  console.log(`FAIL: Expected ${expectedCount} items, found ${actualCount}`);
}
```

---

## 4. 🧠 Logical Operators

Used to combine multiple conditions.

| Operator | Name        | Returns `true` when...              |
|----------|-------------|--------------------------------------|
| `&&`     | Logical AND | **Both** conditions are true         |
| `\|\|`   | Logical OR  | **At least one** condition is true   |
| `!`      | Logical NOT | Condition is **false** (negation)    |

### Code Example

```typescript
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

console.log(isLoggedIn && hasPermission); // false  (both must be true)
console.log(isLoggedIn || hasPermission); // true   (at least one is true)
console.log(!isLoggedIn);                 // false  (flips the value)
console.log(!hasPermission);              // true
```

### Automation Context

```typescript
let isVisible: boolean = true;
let isEnabled: boolean = true;

if (isVisible && isEnabled) {
  console.log('Clicking the button...');
}
```

---

## 5. Unary Operators (Increment & Decrement)

Operate on a **single operand** to increase or decrease its value by 1.

| Operator | Type           | Behaviour                          |
|----------|----------------|------------------------------------|
| `++i`    | Pre-increment  | Increment first, then use value    |
| `i++`    | Post-increment | Use value first, then increment    |
| `--i`    | Pre-decrement  | Decrement first, then use value    |
| `i--`    | Post-decrement | Use value first, then decrement    |

### Pre vs Post Increment

```typescript
let i: number = 5;

// PRE-INCREMENT: increment happens BEFORE assignment
let pre = ++i;
console.log(pre); // 6  (i becomes 6 first, then assigned)
console.log(i);   // 6

// Reset
i = 5;

// POST-INCREMENT: current value assigned FIRST, then increment
let post = i++;
console.log(post); // 5  (current value 5 assigned first)
console.log(i);    // 6  (then i becomes 6)
```

### Pre vs Post Decrement

```typescript
let count: number = 10;

console.log(--count); // 9 (pre-decrement: decrements first)
console.log(count--); // 9 (post-decrement: uses 9, then becomes 8)
console.log(count);   // 8
```

### Automation Context

```typescript
let retryCount: number = 0;
const MAX_RETRIES: number = 3;

while (retryCount < MAX_RETRIES) {
  console.log(`Attempt #${++retryCount}`); // Pre-increment: shows 1, 2, 3
}
```

---

## 6. ❓ Ternary Operator

A **shorthand for if-else** — evaluates a condition and returns one of two expressions.

### Syntax

```
condition ? expression_if_true : expression_if_false
```

### Code Example

```typescript
let number: number = 200;

let result: string = (number % 2 === 0) ? 'Even' : 'Odd';
console.log(result); // Even

let isLoggedIn: boolean = true;
let message: string = isLoggedIn ? 'Welcome back!' : 'Please log in';
console.log(message); // Welcome back!
```

### Automation Context

```typescript
let statusCode: number = 200;
let testStatus: string = (statusCode === 200) ? 'PASS' : 'FAIL';
console.log(`API Test: ${testStatus}`); // API Test: PASS

let itemCount: number = 0;
let cartStatus: string = (itemCount > 0) ? `${itemCount} items in cart` : 'Cart is empty';
console.log(cartStatus); // Cart is empty
```

### Nested Ternary (use sparingly)

```typescript
let score: number = 75;

let grade: string = score >= 90 ? 'A'
                  : score >= 75 ? 'B'
                  : score >= 60 ? 'C'
                  : 'F';

console.log(grade); // B
```

> **Warning:** Nested ternaries reduce readability. Prefer `if-else` or `switch` when logic gets complex.

---

## 7. 📋 Assignment Operators

| Operator | Example   | Equivalent to  |
|----------|-----------|----------------|
| `=`      | `a = 5`   | `a = 5`        |
| `+=`     | `a += 3`  | `a = a + 3`    |
| `-=`     | `a -= 3`  | `a = a - 3`    |
| `*=`     | `a *= 3`  | `a = a * 3`    |
| `/=`     | `a /= 3`  | `a = a / 3`    |
| `%=`     | `a %= 3`  | `a = a % 3`    |
| `**=`    | `a **= 2` | `a = a ** 2`   |

### Code Example

```typescript
let score: number = 100;

score += 20;  // score = 120
score -= 10;  // score = 110
score *= 2;   // score = 220
score /= 4;   // score = 55
score %= 10;  // score = 5
console.log(score); // 5
```

---

## 🚀 Quick Reference Card

| Category        | Operators                    | Purpose             |
|-----------------|------------------------------|---------------------|
| Arithmetic      | `+ - * / % **`               | Math calculations   |
| Comparison      | `== === != !==`              | Equality checks     |
| Relational      | `< > <= >=`                  | Magnitude checks    |
| Logical         | `&& \|\| !`                  | Boolean logic       |
| Unary           | `++ --`                      | Increment/decrement |
| Ternary         | `condition ? val1 : val2`    | Shorthand if-else   |
| Assignment      | `= += -= *= /= %= **=`       | Assign + operate    |

---

## 🧠 Key Takeaways

1. **Always use `===` instead of `==`** in TypeScript — checks both value and type.
2. **`%` (modulus)** is great for even/odd checks: `num % 2 === 0` means even.
3. **Pre-increment (`++i`)** changes value before use; **post-increment (`i++`)** uses current value first.
4. **Ternary operator** is a clean one-liner for simple conditions — avoid deep nesting.
5. **Logical operators** are essential in automation — combine conditions with `&&` and `||`.
6. **`**`** is the exponentiation operator: `2 ** 10 = 1024`.

---

## 📝 Practice Exercises

1. Write a TypeScript program to check if a number is divisible by both 3 and 5.
2. Use a ternary to print `"Pass"` if score >= 50, otherwise `"Fail"`.
3. Demonstrate the difference between `++i` and `i++` with `console.log`.
4. Use logical operators to check if an age is between 18 and 60.
5. Write a program using all assignment operators starting from a value of 100.

---

*Day 2 — TypeScript Operators | Part of the TypeScript Learning Series*
