export function generateUniqueId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2);
  const uniquePart = (Math.random() * 10e16).toString(36).slice(0);

  return `${prefix}${timestamp}${randomPart}${uniquePart}`.toUpperCase();
}
