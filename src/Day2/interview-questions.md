# 🎯 TypeScript Operators — Day 2 Interview Questions & Answers

> Covers: Arithmetic, Comparison, Relational, Logical, Unary, Ternary, and Assignment Operators
> Difficulty levels: 🟢 Basic → 🟡 Intermediate → 🔴 Tricky / Advanced

---

## 🟢 BASIC QUESTIONS

---

### Q1. What is an operator in TypeScript?

**Answer:**
An operator is a special symbol or keyword that performs an operation on one or more **operands** (values or variables) and produces a result.

```typescript
let result: number = 10 + 5; // '+' is the operator, 10 and 5 are operands
```

TypeScript supports all JavaScript operators and additionally enforces **type safety** — the compiler will catch mismatched types in comparisons.

---

### Q2. List the arithmetic operators in TypeScript with examples.

**Answer:**

| Operator | Name           | Example     | Result |
|----------|----------------|-------------|--------|
| `+`      | Addition       | `10 + 5`    | `15`   |
| `-`      | Subtraction    | `10 - 5`    | `5`    |
| `*`      | Multiplication | `10 * 5`    | `50`   |
| `/`      | Division       | `10 / 5`    | `2`    |
| `%`      | Modulus        | `10 % 3`    | `1`    |
| `**`     | Exponentiation | `2 ** 10`   | `1024` |

```typescript
let a: number = 10;
let b: number = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1
console.log(a ** b); // 1000
```

---

### Q3. What is the difference between `==` and `===`?

**Answer:**

| Feature      | `==` (Loose Equality)          | `===` (Strict Equality)            |
|--------------|--------------------------------|------------------------------------|
| Checks value | ✅ Yes                          | ✅ Yes                              |
| Checks type  | ❌ No (does type coercion)      | ✅ Yes                              |
| TypeScript   | Often causes type error        | Recommended — type-safe            |

```typescript
// JavaScript behaviour (for context)
console.log(5 == "5");   // true  (type coercion converts "5" to 5)
console.log(5 === "5");  // false (different types)
console.log(0 == false); // true  (0 coerces to false)
console.log(0 === false);// false (number vs boolean)
```

> **In TypeScript:** Always use `===`. TypeScript will often raise a compile error when comparing values of clearly different types with `==`.

---

### Q4. What are relational operators? Give examples.

**Answer:**
Relational operators compare two values and return a `boolean`.

```typescript
let a: number = 500;
let b: number = 600;

console.log(a > b);   // false — a is NOT greater than b
console.log(a < b);   // true  — a is less than b
console.log(a >= 500);// true  — a is equal to 500
console.log(b <= 500);// false — b is NOT less than or equal to 500
```

---

### Q5. What are logical operators and when do you use them?

**Answer:**
Logical operators combine boolean expressions:

- `&&` (AND) — returns `true` only when **both** sides are `true`
- `||` (OR) — returns `true` when **at least one** side is `true`
- `!` (NOT) — **negates** (flips) the boolean value

```typescript
let isVisible: boolean = true;
let isEnabled: boolean = false;

console.log(isVisible && isEnabled); // false
console.log(isVisible || isEnabled); // true
console.log(!isVisible);             // false
```

---

### Q6. What is the ternary operator? Write the syntax and an example.

**Answer:**
The ternary operator is a **one-line shorthand for `if-else`**.

**Syntax:**
```
condition ? expression_if_true : expression_if_false
```

```typescript
let marks: number = 72;
let result: string = marks >= 50 ? 'Pass' : 'Fail';
console.log(result); // Pass
```

It's called *ternary* because it takes **three operands**: the condition, the true expression, and the false expression.

---

### Q7. What are assignment operators? List at least 5.

**Answer:**
Assignment operators assign a value to a variable. The compound ones perform the operation AND assign in one step.

```typescript
let n: number = 100;

n += 50;  // n = 150  (n = n + 50)
n -= 30;  // n = 120  (n = n - 30)
n *= 2;   // n = 240  (n = n * 2)
n /= 4;   // n = 60   (n = n / 4)
n %= 7;   // n = 4    (n = n % 7)
n **= 3;  // n = 64   (n = n ** 3)

console.log(n); // 64
```

---

### Q8. What is the modulus `%` operator used for?

**Answer:**
The `%` operator returns the **remainder** after integer division. It is commonly used to:

- Check if a number is **even or odd**
- **Cycle through** a range (e.g., clock hours, array indices)
- Determine **divisibility**

