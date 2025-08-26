export function maskCreditCard(card: string): string {
    if (!card) return "";
    return card.slice(-4).padStart(card.length, "*");
  }
  