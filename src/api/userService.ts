import axios from 'axios'
import { StatusCodes } from 'http-status-codes'

interface Tokens {
  refresh: string
  access: string
}

interface AuthResponse {
  data: Tokens
  status: StatusCodes
}

export const userService = {
  async loginUser(username: string, password: string) {
    const response: AuthResponse = await axios.post(
      'user-api/login/',
      {
        username: username,
        password: password
      },
      {
        withCredentials: true
      }
    )
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
    localStorage.setItem('refreshToken', response.data.refresh)
    localStorage.setItem('accessToken', response.data.access)
    console.log(response.status)
    return response
  },

  async logoutUser() {
    const localRefreshToken = localStorage.getItem('refreshToken')
    const localAccessToken = localStorage.getItem('accessToken')
    const response: AuthResponse = await axios.post(
      'user-api/logout/',
      { refresh_token: localRefreshToken },
      {
        headers: {
          Authorization: `Bearer ${localAccessToken}`
        },
        withCredentials: true
      }
    )
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    return response
  },

  async registerUser(username, password) {
    const response = await axios.post('user-api/register/', {
      username: username,
      password: password
    })
    return response
  }
}
