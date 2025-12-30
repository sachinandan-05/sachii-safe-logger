"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENSITIVE_PATTERNS = exports.PATTERNS = void 0;
/**
 * Comprehensive regex patterns for detecting sensitive data
 */
exports.PATTERNS = {
    // Email addresses
    EMAIL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    // Phone numbers (various formats)
    PHONE: /\b(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g,
    PHONE_INTERNATIONAL: /\b\+?[1-9]\d{1,14}\b/g,
    // Credit card numbers (Visa, MasterCard, Amex, Discover, etc.)
    CREDIT_CARD: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11})\b/g,
    CREDIT_CARD_FORMATTED: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    // Social Security Numbers (US)
    SSN: /\b(?!000|666|9\d{2})\d{3}[-\s]?(?!00)\d{2}[-\s]?(?!0000)\d{4}\b/g,
    // IP Addresses
    IPV4: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    IPV6: /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/g,
    // API Keys and Tokens (common patterns)
    API_KEY: /\b(?:api[_-]?key|apikey|api[_-]?token)[=:\s]["']?([a-zA-Z0-9_-]{20,})/gi,
    BEARER_TOKEN: /\bBearer\s+[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/gi,
    JWT: /\beyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*/g,
    // Generic long tokens/secrets (base64, hex)
    GENERIC_TOKEN: /\b[A-Za-z0-9+/]{40,}={0,2}\b/g,
    HEX_TOKEN: /\b[a-fA-F0-9]{32,}\b/g,
    // AWS Keys
    AWS_ACCESS_KEY: /\b(?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16}\b/g,
    AWS_SECRET_KEY: /\b[A-Za-z0-9/+=]{40}\b/g,
    // Private Keys
    PRIVATE_KEY: /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----[\s\S]*?-----END\s+(?:RSA\s+)?PRIVATE\s+KEY-----/g,
    // Passwords in common log formats
    PASSWORD_FIELD: /(?:password|passwd|pwd|secret|credential)[=:\s]["']?([^\s"'&]+)/gi,
    // Bank Account Numbers (basic pattern)
    BANK_ACCOUNT: /\b\d{9,18}\b/g,
    // Passport Numbers (various countries - basic)
    PASSPORT: /\b[A-Z]{1,2}[0-9]{6,9}\b/g,
    // Date of Birth patterns
    DOB: /\b(?:0?[1-9]|1[0-2])[-/](?:0?[1-9]|[12]\d|3[01])[-/](?:19|20)\d{2}\b/g,
    // MAC Addresses
    MAC_ADDRESS: /\b(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b/g,
    // URLs with credentials
    URL_WITH_CREDENTIALS: /\b(?:https?|ftp):\/\/[^:@\s]+:[^:@\s]+@[^\s]+/g,
    // Basic Auth headers
    BASIC_AUTH: /\bBasic\s+[A-Za-z0-9+/]+=*\b/gi,
    // Driver's License (US - varies by state, basic pattern)
    DRIVERS_LICENSE: /\b[A-Z]{1,2}[0-9]{5,8}\b/g,
};
/**
 * Sensitive data types with their patterns and masking strategies
 */
exports.SENSITIVE_PATTERNS = {
    email: {
        pattern: exports.PATTERNS.EMAIL,
        priority: 1,
        description: "Email addresses"
    },
    phone: {
        pattern: exports.PATTERNS.PHONE,
        priority: 2,
        description: "Phone numbers"
    },
    creditCard: {
        pattern: exports.PATTERNS.CREDIT_CARD,
        priority: 1,
        description: "Credit card numbers"
    },
    creditCardFormatted: {
        pattern: exports.PATTERNS.CREDIT_CARD_FORMATTED,
        priority: 1,
        description: "Formatted credit card numbers"
    },
    ssn: {
        pattern: exports.PATTERNS.SSN,
        priority: 1,
        description: "Social Security Numbers"
    },
    ipv4: {
        pattern: exports.PATTERNS.IPV4,
        priority: 3,
        description: "IPv4 addresses"
    },
    jwt: {
        pattern: exports.PATTERNS.JWT,
        priority: 1,
        description: "JWT tokens"
    },
    bearerToken: {
        pattern: exports.PATTERNS.BEARER_TOKEN,
        priority: 1,
        description: "Bearer tokens"
    },
    awsAccessKey: {
        pattern: exports.PATTERNS.AWS_ACCESS_KEY,
        priority: 1,
        description: "AWS Access Keys"
    },
    privateKey: {
        pattern: exports.PATTERNS.PRIVATE_KEY,
        priority: 1,
        description: "Private keys"
    },
    password: {
        pattern: exports.PATTERNS.PASSWORD_FIELD,
        priority: 1,
        description: "Passwords in log strings"
    },
    basicAuth: {
        pattern: exports.PATTERNS.BASIC_AUTH,
        priority: 1,
        description: "Basic auth headers"
    },
    urlWithCredentials: {
        pattern: exports.PATTERNS.URL_WITH_CREDENTIALS,
        priority: 1,
        description: "URLs containing credentials"
    },
    macAddress: {
        pattern: exports.PATTERNS.MAC_ADDRESS,
        priority: 3,
        description: "MAC addresses"
    }
};