```typescript
let num: number = 17;

console.log(num % 2 === 0 ? 'Even' : 'Odd'); // Odd
console.log(10 % 3); // 1 (10 = 3×3 + 1)
console.log(9 % 3);  // 0 (exactly divisible)
```

---

## 🟡 INTERMEDIATE QUESTIONS

---

### Q9. Explain the difference between pre-increment and post-increment with a code example.

**Answer:**

| Type           | Syntax | Behaviour                                   |
|----------------|--------|---------------------------------------------|
| Pre-increment  | `++i`  | Increments the value **first**, then uses it |
| Post-increment | `i++`  | Uses the **current** value, then increments  |

```typescript
let i: number = 5;

// PRE-INCREMENT
let a = ++i;
console.log(a); // 6 — i was incremented to 6 BEFORE being assigned
console.log(i); // 6

// Reset
i = 5;

// POST-INCREMENT
let b = i++;
console.log(b); // 5 — current value (5) assigned FIRST
console.log(i); // 6 — i incremented AFTER assignment
```

> **Key Interview Tip:** "Pre means increment *before*, post means increment *after*."

---

### Q10. What does the `!` (NOT) operator do? Can it be used on non-boolean values?

**Answer:**
`!` negates a boolean value. When used on non-boolean values, JavaScript (and TypeScript at runtime) first converts the value to boolean (called **truthy/falsy** coercion), then negates it.

```typescript
console.log(!true);      // false
console.log(!false);     // true
console.log(!0);         // true  (0 is falsy)
console.log(!1);         // false (1 is truthy)
console.log(!"");        // true  (empty string is falsy)
console.log(!"hello");   // false (non-empty string is truthy)
console.log(!null);      // true
console.log(!undefined); // true
```

**Double NOT `!!`** is a common trick to convert any value to a boolean:
```typescript
let value: string = "hello";
console.log(!!value); // true
```

---

### Q11. What is short-circuit evaluation in logical operators?

**Answer:**
TypeScript/JavaScript evaluates logical expressions **lazily** — it stops as soon as the result is determined.

- `&&` — if the **left side is false**, the right side is **never evaluated**
- `||` — if the **left side is true**, the right side is **never evaluated**

```typescript
let count: number = 0;

// Short-circuit with &&
false && count++;
console.log(count); // 0 — count++ was never executed!

// Short-circuit with ||
true || count++;
console.log(count); // 0 — count++ was never executed!
```

**Practical use:**
```typescript
let user: string | null = null;
let name: string = user || 'Guest'; // If user is null/falsy, use 'Guest'
console.log(name); // Guest
```

---

### Q12. How does the `+` operator behave differently with strings vs numbers?

**Answer:**
The `+` operator is **overloaded** — it does different things depending on the types:

```typescript
// Numbers: addition
console.log(10 + 20);       // 30

// Strings: concatenation
console.log("Hello" + " World"); // "Hello World"

// Mixed (JS behaviour — TypeScript will warn):
// When one operand is a string, + converts the other to string
console.log("Score: " + 100); // "Score: 100"
console.log(100 + "200");     // "100200"  NOT 300!

// Avoid confusion — use template literals
let score: number = 100;
console.log(`Score: ${score}`); // "Score: 100" (clean and type-safe)
```

> **TypeScript advantage:** TypeScript will warn you if you accidentally mix types in an unintended way.

---

### Q13. What is operator precedence? Which has higher precedence, `*` or `+`?

**Answer:**
Operator precedence determines the **order** in which operators are evaluated in an expression.

`*` has **higher precedence** than `+`, just like in standard mathematics (BODMAS/PEMDAS).

```typescript
let result: number = 2 + 3 * 4;
console.log(result); // 14 — NOT 20!
// Because 3 * 4 = 12 is evaluated first, then 2 + 12 = 14

// Use parentheses to override precedence
let result2: number = (2 + 3) * 4;
console.log(result2); // 20
```

**Precedence order (high → low):**
1. `**` (exponentiation)
2. `* / %`
3. `+ -`
4. `< > <= >=`
5. `== === != !==`
6. `&&`
7. `||`
8. `?:` (ternary)
9. `= += -=` etc.

---

### Q14. Can you use ternary operators inside `console.log()`?

**Answer:**
Yes! The ternary operator is an **expression** (it returns a value), so it can be used anywhere a value is expected.

```typescript
let temp: number = 38;

console.log(`Weather: ${temp > 35 ? 'Hot' : 'Comfortable'}`);
// Output: Weather: Hot

let isAdmin: boolean = false;
console.log('Access: ' + (isAdmin ? 'Full' : 'Limited'));
// Output: Access: Limited
```

