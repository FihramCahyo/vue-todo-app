import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAuthStore } from './stores/auth';

// Import CSS
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Inisialisasi auth store
const authStore = useAuthStore(pinia)
authStore.initAuth()

app.use(router)

// Konfigurasi global untuk toast
app.use(Vue3Toastify, {
  autoClose: 10000,
  clearOnUrlChange: false,
  position: "top-center",
  pauseOnHover: true,
});

// Darkmode
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

app.mount('#app')
