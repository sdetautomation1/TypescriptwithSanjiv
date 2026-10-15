# 📘 Day 1 - Naming Conventions in TypeScript

Naming conventions are **agreed-upon rules** for how to name variables, functions, classes, files, etc.  
Following them makes your code **readable**, **consistent**, and **professional**.

---

## The 4 Main Naming Styles

| Style | Also Called | Pattern | Example |
|-------|-------------|---------|---------|
| **camelCase** | Lower camel case | First word lowercase, rest capitalized | `studentName`, `isMarried` |
| **PascalCase** | Upper camel case | Every word starts with capital | `StudentName`, `TestConfig` |
| **UPPER_SNAKE_CASE** | Screaming snake case | All caps, words joined by `_` | `MAX_TIMEOUT`, `BASE_URL` |
| **kebab-case** | Hyphen case | All lowercase, words joined by `-` | `my-file.ts`, `page-object` |

---

## 1. Variables & Function Parameters → `camelCase`

Variables and parameters always use **camelCase** — start lowercase, capitalize each new word.

```typescript
// ✅ Correct — camelCase
let studentName: string = 'Harsh Zavery';
let isMarried: boolean = true;
let timeoutMs: number = 30000;
let pageLoadTime: number = 1.45;

// ❌ Wrong
let StudentName = 'Harsh';   // PascalCase (reserved for classes/types)
let student_name = 'Harsh';  // snake_case (not TypeScript style)
let STUDENTNAME = 'Harsh';   // UPPER_CASE (reserved for constants)
```

### Boolean Variables — Use a Prefix

Boolean names should **read like a question** — prefix with `is`, `has`, `can`, `should`:

```typescript
let isHeadless: boolean = true;       // ✅ is...
let hasPermission: boolean = false;   // ✅ has...
let canRetry: boolean = true;         // ✅ can...
let shouldSkip: boolean = false;      // ✅ should...

let headless: boolean = true;         // ⚠️ Works, but less readable
let married: boolean = true;          // ⚠️ Ambiguous — is it a boolean?
```

---

## 2. Constants → `UPPER_SNAKE_CASE`

Values that **never change** and are known at the start of the program use ALL_CAPS with underscores.

```typescript
// ✅ Correct — UPPER_SNAKE_CASE for true constants
const MAX_TIMEOUT: number = 30000;
const BASE_URL: string = 'https://demo.playwright.dev';
const MAX_RETRY_COUNT: number = 3;
const DEFAULT_BROWSER: string = 'chromium';

// Regular const (value known at runtime) → still camelCase
const studentName: string = 'Harsh';   // ✅ camelCase is fine here too
```

> 💡 **Rule of thumb:** Use `UPPER_SNAKE_CASE` for **configuration constants** and **magic numbers/strings** that are set once and shared across files.

---

## 3. Functions → `camelCase`

Functions use **camelCase**, and should be named with a **verb** (action word) to describe what they do.

```typescript
// ✅ Correct — verb + noun, camelCase
function loginUser() { }
function getStudentName() { }
function calculateTotal() { }
function isUserLoggedIn() { }   // boolean-returning function

// ❌ Wrong
function LoginUser() { }        // PascalCase (looks like a class)
function login_user() { }       // snake_case
function user() { }             // no verb — unclear what it does
```

---

## 4. Classes & Interfaces → `PascalCase`

Classes, interfaces, types, and enums all use **PascalCase** — every word starts with a capital letter.

```typescript
// ✅ Classes — PascalCase
class StudentProfile { }
class BrowserManager { }
class PlaywrightTestRunner { }

// ✅ Interfaces — PascalCase (some teams add 'I' prefix, TypeScript official style does NOT)
interface TestConfig {
    baseUrl: string;
    timeout: number;
    isHeadless: boolean;
}

interface UserCredentials {
    username: string;
    password: string;
}

// ✅ Type aliases — PascalCase
type BrowserType = 'chromium' | 'firefox' | 'webkit';
type TestStatus  = 'Passed' | 'Failed' | 'Skipped';
```

---

## 5. Enums → `PascalCase` (name) + `PascalCase` (members)

