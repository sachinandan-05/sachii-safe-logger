export function maskEmail(email: string): string {
    if (!email) return "";
    const [name, domain] = email.split("@");
    if (!domain) return email;
    return name[0] + "*".repeat(Math.max(0, name.length - 1)) + "@" + domain;
  }
  