<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div class="card max-w-md w-full">
      <h1 class="text-2xl font-bold text-center mb-6 dark:text-white">Login to Todo App</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="input w-full mt-1"
            :class="{ 'border-red-500': errors.email }"
            placeholder="Enter your email"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="input w-full mt-1"
            :class="{ 'border-red-500': errors.password }"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full" :disabled="authStore.loading">
            {{ authStore.loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>

        <p v-if="authStore.error" class="text-center text-red-500">{{ authStore.error }}</p>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Default credentials: adx-01@mail.com / 1234567890
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import * as yup from 'yup';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: '',
  password: '',
});

const errors = reactive({
  email: '',
  password: '',
});

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required'),
});

const handleLogin = async () => {
  try {
    // Reset errors
    errors.email = '';
    errors.password = '';

    // Validate form
    await schema.validate(form, { abortEarly: false });

    // Login
    const success = await authStore.login({
      user_name: form.email,
      user_password: form.password,
    });

    if (success) {
      router.push('/todos');
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path as keyof typeof errors] = err.message;
        }
      });
    }
  }
};
</script>
