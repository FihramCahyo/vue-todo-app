import api from './api';
import type { LoginCredentials, LoginResponse } from '@/types';

// Login function untuk mengautentikasi user dengan mengirimkan kredensial ke server dengan POST.
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/users/login', credentials);
  return response.data;
};

// Logout function untuk menghapus token auth dan data pengguna untuk mengakhiri sesi user.
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

