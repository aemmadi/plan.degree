import { v4 as uuidv4 } from 'uuid'
const SHA256 = require("crypto-js/sha256")

export function hashPassword(password) {
    const salt = uuidv4()
    const hash = SHA256(salt + password) + ":" + salt
    return hash
}