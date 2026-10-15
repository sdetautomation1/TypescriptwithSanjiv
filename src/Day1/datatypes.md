# 📘 Day 1 - Data Types in TypeScript

TypeScript is a **strongly typed** language — every variable has a type, and TypeScript enforces it at compile time (before your code runs). This catches bugs early and makes your code much safer.

---

## Overview: TypeScript Data Types

```
TypeScript Data Types
│
├── Primitive Types (stored by VALUE)
│   ├── number
│   ├── string
│   ├── boolean
│   ├── null
│   ├── undefined
│   ├── bigint
│   └── symbol
│
└── Non-Primitive / Reference Types (stored by REFERENCE)
    ├── object
    ├── array
    ├── tuple
    ├── enum
    ├── any
    ├── unknown
    └── never / void
```

---

## 1. `number` — All Numeric Values

TypeScript has **one** number type for both integers and decimals (unlike Java which has `int`, `float`, `double`).

```typescript
let a: number = 10;         // integer
let price: number = 99.99;  // decimal / float
let negative: number = -5;  // negative number
let hex: number = 0xFF;     // hexadecimal

console.log(a); // 10
```

> 💡 Use `number` for timeouts, counts, prices, ages — anything numeric.

---

## 2. `string` — Text Data

A string holds any **text** value. You can use single quotes, double quotes, or backticks.

```typescript
let studentName: string = 'Harsh Zavery';   // single quotes
let city: string = "Mumbai";                 // double quotes
let greeting: string = `Hello, ${studentName}!`; // template literal (backticks)

console.log(studentName); // Harsh Zavery
console.log(greeting);    // Hello, Harsh Zavery!
```

| Quote Style | Syntax | Use For |
|-------------|--------|---------|
| Single `'` | `'text'` | Regular strings |
| Double `"` | `"text"` | Regular strings |
| Backtick `` ` `` | `` `Hello ${name}` `` | Template literals with variables |

---

## 3. `boolean` — True or False

A boolean can only be **one of two values**: `true` or `false`.

```typescript
let isMarried: boolean = true;
let isHeadless: boolean = false;

console.log(isMarried); // true

// Often used in conditions:
if (isMarried) {
    console.log('Married');
} else {
    console.log('Single');
}
```

> 💡 In automation: `isHeadless`, `isPassed`, `isLoggedIn`, `isVisible` are all booleans.

---

## 4. `null` — Intentionally Empty

`null` means a variable has been **deliberately set to have no value**. It represents the intentional absence of a value.

```typescript
let cart: null = null;

console.log(cart); // null
console.log(typeof cart); // "object"  ← a famous JavaScript quirk!
```

> ⚠️ `typeof null` returns `"object"` — this is a well-known JavaScript bug that TypeScript inherits. Just be aware of it.

**When to use `null`:**
- Shopping cart with no items yet
- A user profile with no profile picture uploaded
- An API response field that is explicitly absent

---

## 5. `undefined` — Not Yet Assigned

`undefined` means a variable has been **declared but not yet given a value**.

```typescript
let product: undefined = undefined;

let score: number; // declared, but no value assigned yet
console.log(score); // undefined (TypeScript will warn about this!)

console.log(product); // undefined
```

### `null` vs `undefined` — What's the Difference?

| | `null` | `undefined` |
|--|--------|-------------|
| **Meaning** | Intentionally empty | Not yet given a value |
| **Set by** | Developer (on purpose) | JavaScript engine (by default) |
| **Example** | `let cart = null` (empty cart) | `let score` (not calculated yet) |
| **`typeof`** | `"object"` ⚠️ | `"undefined"` |

```typescript
console.log(null == undefined);  // true  (loose equality)
console.log(null === undefined); // false (strict equality — different types!)
```

---

## 6. `bigint` — Very Large Integers

`bigint` is used when you need numbers **larger than `Number.MAX_SAFE_INTEGER`** (larger than 9 quadrillion). Add `n` at the end of the number.

```typescript
let b: bigint = 10000000n;             // bigint literal (note the 'n')
let largeId: bigint = 9007199254740992n;

console.log(b); // 10000000n

// Regular number max safe integer:
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```

> 💡 When to use `bigint`: database IDs, financial calculations, cryptography, large unique IDs.

> ⚠️ You **cannot** mix `bigint` and `number` directly:
> ```typescript
> let result = b + 10; // ❌ Error: Cannot mix BigInt and other types
> let result = b + 10n; // ✅ Correct
> ```

---

## 7. `symbol` — Unique Identifiers

A `symbol` creates a **guaranteed unique value**, even if two symbols have the same description.

```typescript
let id1: symbol = Symbol('id');
let id2: symbol = Symbol('id');

console.log(id1 === id2); // false — always unique!
```

> 💡 Rarely used in everyday automation — more common in advanced library development.

---

## All Primitives — Quick Comparison

```typescript
let a: number    = 10;                 // numeric value
let studentName: string  = 'Harsh Zavery'; // text
let isMarried: boolean = true;         // true/false
let cart: null     = null;             // intentionally empty
let product: undefined = undefined;   // not yet assigned
let b: bigint    = 10000000n;          // very large integer
let uid: symbol   = Symbol('uid');    // always unique
```

---

## Type Checking at Runtime — `typeof`

You can check a variable's type at runtime using the `typeof` operator:

```typescript
let a: number = 10;
let studentName: string = 'Harsh';
let isMarried: boolean = true;

console.log(typeof a);           // "number"
console.log(typeof studentName); // "string"
console.log(typeof isMarried);   // "boolean"
console.log(typeof null);        // "object" ⚠️ JS quirk
console.log(typeof undefined);   // "undefined"
console.log(typeof 10n);         // "bigint"
```

---

## Quick Reference Card

| Type | Example | `typeof` result | Use Case |
|------|---------|-----------------|----------|
| `number` | `let a: number = 10` | `"number"` | Age, price, timeout |
| `string` | `let name: string = 'Harsh'` | `"string"` | Names, messages, URLs |
| `boolean` | `let married: boolean = true` | `"boolean"` | Flags, conditions |
| `null` | `let cart: null = null` | `"object"` ⚠️ | Intentional empty value |
| `undefined` | `let x: undefined = undefined` | `"undefined"` | Uninitialized variable |
| `bigint` | `let b: bigint = 10n` | `"bigint"` | Very large numbers |
| `symbol` | `let s = Symbol('id')` | `"symbol"` | Unique identifiers |

---

## Summary

- TypeScript's type system catches errors **before** your code runs.
- **7 primitive types**: `number`, `string`, `boolean`, `null`, `undefined`, `bigint`, `symbol`.
- Use **explicit type annotations** (`: number`) for clarity, or let TypeScript **infer** the type automatically.
- `null` = intentionally empty | `undefined` = not yet assigned.
- `bigint` is for numbers too large for the regular `number` type — add `n` suffix.

---

*Part of the TypeScript + Playwright Learning Series — Day 1*
