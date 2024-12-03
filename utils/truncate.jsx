export function truncateContent(a) {
  if (a.length > 160) {
    return a.substring(0, 160) + "...";
  }
  return a;
}
