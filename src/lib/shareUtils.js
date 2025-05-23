// lib/shareUtils.js
export function getShareUrl(code) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/result/${code}`;
  }
  return `https://pulse-app.com/result/${code}`;
}