```typescript
// ✅ Enum name: PascalCase | Enum members: PascalCase
enum Browser {
    Chromium = 'chromium',
    Firefox  = 'firefox',
    Webkit   = 'webkit',
}

enum TestStatus {
    Passed  = 'PASSED',
    Failed  = 'FAILED',
    Skipped = 'SKIPPED',
}

// Usage
let currentBrowser: Browser = Browser.Chromium;
console.log(currentBrowser); // 'chromium'
```

---

## 6. Files & Folders → `kebab-case`

File and folder names use **kebab-case** — all lowercase, words separated by hyphens.

```
✅ Correct file names:
src/
├── Day1/
│   ├── variables.ts
│   ├── data-types.ts
│   ├── naming-conventions.ts
│   └── hello-world.ts
├── page-objects/
│   ├── login-page.ts
│   └── home-page.ts
└── utils/
    ├── test-helper.ts
    └── api-client.ts

❌ Wrong file names:
├── Variables.ts          (PascalCase)
├── dataTypes.ts          (camelCase)
├── naming_conventions.ts (snake_case)
```

---

## 7. Interfaces: `I` Prefix? — TypeScript Says No

Some older Java-style codebases add `I` before every interface name (e.g., `ITestConfig`).  
**TypeScript's official style guide advises against this.**

```typescript
// ⛔ Old style (avoid)
interface ITestConfig { }
interface IUserData { }

// ✅ Modern TypeScript style
interface TestConfig { }
interface UserData { }
```

---

## Full Summary Table

| Thing to Name | Convention | Example |
|---------------|-----------|---------|
| Variable | `camelCase` | `studentName`, `timeoutMs` |
| Boolean variable | `camelCase` with prefix | `isHeadless`, `hasPermission` |
| Function | `camelCase` (verb first) | `loginUser()`, `getTimeout()` |
| Parameter | `camelCase` | `function greet(firstName)` |
| Class | `PascalCase` | `BrowserManager`, `LoginPage` |
| Interface | `PascalCase` | `TestConfig`, `UserCredentials` |
| Type alias | `PascalCase` | `BrowserType`, `TestStatus` |
| Enum | `PascalCase` | `enum Browser { Chromium }` |
| Constant (config) | `UPPER_SNAKE_CASE` | `MAX_TIMEOUT`, `BASE_URL` |
| File name | `kebab-case` | `login-page.ts`, `data-types.ts` |
| Folder name | `kebab-case` | `page-objects/`, `test-utils/` |

---

## Real-World Playwright Example

```typescript
// ✅ Applying all naming conventions together

const BASE_URL: string = 'https://demo.playwright.dev';  // UPPER_SNAKE_CASE constant
const MAX_RETRIES: number = 3;

interface TestConfig {                                    // PascalCase interface
    baseUrl: string;
    isHeadless: boolean;
    maxRetries: number;
}

enum Browser {                                            // PascalCase enum
    Chromium = 'chromium',
    Firefox  = 'firefox',
}

class LoginPage {                                         // PascalCase class
    private pageUrl: string = `${BASE_URL}/login`;        // camelCase variable

    async loginUser(username: string, password: string) { // camelCase function + params
        console.log(`Logging in as ${username}`);
    }

    async isLoggedIn(): Promise<boolean> {                // boolean function with 'is'
        return true;
    }
}

// camelCase variables
const testConfig: TestConfig = {
    baseUrl: BASE_URL,
    isHeadless: true,
    maxRetries: MAX_RETRIES,
};
```

---

## Quick Rules to Remember

> ✅ **Variables & functions** → `camelCase`  
> ✅ **Classes, Interfaces, Types, Enums** → `PascalCase`  
> ✅ **Config constants** → `UPPER_SNAKE_CASE`  
> ✅ **Files & folders** → `kebab-case`  
> ✅ **Booleans** → prefix with `is`, `has`, `can`, `should`  
> ✅ **Functions** → start with a verb (`get`, `set`, `login`, `calculate`)  
> ⛔ **No `I` prefix** on interfaces  
> ⛔ **No `snake_case`** for variables in TypeScript  

---

*Part of the TypeScript + Playwright Learning Series — Day 1*
