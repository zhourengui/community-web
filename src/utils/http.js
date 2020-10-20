import axios from "axios"
import { Message } from "element-ui"

const instance = axios.create({
  timeout: 10000 * 6,
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  token && (config.headers.Authorization = `Bearer ${token}`)
  return config
})
instance.interceptors.response.use(
  (response) => {
    const { status, data } = response
    const { message } = data
    return new Promise((resolve, reject) => {
      if (status === 401) {
        Message({
          message: message,
          type: "error",
          duration: 5 * 1000,
        })
      } else if (status !== 200) {
        Message({
          message: message,
          type: "error",
          duration: 5 * 1000,
        })
        reject(message)
      } else {
        resolve(data)
      }
    })
  },
  (error) => {
    console.log(error) // for debug
    const { message } = error.response.data
    Message({
      message: message || error.message,
      type: "error",
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

const http = {}
;["get", "post", "put", "delete"].forEach(
  (type) =>
    (http[type] = async function(url, options) {
      const { payload } = await instance({
        url,
        method: type,
        ...options,
      })
      return payload
    })
)

export default http
