import { autoMask, autoMaskObject, AutoMaskOptions } from "./autoMask";

interface OriginalConsole {
    log: typeof console.log;
    info: typeof console.info;
    warn: typeof console.warn;
    error: typeof console.error;
    debug: typeof console.debug;
    trace: typeof console.trace;
}

const originalConsole: OriginalConsole = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
    trace: console.trace.bind(console)
};

let isEnabled = false;
let globalOptions: AutoMaskOptions = {};

function processArgs(args: any[]): any[] {
    return args.map(arg => {
        if (typeof arg === 'string') {
            return autoMask(arg, globalOptions);
        }
        if (typeof arg === 'object' && arg !== null) {
            try {
                return autoMaskObject(JSON.parse(JSON.stringify(arg)), globalOptions);
            } catch (e) {
                return arg;
            }
        }
        return arg;
    });
}

/**
 * Enable global console masking - all console.log, console.info, etc. will auto-mask sensitive data
 * @param options - Masking options (same as autoMask options)
 * @example
 * require('sachii-safe-logger').enableGlobalMasking();
 * 
 * // Now all console.log calls will auto-mask!
 * console.log("Email: john@example.com"); // Output: "Email: j***@example.com"
 * console.log("Card: 4111111111111111");  // Output: "Card: ************1111"
 */
export function enableGlobalMasking(options: AutoMaskOptions = {}): void {
    if (isEnabled) {
        globalOptions = { ...globalOptions, ...options };
        return;
    }

    globalOptions = options;
    isEnabled = true;

    console.log = function (...args: any[]) {
        originalConsole.log(...processArgs(args));
    };

    console.info = function (...args: any[]) {
        originalConsole.info(...processArgs(args));
    };

    console.warn = function (...args: any[]) {
        originalConsole.warn(...processArgs(args));
    };

    console.error = function (...args: any[]) {
        originalConsole.error(...processArgs(args));
    };

    console.debug = function (...args: any[]) {
        originalConsole.debug(...processArgs(args));
    };

    console.trace = function (...args: any[]) {
        originalConsole.trace(...processArgs(args));
    };
}

/**
 * Disable global console masking and restore original console methods
 */
export function disableGlobalMasking(): void {
    if (!isEnabled) return;

    isEnabled = false;
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.debug = originalConsole.debug;
    console.trace = originalConsole.trace;
}

/**
 * Check if global masking is currently enabled
 */
export function isGlobalMaskingEnabled(): boolean {
    return isEnabled;
}
