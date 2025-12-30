/**
 * Comprehensive regex patterns for detecting sensitive data
 */
export declare const PATTERNS: {
    EMAIL: RegExp;
    PHONE: RegExp;
    PHONE_INTERNATIONAL: RegExp;
    CREDIT_CARD: RegExp;
    CREDIT_CARD_FORMATTED: RegExp;
    SSN: RegExp;
    IPV4: RegExp;
    IPV6: RegExp;
    API_KEY: RegExp;
    BEARER_TOKEN: RegExp;
    JWT: RegExp;
    GENERIC_TOKEN: RegExp;
    HEX_TOKEN: RegExp;
    AWS_ACCESS_KEY: RegExp;
    AWS_SECRET_KEY: RegExp;
    PRIVATE_KEY: RegExp;
    PASSWORD_FIELD: RegExp;
    BANK_ACCOUNT: RegExp;
    PASSPORT: RegExp;
    DOB: RegExp;
    MAC_ADDRESS: RegExp;
    URL_WITH_CREDENTIALS: RegExp;
    BASIC_AUTH: RegExp;
    DRIVERS_LICENSE: RegExp;
};
export interface SensitivePattern {
    pattern: RegExp;
    priority: number;
    description: string;
}
/**
 * Sensitive data types with their patterns and masking strategies
 */
export declare const SENSITIVE_PATTERNS: Record<string, SensitivePattern>;
