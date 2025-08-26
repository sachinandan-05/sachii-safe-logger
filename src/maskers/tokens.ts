export function maskToken(token: string): string {
    if (!token) return "";
    if (token.length <= 8) return token.replace(/./g, "*");
    const start = token.slice(0, 4);
    const end = token.slice(-4);
    const masked = "*".repeat(token.length - 8);
    return `${start}${masked}${end}`;
  }
  