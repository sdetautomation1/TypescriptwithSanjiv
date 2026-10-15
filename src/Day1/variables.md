# 📘 Day 1 - Variables in TypeScript

> **Shortcuts Learned:**
> - `F2` → Rename a file
> - `Ctrl + L` → Open Agent
> - Type `log` + `Tab/Enter` → Auto-complete `console.log()`

---

## What is a Variable?

A variable is a **named container** that stores a value in memory so you can use and reuse it in your program.

**Format / Syntax:**
```
keyword variableName: type = value;
```

---

## 1. Declaration Keywords

TypeScript (and modern JavaScript) provides **3 keywords** to declare variables:

| Keyword | Reassignable? | Scope | Recommendation |
|---------|:---:|-------|----------------|
| `let` | ✅ Yes | Block-scoped | ✅ Use when value will change |
| `const` | ❌ No | Block-scoped | ✅ **Default choice** — value stays fixed |
| `var` | ✅ Yes | Function-scoped | ⛔ Avoid — outdated, causes bugs |

---

## 2. `let` — Reassignable Variable

Use `let` when the value **needs to change** over time.

```typescript
let studentName = 'Vikas';
console.log(studentName); // Vikas

studentName = 'Ravi'; // ✅ Allowed — value can be updated
console.log(studentName); // Ravi
```

---

## 3. `const` — Constant (Cannot be Reassigned)

Use `const` when the value **should never change** after being set.

```typescript
const country = 'India';
console.log(country); // India

country = 'Arab'; // ❌ Error: Cannot assign to 'country' because it is a constant.
```

> 💡 **Best Practice:** Always start with `const`. Only switch to `let` if you actually need to change the value later.

---

## 4. `var` — Don't Use It!

`var` is the old way of declaring variables in JavaScript. It has quirky behavior (function scope + hoisting) that causes hard-to-find bugs.

```typescript
var oldStyle = 'Avoid this';   // ⛔ Works, but don't use it
```

**Why avoid `var`?**
- It is **function-scoped**, not block-scoped (leaks out of `if`/`for` blocks)
- It gets **hoisted** (moved to the top of its scope silently)
- `let` and `const` solve both problems

---

## 5. Type Annotations (Optional but Powerful)

TypeScript lets you explicitly declare what **type** a variable holds.

```
keyword   variableName : type     = value;
let       studentName  : string   = 'Vikas';
```

### Primitive Types

| Type | Example | Description |
|------|---------|-------------|
| `string` | `'Vikas'`, `"India"` | Text |
| `number` | `30000`, `1.45` | Integer or decimal |
| `boolean` | `true`, `false` | True or false only |
| `null` | `null` | Intentionally empty |
| `undefined` | `undefined` | Not yet assigned |

```typescript
let testEnvironment: string  = 'Staging';
let timeout:         number  = 30000;
let isHeadless:      boolean = true;
```

---

## 6. Type Inference (TypeScript Guesses the Type)

If you assign a value when declaring, TypeScript **automatically infers** the type — you don't need to write it explicitly.

```typescript
let studentName = 'Vikas';  // TypeScript knows this is a string
let retryCount  = 3;        // TypeScript knows this is a number

studentName = 100; // ❌ Error: Type 'number' is not assignable to type 'string'
```

---

## 7. `console.log()` — Print to Terminal

Use `console.log()` to display variable values in the terminal.

```typescript
let studentName = 'Vikas';
const country   = 'India';

console.log(studentName);          // Vikas
console.log(country);              // India
console.log('Name:', studentName); // Name: Vikas

// Template literal — embed variables inside a string using backticks
console.log(`Student ${studentName} is from ${country}`);
// Output: Student Vikas is from India
```

> **Shortcut:** Type `log` and press `Tab` or `Enter` → it auto-expands to `console.log()`

---

## Quick Reference Card

```typescript
// ✅ const — value fixed, cannot change
const country: string = 'India';

// ✅ let — value can change
let studentName: string = 'Vikas';
studentName = 'Ravi'; // OK

// ⛔ var — don't use
var oldWay = 'Avoid';

// 🖨️ Print to terminal
console.log(studentName);
console.log(`Hello, ${studentName}!`);
```

---

## Summary

| Concept | Key Point |
|---------|-----------|
| `const` | Value **cannot** change — use by default |
| `let` | Value **can** change — use when needed |
| `var` | **Avoid** — outdated, block-scope bugs |
| Type annotation | `let name: string = 'Vikas'` |
| Type inference | TypeScript auto-detects type from value |
| `console.log()` | Prints output to the terminal |

---

*Part of the TypeScript + Playwright Learning Series — Day 1*
