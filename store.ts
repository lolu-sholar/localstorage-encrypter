import * as CryptoJS from 'crypto-js'

// Define key and iv for crypto-js
const sampleCryptoKey = CryptoJS.enc.Utf8.parse('ThisIsACool32CharacterLongString'),
      sampleCryptoIV = CryptoJS.enc.Utf8.parse('16CharactersLong')

// Define store functions
const store = {
  // Clear storage
  clear: () => Boolean(localStorage.clear()) || Boolean(sessionStorage.clear()),
  // Encrypt key
  makeKey (key: string): string {
    // You can use a different logic to encrypt the key
    return CryptoJS.AES.encrypt(String(key), sampleCryptoKey, { iv: sampleCryptoIV }).toString().replace(/=/g, '').toUpperCase()
  },
  // Set store value by encrypting key and value
  set (key: string, value: string, local?: boolean): void {
    // Halt if irregularity in key or value
    if (!String(key).trim().length || !String(value).trim().length) return

    // Encrypt key
    key = this.makeKey(key)

    // Check if value is integer
    if (typeof(value) == "number") {
      // Attach flag to value
      value = String(value) + '_IS_INTEGER'
    } else if (typeof(value) == "boolean") {
      // Attach flag to value
      value = String(value) + '_IS_BOOLEAN'
    }

    // Encrypt value
    const cipherText = CryptoJS.AES.encrypt(String(value), sampleCryptoKey, { iv: sampleCryptoIV }).toString()

    // Store value
    local 
      ? localStorage.setItem(key, cipherText)
      : sessionStorage.setItem(key, cipherText)
  },
  // Get store value
  get (key: string, local?: boolean): any {
    // Halt if irregularity in key
    if (!String(key).trim().length) return

    // Encrypt key
    key = this.makeKey(key)

    // Get value
    let value = ((local ? localStorage.hasOwnProperty(key) : sessionStorage.hasOwnProperty(key))
      ? CryptoJS.AES.decrypt((local ? localStorage.getItem(key) : sessionStorage.getItem(key)) ?? '', sampleCryptoKey, { iv: sampleCryptoIV }).toString(CryptoJS.enc.Utf8)
      : '')

    // Check if value is integer
    if (String(value).length) {
      if (value.match(/_IS_INTEGER/))
        return Number(String(value).replace(/_IS_INTEGER/g, ''))
      else if (value.match(/_IS_BOOLEAN/))
        return Boolean(String(value).replace(/_IS_BOOLEAN/g, '') === 'true')
    }

    return value
  },
  // Get store value and remove from store
  extract (key: string, local?: boolean): any {
    // Get value
    const value = this.get(key, local)
    // Delete value
    this.remove(key, local)
    
    return value
  },
  // Remove value with key
  remove (key: string, local?: boolean): void {
    // Halt if irregularity in key
    if (!String(key).trim().length) return
    // Encrypt key
    key = this.makeKey(key)
    // Remove value
    local 
      ? localStorage.removeItem(key)
      : sessionStorage.removeItem(key)
  },
  // Check if store has value
  has (key: string, local?: boolean): boolean {
    // Halt if irregularity in key
    if (!String(key).trim().length) return false
    
    // Return if store has value
    return (String(this.get(key, local)).length > 0)
  },
  // Log value
  log (key: string): void {
    console.log(this.get(key))
  }
}

export default store