---

## 🔴 TRICKY QUESTIONS

---

### Q15. ⚡ What is the output of this code? (Post-increment trap)

```typescript
let x: number = 5;
console.log(x++); // ?
console.log(x);   // ?
console.log(++x); // ?
```

**Answer:**
```
5   ← post-increment: prints 5 FIRST, then x becomes 6
6   ← x is now 6
7   ← pre-increment: x becomes 7 FIRST, then prints 7
```

> **Explanation:** `x++` returns the OLD value and increments after. `++x` increments first and returns the NEW value.

---

### Q16. ⚡ What does `null == undefined` return? What about `null === undefined`?

**Answer:**
```typescript
console.log(null == undefined);  // true
console.log(null === undefined); // false
```

**Why?**
- `==` treats `null` and `undefined` as **equal** — this is a special case in the JavaScript specification (they are both "nothing").
- `===` checks **type** as well — `null` is of type `object`, `undefined` is of type `undefined`, so they are **not strictly equal**.

> **Tricky Interview Insight:** `null == 0` is `false`, and `null == false` is also `false`. Null only loosely equals `undefined`.

---

### Q17. ⚡ What is the output? (Operator precedence trap)

```typescript
console.log(2 + 3 + "4");   // ?
console.log("4" + 3 + 2);   // ?
```

**Answer:**
```
"54"   ← 2+3=5 (numbers), then 5+"4" = "54" (string concatenation)
"432"  ← "4"+3 = "43" (string concat), then "43"+2 = "432"
```

> **Key Insight:** JavaScript evaluates **left to right**. Once a string is encountered with `+`, all subsequent `+` operations become string concatenation.

---

### Q18. ⚡ What is the output of this ternary chain?

```typescript
let x: number = 10;
let result = x > 5 ? x > 8 ? 'Large' : 'Medium' : 'Small';
console.log(result); // ?
```

**Answer:**
```
Large
```

**Step-by-step:**
1. Is `x > 5`? → Yes (10 > 5) → evaluate right side: `x > 8 ? 'Large' : 'Medium'`
2. Is `x > 8`? → Yes (10 > 8) → returns `'Large'`

> **Tip:** Nested ternaries are hard to read. Always add parentheses or use `if-else` for clarity.

---

### Q19. ⚡ What does `typeof NaN` return, and is `NaN === NaN` true?

**Answer:**
```typescript
console.log(typeof NaN);    // "number"  ← surprising!
console.log(NaN === NaN);   // false     ← even more surprising!
console.log(NaN == NaN);    // false
```

**Why?**
- `NaN` stands for "Not a Number" but its **type is `number`** — a quirk inherited from IEEE 754 floating point spec.
- `NaN` is the **only value in JavaScript that is not equal to itself**.

**How to properly check for NaN:**
```typescript
console.log(Number.isNaN(NaN));        // true  ← correct way
console.log(isNaN("hello"));           // true  ← old global function, less reliable
console.log(Number.isNaN("hello"));    // false ← strict, only true for actual NaN
```

---

### Q20. ⚡ What is the output? (Short-circuit with side effects)

```typescript
let a: number = 0;
let b: number = 0;

let result = (a++ || ++b);
console.log(result); // ?
console.log(a);      // ?
console.log(b);      // ?
```

**Answer:**
```
1   ← result is 1
1   ← a becomes 1 (post-increment: was 0, now 1)
1   ← b becomes 1 (pre-increment: evaluated because a++ returned 0 which is falsy)
```

**Step-by-step:**
1. `a++` → returns `0` (current value), then a becomes 1
2. `0` is **falsy**, so `||` evaluates the right side
3. `++b` → b becomes 1, returns `1`
4. `result = 1`

---

### Q21. ⚡ Predict the output (Assignment in condition trap)

```typescript
let x: number = 5;
let y: number = 10;

if (x = y) {           // Note: = not ==
  console.log('True block: x =', x);
} else {
  console.log('False block: x =', x);
}
```

**Answer:**
```
True block: x = 10
```

**Why?**
- `x = y` is an **assignment**, not a comparison. It assigns `10` to `x` and returns `10`.
- `10` is truthy, so the `if` block executes.
- `x` is now `10`.

> **TypeScript actually warns you about this!** TypeScript will flag `if (x = y)` as a potential bug — one of TypeScript's huge safety advantages over plain JavaScript.

---

### Q22. ⚡ What is the result of `5 % 0` and why?

