# 🎯 TypeScript — Sets & Maps | Day 5 Interview Q&A

> Covers: Set & Map creation, generics, core methods, iteration gotchas, reference equality traps, Set theory operations, ReadonlySet/Map, WeakSet/WeakMap, and Playwright automation scenarios.
> Difficulty: 🟢 Basic → 🟡 Intermediate → 🔴 Tricky / Advanced

---

## 🟢 BASIC QUESTIONS

---

### Q1. What is a `Set` in TypeScript and how does it differ from an Array?

**Answer:**
A `Set` is an ES6 collection of **unique values**. Unlike an Array:
1. **No duplicates allowed:** Adding a duplicate value is silently ignored.
2. **No index-based access:** You cannot do `set[0]`. Elements are accessed by existence check (`.has()`) or iteration (`for...of`).
3. **Faster lookup:** Checking if a value exists using `set.has(val)` runs in **$O(1)$** average time, compared to `array.includes(val)` which runs in **$O(n)$** linear time.
4. **Maintains insertion order:** Iterating through a Set yields items in the exact order they were inserted.

```typescript
// Array — allows duplicates, slow lookup
let arr: number[] = [10, 20, 20, 30];
console.log(arr.length); // 4

// Set — rejects duplicates, fast O(1) lookup
let set: Set<number> = new Set([10, 20, 20, 30]);
console.log(set.size);   // 3 (duplicate 20 was removed)
console.log(set.has(20)); // true (instant lookup)
```

---

### Q2. What is a `Map` in TypeScript and how does it differ from a plain JavaScript Object?

**Answer:**
A `Map` is an ES6 collection of **key-value pairs**. While plain objects (`{}`) are also key-value stores, `Map` provides major advantages:

| Feature | `Map` | Plain Object (`{}`) |
| :--- | :--- | :--- |
| **Key Types** | **Any type** (primitives, objects, functions, arrays) | Only `string` or `symbol` |
| **Duplicate Keys** | Overwrites the value | Overwrites the value |
| **Insertion Order** | **Guaranteed** insertion order | Mostly preserved, but numeric keys are sorted first |
| **Size Determination** | Direct `.size` property | Requires `Object.keys(obj).length` ($O(n)$) |
| **Performance** | Optimized for frequent addition and deletion | Not optimized for frequent mutations |
| **Default Keys** | Clean — contains only entries you add | Inherits prototype keys (unless `Object.create(null)`) |
| **Iteration** | Directly iterable (`for...of`, `.entries()`) | Requires `Object.keys()` or `Object.entries()` |

```typescript
// Object keys are always converted to strings:
let obj: Record<any, string> = {};
let keyObj = { id: 1 };
obj[keyObj as any] = 'Test';
console.log(Object.keys(obj)); // ['[object Object]'] — key was stringified!

// Map preserves the exact key identity:
let map = new Map<object, string>();
map.set(keyObj, 'Test');
console.log(map.get(keyObj)); // 'Test' — actual object reference preserved
```

---

### Q3. How do you declare and initialize a Set and a Map with TypeScript Generics?

**Answer:**
TypeScript provides generic types `Set<T>` and `Map<K, V>`.

```typescript
// 1. Initializing an empty Set
let roles = new Set<string>();
roles.add('Admin');
roles.add('Tester');

// 2. Initializing a Set with initial values (from an Array)
let scores: Set<number> = new Set([100, 95, 88, 100]); // duplicate 100 removed

// 3. Initializing an empty Map
let userCache = new Map<string, number>();
userCache.set('admin', 101);

// 4. Initializing a Map with an array of [key, value] tuples
let statusCodes = new Map<number, string>([
  [200, 'OK'],
  [404, 'Not Found'],
  [500, 'Internal Server Error']
]);
```

---

### Q4. What are the core methods of `Set` and what do they return?

**Answer:**

| Method / Property | Description | Return Value |
| :--- | :--- | :--- |
| `set.add(value)` | Adds `value` to the Set | Returns the **Set itself** (allows chaining) |
| `set.has(value)` | Checks if `value` exists | `boolean` (`true` or `false`) |
| `set.delete(value)` | Removes `value` from Set | `boolean` (`true` if found & deleted, `false` otherwise) |
| `set.clear()` | Removes all elements | `void` |
| `set.size` | Returns count of unique items | `number` (Property, not a method!) |

