export function getSessionId(cookie) {
  if(cookie.session !== undefined) {
    return cookie.session
  }
  return false
}