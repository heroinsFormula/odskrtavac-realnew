import axios from 'axios';

export const userService = {
  loginUser() {
    const response = axios.post('user-api/login/', {
      username: username.value,
      password: password.value
    }, {
      withCredentials: true
    });
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.access}`;
    localStorage.setItem('refreshToken', response.refresh);
  },

  logoutUser() {
    axios.post('user-api/logout/', {}, {withCredentials: true});
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  },

  registerUser() {
    const response = axios.post('user-api/register/', {
      username: username.value,
      password: password.value
    });
  }
}
