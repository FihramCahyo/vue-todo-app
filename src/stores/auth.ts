import { defineStore } from 'pinia';
import { login as loginService, logout as logoutService } from '../services/auth';
import type { LoginCredentials, User } from '@/types';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await loginService(credentials);

        if (response.success) {
          const user = {
            userId: response.userId,
            username: response.username,
            token: response.token,
          };

          this.user = user;
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(user));

          toast('Login Berhasil', {
            type: 'success',
          });
          return true;
        } else {
          this.error = response.message || 'Login failed';
          toast(this.error, {
            type: 'error',
          });
          return false;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Username atau password salah';
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      logoutService();
      this.user = null;
    },

    initAuth() {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          this.user = JSON.parse(userStr);
        } catch (e) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    },
  },
});
