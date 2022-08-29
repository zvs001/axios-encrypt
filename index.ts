import { AxiosInstance } from 'axios'
import invariant from "invariant";

interface AxiosEncryptParams {
  onEncrypt(str: string): string
}

export function applyEncryptToAxios(axios: AxiosInstance, params: AxiosEncryptParams) {
  const { onEncrypt } = params

  axios.interceptors.request.use((requestConfig) => {
    const { method = '', headers, data } = requestConfig
    if (!['post', 'update'].includes(method.toLowerCase())) return requestConfig
    if (!data) return requestConfig

    if (headers) {
      headers['Content-Type'] = 'text/plain'
      headers['sae-v'] = 1 // server-api-encryption
    }

    const dataTxt = JSON.stringify(data)

    let encryptedTxt = onEncrypt(dataTxt)
    invariant(typeof encryptedTxt === 'string', '[axios-encrypt] encrypted text must be a string')
    invariant(encryptedTxt, '[axios-encrypt] encrypted text is empty')

    requestConfig.data = encryptedTxt

    return requestConfig
  })
}

export default applyEncryptToAxios

