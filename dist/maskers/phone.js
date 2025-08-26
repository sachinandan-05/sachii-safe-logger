"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskPhone = maskPhone;
function maskPhone(phone) {
    if (!phone)
        return "";
    return phone.slice(-3).padStart(phone.length, "*");
}
