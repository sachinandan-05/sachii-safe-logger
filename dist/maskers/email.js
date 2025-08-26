"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskEmail = maskEmail;
function maskEmail(email) {
    if (!email)
        return "";
    const [name, domain] = email.split("@");
    if (!domain)
        return email;
    return name[0] + "*".repeat(Math.max(0, name.length - 1)) + "@" + domain;
}
