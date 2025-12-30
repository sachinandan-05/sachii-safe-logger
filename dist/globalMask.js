"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableGlobalMasking = enableGlobalMasking;
exports.disableGlobalMasking = disableGlobalMasking;
exports.isGlobalMaskingEnabled = isGlobalMaskingEnabled;
const autoMask_1 = require("./autoMask");
const originalConsole = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
    trace: console.trace.bind(console)
};
let isEnabled = false;
let globalOptions = {};
function processArgs(args) {
    return args.map(arg => {
        if (typeof arg === 'string') {
            return (0, autoMask_1.autoMask)(arg, globalOptions);
        }
        if (typeof arg === 'object' && arg !== null) {
            try {
                return (0, autoMask_1.autoMaskObject)(JSON.parse(JSON.stringify(arg)), globalOptions);
            }
            catch (e) {
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
function enableGlobalMasking(options = {}) {
    if (isEnabled) {
        globalOptions = { ...globalOptions, ...options };
        return;
    }
    globalOptions = options;
    isEnabled = true;
    console.log = function (...args) {
        originalConsole.log(...processArgs(args));
    };
    console.info = function (...args) {
        originalConsole.info(...processArgs(args));
    };
    console.warn = function (...args) {
        originalConsole.warn(...processArgs(args));
    };
    console.error = function (...args) {
        originalConsole.error(...processArgs(args));
    };
    console.debug = function (...args) {
        originalConsole.debug(...processArgs(args));
    };
    console.trace = function (...args) {
        originalConsole.trace(...processArgs(args));
    };
}
/**
 * Disable global console masking and restore original console methods
 */
function disableGlobalMasking() {
    if (!isEnabled)
        return;
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
function isGlobalMaskingEnabled() {
    return isEnabled;
}
