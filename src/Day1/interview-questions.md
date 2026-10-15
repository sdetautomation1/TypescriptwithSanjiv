# 🎯 Day 1 - TypeScript Interview Questions & Answers

> **Topics Covered:** Variables (`let` / `const` / `var`) · Data Types · Naming Conventions  
> **Difficulty levels:** 🟢 Basic · 🟡 Intermediate · 🔴 Tricky / Gotcha

---

## 📋 Table of Contents

1. [Variables — Basic Questions](#-section-1-variables--basic)
2. [Variables — Intermediate Questions](#-section-2-variables--intermediate)
3. [Data Types — Basic Questions](#-section-3-data-types--basic)
4. [Data Types — Intermediate Questions](#-section-4-data-types--intermediate)
5. [Naming Conventions — Questions](#-section-5-naming-conventions)
6. [Tricky / Gotcha Questions](#-section-6-tricky--gotcha-questions)
7. [Quick Fire Round](#-section-7-quick-fire-round)

---

## 🟢 Section 1: Variables — Basic

---

### Q1. What is a variable in TypeScript?

**Answer:**  
A variable is a **named container** that stores a value in memory. In TypeScript, variables have a **type** associated with them, which means TypeScript enforces that the correct kind of value is stored.

```typescript
let studentName: string = 'Vikas'; // named 'studentName', holds a string
```

---

### Q2. What are the three keywords used to declare variables in TypeScript?

**Answer:**  
`let`, `const`, and `var`.

| Keyword | Reassignable | Scope | Use |
|---------|:---:|-------|-----|
| `let` | ✅ Yes | Block | When value will change |
| `const` | ❌ No | Block | When value stays fixed |
| `var` | ✅ Yes | Function | ⛔ Avoid — outdated |

---

### Q3. What is the difference between `let` and `const`?

**Answer:**  
- `let` → The value **can be changed** (reassigned) after declaration.  
- `const` → The value **cannot be reassigned** after it is set.

```typescript
let city: string = 'Mumbai';
city = 'Delhi'; // ✅ OK

const country: string = 'India';
country = 'USA'; // ❌ Error: Cannot assign to 'country' because it is a constant.
```

---

### Q4. What is the syntax format for declaring a variable in TypeScript?

**Answer:**
```
keyword  variableName : type  = value;
let      studentName  : string = 'Vikas';
```

The type annotation (`: string`) is **optional** — TypeScript can infer it automatically.

---

### Q5. Why should we avoid `var` in TypeScript?

**Answer:**  
`var` has two problematic behaviours:
1. **Function scope** (not block scope) — it leaks out of `if` and `for` blocks.
2. **Hoisting** — `var` declarations are silently moved to the top of their function, which can cause unexpected `undefined` values.

`let` and `const` are block-scoped and do not hoist, making them predictable and safe.

```typescript
if (true) {
    var x = 10;  // leaks outside the if block!
    let y = 20;  // stays inside the if block
}
console.log(x); // 10  ← var leaked out
console.log(y); // ❌ ReferenceError — y is not accessible here
```

---

## 🟡 Section 2: Variables — Intermediate

---

### Q6. What is Type Inference in TypeScript?

**Answer:**  
Type Inference means TypeScript **automatically figures out the type** of a variable based on the value you assign — without you needing to write the type annotation explicitly.

```typescript
let studentName = 'Vikas'; // TypeScript infers: string
let retryCount  = 3;       // TypeScript infers: number
let isActive    = true;    // TypeScript infers: boolean

studentName = 100; // ❌ Error: Type 'number' is not assignable to type 'string'
```

---

### Q7. What is the difference between Type Annotation and Type Inference?

**Answer:**

| | Type Annotation | Type Inference |
|--|---|---|
| **Written by** | Developer explicitly | TypeScript automatically |
| **Syntax** | `let name: string = 'Vikas'` | `let name = 'Vikas'` |
| **Flexibility** | Always clear, even without value | Requires an initial value |
| **When to use** | When you want to be explicit | When the type is obvious from the value |

---

### Q8. When would you use `let` over `const`?

**Answer:**  
Use `let` when the variable's value is **expected to change** during execution.

```typescript
// ✅ Use let — test status changes as tests run
let testStatus: string = 'Pending';
testStatus = 'Running';
testStatus = 'Passed';

// ✅ Use const — base URL never changes
const BASE_URL: string = 'https://demo.playwright.dev';
```

**Rule:** Start with `const` by default. Only switch to `let` when you know the value will change.

---

### Q9. Can you change the properties of a `const` object?

**Answer:**  
**Yes!** `const` only prevents **reassigning the variable itself** — it does NOT make the object's contents immutable.

```typescript
const config = { browser: 'chromium', headless: true };

config.headless = false;   // ✅ Allowed — modifying a property
config.browser = 'firefox'; // ✅ Allowed — modifying a property

config = { browser: 'webkit' }; // ❌ Error — cannot reassign the variable
```

> This is one of the most common interview gotcha questions!

---

### Q10. What is a Union Type? Give an example.

**Answer:**  
A Union Type allows a variable to hold **more than one type** of value, using the `|` (pipe) symbol.

```typescript
let timeout: number | string = 5000;
timeout = '10s'; // also valid!

let status: 'Passed' | 'Failed' | 'Skipped' = 'Passed';
status = 'Skipped'; // ✅
status = 'Error';   // ❌ Type '"Error"' is not assignable
```

---

## 🟢 Section 3: Data Types — Basic

---

### Q11. What are the primitive data types in TypeScript?

**Answer:**  
TypeScript has **7 primitive types**:

| Type | Example |
|------|---------|
| `number` | `let a: number = 10` |
| `string` | `let name: string = 'Harsh'` |
| `boolean` | `let isMarried: boolean = true` |
| `null` | `let cart: null = null` |
| `undefined` | `let product: undefined = undefined` |
| `bigint` | `let b: bigint = 10000000n` |
| `symbol` | `let id: symbol = Symbol('id')` |

---

### Q12. What is the difference between `null` and `undefined`?

**Answer:**

| | `null` | `undefined` |
|--|--------|-------------|
| **Meaning** | Intentionally has no value | Declared but not yet given a value |
| **Set by** | Developer (on purpose) | JavaScript engine (by default) |
| **`typeof`** | `"object"` ⚠️ | `"undefined"` |

```typescript
let cart: null = null;            // I deliberately set this to empty
let score: number | undefined;    // declared, but no value assigned yet

console.log(null == undefined);   // true  (loose check)
console.log(null === undefined);  // false (strict check — different types)
```

---

### Q13. What is `bigint` and when would you use it?

**Answer:**  
`bigint` is a data type for integers **larger than `Number.MAX_SAFE_INTEGER`** (9,007,199,254,740,991). You create one by adding `n` at the end of the number.

```typescript
let b: bigint = 10000000n;
let largeId: bigint = 9999999999999999999n;
```

**Use cases:** Database IDs, financial systems, cryptography, large unique identifiers.

---

### Q14. What does `typeof` do?

**Answer:**  
`typeof` is a JavaScript/TypeScript operator that returns the **type of a value as a string** at runtime.

```typescript
console.log(typeof 10);         // "number"
console.log(typeof 'Vikas');    // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" ⚠️ (famous bug!)
console.log(typeof 10n);        // "bigint"
console.log(typeof Symbol());   // "symbol"
```

---

## 🟡 Section 4: Data Types — Intermediate

---

### Q15. What is the difference between `any` and `unknown`?

**Answer:**

| | `any` | `unknown` |
|--|-------|-----------|
| **Type safety** | ❌ Disables all type checking | ✅ Type-safe |
| **Operations** | Can do anything without checks | Must check type first |
| **Recommendation** | ⛔ Avoid — defeats TypeScript's purpose | ✅ Prefer over `any` |

```typescript
// any — dangerous
let x: any = 'hello';
console.log(x.toUpperCase()); // works
x = 100;
console.log(x.toUpperCase()); // ❌ Runtime crash — but TypeScript didn't warn you!

// unknown — safe
let y: unknown = 'hello';
if (typeof y === 'string') {
    console.log(y.toUpperCase()); // ✅ TypeScript knows it's a string here
}
```

---

### Q16. Can you mix `bigint` and `number` in an expression?

**Answer:**  
**No.** TypeScript will throw a compile-time error if you try to mix them.

```typescript
let b: bigint = 10n;
let n: number = 5;

let result = b + n;   // ❌ Error: Cannot mix BigInt and other types
let result = b + 5n;  // ✅ Correct — use bigint literal
```

---

### Q17. What is a template literal and how is it different from string concatenation?

**Answer:**  
A **template literal** uses backticks (`` ` ``) and `${}` to embed variables directly inside strings. It is cleaner and more readable than `+` concatenation.

```typescript
const name: string = 'Vikas';
const country: string = 'India';

// Old way — concatenation
console.log('Hello ' + name + ', you are from ' + country);

// ✅ Template literal — much cleaner
console.log(`Hello ${name}, you are from ${country}`);
// Output: Hello Vikas, you are from India
```

---

## 🟢 Section 5: Naming Conventions

---

### Q18. What naming convention should variables use in TypeScript?

**Answer:**  
Variables use **camelCase** — the first word is lowercase, every subsequent word starts with a capital letter.

```typescript
let studentName = 'Vikas';    // ✅ camelCase
let isHeadless = true;        // ✅ camelCase
let maxRetryCount = 3;        // ✅ camelCase
```

---

### Q19. What naming convention should classes and interfaces use?

**Answer:**  
**PascalCase** — every word (including the first) starts with a capital letter.

```typescript
class LoginPage { }           // ✅ PascalCase
interface TestConfig { }      // ✅ PascalCase
type BrowserType = string;    // ✅ PascalCase
enum TestStatus { Passed }    // ✅ PascalCase
```

---

### Q20. How should you name a boolean variable?

**Answer:**  
Boolean variables should use `camelCase` prefixed with `is`, `has`, `can`, or `should` so that the name reads like a **yes/no question**.

```typescript
let isHeadless: boolean = true;      // ✅ is...
let hasPermission: boolean = false;  // ✅ has...
let canRetry: boolean = true;        // ✅ can...
let shouldSkip: boolean = false;     // ✅ should...
```

---

### Q21. When should you use `UPPER_SNAKE_CASE`?

**Answer:**  
For **configuration constants** — values that are fixed, known at the start of the program, and shared across multiple files.

```typescript
const MAX_TIMEOUT: number = 30000;
const BASE_URL: string = 'https://demo.playwright.dev';
const MAX_RETRY_COUNT: number = 3;
```

---

## 🔴 Section 6: Tricky / Gotcha Questions

---

### Q22. 🔴 What does `typeof null` return, and why?

**Answer:**  
`typeof null` returns **`"object"`** — which is **wrong and misleading**.

```typescript
console.log(typeof null); // "object" ← NOT "null"!
```

**Why?** This is a **famous bug in JavaScript** that dates back to 1995 when the language was first created. The internal type tag for `null` was set to the same bits as object references (binary `000`). It was never fixed because doing so would break existing websites.

**How to properly check for null:**
```typescript
let cart = null;

// ❌ Wrong
if (typeof cart === 'object') { } // matches null AND real objects!

// ✅ Correct
if (cart === null) { }
```

---

### Q23. 🔴 What is the difference between `==` and `===` when comparing `null` and `undefined`?

**Answer:**

```typescript
console.log(null == undefined);  // ✅ true  — loose equality ignores type
console.log(null === undefined); // ❌ false — strict equality checks type too
```

- `==` (loose) considers `null` and `undefined` **equal**.
- `===` (strict) considers them **different** because they are different types.

**Always use `===`** in TypeScript to avoid unexpected comparisons.

---

### Q24. 🔴 `const` means a variable can't change — True or False?

**Answer:**  
**Partially True — it's a common misconception.**

- `const` prevents **reassigning the variable** (changing what it points to).
- `const` does **NOT** prevent **mutating the contents** of an object or array.

```typescript
const user = { name: 'Vikas', age: 25 };

user.age = 26;          // ✅ Allowed — mutating a property
user.name = 'Harsh';    // ✅ Allowed — mutating a property

user = { name: 'New' }; // ❌ Error — cannot reassign the variable
```

---

### Q25. 🔴 Does TypeScript remove types at runtime?

**Answer:**  
**Yes.** TypeScript types exist **only at compile time**. When TypeScript compiles to JavaScript, all type annotations are completely removed. At runtime (in Node.js or the browser), there are no TypeScript types.

```typescript
// TypeScript (compile time)
let name: string = 'Vikas';

// Compiled JavaScript (runtime) — type annotation stripped
let name = 'Vikas';
```

This is why `typeof` is needed at runtime to check types — TypeScript cannot protect you from runtime type issues.

---

### Q26. 🔴 What happens if you declare a variable without a value and without a type annotation?

**Answer:**  
TypeScript gives it the type `any` implicitly (when `noImplicitAny` is off), or shows an error (when `noImplicitAny` is on, which is enabled by `"strict": true`).

```typescript
let x;          // TypeScript infers type: 'any' implicitly
x = 'hello';   // fine
x = 42;        // fine — no type safety!

// With strict mode ON (recommended):
let y;          // ❌ Error: Variable 'y' implicitly has an 'any' type.
```

> **Lesson:** Always give your variables either a type annotation or an initial value.

---

### Q27. 🔴 Can two `Symbol` values with the same description ever be equal?

**Answer:**  
**No.** Every `Symbol()` call creates a **completely unique value**, even if you use the same description string.

```typescript
let id1: symbol = Symbol('id');
let id2: symbol = Symbol('id');

console.log(id1 === id2); // false — ALWAYS unique, even with same description
console.log(id1 == id2);  // false
```

The description string is only for **debugging purposes** — it has no effect on equality.

---

### Q28. 🔴 Is `let` hoisted like `var`?

**Answer:**  
`let` (and `const`) **are hoisted** to the top of their block, but they are placed in a **Temporal Dead Zone (TDZ)** — they exist in memory but cannot be accessed before their declaration line.

```typescript
// var — hoisted and accessible (returns undefined)
console.log(a); // undefined (no error!)
var a = 10;

// let — hoisted but in Temporal Dead Zone
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

---

### Q29. 🔴 What is the output of this code?

```typescript
const arr: number[] = [1, 2, 3];
arr.push(4);
console.log(arr);
```

**Answer:**  
`[1, 2, 3, 4]` — **No error.**

`const` only prevents reassigning `arr` to a new array. It does NOT prevent modifying the array's contents (pushing, popping, etc.).

```typescript
arr = [5, 6]; // ❌ Error — this would fail (reassignment)
arr.push(4);  // ✅ Fine — this only mutates the existing array
```

---

### Q30. 🔴 What is the difference between these two `const` declarations?

```typescript
const name1: string = 'Vikas';   // A
const name2 = 'Vikas';           // B
```

**Answer:**  
Both are functionally identical. The **only difference is style**:

- `A` uses an **explicit type annotation** — you are telling TypeScript the type.
- `B` uses **type inference** — TypeScript figures out it's a `string` automatically.

TypeScript infers `name2` as the **literal type** `'Vikas'` (not just `string`), which is actually more specific. Both work the same in practice.

---

## ⚡ Section 7: Quick Fire Round

| Question | Answer |
|----------|--------|
| Can you use `var` in TypeScript? | ✅ Yes, but ⛔ avoid it |
| What type does `typeof null` return? | `"object"` (JavaScript bug!) |
| Is TypeScript type information available at runtime? | ❌ No — stripped at compile time |
| What suffix creates a `bigint` literal? | `n` — e.g., `10n` |
| What does `===` check that `==` does not? | Type AND value (strict equality) |
| Can `const` objects have their properties changed? | ✅ Yes — only reassignment is blocked |
| What naming convention do files use? | `kebab-case` (e.g., `login-page.ts`) |
| What naming convention do classes use? | `PascalCase` |
| What naming convention do variables use? | `camelCase` |
| Should you add `I` prefix to interfaces? | ❌ No — not in modern TypeScript |
| What is the TDZ? | Temporal Dead Zone — `let`/`const` hoisted but inaccessible before declaration |
| Is `null == undefined` true? | ✅ Yes (loose equality) |
| Is `null === undefined` true? | ❌ No (strict equality — different types) |
| What is the default type of an untyped variable? | `any` (implicit) |
| Can two `Symbol('id')` values be equal? | ❌ Never — always unique |

---

## 💡 Tips for Answering in Interviews

1. **Always give a code example** — interviewers love to see you back up your words with code.
2. **Mention the gotcha** — e.g., for `const`, mention that objects/arrays are still mutable.
3. **Compare opposites** — `null vs undefined`, `any vs unknown`, `let vs const`.
4. **Use real-world context** — mention Playwright/automation examples where relevant.
5. **Be honest if unsure** — say *"I believe it works like X, but let me think through the edge cases"*.

---

*Part of the TypeScript + Playwright Learning Series — Day 1*
