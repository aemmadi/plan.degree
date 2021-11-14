import { v4 as uuidv4 } from 'uuid'
const CryptoJS = require("crypto-js")

export function generateSignature(message) {
  const salt = uuidv4().split("-")[0]
  return {
    signature: CryptoJS.SHA256(`${message}${salt}`),
    key: salt
  }
}