import http from "@/utils/http"
const prefix = "/api/v1"

/**
 * 获取验证码
 * @param {String} sid
 * @example
 * const payload = await getCaptcha(sid)
 * @returns {Promise}
 */
function getCaptcha(sid) {
  return http.get(`${prefix}/public/captcha`, {
    params: {
      sid,
    },
  })
}

/**
 * 发送Mail
 * @param {String} account
 * @example
 * await sendMail(account)
 */
function sendMail(account) {
  return http.post(`${prefix}/public/sendMail`, {
    data: { account },
  })
}
/**
 * 登录
 * @param {Object} payload
 * @example
 * await login(payload)
 */
function login(payload) {
  return http.post(`${prefix}/public/login`, { data: payload })
}

/**
 * 注册
 * @param {Object} payload
 * @example
 * await register(payload)
 */
function register(payload) {
  return http.post(`${prefix}/public/register`, { data: payload })
}

export { getCaptcha, sendMail, login, register }
