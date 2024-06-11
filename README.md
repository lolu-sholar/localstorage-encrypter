# Local & Session Storage Encrypter

A typescript module that encrypts local and session storage keys and their values. It's most useful when developing frontend applications.





__*PLEASE NOTE THAT YOU CAN EASILY TRANSPILE THE SCRIPT TO SUPPORT JAVASCRIPT PROJECTS*__





#### IMPORTANT INFORMATION

The module depends on `crypto-js` for encrypting and decrypting store keys and their values, so be sure to install the dependency.

```bash
npm i crypto-js
npm i --save-dev @types/crypto-js
```

To use the encrypter, open the `store.ts` and provide a 32 character string to generate the CryptoJS key for `sampleCryptoKey` and also a 16 character string to generate the IV for `sampleCryptoIV`.

```js
// Define key and iv for crypto-js
const sampleCryptoKey = CryptoJS.enc.Utf8.parse('ThisIsACool32CharacterLongString'),
      sampleCryptoIV = CryptoJS.enc.Utf8.parse('16CharactersLong')
```





#### HOW TO USE IN YOUR PROJECT

Copy the `store.ts` into your project destination folder and import it into any script you'd want to use it in. 

```js
import store from 'store'

// Store a value / sessionStorage
store.set("someKey", "value")
// Store a value / localStorage
store.set("someKey", "value", true)

// Get a stored value / sessionStorage
store.get("someKey")
// Get a stored value / localStorage
store.get("someKey", true)

// Check if store has a key / sessionStorage
store.has("someKey")
// Check if store has a key / localStorage
store.has("someKey", true)

// Remove a stored value / sessionStorage
store.remove("someKey")
// Remove a stored value / localStorage
store.remove("someKey", true)

// Get a key's value and delete the key/value from store / sessionStorage
store.extract("someKey")
// Get a key's value and delete the key/value from store / localStorage
store.extract("someKey", true)

// Log a key's value to console
store.log("someKey")

// Clear the localStorage and sessionStorage stores
store.clear()
```

## 
