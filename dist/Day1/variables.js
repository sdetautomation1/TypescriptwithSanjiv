"use strict";
// Shortcuts learned : F2 for rename the file.
// Open agent Ctrl+L 
Object.defineProperty(exports, "__esModule", { value: true });
/* ============================================================================
   DAY 1: VARIABLES IN TYPESCRIPT
   ============================================================================ */
// ==========================================
// 1. DECLARATION KEYWORDS: let vs const vs var
// ==========================================
// ✅ 'const' - Value CANNOT be reassigned (immutable reference). Default choice!
const appName = "Playwright Automation Framework";
// appName = "New Name"; // ❌ Error: Cannot assign to 'appName' because it is a constant.
// ✅ 'let' - Value CAN be reassigned. Use when you expect the value to change.
let currentTestStatus = "Pending";
currentTestStatus = "Passed"; // Allowed
// ⚠️ 'var' - Old JavaScript syntax (function-scoped, hoisted). Avoid in modern TS/JS!
var oldVariable = "Avoid using var";
// ==========================================
// 2. EXPLICIT TYPE ANNOTATIONS (Primitives)
// Syntax: let variableName: type = value;
// ==========================================
// String: Textual data (single quotes, double quotes, or backticks)
let testEnvironment = "Staging";
let browserType = 'Chromium';
// Number: Integers and floats (TS has no separate int/float type)
let timeoutMs = 30000;
let retryCount = 2;
let pageLoadTimeSeconds = 1.45;
// Boolean: true or false
let isHeadless = true;
let isPassed = false;
// Null & Undefined
let optionalReport = null; // Intentionally absent
let uninitializedData = undefined; // Declared but not yet given a value
// ==========================================
// 3. TYPE INFERENCE (Implicit Typing)
// TypeScript can automatically figure out the type based on the initial value!
// ==========================================
let implicitString = "Playwright"; // TS infers type as 'string'
let implicitNumber = 42; // TS infers type as 'number'
// TypeScript prevents accidental type changing:
// implicitString = 100; // ❌ Error: Type 'number' is not assignable to type 'string'
// ==========================================
// 4. UNION TYPES (Multiple Possible Types)
// Useful when a variable can hold more than one type (e.g. an ID or status code)
// ==========================================
// Locator timeout can be a number (milliseconds) or string (e.g., '10s')
let waitDuration = 5000;
waitDuration = "10s"; // Also valid!
// Status can only be one of specific literal values
let testResult = "Passed";
// ==========================================
// 5. 'any' vs 'unknown'
// ==========================================
// ❌ 'any' disables type checking (defeats the purpose of TypeScript!)
let flexibleVar = "Hello";
flexibleVar = 123;
flexibleVar = true;
// ✅ 'unknown' is the type-safe alternative to 'any'.
// You must check its type before performing operations on it.
let safeUnknown = "Test Data";
if (typeof safeUnknown === "string") {
    console.log("Safe unknown as string length:", safeUnknown.length);
}
// ==========================================
// 6. TEMPLATE LITERALS (String Interpolation)
// Embed variables directly into strings using backticks (`) and ${}
// ==========================================
const testCaseId = "TC-101";
const executionTimeSeconds = 3.2;
const summaryMessage = `Test case [${testCaseId}] finished in ${executionTimeSeconds}s with status: ${currentTestStatus}`;
const config = {
    baseUrl: "https://demo.playwright.dev",
    defaultTimeout: 15000,
    headless: isHeadless,
    retries: retryCount,
};
// ==========================================
// PRINTING VALUES TO VERIFY
// ==========================================
console.log("--- Variables Learning Output ---");
console.log("App Name:", appName);
console.log("Environment:", testEnvironment);
console.log("Browser:", browserType);
console.log("Timeout (ms):", timeoutMs);
console.log("Headless mode:", isHeadless);
console.log("Wait Duration (Union):", waitDuration);
console.log("Summary:", summaryMessage);
console.log("Test Config Object:", config);
//# sourceMappingURL=variables.js.map