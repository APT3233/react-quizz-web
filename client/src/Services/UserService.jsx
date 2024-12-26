import { get, post } from "../utils/method"


export const getInfoUserById = async (id) => {
  const data = get(`http://127.0.0.1:4444/user/${id}`)
  return data
}

export const registerUser = async (data) => {
  const res = post('http://127.0.0.1:4444/api/auth/register', {
    email: data.email,
    username: data.username,
    password: data.password
  })

  return res
}