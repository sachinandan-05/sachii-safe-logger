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
export declare function maskMatch(match: string, type: string, options?: Partial<AutoMaskOptions>): string;
export declare function autoMask(input: string, options?: AutoMaskOptions): string;
export declare function autoMaskObject<T>(obj: T, options?: AutoMaskOptions): T;
export declare function createSafeLogger(logger?: any, options?: AutoMaskOptions): SafeLogger;
