export function detectIsMobile(userAgent: string): boolean {
  return /Mobile|Android|iPhone|iPad/i.test(userAgent);
}
