// Individual maskers
export { maskEmail } from "./maskers/email";
export { maskPhone } from "./maskers/phone";
export { maskCreditCard } from "./maskers/creditCard";
export { maskToken } from "./maskers/tokens";

// Auto-detection and masking
export { autoMask, autoMaskObject, createSafeLogger, maskMatch, AutoMaskOptions, CustomPattern, SafeLogger } from "./autoMask";

// Patterns for custom usage
export { PATTERNS, SENSITIVE_PATTERNS, SensitivePattern } from "./patterns";

// Global console masking
export { enableGlobalMasking, disableGlobalMasking, isGlobalMaskingEnabled } from "./globalMask";
