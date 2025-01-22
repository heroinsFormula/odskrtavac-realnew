import { userService } from '@/api/userService';
import { StatusCodes } from 'http-status-codes';
import { defineStore } from 'pinia';


export const useUserStore = defineStore('userStore', {
  state: () => ({
    loggedIn: false
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await userService.loginUser(username, password)
        if (response.status === 200) {
          this.loggedIn = true
        }
        return response
      } catch(error) {
        console.error(error)
      }
    },
    async logout() {
      try {
        const response = await userService.logoutUser();
        if (response.status === StatusCodes.RESET_CONTENT) {
          this.loggedIn = false
        }
        return response
      } catch(error) {
        console.error(error)
      }
    },
    updateLoggedIn() {
      const refreshToken = localStorage.getItem('refreshToken');
      this.loggedIn = !!refreshToken && refreshToken !== '';
      console.log('updating logged in state: ', this.loggedIn)
    }
  },
});
