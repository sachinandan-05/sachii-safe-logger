"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskMatch = maskMatch;
exports.autoMask = autoMask;
exports.autoMaskObject = autoMaskObject;
exports.createSafeLogger = createSafeLogger;
const patterns_1 = require("./patterns");
const email_1 = require("./maskers/email");
const phone_1 = require("./maskers/phone");
const creditCard_1 = require("./maskers/creditCard");
const tokens_1 = require("./maskers/tokens");
const DEFAULT_OPTIONS = {
    maskEmail: true,
    maskPhone: true,
    maskCreditCard: true,
    maskSSN: true,
    maskIP: true,
    maskJWT: true,
    maskBearerToken: true,
    maskAWSKeys: true,
    maskPrivateKeys: true,
    maskPasswords: true,
    maskBasicAuth: true,
    maskURLCredentials: true,
    maskMAC: false,
    customPatterns: [],
    preserveLength: true,
    maskChar: '*'
};
function maskMatch(match, type, options = {}) {
    const { preserveLength = true, maskChar = '*' } = options;
    switch (type) {
        case 'email':
            return (0, email_1.maskEmail)(match);
        case 'phone':
            return (0, phone_1.maskPhone)(match);
        case 'creditCard':
        case 'creditCardFormatted':
            if (match.includes('-') || match.includes(' ')) {
                const cleaned = match.replace(/[-\s]/g, '');
                const masked = (0, creditCard_1.maskCreditCard)(cleaned);
                let result = '';
                let maskIndex = 0;
                for (let i = 0; i < match.length; i++) {
                    if (match[i] === '-' || match[i] === ' ') {
                        result += match[i];
                    }
                    else {
                        result += masked[maskIndex++];
                    }
                }
                return result;
            }
            return (0, creditCard_1.maskCreditCard)(match);
        case 'ssn':
            const ssnClean = match.replace(/[-\s]/g, '');
            if (match.includes('-')) {
                return `${maskChar.repeat(3)}-${maskChar.repeat(2)}-${ssnClean.slice(-4)}`;
            }
            return maskChar.repeat(5) + ssnClean.slice(-4);
        case 'ipv4':
            const octets = match.split('.');
            return `${octets[0]}.${maskChar.repeat(3)}.${maskChar.repeat(3)}.${octets[3]}`;
        case 'jwt':
        case 'bearerToken':
        case 'awsAccessKey':
            return (0, tokens_1.maskToken)(match);
        case 'privateKey':
            return `-----BEGIN PRIVATE KEY-----\n[REDACTED]\n-----END PRIVATE KEY-----`;
        case 'password':
            const pwdMatch = match.match(/^(password|passwd|pwd|secret|credential)[=:\s]["']?/i);
            if (pwdMatch) {
                const prefix = pwdMatch[0];
                const value = match.slice(prefix.length).replace(/["']$/, '');
                return prefix + maskChar.repeat(value.length);
            }
            return maskChar.repeat(match.length);
        case 'basicAuth':
            return 'Basic [REDACTED]';
        case 'urlWithCredentials':
            return match.replace(/\/\/([^:]+):([^@]+)@/, `//$1:${maskChar.repeat(8)}@`);
        case 'macAddress':
            const macParts = match.split(/[:-]/);
            const separator = match.includes(':') ? ':' : '-';
            return `${macParts[0]}${separator}${maskChar.repeat(2)}${separator}${maskChar.repeat(2)}${separator}${maskChar.repeat(2)}${separator}${maskChar.repeat(2)}${separator}${macParts[5]}`;
        default:
            if (preserveLength) {
                return maskChar.repeat(match.length);
            }
            return '[REDACTED]';
    }
}
function autoMask(input, options = {}) {
    if (!input || typeof input !== 'string') {
        return input || '';
    }
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let result = input;
    const patternsToApply = [];
    if (opts.maskEmail)
        patternsToApply.push({ type: 'email', pattern: patterns_1.PATTERNS.EMAIL });
    if (opts.maskPhone)
        patternsToApply.push({ type: 'phone', pattern: patterns_1.PATTERNS.PHONE });
    if (opts.maskCreditCard) {
        patternsToApply.push({ type: 'creditCard', pattern: patterns_1.PATTERNS.CREDIT_CARD });
        patternsToApply.push({ type: 'creditCardFormatted', pattern: patterns_1.PATTERNS.CREDIT_CARD_FORMATTED });
    }
    if (opts.maskSSN)
        patternsToApply.push({ type: 'ssn', pattern: patterns_1.PATTERNS.SSN });
    if (opts.maskIP)
        patternsToApply.push({ type: 'ipv4', pattern: patterns_1.PATTERNS.IPV4 });
    if (opts.maskJWT)
        patternsToApply.push({ type: 'jwt', pattern: patterns_1.PATTERNS.JWT });
    if (opts.maskBearerToken)
        patternsToApply.push({ type: 'bearerToken', pattern: patterns_1.PATTERNS.BEARER_TOKEN });
    if (opts.maskAWSKeys)
        patternsToApply.push({ type: 'awsAccessKey', pattern: patterns_1.PATTERNS.AWS_ACCESS_KEY });
    if (opts.maskPrivateKeys)
        patternsToApply.push({ type: 'privateKey', pattern: patterns_1.PATTERNS.PRIVATE_KEY });
    if (opts.maskPasswords)
        patternsToApply.push({ type: 'password', pattern: patterns_1.PATTERNS.PASSWORD_FIELD });
    if (opts.maskBasicAuth)
        patternsToApply.push({ type: 'basicAuth', pattern: patterns_1.PATTERNS.BASIC_AUTH });
    if (opts.maskURLCredentials)
        patternsToApply.push({ type: 'urlWithCredentials', pattern: patterns_1.PATTERNS.URL_WITH_CREDENTIALS });
    if (opts.maskMAC)
        patternsToApply.push({ type: 'macAddress', pattern: patterns_1.PATTERNS.MAC_ADDRESS });
    if (opts.customPatterns && opts.customPatterns.length > 0) {
        for (const custom of opts.customPatterns) {
            patternsToApply.push({ type: custom.name || 'custom', pattern: custom.pattern });
        }
    }
    for (const { type, pattern } of patternsToApply) {
        const regex = new RegExp(pattern.source, pattern.flags);
        result = result.replace(regex, (match) => maskMatch(match, type, opts));
    }
    return result;
}
function autoMaskObject(obj, options = {}) {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (typeof obj === 'string') {
        return autoMask(obj, options);
    }
    if (Array.isArray(obj)) {
        return obj.map(item => autoMaskObject(item, options));
    }
    if (typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            const sensitiveKeys = ['password', 'passwd', 'pwd', 'secret', 'token', 'apikey',
                'api_key', 'apiKey', 'auth', 'authorization', 'credential', 'private',
                'ssn', 'creditcard', 'credit_card', 'creditCard', 'cardNumber', 'card_number',
                'cvv', 'pin', 'accessToken', 'access_token', 'refreshToken', 'refresh_token',
                'bearer', 'jwt', 'sessionId', 'session_id'];
            const lowerKey = key.toLowerCase();
            const isSensitiveKey = sensitiveKeys.some(sk => lowerKey.includes(sk.toLowerCase()));
            if (isSensitiveKey && typeof value === 'string') {
                result[key] = (0, tokens_1.maskToken)(value);
            }
            else {
                result[key] = autoMaskObject(value, options);
            }
        }
        return result;
    }
    return obj;
}
function createSafeLogger(logger = console, options = {}) {
    const processArgs = (args) => {
        return args.map(arg => {
            if (typeof arg === 'string') {
                return autoMask(arg, options);
            }
            if (typeof arg === 'object' && arg !== null) {
                return autoMaskObject(arg, options);
            }
            return arg;
        });
    };
    return {
        log: (...args) => logger.log(...processArgs(args)),
        info: (...args) => logger.info(...processArgs(args)),
        warn: (...args) => logger.warn(...processArgs(args)),
        error: (...args) => logger.error(...processArgs(args)),
        debug: (...args) => logger.debug ? logger.debug(...processArgs(args)) : logger.log(...processArgs(args)),
        trace: (...args) => logger.trace ? logger.trace(...processArgs(args)) : logger.log(...processArgs(args)),
        _original: logger,
        setOptions: (newOptions) => {
            Object.assign(options, newOptions);
        }
    };
}