```typescript
let set = new Set<string>();

// Chaining works because add() returns 'this'
set.add('Chrome').add('Firefox').add('WebKit');

console.log(set.has('Firefox')); // true
console.log(set.delete('Opera')); // false (didn't exist)
console.log(set.delete('Chrome')); // true
console.log(set.size);           // 2
set.clear();
console.log(set.size);           // 0
```

---

### Q5. What are the core methods of `Map` and what do they return?

**Answer:**

| Method / Property | Description | Return Value |
| :--- | :--- | :--- |
| `map.set(key, val)` | Stores `val` under `key` | Returns the **Map itself** (allows chaining) |
| `map.get(key)` | Retrieves value for `key` | Value if found, or `undefined` if missing |
| `map.has(key)` | Checks if `key` exists | `boolean` (`true` or `false`) |
| `map.delete(key)` | Removes entry by `key` | `boolean` (`true` if deleted, `false` otherwise) |
| `map.clear()` | Removes all entries | `void` |
| `map.size` | Total number of entries | `number` (Property, not a method!) |

```typescript
let env = new Map<string, string>();

env.set('env', 'staging').set('browser', 'chromium'); // Chaining

console.log(env.get('env'));      // 'staging'
console.log(env.get('nonExistent')); // undefined
console.log(env.has('browser'));  // true
console.log(env.delete('env'));   // true
console.log(env.size);            // 1
```

---

### Q6. What happens when you add an existing element to a `Set` or set an existing key in a `Map`?

**Answer:**
- **In a Set:** Adding a duplicate value is **silently ignored**. No error is thrown, the existing item remains unchanged, and `.size` stays the same.
- **In a Map:** Setting an existing key **overwrites the previous value**. `.size` stays the same because no new key was created.

```typescript
// Set:
let tags = new Set<string>(['qa', 'dev']);
tags.add('qa');
console.log(tags.size); // Still 2 — duplicate 'qa' ignored

// Map:
let configs = new Map<string, number>();
configs.set('timeout', 5000);
configs.set('timeout', 10000); // Overwrites 5000
console.log(configs.get('timeout')); // 10000
console.log(configs.size);           // 1 (not 2)
```

---

### Q7. How do you iterate through a `Set`? Name all patterns.

**Answer:**
There are four common ways to iterate a Set:

```typescript
let fruits = new Set<string>(['Apple', 'Banana', 'Mango']);

// 1. for...of loop (Most idiomatic)
for (let fruit of fruits) {
  console.log(fruit);
}

// 2. set.forEach()
fruits.forEach((value) => {
  console.log(value);
});

// 3. set.values() iterator
for (let val of fruits.values()) {
  console.log(val);
}

// 4. Spread operator into an Array (for map/filter)
[...fruits].map(f => console.log(f.toUpperCase()));
```

> **Note:** In Sets, `set.keys()` is an alias for `set.values()`. Both return the set's values because Sets do not have distinct keys.

---

### Q8. How do you iterate through a `Map`? Name all patterns.

**Answer:**

```typescript
let fruitStock = new Map<string, number>([
  ['Apple', 50],
  ['Banana', 120],
  ['Orange', 75]
]);

// 1. Direct for...of with Tuple destructuring (Default entries iterator)
for (let [fruit, count] of fruitStock) {
  console.log(`${fruit}: ${count}`);
}

// 2. map.entries()
for (let [fruit, count] of fruitStock.entries()) {
  console.log(fruit, count);
}

// 3. map.keys() — keys only
for (let fruit of fruitStock.keys()) {
  console.log(fruit);
}

// 4. map.values() — values only
for (let count of fruitStock.values()) {
  console.log(count);
}

// 5. map.forEach()
fruitStock.forEach((value, key) => {
  console.log(`${key} -> ${value}`);
});
```

---

### Q9. What does `map.get(key)` return when the key does not exist? How should you safely check for key presence?

**Answer:**
`map.get(key)` returns `undefined` if the key does not exist.

⚠️ **Common Trap:** Never rely on `if (map.get(key))` to check if a key exists! If the stored value is `false`, `0`, `""`, or `null`, the truthiness check will fail even though the key is present.

