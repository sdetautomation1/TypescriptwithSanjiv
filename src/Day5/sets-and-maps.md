# 🗺️ TypeScript — Sets & Maps | Day 5 Study Guide

> **Learning Goal:** Master two powerful TypeScript collection types — `Map` for key-value data storage and `Set` for unique-value collections — with type safety, all methods, iteration patterns, and real automation use cases.

---

## 📌 Why Sets and Maps?

Regular arrays and objects have limitations:

| Problem | Solution |
|---------|----------|
| Arrays allow duplicate values | Use **Set** — stores only unique values |
| Object keys must be strings | Use **Map** — keys can be ANY type |
| No built-in duplicate-key protection | **Map** automatically overwrites on duplicate keys |
| Arrays are slow for existence checks | **Set** has O(1) lookup with `.has()` |

```typescript
// Array — duplicates allowed, lookups are slow (O(n))
let ids = [101, 102, 103, 101]; // 101 appears twice — no protection

// Set — duplicates automatically rejected (O(1) lookup)
let uniqueIds = new Set([101, 102, 103, 101]);
console.log(uniqueIds); // Set(3) {101, 102, 103}  ← duplicate removed
```

---

# PART 1 — MAP

---

## 1. 🔵 What is a Map?

A `Map` is a collection of **key-value pairs** where:
- Keys can be of **any type** (string, number, object, etc.)
- Duplicate keys are **not allowed** — setting the same key overwrites the previous value
- Duplicate values **are allowed**
- Insertion **order is preserved**

---

## 2. 🔵 Creating a Map

### Method 1 — Empty Map, then `set()`

```typescript
let student = new Map<number, string>();

student.set(101, 'Ramesh');
student.set(102, 'Mahesh');
student.set(103, 'Suresh');
student.set(103, 'Vikas'); // Key 103 already exists — OVERWRITES 'Suresh'

console.log(student);
// Map(3) { 101 => 'Ramesh', 102 => 'Mahesh', 103 => 'Vikas' }
```

### Method 2 — Initialise with Tuples (Array of pairs)

```typescript
let fruit = new Map<number, string>([
  [11, 'apple'],
  [12, 'banana'],
  [13, 'Orange'],
  [14, 'Cherry']
]);

console.log(fruit);
// Map(4) { 11 => 'apple', 12 => 'banana', 13 => 'Orange', 14 => 'Cherry' }
```

> Each element in the initialisation array is a `[key, value]` tuple pair.

---

## 3. 🔵 Map Methods — Complete Reference

### `set(key, value)` — Add or Update an Entry

```typescript
let student = new Map<number, string>();

student.set(101, 'Ramesh'); // add new
student.set(101, 'Vikas');  // update existing key
console.log(student); // Map(1) { 101 => 'Vikas' }
```

### `get(key)` — Retrieve a Value by Key

```typescript
let fruit = new Map<number, string>([
  [11, 'apple'], [12, 'banana'], [13, 'Orange'], [14, 'Cherry']
]);

console.log(fruit.get(11)); // apple
console.log(fruit.get(99)); // undefined ← key not found
```

### `has(key)` — Check if a Key Exists (returns boolean)

```typescript
console.log(fruit.has(11)); // true
console.log(fruit.has(99)); // false
```

### `delete(key)` — Remove an Entry by Key

```typescript
fruit.delete(12);
console.log(fruit); // Map(3) { 11 => 'apple', 13 => 'Orange', 14 => 'Cherry' }
```

### `size` — Number of Entries (property, not method)

```typescript
console.log(fruit.size); // 4
```

### `clear()` — Remove All Entries

```typescript
fruit.clear();
console.log(fruit); // Map(0) {}
console.log(fruit.size); // 0
```

---

## 4. 🔵 Iterating a Map — All Patterns

### `values()` — Iterate Values Only

```typescript
for (let i of fruit.values()) {
  console.log(i);
}
// apple
// banana
// Orange
// Cherry
```

### `keys()` — Iterate Keys Only

```typescript
for (let i of fruit.keys()) {
  console.log(i);
}
// 11
// 12
// 13
// 14
```

### Destructuring `[key, value]` — Direct Loop

```typescript
for (let [key, value] of fruit) {
  console.log(key, value);
}
// 11 apple
// 12 banana
// 13 Orange
// 14 Cherry
```

### `entries()` — Explicit Key-Value Pairs

```typescript
for (let [key, value] of fruit.entries()) {
  console.log(key, value);
}
// 11 apple  (same result as above — entries() is the default iterator)
```

### `forEach` — Functional Iteration

