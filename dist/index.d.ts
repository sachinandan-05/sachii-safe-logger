export { maskEmail } from "./maskers/email";
export { maskPhone } from "./maskers/phone";
export { maskCreditCard } from "./maskers/creditCard";
export { maskToken } from "./maskers/tokens";
export { autoMask, autoMaskObject, createSafeLogger, maskMatch, AutoMaskOptions, CustomPattern, SafeLogger } from "./autoMask";
export { PATTERNS, SENSITIVE_PATTERNS, SensitivePattern } from "./patterns";
export { enableGlobalMasking, disableGlobalMasking, isGlobalMaskingEnabled } from "./globalMask";