```typescript
let flags = new Map<string, boolean>();
flags.set('headless', false);

// ❌ WRONG — false is treated as missing:
if (flags.get('headless')) {
  // Won't run, even though 'headless' is explicitly stored!
}

// ✅ CORRECT — Use map.has():
if (flags.has('headless')) {
  console.log('Flag is configured:', flags.get('headless')); // false
}
```

---

### Q10. How do you remove all duplicates from an array using `Set` in TypeScript?

**Answer:**
Convert the array to a `Set` (which strips duplicates), then spread it back into a new array:

```typescript
let numbers: number[] = [1, 2, 2, 3, 4, 4, 4, 5];

// Method 1: Spread syntax (most popular)
let uniqueNumbers: number[] = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// Method 2: Array.from()
let uniqueArray: number[] = Array.from(new Set(numbers));
```

**Interview Follow-up:**
- **Time Complexity:** $O(n)$ because inserting $n$ elements into a Set takes $O(1)$ each on average.
- **Comparison:** This is dramatically faster than `arr.filter((v, i) => arr.indexOf(v) === i)` which runs in $O(n^2)$.

---

## 🟡 INTERMEDIATE QUESTIONS

---

### Q11. What is the signature trap in `map.forEach()` vs `for...of` destructuring?

**Answer:**
In `map.forEach((value, key, map) => ...)`, **`value` comes FIRST and `key` comes SECOND!**

In contrast, when destructuring in a `for...of` loop: `for (let [key, value] of map) { ... }`, **`key` comes FIRST and `value` comes SECOND!**

```typescript
let userRoles = new Map<number, string>([
  [101, 'Admin'],
  [102, 'QA']
]);

// forEach: (VALUE, KEY)
userRoles.forEach((val, key) => {
  console.log(`Key is ${key}, Value is ${val}`);
});

// for...of: [KEY, VALUE]
for (let [key, val] of userRoles) {
  console.log(`Key is ${key}, Value is ${val}`);
}
```

**Why is `forEach` designed this way?**
To remain consistent with `Array.prototype.forEach((item, index, array) => ...)`, where the element value is always passed as the first parameter.

---

### Q12. Can you use objects or arrays as keys in a `Map`? How does equality work?

**Answer:**
**Yes!** Unlike plain objects (which coerce all keys to strings), a `Map` supports keys of any type, including objects, arrays, and functions.