**Answer:**
```typescript
console.log(5 % 0); // NaN
```

Division by zero in JavaScript/TypeScript for integers produces `NaN` for modulus (and `Infinity` for division):

```typescript
console.log(5 / 0);  // Infinity
console.log(-5 / 0); // -Infinity
console.log(5 % 0);  // NaN
```

> Always validate the divisor before using `%` in production code.

---

### Q23. ⚡ Is `===` always better than `==`? When might `==` be intentionally used?

**Answer:**
In TypeScript, `===` is almost always preferred. However, `==` has **one common intentional use**:

```typescript
// Checking for both null AND undefined in one go
let value: string | null | undefined = null;

if (value == null) {
  console.log('value is null or undefined'); // catches BOTH null and undefined
}

// vs ===
if (value === null || value === undefined) {
  console.log('same result, but more verbose');
}
```

> **TypeScript note:** In modern TypeScript codebases, this pattern is still seen, but many teams use `??` (nullish coalescing) or optional chaining `?.` instead.

---

### Q24. ⚡ What is the output? (Chained assignment)

```typescript
let a: number, b: number, c: number;
a = b = c = 10;
console.log(a, b, c); // ?
```

**Answer:**
```
10 10 10
```

**Why?**
Assignment operators evaluate **right to left**:
1. `c = 10` → c is 10, returns 10
2. `b = 10` → b is 10, returns 10
3. `a = 10` → a is 10

---

## 🎭 AUTOMATION / PLAYWRIGHT CONTEXT QUESTIONS

---

### Q25. How would you use the ternary operator in a Playwright test?

**Answer:**
The ternary operator is great for conditional logic in test validations:

```typescript
const statusCode: number = 200;
const testResult: string = (statusCode === 200) ? 'PASS' : 'FAIL';
console.log(`Login API: ${testResult}`);

// In Playwright tests:
const isVisible: boolean = true; // await page.isVisible('#submit-btn')
const action: string = isVisible ? 'Clicking submit' : 'Submit not visible - skipping';
console.log(action);
```

---

### Q26. How would you use logical operators in Playwright test conditions?

**Answer:**
```typescript
const isLoggedIn: boolean = true;  // from session check
const hasAccess: boolean = true;   // from permission check

// Run test only when both conditions are true
if (isLoggedIn && hasAccess) {
  console.log('Proceeding with admin test...');
  // await page.click('#admin-panel');
}

// Log warning if either condition fails
if (!isLoggedIn || !hasAccess) {
  console.warn('Test skipped: Missing login or access permissions');
}
```

---

### Q27. How would you use increment operators in a retry loop?

**Answer:**
```typescript
let retries: number = 0;
const maxRetries: number = 3;

while (retries < maxRetries) {
  try {
    console.log(`Attempt ${++retries} of ${maxRetries}`); // Pre-increment
    // await page.click('#submit');
    break; // success
  } catch (e) {
    if (retries === maxRetries) {
      console.error('All retries exhausted');
    }
  }
}
```

---

## 💡 Quick-Fire Round

| Question | Answer |
|----------|--------|
| `typeof NaN` | `"number"` |
| `NaN === NaN` | `false` |
| `null == undefined` | `true` |
| `null === undefined` | `false` |
| `2 + "3"` | `"23"` (string) |
| `"5" - 2` | `3` (numeric, `-` doesn't concat) |
| `!!"hello"` | `true` |
| `!!0` | `false` |
| `5 % 0` | `NaN` |
| `5 / 0` | `Infinity` |
| `0 == false` | `true` |
| `0 === false` | `false` |
| `10 > 5 > 3` | `false` (10 > 5 = true, true > 3 = 0 > 3 = false) |

---

## 💡 Interview Tips for Day 2

1. **Always explain with code** — when asked about `==` vs `===`, write code immediately.
2. **Mention TypeScript's advantage** — TypeScript catches type mismatches at compile time, unlike JavaScript.
3. **Pre/Post increment** — draw it out step-by-step: "the value is assigned first, then incremented."
4. **For tricky questions** — say "Let me trace through this step by step" to show analytical thinking.
5. **Mention automation context** — connect operators to real test scenarios (retry loops, condition checks, pass/fail logic).
6. **Short-circuit evaluation** — a favourite interview topic. Say: "JavaScript is lazy — it stops evaluating as soon as the result is known."
7. **NaN** — always say: "The only value not equal to itself — use `Number.isNaN()` to check."

---

*Day 2 — TypeScript Operators Interview Q&A | Part of the TypeScript Learning Series*
