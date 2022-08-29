
Axios plugin for encrypting your requests.

[![npm](https://img.shields.io/npm/v/axios-encrypt)](https://www.npmjs.com/package/axios-encrypt)

At the moment library encrypts only body of requests.

## Install

``yarn add axios-encrypt``

or 

```npm i -S axios-encrypt```


## Usage

Connect example:

```tsx
import axios from 'axios'
import { applyEncryptToAxios } from 'axios-encrypt'
import CryptoJS from 'crypto-js'

const apiClient = axios.create({})


applyEncryptToAxios(apiClient, {
  onEncrypt(str: string): string {
    let encrypted = CryptoJS.AES.encrypt(str, 'secret')
    return encrypted.toString()
  },
})
```


Works with:

- [express-request-decrypt](https://www.npmjs.com/package/express-request-decrypt)
