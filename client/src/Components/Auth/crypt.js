import { v4 as uuidv4 } from 'uuid'
const CryptoJS = require("crypto-js")

export function GenerateHashWithSalt(msg) {
    const salt = uuidv4()
    const hash = CryptoJS.SHA256(msg)
    return {
        hash: CryptoJS.SHA256(salt) + hash,
        salt: salt
    }
}

export function GenerateHash(msg) {
    return CryptoJS.SHA256(msg) + ""
}