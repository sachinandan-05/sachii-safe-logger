import { AutoMaskOptions } from "./autoMask";
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
export declare function enableGlobalMasking(options?: AutoMaskOptions): void;
/**
 * Disable global console masking and restore original console methods
 */
export declare function disableGlobalMasking(): void;
/**
 * Check if global masking is currently enabled
 */
export declare function isGlobalMaskingEnabled(): boolean;