Equality is evaluated based on **reference identity** (using JavaScript's `SameValueZero` algorithm), NOT structural/value equality.

```typescript
let user1 = { id: 1 };
let user2 = { id: 1 }; // Same content, DIFFERENT reference in memory

let sessions = new Map<object, string>();
sessions.set(user1, 'Session_Active');

console.log(sessions.get(user1)); // 'Session_Active'
console.log(sessions.get(user2)); // undefined ⚠️ (user2 is a different reference!)
console.log(sessions.get({ id: 1 })); // undefined ⚠️ (new object reference!)
```

> **Takeaway:** To retrieve a value stored under an object key, you must pass the **exact same object reference** that was used to set it.

---

### Q13. How do you implement Set operations (Union, Intersection, Difference) in TypeScript?

**Answer:**
Using the Spread operator (`...`) and array methods:

```typescript
const setA = new Set<number>([1, 2, 3, 4]);
const setB = new Set<number>([3, 4, 5, 6]);

// 1. UNION: All unique elements from both sets
const union = new Set<number>([...setA, ...setB]);
console.log([...union]); // [1, 2, 3, 4, 5, 6]

// 2. INTERSECTION: Elements present in BOTH sets
const intersection = new Set<number>([...setA].filter(x => setB.has(x)));
console.log([...intersection]); // [3, 4]

// 3. DIFFERENCE: Elements in A that are NOT in B (A \ B)
const difference = new Set<number>([...setA].filter(x => !setB.has(x)));
console.log([...difference]); // [1, 2]

// 4. SYMMETRIC DIFFERENCE: Elements in either A or B, but NOT both
const symDifference = new Set<number>([
  ...[...setA].filter(x => !setB.has(x)),
  ...[...setB].filter(x => !setA.has(x))
]);
console.log([...symDifference]); // [1, 2, 5, 6]
```

---

### Q14. What are `ReadonlySet<T>` and `ReadonlyMap<K, V>` in TypeScript?

**Answer:**
`ReadonlySet<T>` and `ReadonlyMap<K, V>` are TypeScript built-in types that strip away all mutating methods (`add()`, `set()`, `delete()`, `clear()`) at compile time.

```typescript
const allowedBrowsers: ReadonlySet<string> = new Set(['chromium', 'firefox', 'webkit']);

allowedBrowsers.has('chromium'); // ✅ OK — read method allowed
console.log(allowedBrowsers.size); // ✅ OK — read property allowed

// ❌ TypeScript Errors:
// allowedBrowsers.add('edge');    // Error: Property 'add' does not exist on type 'ReadonlySet<string>'
// allowedBrowsers.delete('firefox'); // Error: Property 'delete' does not exist on type 'ReadonlySet<string>'
```

**Interview Distinction:**
- `const set = new Set()`: Prevents **reassignment** of the variable `set`, but elements can still be added/deleted.
- `ReadonlySet<T>`: Prevents **mutation of the collection itself**.

---

### Q15. How do you convert a `Map` to a plain Object and vice versa?

**Answer:**

```typescript
// 1. Map -> Object using Object.fromEntries()
const configMap = new Map<string, string>([
  ['browser', 'chrome'],
  ['env', 'qa']
]);

const configObj = Object.fromEntries(configMap);
console.log(configObj); // { browser: 'chrome', env: 'qa' }

// 2. Object -> Map using Object.entries()
const apiHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token_123'
};

const headersMap = new Map<string, string>(Object.entries(apiHeaders));
console.log(headersMap.get('Content-Type')); // 'application/json'
```

> **Restriction:** `Object.fromEntries()` only works seamlessly when Map keys are `string`, `number`, or `symbol`. If the Map has object keys, they will be coerced into `"[object Object]"`.

---

### Q16. How do you create a Map or Set with Union Types in TypeScript?

**Answer:**
You supply a union type to the generic parameter:

```typescript
// Set accepting multiple types
const mixedSet: Set<string | number | boolean> = new Set();
mixedSet.add('Playwright');
mixedSet.add(404);
mixedSet.add(true);
// mixedSet.add({}); // ❌ Compiler error

// Map with union keys and union values
type StatusCode = number | string;
type ResponseData = string | object | boolean;

const responseRegistry = new Map<StatusCode, ResponseData>();
responseRegistry.set(200, { success: true });
responseRegistry.set('404_PAGE_NOT_FOUND', 'Check URL endpoint');
responseRegistry.set(500, false);
```

---

### Q17. How do `WeakSet` and `WeakMap` differ from `Set` and `Map`?

**Answer:**

| Feature | `Set` / `Map` | `WeakSet` / `WeakMap` |
| :--- | :--- | :--- |
| **Allowed Keys / Values** | Any type | **Objects only** (WeakMap keys must be objects; WeakSet values must be objects) |
| **Garbage Collection** | Strong reference — objects are kept alive | **Weak reference** — if no other reference exists, the object is garbage-collected |
| **Iterable?** | Yes (`for...of`, `forEach`) | **No** (cannot be iterated) |
| **Size property?** | Yes (`.size`) | **No** (size cannot be determined) |
| **`.clear()` method?** | Yes | **No** |

**Primary Use Case:**
Preventing memory leaks! For example, tracking DOM elements, metadata about private objects, or caching data without keeping the object alive in memory.

```typescript
let wm = new WeakMap<object, string>();
let buttonElement: object | null = { id: 'submitBtn' };

wm.set(buttonElement, 'clicked_once');
console.log(wm.get(buttonElement)); // 'clicked_once'

buttonElement = null; // buttonElement is now eligible for Garbage Collection!
// The entry in wm will be automatically cleaned up by the engine
```

---

### Q18. How does `Set` compare values internally? Does `===` govern Set membership?

**Answer:**
`Set` and `Map` do **NOT** use strict equality (`===`). They use the **`SameValueZero`** comparison algorithm.

The differences between `===` and `SameValueZero`:
1. **`NaN` comparison:**
   - In `===`: `NaN === NaN` is `false`.
   - In `SameValueZero`: `NaN` is treated as **equal** to `NaN`. Therefore, a Set can contain only **one `NaN`**.
2. **`+0` and `-0` comparison:**
   - Both `===` and `SameValueZero` treat `+0` and `-0` as equal.

```typescript
let set = new Set();
set.add(NaN);
set.add(NaN);
console.log(set.size); // 1 (NaN is treated as equal to NaN!)

set.add(+0);
set.add(-0);
console.log(set.size); // 2 (one NaN, and one 0)
```

---

## 🔴 TRICKY / ADVANCED QUESTIONS (Gotchas & Output Prediction)

---

### Q19. ⚡ What is the output of this code and why?

```typescript
let s = new Set();
s.add({ a: 1 });
s.add({ a: 1 });

console.log(s.size);
```

**Answer:**
```
2
```

**Why?**
Every time an object literal `{ a: 1 }` is evaluated, a **new reference** is allocated in memory. Since `s.add()` compares by reference identity, the two objects have distinct memory addresses (`ref1 !== ref2`). Thus, both are stored as separate items.

**How to make them the same?**
```typescript
let obj = { a: 1 };
s.add(obj);
s.add(obj);
console.log(s.size); // 1 (same reference)
```

---

### Q20. ⚡ What is the output of this code and why?

```typescript
let map = new Map<object, string>();
map.set({ id: 101 }, 'John Doe');

console.log(map.get({ id: 101 }));
```

**Answer:**
```
undefined
```

**Why?**
`{ id: 101 }` in `map.get()` creates a brand-new object with a different memory pointer than the one passed to `map.set()`. Because `Map` checks keys by reference, it cannot find the new object key.

---

### Q21. ⚡ What is the output of this code?

```typescript
let mySet = new Set([1, 2, 3]);

mySet.forEach((val1, val2) => {
  console.log(val1 === val2);
});
```

**Answer:**
```
true
true
true
```

**Why?**
For compatibility with `Map.prototype.forEach` and `Array.prototype.forEach`, `Set.prototype.forEach` passes `(value, key, set)`. Since Sets have no keys, JavaScript passes the **same value for both the first and second arguments**!

---

### Q22. ⚡ What is the output of this code?

```typescript
let testData = new Map<string, number>();

let result = testData.set('a', 1).set('b', 2).delete('a');
console.log(result);
console.log(testData.size);
```

**Answer:**
```
true
1
```

**Why?**
- `testData.set('a', 1)` returns `testData` (the Map instance).
- `.set('b', 2)` returns `testData` again.
- `.delete('a')` removes `'a'` and returns a **boolean** (`true`).
- Therefore, `result` holds `true`, and `testData` has only `'b'` left (`size: 1`).

---

### Q23. ⚡ What does TypeScript do here? Is this a compile error or valid?

```typescript
let userSet = new Set<string>(['admin', 'guest']);

// @ts-ignore for testing runtime
userSet[0]; 
```

**Answer:**
TypeScript will show a compile error:
`Element implicitly has an 'any' type because type 'Set<string>' has no index signature.`

Sets are **not indexable**. Attempting `userSet[0]` in JavaScript returns `undefined`.

**How to get the first element of a Set?**
```typescript
// Option 1: Iteration using next()
const first = userSet.values().next().value; // 'admin'

// Option 2: Destructuring
const [firstItem] = userSet; // 'admin'
```

---

### Q24. ⚡ What is the output of this code?

```typescript
let m = new Map();
m.set('count', 0);

console.log(m.has('count'));
console.log(m.get('count') ? 'Yes' : 'No');
```

**Answer:**
```
true
No
```

**Why?**
`m.has('count')` checks whether the key exists, which is `true`.
However, `m.get('count')` returns `0`, which is a **falsy** value in JavaScript. Thus, the ternary operator evaluates to `'No'`.
Always use `.has()` to check for the presence of a key!

---

### Q25. ⚡ What is the output of this code?

```typescript
let set = new Set(['1', 1]);
console.log(set.size);

let map = new Map();
map.set('1', 'string one');
map.set(1, 'number one');
console.log(map.size);
console.log(map.get('1'));
console.log(map.get(1));
```

**Answer:**
```
2
2
string one
number one
```

**Why?**
Neither Set nor Map performs type coercion (unlike plain object property access which turns `1` into `'1'`). `'1'` (string) and `1` (number) are distinct data types and are treated as separate entries.

---

### Q26. ⚡ Can you modify a Set while iterating over it with `for...of`? What happens?

```typescript
let numbers = new Set([1, 2]);

for (let n of numbers) {
  if (n === 2) {
    numbers.add(3);
  }
  console.log(n);
}
```

**Answer:**
```
1
2
3
```

**Why?**
In JavaScript/TypeScript, Sets iterate in insertion order. If you add a new element to a Set during a `for...of` loop, the iterator **will visit the newly added element** before terminating!

*(Be careful: continuously adding elements inside the loop will cause an **infinite loop**).*

---

### Q27. ⚡ What is the difference between `new Set(string)` and `new Set([string])`?

```typescript
let setA = new Set('hello');
let setB = new Set(['hello']);

console.log(setA);
console.log(setB);
```

**Answer:**
```
Set(4) { 'h', 'e', 'l', 'o' }
Set(1) { 'hello' }
```

**Why?**
The `Set` constructor accepts any **Iterable**:
- A string is iterable character by character. `new Set('hello')` splits into individual characters `['h', 'e', 'l', 'l', 'o']`, removes the duplicate `'l'`, leaving 4 elements.
- An array `['hello']` has 1 string element, so `setB` contains just the single string `'hello'`.

---

## 🎭 AUTOMATION & PLAYWRIGHT CONTEXT QUESTIONS

---

### Q28. How would you use a `Set` to verify that all links or dropdown options on a web page are unique?

**Answer:**
```typescript
import { test, expect, Page } from '@playwright/test';

test('Verify dropdown options have no duplicates', async ({ page }: { page: Page }) => {
  await page.goto('https://example.com/form');

  // Extract all dropdown option texts
  const options: string[] = await page.locator('select#country option').allTextContents();

  // If the array length equals the Set size, all items are unique!
  const uniqueOptions = new Set(options);

  expect(uniqueOptions.size).toBe(options.length);
});
```

**Explanation:**
If there are 50 options in the dropdown and 2 are identical, `options.length` will be 50, but `uniqueOptions.size` will be 49. Comparing the two in one line asserts uniqueness.

---

### Q29. How would you use a `Set` in a web crawler to prevent visiting the same page twice (circular links)?

**Answer:**
```typescript
import { Page } from '@playwright/test';

async function crawlSite(startUrl: string, page: Page) {
  const visitedUrls = new Set<string>();
  const queue: string[] = [startUrl];

  while (queue.length > 0) {
    const currentUrl = queue.shift()!;

    // O(1) duplicate check
    if (visitedUrls.has(currentUrl)) {
      continue;
    }

    visitedUrls.add(currentUrl);
    console.log(`Crawling: ${currentUrl}`);
    await page.goto(currentUrl);

    // Extract new links
    const links: string[] = await page.locator('a').evaluateAll(
      anchors => anchors.map(a => (a as HTMLAnchorElement).href)
    );

    for (const link of links) {
      if (link.startsWith('https://myapp.com') && !visitedUrls.has(link)) {
        queue.push(link);
      }
    }
  }

  console.log(`Finished crawling ${visitedUrls.size} unique pages.`);
}
```

---

### Q30. How would you use a `Map` to manage environment-specific credentials or test configurations?

**Answer:**
```typescript
type Environment = 'dev' | 'staging' | 'prod';

interface EnvConfig {
  baseUrl: string;
  adminUser: string;
  timeout: number;
}

const envRegistry = new Map<Environment, EnvConfig>([
  ['dev', { baseUrl: 'https://dev.app.com', adminUser: 'dev_admin', timeout: 30000 }],
  ['staging', { baseUrl: 'https://staging.app.com', adminUser: 'stage_admin', timeout: 45000 }],
  ['prod', { baseUrl: 'https://app.com', adminUser: 'prod_read_only', timeout: 60000 }]
]);

function getTestConfig(env: Environment): EnvConfig {
  const config = envRegistry.get(env);
  if (!config) {
    throw new Error(`Environment '${env}' is not configured!`);
  }
  return config;
}
```

---

### Q31. How would you use a `Map` to track failed test retries across a test suite?

**Answer:**
```typescript
class TestRetryTracker {
  private retryCounts = new Map<string, number>();

  recordRetry(testTitle: string): void {
    const current = this.retryCounts.get(testTitle) || 0;
    this.retryCounts.set(testTitle, current + 1);
  }

  getFlakyTests(maxAllowed: number = 2): string[] {
    const flaky: string[] = [];
    for (let [testTitle, count] of this.retryCounts) {
      if (count >= maxAllowed) {
        flaky.push(`${testTitle} (Retried ${count} times)`);
      }
    }
    return flaky;
  }
}
```

---

### Q32. How would you use a `Map` to cache API mock responses and prevent redundant network calls during test execution?

**Answer:**
```typescript
import { Page, Route } from '@playwright/test';

class ApiMockManager {
  private cache = new Map<string, object>();

  registerMock(endpoint: string, mockResponse: object): void {
    this.cache.set(endpoint, mockResponse);
  }

  async setupInterception(page: Page): Promise<void> {
    await page.route('**/api/**', async (route: Route) => {
      const url = route.request().url();

      for (let [endpoint, mockData] of this.cache) {
        if (url.includes(endpoint)) {
          console.log(`[MOCK INTERCEPTED] Serving cached mock for: ${endpoint}`);
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockData)
          });
          return;
        }
      }

      await route.continue();
    });
  }
}
```

---

## ⚡ Quick-Fire Round

| # | Question | Quick Answer |
|---|:---|:---|
| 1 | Does `Set` allow duplicate values? | **No** — silently ignored |
| 2 | Does `Map` allow duplicate keys? | **No** — overwrites the value |
| 3 | Does `Map` allow duplicate values? | **Yes** |
| 4 | What is the time complexity of `set.has()`? | **$O(1)$** average time |
| 5 | What is the time complexity of `array.includes()`? | **$O(n)$** linear time |
| 6 | Can an Object be used as a key in a `Map`? | **Yes** (reference identity used) |
| 7 | Can an Object be used as a key in a plain `{}`? | **No** — coerced to `"[object Object]"` |
| 8 | Does `Set` maintain insertion order? | **Yes**, guaranteed |
| 9 | What does `set.keys()` return? | An iterator of **values** (same as `.values()`) |
| 10 | In `map.forEach(cb)`, what is argument 1? | **Value** (`(value, key, map)`) |
| 11 | How to get element count of a Set or Map? | `.size` (property, not a method) |
| 12 | What does `map.get('missing')` return? | `undefined` |
| 13 | How does Set compare `NaN`? | `NaN` equals `NaN` (only one `NaN` in a Set) |
| 14 | Can `Set` elements be accessed via index like `set[0]`? | **No** |
| 15 | What is `ReadonlySet<T>`? | A compile-time type without mutation methods |
| 16 | Can you store `null` and `undefined` in a Set? | **Yes** (as unique values) |
| 17 | Can `WeakMap` keys be strings or numbers? | **No** — objects only |
| 18 | What does `map.set()` return? | The **Map instance** itself (enables chaining) |

---

## 💡 Interview Tips for Day 5

1. **The $O(1)$ vs $O(n)$ Selling Point:**
   - Whenever an interviewer asks how to search or deduplicate, always highlight: *"A Set provides $O(1)$ constant time lookup, whereas an Array requires $O(n)$ linear traversal."*

2. **Always Call Out the Reference Identity Trap:**
   - If an interviewer asks: *"What does `map.get({ id: 1 })` return?"*, smile and immediately answer: *"Undefined! Because object literals create new references in memory. To look up an object key, you must keep and pass the exact reference."*

3. **Remember `forEach` Argument Order:**
   - Point out proactively: *"In `Map.prototype.forEach`, value is the first parameter and key is the second, following JavaScript's `(item, index)` convention."*

4. **Deduplication Formula:**
   - Write `[...new Set(arr)]` with confidence. Mention that it is clean, modern, and runs in $O(n)$ time.

5. **`has()` over Truthiness:**
   - Explain why checking `if (map.get(key))` is dangerous for falsy values like `0`, `false`, or `""`, and emphasize that `map.has(key)` is the only robust check.

6. **Connect Collections to Automation:**
   - Mention real test automation use cases:
     - Use `Set` to verify dropdown uniqueness and track visited crawler URLs.
     - Use `Map` for API response mocking, browser context page storage, and environment credential configuration.

---

*Day 5 — Sets & Maps Interview Q&A | Part of the TypeScript Learning Series*
