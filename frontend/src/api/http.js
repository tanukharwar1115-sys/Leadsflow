import axios from 'axios'

// withCredentials => the HTTP-only auth cookie is sent with every request.
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 15000,
})

// Backend ka { success:false, message } ya network error => ek consistent Error message.
export function getErrorMessage(err) {
  if (err?.response?.data?.message) return err.response.data.message
  if (err?.code === 'ECONNABORTED') return 'Request timed out'
  if (err?.request && !err.response) return 'Cannot reach server'
  return err?.message || 'Something went wrong'
}
