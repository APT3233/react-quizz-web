import { post } from "../utils/method"

export const handlePostLogin = (data) => {
  const res = post('http://127.0.0.1:4444/api/auth/login', data)
  return res
}