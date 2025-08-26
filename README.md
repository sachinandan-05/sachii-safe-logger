# sachii-safe-logger

![npm](https://img.shields.io/npm/v/sachii-safe-logger)
![npm downloads](https://img.shields.io/npm/dt/sachii-safe-logger)
![TypeScript](https://img.shields.io/badge/TypeScript-Yes-blue)
![License](https://img.shields.io/npm/l/sachii-safe-logger)

`sachii-safe-logger` is a lightweight **TypeScript library** for safely logging sensitive data by masking information such as **phone numbers, email addresses, credit card numbers, and tokens**. Ideal for logging, debugging, or displaying user data without exposing sensitive details.

---

## 🔹 Features

- Mask **phone numbers** for privacy.
- Mask **email addresses** partially.
- Mask **credit card numbers** leaving only the last 4 digits.
- Mask **tokens or API keys** securely.
- Written in **TypeScript**, with types included.
- Lightweight, dependency-free, and easy to use.

---

## 💾 Installation

```bash
npm install sachii-safe-logger

```Importing
import { maskPhone, maskEmail, maskCreditCard, maskToken } from "sachii-safe-logger";

```Usage
const phone = "9876543210";
console.log(maskPhone(phone)); 
// Output: *******210

const email = "example@example.com";
console.log(maskEmail(email)); 
// Output: e*****@example.com

const creditCard = "1234567890123456";
console.log(maskCreditCard(creditCard)); 
// Output: ************3456

const token = "abc123def456";
console.log(maskToken(token)); 
// Output: **123**

```

---

```File Structure
sachii-safe-logger/
├─ dist/
│  ├─ maskers/
│  │  ├─ creditCard.js
│  │  ├─ email.js
│  │  ├─ phone.js
│  │  └─ tokens.js
│  └─ utils.js
├─ tests/
│  ├─ phone.test.ts
│  ├─ email.test.ts
│  ├─ creditCard.test.ts
│  └─ token.test.ts
├─ package.json
├─ README.md
└─ LICENSE

```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📝 Contributing

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

---

## 📝 Author

- **Sachinandan** - [Sachinandan](https://github.com/sachinandan-05)
