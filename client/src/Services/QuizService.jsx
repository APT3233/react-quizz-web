import { get } from "../utils/method"

export const getTopic = async () => {
  const list = await get('http://127.0.0.1:4444/api/topic')
  return list
}

export const getTopicById = async (id) => {
  const list = await get(`http://127.0.0.1:4444/api/topic/${id}`)
  return list
}
