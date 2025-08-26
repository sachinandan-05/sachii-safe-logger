export function maskPhone(phone: string): string {
    if (!phone) return "";
    return phone.slice(-3).padStart(phone.length, "*");
  }
  