```typescript
// Note: forEach gives (value, key) — VALUE comes FIRST!
fruit.forEach((value, key) => console.log(value, key));
// apple 11
// banana 12
// Orange 13
// Cherry 14
```

> ⚠️ **Important:** In `forEach`, the callback receives `(value, key)` — **value comes first**, unlike `for...of [key, value]` destructuring where key comes first.

---

## 5. 🔵 Map with Union Key Types

Keys can be a union of multiple types:

```typescript
let employee = new Map<number | string, string>();

employee.set('A101', 'Rakesh'); // string key
employee.set(100, 'Captain');   // number key

console.log(employee);
// Map(2) { 'A101' => 'Rakesh', 100 => 'Captain' }
```

---

## 6. 🔵 Map vs Object — Key Differences

| Feature              | `Map`                          | `Object`                      |
|----------------------|--------------------------------|-------------------------------|
| Key types            | Any type (number, object, etc.)| String or Symbol only         |
| Duplicate keys       | Overwrites                     | Overwrites                    |
| Insertion order      | Always preserved               | Preserved (mostly, but not guaranteed for integers) |
| Size                 | `.size` property               | `Object.keys(obj).length`     |
| Iteration            | Built-in `.keys()`, `.values()`, `.entries()` | `for...in`, `Object.entries()` |
| Performance          | Better for frequent add/delete | Better for fixed structure    |
| Type safety          | Full TypeScript generics `<K,V>` | Less strict                  |

---

# PART 2 — SET

---

## 7. 🟣 What is a Set?

A `Set` is a collection of **unique values** where:
- **No duplicates** — adding an existing value is silently ignored
- **Any type** of value can be stored
- Insertion **order is preserved**
- **No index** — values are accessed by value, not position

---

## 8. 🟣 Creating a Set

### Method 1 — Empty Set, then `add()`

```typescript
let studentRollNo = new Set<number>();

studentRollNo.add(10);
studentRollNo.add(20);
studentRollNo.add(30);
studentRollNo.add(40);
studentRollNo.add(50);

console.log(studentRollNo);
// Set(5) { 10, 20, 30, 40, 50 }
```

### Method 2 — Initialise with an Array

```typescript
let fruits = new Set(['Banana', 'Apple', 'Mango', 'Avocado', 'Cashew']);

console.log(fruits);
// Set(5) { 'Banana', 'Apple', 'Mango', 'Avocado', 'Cashew' }
```

### Duplicate Handling — Automatic

```typescript
let city = new Set<string>();

city.add('Pune');
city.add('Mumbai');
city.add('Bangalore');
city.add('Pune'); // Already exists — silently ignored!

console.log(city);
// Set(3) { 'Pune', 'Mumbai', 'Bangalore' }
console.log(city.size); // 3
```

---

## 9. 🟣 Set Methods — Complete Reference

### `add(value)` — Add a Value

```typescript
fruits.add('Almond');
console.log(fruits); // Set now includes 'Almond'
```

### `has(value)` — Check if Value Exists (O(1) lookup)

```typescript
console.log(fruits.has('Cashew')); // true
console.log(fruits.has('Mango'));  // true
console.log(fruits.has('Papaya')); // false
```

### `delete(value)` — Remove a Value

```typescript
console.log(fruits.has('Cashew')); // true
fruits.delete('Cashew');
console.log(fruits);               // Set without 'Cashew'
console.log(fruits.has('Cashew')); // false
```

### `size` — Number of Unique Elements

```typescript
console.log(fruits.size); // number of elements
```

### `clear()` — Remove All Values

```typescript
// fruits.clear();
// console.log(fruits); // Set(0) {}
```

---

## 10. 🟣 Iterating a Set — All Patterns

### `for-of` — Direct Value Iteration

```typescript
for (let fruit of fruits) {
  console.log(fruit);
}
// Banana
// Apple
// Mango
// Avocado
// Cashew
```

### `values()` — Explicit Value Iterator

```typescript
for (let fruit of fruits.values()) {
  console.log(fruit);
}
// same output as for-of
```

### `keys()` — In Sets, `keys()` = `values()`

```typescript
for (let fruit of fruits.keys()) {
  console.log(fruit);
}
// same output — Sets have no separate key; key === value
```

### `forEach` — Functional Iteration

```typescript
fruits.forEach(x => console.log(x));
// Banana
// Apple
// Mango
```

---

## 11. 🟣 Set with Union Types

```typescript
const student: Set<string | number | boolean> = new Set();

student.add('Kausar');
student.add(21);
student.add(true);

console.log(student);
// Set(3) { 'Kausar', 21, true }

// Initialise with mixed array
const employee: Set<string | number | boolean> = new Set([101, 'Rahiv', true]);
console.log(employee);
// Set(3) { 101, 'Rahiv', true }
```

