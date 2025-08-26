"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskCreditCard = maskCreditCard;
function maskCreditCard(card) {
    if (!card)
        return "";
    return card.slice(-4).padStart(card.length, "*");
}
