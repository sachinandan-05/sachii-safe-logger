"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGlobalMaskingEnabled = exports.disableGlobalMasking = exports.enableGlobalMasking = exports.SENSITIVE_PATTERNS = exports.PATTERNS = exports.maskMatch = exports.createSafeLogger = exports.autoMaskObject = exports.autoMask = exports.maskToken = exports.maskCreditCard = exports.maskPhone = exports.maskEmail = void 0;
// Individual maskers
var email_1 = require("./maskers/email");
Object.defineProperty(exports, "maskEmail", { enumerable: true, get: function () { return email_1.maskEmail; } });
var phone_1 = require("./maskers/phone");
Object.defineProperty(exports, "maskPhone", { enumerable: true, get: function () { return phone_1.maskPhone; } });
var creditCard_1 = require("./maskers/creditCard");
Object.defineProperty(exports, "maskCreditCard", { enumerable: true, get: function () { return creditCard_1.maskCreditCard; } });
var tokens_1 = require("./maskers/tokens");
Object.defineProperty(exports, "maskToken", { enumerable: true, get: function () { return tokens_1.maskToken; } });
// Auto-detection and masking
var autoMask_1 = require("./autoMask");
Object.defineProperty(exports, "autoMask", { enumerable: true, get: function () { return autoMask_1.autoMask; } });
Object.defineProperty(exports, "autoMaskObject", { enumerable: true, get: function () { return autoMask_1.autoMaskObject; } });
Object.defineProperty(exports, "createSafeLogger", { enumerable: true, get: function () { return autoMask_1.createSafeLogger; } });
Object.defineProperty(exports, "maskMatch", { enumerable: true, get: function () { return autoMask_1.maskMatch; } });
// Patterns for custom usage
var patterns_1 = require("./patterns");
Object.defineProperty(exports, "PATTERNS", { enumerable: true, get: function () { return patterns_1.PATTERNS; } });
Object.defineProperty(exports, "SENSITIVE_PATTERNS", { enumerable: true, get: function () { return patterns_1.SENSITIVE_PATTERNS; } });
// Global console masking
var globalMask_1 = require("./globalMask");
Object.defineProperty(exports, "enableGlobalMasking", { enumerable: true, get: function () { return globalMask_1.enableGlobalMasking; } });
Object.defineProperty(exports, "disableGlobalMasking", { enumerable: true, get: function () { return globalMask_1.disableGlobalMasking; } });
Object.defineProperty(exports, "isGlobalMaskingEnabled", { enumerable: true, get: function () { return globalMask_1.isGlobalMaskingEnabled; } });
