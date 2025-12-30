# sachii-safe-logger

A lightweight TypeScript library to automatically detect and mask sensitive data (emails, credit cards, phone numbers, API tokens, SSN, passwords, etc.) in logs for security and compliance.

## Installation

```bash
npm install sachii-safe-logger
```

## 🚀 Quick Start - Auto-Mask All Console Logs

Just add **ONE line** at the top of your app and all `console.log` calls will automatically mask sensitive data!

```javascript
// At the very top of your app entry point (index.js, app.js, server.js)
require('sachii-safe-logger').enableGlobalMasking();

// That's it! Now ALL console.log calls anywhere in your app auto-mask sensitive data!
console.log("User email: john@example.com");     // → "User email: j***@example.com"
console.log("Card: 4111111111111111");           // → "Card: ************1111"
console.log("Call 555-123-4567");                // → "Call *******4567"
console.log("SSN: 123-45-6789");                 // → "SSN: ***-**-6789"
console.log({ password: "secret123" });          // → { password: "sec****123" }
```

## What Gets Auto-Detected & Masked

| Data Type | Example Input | Masked Output |
|-----------|---------------|---------------|
| **Email** | `john@example.com` | `j***@example.com` |
| **Credit Card** | `4111111111111111` | `************1111` |
| **Phone** | `555-123-4567` | `*******4567` |
| **SSN** | `123-45-6789` | `***-**-6789` |
| **JWT Tokens** | `eyJhbGci...` | `eyJh****...` |
| **Passwords** | `password=secret` | `password=******` |
| **IP Addresses** | `192.168.1.100` | `192.***.***100` |
| **AWS Keys** | `AKIAIOSFODNN7EXAMPLE` | `AKIA****MPLE` |
| **Basic Auth** | `Basic dXNlcjpwYXNz` | `Basic [REDACTED]` |
| **URLs with creds** | `https://user:pass@host.com` | `https://user:********@host.com` |

## API Reference

### `enableGlobalMasking(options?)`

Enable auto-masking for all console methods globally. Call once at app startup.

```javascript
const { enableGlobalMasking } = require('sachii-safe-logger');

// Enable with default options (masks everything)
enableGlobalMasking();

// Or customize what to mask
enableGlobalMasking({
  maskEmail: true,        // default: true
  maskPhone: true,        // default: true
  maskCreditCard: true,   // default: true
  maskSSN: true,          // default: true
  maskIP: true,           // default: true
  maskJWT: true,          // default: true
  maskPasswords: true,    // default: true
  maskMAC: false,         // default: false
});
```

### `disableGlobalMasking()`

Restore original console behavior.

```javascript
const { disableGlobalMasking } = require('sachii-safe-logger');
disableGlobalMasking();
```

### `autoMask(input, options?)`

Mask sensitive data in a single string.

```javascript
const { autoMask } = require('sachii-safe-logger');

const text = "Contact john@example.com or 555-123-4567";
console.log(autoMask(text));
// Output: "Contact j***@example.com or *******4567"
```

### `autoMaskObject(obj, options?)`

Deep-traverse and mask sensitive data in objects.

```javascript
const { autoMaskObject } = require('sachii-safe-logger');

const user = {
  email: "john@example.com",
  password: "secret123",
  payment: { cardNumber: "4111111111111111" }
};

console.log(autoMaskObject(user));
// Output: { email: "j***@example.com", password: "sec****123", payment: { cardNumber: "************1111" }}
```

### `createSafeLogger(logger?, options?)`

Wrap any logger (console, winston, pino, bunyan) with auto-masking.

```javascript
const { createSafeLogger } = require('sachii-safe-logger');
const winston = require('winston');

const safeLogger = createSafeLogger(winston);
safeLogger.info("User email: john@example.com"); // Auto-masked!
```

### Individual Maskers

```javascript
const { maskEmail, maskPhone, maskCreditCard, maskToken } = require('sachii-safe-logger');

maskEmail("john@example.com");      // "j***@example.com"
maskPhone("555-123-4567");          // "*******4567"
maskCreditCard("4111111111111111"); // "************1111"
maskToken("sk_live_abc123xyz789");  // "sk_l****9789"
```

### Access Regex Patterns

```javascript
const { PATTERNS } = require('sachii-safe-logger');

// Use patterns for your own validation/detection
PATTERNS.EMAIL      // Email regex
PATTERNS.CREDIT_CARD // Credit card regex
PATTERNS.SSN        // SSN regex
PATTERNS.JWT        // JWT regex
// ... and more
```

## Custom Patterns

Add your own regex patterns:

```javascript
enableGlobalMasking({
  customPatterns: [
    { name: 'employeeId', pattern: /EMP-\d{6}/g },
    { name: 'internalCode', pattern: /INT-[A-Z]{3}-\d{4}/g }
  ]
});
```

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import { enableGlobalMasking, autoMask, AutoMaskOptions } from 'sachii-safe-logger';

const options: AutoMaskOptions = {
  maskEmail: true,
  maskPhone: false
};

enableGlobalMasking(options);
```

## License

MIT

## Author

Sachinandan <sachinandan.priv05@gmail.com>
