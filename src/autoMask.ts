import { PATTERNS } from "./patterns";
import { maskEmail } from "./maskers/email";
import { maskPhone } from "./maskers/phone";
import { maskCreditCard } from "./maskers/creditCard";
import { maskToken } from "./maskers/tokens";

export interface CustomPattern {
    name: string;
    pattern: RegExp;
}

export interface AutoMaskOptions {
    maskEmail?: boolean;
    maskPhone?: boolean;
    maskCreditCard?: boolean;
    maskSSN?: boolean;
    maskIP?: boolean;
    maskJWT?: boolean;
    maskBearerToken?: boolean;
    maskAWSKeys?: boolean;
    maskPrivateKeys?: boolean;
    maskPasswords?: boolean;
    maskBasicAuth?: boolean;
    maskURLCredentials?: boolean;
    maskMAC?: boolean;
    customPatterns?: CustomPattern[];
    preserveLength?: boolean;
    maskChar?: string;
}

export interface SafeLogger {
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    trace: (...args: any[]) => void;
    _original: any;
    setOptions: (newOptions: Partial<AutoMaskOptions>) => void;
}

const DEFAULT_OPTIONS: AutoMaskOptions = {
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

export function maskMatch(match: string, type: string, options: Partial<AutoMaskOptions> = {}): string {
    const { preserveLength = true, maskChar = '*' } = options;

    switch (type) {
        case 'email':
            return maskEmail(match);
        
        case 'phone':
            return maskPhone(match);
        
        case 'creditCard':
        case 'creditCardFormatted':
            if (match.includes('-') || match.includes(' ')) {
                const cleaned = match.replace(/[-\s]/g, '');
                const masked = maskCreditCard(cleaned);
                let result = '';
                let maskIndex = 0;
                for (let i = 0; i < match.length; i++) {
                    if (match[i] === '-' || match[i] === ' ') {
                        result += match[i];
                    } else {
                        result += masked[maskIndex++];
                    }
                }
                return result;
            }
            return maskCreditCard(match);
        
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
            return maskToken(match);
        
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

export function autoMask(input: string, options: AutoMaskOptions = {}): string {
    if (!input || typeof input !== 'string') {
        return input || '';
    }

    const opts = { ...DEFAULT_OPTIONS, ...options };
    let result = input;

    const patternsToApply: { type: string; pattern: RegExp }[] = [];

    if (opts.maskEmail) patternsToApply.push({ type: 'email', pattern: PATTERNS.EMAIL });
    if (opts.maskPhone) patternsToApply.push({ type: 'phone', pattern: PATTERNS.PHONE });
    if (opts.maskCreditCard) {
        patternsToApply.push({ type: 'creditCard', pattern: PATTERNS.CREDIT_CARD });
        patternsToApply.push({ type: 'creditCardFormatted', pattern: PATTERNS.CREDIT_CARD_FORMATTED });
    }
    if (opts.maskSSN) patternsToApply.push({ type: 'ssn', pattern: PATTERNS.SSN });
    if (opts.maskIP) patternsToApply.push({ type: 'ipv4', pattern: PATTERNS.IPV4 });
    if (opts.maskJWT) patternsToApply.push({ type: 'jwt', pattern: PATTERNS.JWT });
    if (opts.maskBearerToken) patternsToApply.push({ type: 'bearerToken', pattern: PATTERNS.BEARER_TOKEN });
    if (opts.maskAWSKeys) patternsToApply.push({ type: 'awsAccessKey', pattern: PATTERNS.AWS_ACCESS_KEY });
    if (opts.maskPrivateKeys) patternsToApply.push({ type: 'privateKey', pattern: PATTERNS.PRIVATE_KEY });
    if (opts.maskPasswords) patternsToApply.push({ type: 'password', pattern: PATTERNS.PASSWORD_FIELD });
    if (opts.maskBasicAuth) patternsToApply.push({ type: 'basicAuth', pattern: PATTERNS.BASIC_AUTH });
    if (opts.maskURLCredentials) patternsToApply.push({ type: 'urlWithCredentials', pattern: PATTERNS.URL_WITH_CREDENTIALS });
    if (opts.maskMAC) patternsToApply.push({ type: 'macAddress', pattern: PATTERNS.MAC_ADDRESS });

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

export function autoMaskObject<T>(obj: T, options: AutoMaskOptions = {}): T {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (typeof obj === 'string') {
        return autoMask(obj, options) as unknown as T;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => autoMaskObject(item, options)) as unknown as T;
    }

    if (typeof obj === 'object') {
        const result: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj as Record<string, any>)) {
            const sensitiveKeys = ['password', 'passwd', 'pwd', 'secret', 'token', 'apikey', 
                'api_key', 'apiKey', 'auth', 'authorization', 'credential', 'private', 
                'ssn', 'creditcard', 'credit_card', 'creditCard', 'cardNumber', 'card_number',
                'cvv', 'pin', 'accessToken', 'access_token', 'refreshToken', 'refresh_token',
                'bearer', 'jwt', 'sessionId', 'session_id'];
            
            const lowerKey = key.toLowerCase();
            const isSensitiveKey = sensitiveKeys.some(sk => lowerKey.includes(sk.toLowerCase()));

            if (isSensitiveKey && typeof value === 'string') {
                result[key] = maskToken(value);
            } else {
                result[key] = autoMaskObject(value, options);
            }
        }
        return result as T;
    }

    return obj;
}

export function createSafeLogger(logger: any = console, options: AutoMaskOptions = {}): SafeLogger {
    const processArgs = (args: any[]) => {
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
        log: (...args: any[]) => logger.log(...processArgs(args)),
        info: (...args: any[]) => logger.info(...processArgs(args)),
        warn: (...args: any[]) => logger.warn(...processArgs(args)),
        error: (...args: any[]) => logger.error(...processArgs(args)),
        debug: (...args: any[]) => logger.debug ? logger.debug(...processArgs(args)) : logger.log(...processArgs(args)),
        trace: (...args: any[]) => logger.trace ? logger.trace(...processArgs(args)) : logger.log(...processArgs(args)),
        _original: logger,
        setOptions: (newOptions: Partial<AutoMaskOptions>) => {
            Object.assign(options, newOptions);
        }
    };
}
