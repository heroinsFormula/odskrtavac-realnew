import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

let refresh = false

async function getAccessToken() {
  const oldRefreshToken = localStorage.getItem('refreshToken')
  try {
    const { status, data } = await axios.post(
      'user-api/refresh-token/',
      {
        refresh: oldRefreshToken
      },
      {
        withCredentials: true
      }
    )

    if (status === 200) {
      localStorage.setItem('accessToken', data.access)
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`

      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh)
      }

      error.config.headers['Authorization'] = `Bearer ${data.access}`
      return axios(error.config)
    }
  } catch (refreshError) {
    console.error('Token refresh failed:', refreshError)
  }
}

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true

      getAccessToken()
    }
    refresh = false
    return Promise.reject(error)
  }
)