---

## 12. 🟣 ReadonlySet — No Mutations Allowed

```typescript
const job: ReadonlySet<string> = new Set([
  'QA', 'BackEndDev', 'AppDev', 'ScrumMaster', 'Release Manager'
]);

console.log(job);
// Set(5) { 'QA', 'BackEndDev', 'AppDev', 'ScrumMaster', 'Release Manager' }

job.add('DevOps');    // TypeScript ERROR — Property 'add' does not exist on ReadonlySet
job.delete('QA');     // TypeScript ERROR — Property 'delete' does not exist on ReadonlySet
job.has('QA');        // OK — reading is allowed
job.size;             // OK — reading is allowed
```

---

## 13. 🟣 Practical Set Operations (Set Theory)

```typescript
let setA = new Set([1, 2, 3, 4, 5]);
let setB = new Set([3, 4, 5, 6, 7]);

// UNION — all elements from both sets
let union = new Set([...setA, ...setB]);
console.log(union); // Set(7) { 1, 2, 3, 4, 5, 6, 7 }

// INTERSECTION — elements in both sets
let intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set(3) { 3, 4, 5 }

// DIFFERENCE — elements in A but NOT in B
let difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // Set(2) { 1, 2 }
```

---

## 14. 🟣 Remove Duplicates from Array using Set

```typescript
let arr: number[] = [1, 2, 2, 3, 3, 3, 4, 5, 5];

let unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4, 5]
```

This is one of the most common interview patterns — convert array to Set (removes duplicates), spread back to array.

---

## 🚀 Quick Comparison — Map vs Set vs Array

| Feature           | `Array`              | `Set`                        | `Map`                        |
|-------------------|----------------------|------------------------------|------------------------------|
| Stores            | Ordered values       | Unique values                | Key-value pairs              |
| Duplicates        | Allowed              | Not allowed                  | Duplicate keys: No; Values: Yes |
| Access by         | Index                | Value (via `has`)            | Key (via `get`)              |
| Key type          | N/A                  | N/A                          | Any type                     |
| Order preserved   | Yes                  | Yes (insertion order)        | Yes (insertion order)        |
| Size              | `.length`            | `.size`                      | `.size`                      |
| Type-safe generic | `T[]` or `Array<T>`  | `Set<T>`                     | `Map<K, V>`                  |
| Readonly          | `readonly T[]`       | `ReadonlySet<T>`             | `ReadonlyMap<K, V>`          |
| Iteration         | `for-of`, `forEach`  | `for-of`, `forEach`, `values()` | `for-of`, `forEach`, `keys()`, `values()`, `entries()` |

---

## 🧠 Key Takeaways

1. **Map** — use when you need **key-value** pairs and keys can be any type (not just strings).
2. **Set** — use when you need **unique values only** — adding duplicates is silently ignored.
3. **Map duplicate keys** → the value is **overwritten**; the size does NOT increase.
4. **Set duplicate values** → the value is **ignored**; the size does NOT increase.
5. **`forEach` on Map** gives `(value, key)` — **value first** — opposite of what you might expect!
6. **`keys()` on Set** behaves the same as `values()` — Sets have no separate key concept.
7. **`has()`** on both Map and Set runs in **O(1)** (constant time) — much faster than `Array.includes()`.
8. **Spread + Set** is the cleanest way to remove duplicates from an array: `[...new Set(arr)]`.
9. **`ReadonlySet`** and **`ReadonlyMap`** prevent all mutations at compile time.
10. Both Map and Set **preserve insertion order** for iteration.

---

## 📝 Practice Exercises

1. Create a `Map<string, number>` of 5 student names and marks. Find and print the mark for a specific student using `.get()`.
2. Add a duplicate key to a Map and observe that the old value is overwritten.
3. Create a Set of city names. Try adding a duplicate and use `.size` to confirm no duplicate was added.
4. Use `for-of` with destructuring `[key, value]` to iterate a Map and print all entries.
5. Remove duplicates from `[1, 2, 2, 3, 4, 4, 5]` using a Set in one line.
6. Create a `ReadonlySet<string>` of job roles. Try `add()` and observe the TypeScript error.
7. Use `forEach` on a Map. Note that the callback receives `(value, key)` — not `(key, value)`.
8. Compute the **union** and **intersection** of two number Sets using spread and `filter`.
9. Build a `Map<string, string[]>` where each key is a team name and the value is an array of member names.
10. Create a union-typed Map `Map<number | string, string>` and add entries with both number and string keys.

---

*Day 5 — Sets & Maps | Part of the TypeScript Learning Series*
